import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/Button/Button'
import styles from './Home.module.css'

export function Home() {
  const { user, logout } = useAuth()

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Welcome!</h1>
        {user && (
          <div className={styles.userInfo}>
            <p className={styles.email}>{user.email}</p>
            {user.name && <p className={styles.name}>{user.name}</p>}
          </div>
        )}
        <Button onClick={handleLogout} variant="secondary">
          Logout
        </Button>
      </div>
    </div>
  )
}
