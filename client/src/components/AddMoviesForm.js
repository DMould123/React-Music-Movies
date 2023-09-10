import React, { useState } from 'react'
import axios from 'axios'

function AddMovieForm() {
  const [name, setName] = useState('')
  const [release, setRelease] = useState('')
  const [image, setImage] = useState('')
  const [rating, setRating] = useState('')
  const [bio, setBio] = useState('')
  const [file, setFile] = useState(null)

  const handleFormSubmit = async (event) => {
    event.preventDefault()

    // Create a new FormData object
    const formData = new FormData()

    // Add the file to the form data object if it exists
    if (file) {
      formData.append('image', file)
    }

    // Add the rest of the form data fields
    formData.append('name', name)
    formData.append('release', release)
    formData.append('rating', rating)
    formData.append('bio', bio)

    // Make the POST request using axios and the form data object
    await axios.post('/api/movies', formData)

    // Reset the form state
    setName('')
    setRelease('')
    setImage('')
    setRating('')
    setBio('')
    setFile(null)
  }

  const handleFileChange = (event) => {
    // Get the first file from the event object
    const file = event.target.files[0]

    // Update the state with the new file
    setFile(file)

    // Read the file as a data URL and set it as the image URL
    const reader = new FileReader()
    reader.onload = (event) => {
      setImage(event.target.result)
    }
    reader.readAsDataURL(file)
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="release">Release Year:</label>
        <input
          type="text"
          id="release"
          value={release}
          onChange={(event) => setRelease(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="image">Image:</label>
        <input type="file" id="image" onChange={handleFileChange} />
        {image && (
          <img
            src={image}
            alt="Movie poster preview"
            style={{ maxWidth: '200px' }}
          />
        )}
      </div>
      <div>
        <label htmlFor="rating">Rating:</label>
        <input
          type="text"
          id="rating"
          value={rating}
          onChange={(event) => setRating(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="bio">Movie Bio:</label>
        <textarea
          id="bio"
          value={bio}
          onChange={(event) => setBio(event.target.value)}
        />
      </div>
      <button type="submit">Add Movie</button>
    </form>
  )
}

export default AddMovieForm
