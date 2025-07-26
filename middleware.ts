import { withAuth } from 'next-auth/middleware'

export default withAuth(
    function middleware(req) {
        console.log('Middleware executed for:', req.nextUrl.pathname)
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token
        },
    }
)

export const config = {
    matcher: ['/dashboard/:path*']
}