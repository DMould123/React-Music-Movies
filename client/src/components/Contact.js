import React, { useState } from 'react'
import { FaUser, FaEnvelope, FaComment } from 'react-icons/fa'
const Contact = () => {
  const [data, setData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const { name, email, message } = data

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission logic here
  }

  return (
    <div className="register-container">
      <h1>Contact</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">
            <FaUser /> Name:
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
          <label htmlFor="message"></label>
          <FaComment /> Message:
          <textarea
            id="message"
            name="message"
            rows={8} // Set the number of rows
            cols={50} // Set the number of columns
            value={message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default Contact
