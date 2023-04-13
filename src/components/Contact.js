import React, { useState } from 'react'

function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitted(true)
  }

  return (
    <div className="contact-form-container">
      {!isSubmitted ? (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="Name">Name</label>
            <input type="text" id="Name" name="Name" required />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>

          <div className="form-group">
            <label htmlFor="feedback">Feedback</label>
            <textarea
              name="feedback"
              id="feedback"
              cols="30"
              rows="10"
              required
            ></textarea>
          </div>

          <button type="submit">Submit</button>
        </form>
      ) : (
        <div className="success-message">
          <p>Thanks for the feedback!</p>
        </div>
      )}
    </div>
  )
}

export default Contact
