import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import ArticleForm from '@/components/ArticleForm'
import { prisma } from '@/lib/prisma'

async function getUserArticles(userId: string) {
    try {
        const articles = await prisma.article.findMany({
            where: {
                authorId: userId
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
        return articles
    } catch (error) {
        console.error('Failed to fetch user articles:', error)
        return []
    }
}

export default async function Dashboard() {
    const session = await getServerSession(authOptions)

    if (!session) {
        redirect('/auth/signin')
    }

    const userArticles = await getUserArticles(session.user.id)

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-6xl mx-auto px-4 py-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                            <p className="text-gray-600">Welcome back, {session.user?.name}!</p>
                        </div>
                        <a
                            href="/"
                            className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                            ← Back to Articles
                        </a>
                    </div>
                </div>
            </header >

            {/* Content */}
            < div className="max-w-6xl mx-auto px-4 py-8" >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Form untuk membuat artikel */}
                    <div>
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">
                                Create New Article
                            </h2>
                            <ArticleForm />
                        </div>
                    </div>

                    {/* Daftar artikel user */}
                    <div>
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">
                                Your Articles ({userArticles.length})
                            </h2>
                            {userArticles.length === 0 ? (
                                <p className="text-gray-500 text-center py-8">
                                    You haven't created any articles yet.
                                </p>
                            ) : (
                                <div className="space-y-4 max-h-96 overflow-y-auto">
                                    {userArticles.map((article) => (
                                        <div
                                            key={article.id}
                                            className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                                        >
                                            <h3 className="font-medium text-gray-900 mb-2">
                                                {article.title}
                                            </h3>
                                            <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                                                {article.content}
                                            </p>
                                            <div className="flex items-center justify-between text-xs text-gray-500">
                                                <span>
                                                    {new Date(article.createdAt).toLocaleDateString('id-ID')}
                                                </span>
                                                <span className={`px-2 py-1 rounded-full ${article.published
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-yellow-100 text-yellow-800'
                                                    }`}>
                                                    {article.published ? 'Published' : 'Draft'}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
}