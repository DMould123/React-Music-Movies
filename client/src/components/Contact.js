import React, { useState } from 'react'
import { FaUser, FaEnvelope, FaComment } from 'react-icons/fa'
import axios from 'axios'

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

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Prepare the data to send to Formspree
    const formData = new FormData()
    formData.append('name', name)
    formData.append('email', email)
    formData.append('message', message)

    try {
      // Send a POST request to Formspree's endpoint
      const response = await axios.post(
        'https://formspree.io/f/mjvdqpav',
        formData
      )

      // Check if the submission was successful
      if (response.status === 200) {
        // Handle a successful submission (e.g., show a success message)
        console.log('Form submitted successfully.')
      } else {
        // Handle an unsuccessful submission (e.g., show an error message)
        console.error('Form submission failed.')
      }
    } catch (error) {
      // Handle any errors that occurred during the submission
      console.error('An error occurred:', error)
    }
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
          <label htmlFor="message">
            <FaComment /> Message:
          </label>
          <textarea
            id="message"
            name="message"
            rows={8}
            cols={50}
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
