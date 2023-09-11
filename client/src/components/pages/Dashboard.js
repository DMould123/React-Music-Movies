import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from '../../context/userContext'

const Dashboard = () => {
  const { user } = useContext(UserContext)
  const [movies, setMovies] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    release: '',
    image: '',
    rating: '',
    bio: ''
  })
  const [isAddingMovie, setIsAddingMovie] = useState(false) // State for form visibility

  // Fetch the list of movies when the component mounts
  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await fetch(
          `https://react-music-movies.onrender.com/api/movies`
        )
        if (response.ok) {
          const data = await response.json()
          setMovies(data)
        } else {
          console.error('Error fetching movies.')
        }
      } catch (error) {
        console.error('An error occurred:', error)
      }
    }

    fetchMovies()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleAddMovie = async () => {
    try {
      const response = await fetch(
        `https://react-music-movies.onrender.com/api/movies`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        }
      )

      if (response.ok) {
        // Movie added successfully, update the movie list.
        const newMovie = await response.json()
        setMovies([...movies, newMovie])
        // Clear the form data
        setFormData({
          name: '',
          release: '',
          image: '',
          rating: '',
          bio: ''
        })
        // Close the form
        setIsAddingMovie(false)
      } else {
        // Handle error, e.g., display an error message to the user.
        console.error('Error adding movie.')
      }
    } catch (error) {
      console.error('An error occurred:', error)
    }
  }

  const handleDeleteMovie = async (movieId) => {
    try {
      const response = await fetch(
        `https://react-music-movies.onrender.com/api/movies/${movieId}`,
        {
          method: 'DELETE'
        }
      )

      if (response.ok) {
        // Movie deleted successfully, update the movie list.
        setMovies(movies.filter((movie) => movie._id !== movieId))
        console.log('Movie deleted successfully!')
      } else {
        // Handle error, e.g., display an error message to the user.
        console.error('Error deleting movie.')
      }
    } catch (error) {
      console.error('An error occurred:', error)
    }
  }

  return (
    <div>
      <h1>Music & Movies Dashboard</h1>
      {!!user && <h2>Hi {user.name}! Welcome to Music & Movies</h2>}

      {/* Toggle the form visibility */}
      <button onClick={() => setIsAddingMovie(!isAddingMovie)}>
        {isAddingMovie ? 'Cancel' : 'Add Movie'}
      </button>

      {/* Movie Addition Form (conditionally rendered) */}
      {isAddingMovie && (
        <div>
          <h3>Add a New Movie</h3>
          <form>
            {/* Form fields for movie data here */}
            <div>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Release Year:</label>
              <input
                type="number"
                name="release"
                value={formData.release}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Image URL:</label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Rating:</label>
              <input
                type="number"
                name="rating"
                value={formData.rating}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Bio:</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
              />
            </div>
            <button type="button" onClick={handleAddMovie}>
              Add Movie
            </button>
          </form>
        </div>
      )}
      <h3>List of Movies</h3>
      <ul>
        {movies.map((movie) => (
          <li key={movie._id}>
            <strong>{movie.name}</strong> ({movie.release})
            <button onClick={() => handleDeleteMovie(movie._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Dashboard
