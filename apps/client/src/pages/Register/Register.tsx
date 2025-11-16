import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useRegister } from '@/hooks/useAuth'
import { Input } from '@/components/Input/Input'
import { Button } from '@/components/Button/Button'
import styles from './Register.module.css'

export function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const { mutate: register, isPending: isRegisterLoading } = useRegister(
    () => navigate('/'),
    (error) => setError(error),
  )

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setError('')
    register({ email, password, name: name })
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Create Account</h1>
        <p className={styles.subtitle}>Sign up to get started</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          {error && <div className={styles.error}>{error}</div>}

          <Input
            label="Name (optional)"
            type="text"
            placeholder="John Doe"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button type="submit" disabled={isRegisterLoading}>
            {isRegisterLoading ? 'Creating account...' : 'Sign up'}
          </Button>
        </form>

        <div className={styles.footer}>
          Already have an account?{' '}
          <Link to="/login" className={styles.link}>
            Sign in
          </Link>
        </div>
      </div>
    </div>
  )
}
