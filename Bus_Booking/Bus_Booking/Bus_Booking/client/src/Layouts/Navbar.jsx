import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  // Check if the user is logged in by accessing local storage
  const isLoggedIn = localStorage.getItem('user')
  const isAdmin = localStorage.getItem('admin')
  // Function to handle logout
  const handleLogout = () => {
    // Clear the local storage and redirect to the login page
    localStorage.clear()
    window.location.href = '/login'
  }
  return (
    <React.Fragment>
      <nav className='navbar navbar-expand-lg navbar-light bg-dark p-3'>
        <div className='container'>
          <Link to='/'>
            <img
              className='navbar-brand'
              src={require(`../Assets/Images/Tours & Travels-logos_white.png`)}
              width={100}
              height={80}
              alt='Tours & Travels Logo'
            />
          </Link>
          <button
            className='navbar-toggler'
            type='button'
            data-toggle='collapse'
            data-target='#navbarNav'
            aria-controls='navbarNav'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>

          <div className='collapse navbar-collapse' id='navbarNav'>
            <ul className='navbar-nav ml-auto'>
              {isLoggedIn ? (
                <>
                  <li className='nav-item'>
                    <Link className='nav-link' onClick={handleLogout}>
                      Logout
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link className='nav-link' to='/'>
                      Home
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link className='nav-link' to='searchbus'>
                      Search Bus
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link className='nav-link' to='recentbooking'>
                      Recent Booking
                    </Link>
                  </li>
                </>
              ) : (
                <li className='nav-item dropdown'>
                  <a
                    className='nav-link dropdown-toggle'
                    href='#'
                    id='navbarDropdown'
                    role='button'
                    data-toggle='dropdown'
                    aria-haspopup='true'
                    aria-expanded='false'
                  >
                    Login
                  </a>
                  <div
                    className='dropdown-menu bg-info'
                    aria-labelledby='navbarDropdown'
                  >
                    <Link className='dropdown-item' to='login'>
                      Customer Login
                    </Link>
                    <Link className='dropdown-item' to='travelslogin'>
                      Travels Login
                    </Link>
                  </div>
                </li>
              )}

              {isAdmin === '1' && (
                <>
                  <li className='nav-item'>
                    <Link className='nav-link' to='addbus'>
                      Add Bus
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link className='nav-link' to='allbus'>
                      All Bus
                    </Link>
                  </li>
                </>
              )}

              <li className='nav-item'>
                <Link className='nav-link' to='contact'>
                  Contact Us
                </Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to='about'>
                  About Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </React.Fragment>
  )
}

export default Navbar
