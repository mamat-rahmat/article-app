'use client'

import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'

export default function AuthButton() {
    const { data: session, status } = useSession()

    if (status === 'loading') {
        return <p>Loading...</p>
    }

    if (session) {
        return (
            <div className="flex items-center gap-4">
                <Link
                    href="/dashboard"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
                >
                    Dashboard
                </Link>
                <span className="text-gray-600">
                    {session.user?.name || session.user?.email}
                </span>
                <button
                    onClick={() => signOut()}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors"
                >
                    Sign out
                </button>
            </div>
        )
    }

    return (
        <div className="flex gap-4">
            <Link
                href="/auth/signin"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
            >
                Sign In
            </Link>
            <Link
                href="/auth/register"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors"
            >
                Register
            </Link>
        </div>
    )
}