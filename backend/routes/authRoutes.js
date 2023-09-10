const express = require('express')
const router = express.Router()
const cors = require('cors')
const {
  test,
  registerUser,
  loginUser,
  getProfile,
  logoutUser
} = require('../controllers/authControllers')

//middleware
const corsOptions = {
  origin: 'http://localhost:3001',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}

router.use(cors(corsOptions))

router.get('/', test)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/profile', getProfile)
router.post('/logout', logoutUser)

module.exports = router
