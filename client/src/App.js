import React from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import NavBar from './components/NavBar'
import axios from 'axios'
import { Toaster } from 'react-hot-toast'
import { UserContextProvider } from './context/userContext'

axios.defaults.baseURL = `https://react-music-movies.onrender.com/api/movies`
axios.defaults.withCredentials = true

export default function App() {
  return (
    <UserContextProvider>
      <div className="App">
        <NavBar />
        <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
      </div>
    </UserContextProvider>
  )
}
