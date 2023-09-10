import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router'
import { FaEnvelope, FaLock } from 'react-icons/fa'

const Login = () => {
  const navigate = useNavigate()
  const [data, setData] = useState({
    email: '',
    password: ''
  })

  const userLogin = async (e) => {
    e.preventDefault()
    const { email, password } = data
    try {
      const { data } = await axios.post('/login', { email, password })
      if (data.error) {
        toast.error(data.error)
      } else {
        setData({})
        navigate('/dashboard')
      }
    } catch (error) {}
  }

  const handleInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={userLogin}>
        <div className="form-group">
          <label htmlFor="email">
            <FaEnvelope /> Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={data.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">
            <FaLock /> Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={data.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}
export default Login
