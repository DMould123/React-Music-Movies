import React, { useContext } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink
} from 'react-router-dom'
import { Navbar, Nav, NavItem, Container } from 'react-bootstrap'
import Home from './Home'
import Albums from './Albums'
import Contact from './Contact'
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import { UserContext } from '../context/userContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function LogoutButton() {
  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await axios.post('/logout')
      setUser(null)
      navigate('/login') // Navigate to the login page
    } catch (error) {
      console.log(error)
    }
  }

  return <button onClick={handleLogout}>Logout</button>
}

function NavBar() {
  const { user } = useContext(UserContext)
  const Styles = ({ isActive }) => {
    return {
      fontWeight: isActive ? 'bold' : 'normal',
      textDecoration: isActive ? 'none' : 'italic'
    }
  }

  return (
    <Router>
      <div>
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand
              className="logo"
              style={{ fontSize: '1.8rem', marginLeft: '-10px' }}
              href="#home"
            >
              <img
                src={'../.././images/logo.png'}
                alt=""
                style={{ width: '300px', height: '80px' }}
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <NavItem>
                  <NavLink style={Styles} className="nav-link" to="/">
                    Home
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink style={Styles} className="nav-link" to="/albums">
                    Albums
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink style={Styles} className="nav-link" to="/contact">
                    Contact
                  </NavLink>
                </NavItem>
                {user && <LogoutButton />}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
      <div>
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<Albums />} path="/albums" />
          <Route element={<Contact />} path="/contact" />
          <Route element={<Login />} path="/login" />
          <Route element={<Register />} path="/register" />
          <Route element={<Dashboard />} path="/dashboard" />
        </Routes>
      </div>
    </Router>
  )
}

export default NavBar
