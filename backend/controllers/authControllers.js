const { hashPassword, comparePassword } = require('../helpers/auth')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const test = (req, res) => {
  res.json('test working')
}

// Register Endpoint
const registerUser = async (req, res) => {
  try {
    const { name, email, password, username } = req.body

    // Check if name is entered
    if (!name) {
      return res.json({
        error: 'Name is required'
      })
    }
    // Check if username is entered
    if (!username) {
      return res.json({
        error: 'Username is required'
      })
    }

    // Check if password is correct
    if (!password || password.length < 6) {
      return res.json({
        error: 'Password is required and should be at least 6 characters'
      })
    }

    // Check email
    const exist = await User.findOne({ email })
    if (exist) {
      return res.json({
        error: 'Email already exists'
      })
    }

    const hashedPassword = await hashPassword(password)
    //create user in database
    const user = await User.create({
      name,
      username,
      email,
      password: hashedPassword
    })

    return res.json(user)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Server error' })
  }
}

// Login Endpoint
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body
    // check if user exists
    const user = await User.findOne({ email })
    if (!user) {
      return res.json({ error: 'No user found' })
    }
    // check if password matches
    const match = await comparePassword(password, user.password)
    if (match) {
      jwt.sign(
        { email: user.email, id: user._id, name: user.name },
        process.env.JWT_SECRET,
        {},
        (err, token) => {
          if (err) throw err
          res.clearCookie('token') // Clear the existing token
          res.cookie('token', token).json(user)
        }
      )
    }
    if (!match) {
      res.json({ error: 'Passwords do not match' })
    }
  } catch (error) {
    console.log(error)
  }
}
const getProfile = (req, res) => {
  const { token } = req.cookies
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
      if (err) throw err
      res.json(user)
    })
  } else {
    res.json(null)
  }
}

const logoutUser = (req, res) => {
  res.clearCookie('token').json({ message: 'Logged out successfully' })
}

module.exports = { test, registerUser, loginUser, getProfile, logoutUser }
