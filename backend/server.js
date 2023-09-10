require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const path = require('path')
const cookieParser = require('cookie-parser')

const app = express()
const DB_URI = process.env.MONGODB_URI

// // enable CORS middleware
// app.use(cors())

//middleware
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//define routes
app.use('/', require('./routes/authRoutes'))

// Define the movie schema
const movieSchema = new mongoose.Schema({
  name: { type: String, required: true },
  release: { type: Number, required: true },
  image: { type: String, required: true },
  rating: { type: Number, required: true },
  bio: { type: String, required: true }
})

// Create a Mongoose model for the movies collection
const Movie = mongoose.model('Movie', movieSchema, 'movies')

// Connect to the MongoDB database
console.log('DB_URI:', DB_URI)
mongoose
  .connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('MongoDB connected')
    // Add a console.log statement to print the connection status
    console.log(`MongoDB connection status: ${mongoose.connection.readyState}`)
  })
  .catch((err) => console.log(err))

// Serve static files from the "build" directory
app.use(express.static(path.join(__dirname, 'build')))

// Get all movies
app.get('/api/movies', async (req, res) => {
  try {
    const movies = await Movie.find()
    res.json(movies)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
})

// Create a new movie
app.post('/api/movies', async (req, res) => {
  try {
    const movie = new Movie(req.body)
    const savedMovie = await movie.save()
    res.json(savedMovie)
  } catch (err) {
    console.error(err)
    res.status(400).json({ message: 'Validation error' })
  }
})

// Update a movie
app.put('/api/movies/:id', async (req, res) => {
  try {
    const id = req.params.id
    const movie = await Movie.findByIdAndUpdate(id, req.body, { new: true })
    if (movie) {
      res.json(movie)
    } else {
      res.status(404).json({ message: `Movie with ID ${id} not found` })
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
})

// Delete a movie
app.delete('/api/movies/:id', async (req, res) => {
  try {
    const id = req.params.id
    const movie = await Movie.findByIdAndDelete(id)
    if (movie) {
      res.json({ message: `Movie with ID ${id} deleted` })
    } else {
      res.status(404).json({ message: `Movie with ID ${id} not found` })
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
})

// Serve the React app from the root route
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

// start the server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}.`)
})
