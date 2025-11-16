import { Button } from '@/components/Button/Button'
import styles from './Home.module.css'
import { useUser } from '@/hooks/useUser'

export function Home() {
  const { user, logout } = useUser()

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
        <Button onClick={logout} variant="secondary">
          Logout
        </Button>
      </div>
    </div>
  )
}
