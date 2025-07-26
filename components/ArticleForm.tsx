'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ArticleForm() {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [published, setPublished] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        setSuccess('')

        try {
            const response = await fetch('/api/articles', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    content,
                    published,
                }),
            })

            if (response.ok) {
                setSuccess('Article created successfully!')
                setTitle('')
                setContent('')
                setPublished(false)
                router.refresh()

                setTimeout(() => setSuccess(''), 3000)
            } else {
                const data = await response.json()
                setError(data.error || 'Failed to create article')
            }
        } catch (error) {
            setError('An error occurred. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            )}

            {success && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                    {success}
                </div>
            )}

            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                </label>
                <input
                    id="title"
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                    placeholder="Enter article title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                    Content
                </label>
                <textarea
                    id="content"
                    required
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical text-black"
                    placeholder="Write your article content here..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </div>

            <div className="flex items-center">
                <input
                    id="published"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    checked={published}
                    onChange={(e) => setPublished(e.target.checked)}
                />
                <label htmlFor="published" className="ml-2 block text-sm text-gray-700">
                    Publish immediately
                </label>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                {loading ? 'Creating...' : 'Create Article'}
            </button>
        </form>
    )
}