import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './Layouts/Navbar'
import Footer from './Layouts/Footer'
import Home from './Components/Home'
import About from './Components/About'
import AddBus from './Components/AddBus'
import BusPage from './Components/BusPage'
import Contact from './Components/Contact'
import Login from './Components/Login'
import RecentBooking from './Components/RecentBooking'


import Registration from './Components/Registration'
import SearchBus from './Components/SearchBus'
import TravelsLogin from './Components/TravelsLogin'
import './Assets/Styles/css/style.css'
import './App.css'
import SnackbarComponent from './Components/Snakbar'
import { Provider } from 'react-redux'
import store from './store'
import AllBuses from './Components/AllBus'
import UpdateBus from './Components/UpdateBus'

function App () {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // Check if the user is logged in
    const checkLoginStatus = () => {
      const userLoggedIn = localStorage.getItem('user') !== null
      setIsLoggedIn(userLoggedIn)
    }

    checkLoginStatus()
  }, [])

  return (
    <>
    
      <Provider store={store}>
        <SnackbarComponent />
        <Router>
          <Navbar />
          <main className='mb-5'>
            <Routes>
              <Route path='/' element={isLoggedIn ? <Home /> : <Login />} />
              <Route path='/about' element={<About />} />
              <Route
                path='/addbus'
                element={isLoggedIn ? <AddBus /> : <Login />}
              />
              <Route
                path='/allbus'
                element={isLoggedIn ? <AllBuses /> : <Login />}
              />
              <Route
                path='/updatebus'
                element={isLoggedIn ? <UpdateBus /> : <Login />}
              />
              <Route
                path='/bus'
                element={isLoggedIn ? <BusPage /> : <Login />}
              />
              
              <Route path='/contact' element={<Contact />} />
              <Route path='/login' element={<Login />} />
              <Route
                path='/recentbooking'
                element={isLoggedIn ? <RecentBooking /> : <Login />}
              />
              <Route path='/registration' element={<Registration />} />
              <Route
                path='/searchbus'
                element={isLoggedIn ? <SearchBus /> : <Login />}
              />
              <Route path='/travelslogin' element={<TravelsLogin />} />
            </Routes>
          </main>
          <Footer />
        </Router>
      </Provider>
    </>
  )
}

export default App
