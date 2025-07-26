import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function Dashboard() {
    const session = await getServerSession(authOptions)

    if (!session) {
        redirect('/auth/signin')
    }

    return (
        <div className="min-h-screen p-8 bg-gray-50">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-4 text-black">Dashboard</h1>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-2 text-black">Welcome!</h2>
                    <p className="text-gray-600 mb-4">
                        Hello, <strong>{session.user?.name}</strong>
                    </p>
                    <p className="text-gray-600">
                        Email: <strong>{session.user?.email}</strong>
                    </p>
                </div>
            </div>
        </div>
    )
}