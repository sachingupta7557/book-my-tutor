import { useState } from 'react'
import axios from 'axios'

export default function ForgotPasswordTutor() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('/api/tutor/forgot-password-tutor', { email })
      setMessage(res.data.message)
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error occurred')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Forgot Password (Tutor)</h2>
      <input
        type="email"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">Send Reset Link</button>
      <p>{message}</p>
    </form>
  )
}









