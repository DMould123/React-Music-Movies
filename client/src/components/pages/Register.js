import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router'
import { FaUser, FaEnvelope, FaLock, FaUserCircle } from 'react-icons/fa'

const Register = () => {
  const navigate = useNavigate()
  const [data, setData] = useState({
    name: '',
    username: '',
    email: '',
    password: ''
  })

  const { name, email, username, password } = data

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const registerUser = async (e) => {
    e.preventDefault()
    try {
      const responseData = await axios.post('/register', data)

      if (responseData.data.error) {
        toast.error(responseData.data.error)
      } else {
        setData({
          name: '',
          username: '',
          email: '',
          password: ''
        })
        toast.success('Registration was successful. Welcome to Music & Movies')
        navigate('/login')
      }
    } catch (error) {}
  }

  return (
    <div className="register-container">
      <form onSubmit={registerUser}>
        <div className="form-group">
          <label htmlFor="name">
            <FaUserCircle /> Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">
            <FaUser /> Username:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">
            <FaEnvelope /> Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleChange}
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
            value={password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default Register
