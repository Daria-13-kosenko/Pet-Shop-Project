import { useState } from 'react'
import styles from './RegistrSale.module.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3333'

function RegistrSale() {
  const [form, setForm] = useState({ name: '', phone: '', email: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [serverError, setServerError] = useState('')

  const onChange = (e) => {
    const { name, value } = e.target
    setForm((p) => ({ ...p, [name]: value }))
  }

  const validate = () => {
    if (!form.name.trim()) return 'Enter your name'
    if (!form.phone.trim()) return 'Enter your phone number'
    if (!form.email.trim()) return 'Enter your email'
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) return 'Email is not valid'
    return ''
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setServerError('')
    setSuccess(false)

    const err = validate()
    if (err) {
      setServerError(err)
      return
    }

    try {
      setLoading(true)

      const response = await fetch(`${API_URL}/sale/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: form.phone.trim(),
          email: form.email.trim(),
        }),
      })

      if (!response.ok) {
        const text = await response.text().catch(() => '')
        throw new Error(text || `Request failed (${response.status})`)
      }

      setSuccess(true)
      setForm({ name: '', phone: '', email: '' })
    } catch (error) {
      setServerError(error?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className={styles.banner}>
      <h2 className={styles.title}>5% off on the first order</h2>

      <div className={styles.content}>
        <div className={styles.left}>
          <div className={styles.animals} />
        </div>

        <form className={styles.form} onSubmit={onSubmit}>
          <input
            className={styles.input}
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={onChange}
          />
          <input
            className={styles.input}
            name="phone"
            placeholder="Phone number"
            value={form.phone}
            onChange={onChange}
          />
          <input
            className={styles.input}
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={onChange}
          />

          {serverError && <div className={styles.error}>{serverError}</div>}
          {success && (
            <div className={styles.success}>Sent! Check your email!</div>
          )}

          <button className={styles.button} type="submit" disabled={loading}>
            {' '}
            Get a discount
          </button>
        </form>
      </div>
    </section>
  )
}

export default RegistrSale
