import { Button } from '@/components/ui/Button'
import { useUser } from '@/hooks/useUser'

export function Home() {
  const { user, logout } = useUser()

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-6">Welcome!</h1>
        {user && (
          <div className="mb-6 p-4 bg-gray-100 rounded-lg">
            <p className="text-base m-0">{user.email}</p>
            {user.name && <p className="text-sm mt-2 m-0">{user.name}</p>}
          </div>
        )}
        <Button onClick={logout} variant="secondary">
          Logout
        </Button>
      </div>
    </div>
  )
}
