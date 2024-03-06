import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Navbar = () => {
    let location = useLocation();
    let navigate = useNavigate();
useEffect(() => {
  
    console.log(location);//whenever clicks the "Home/about" it will return location object including "pathname"

  }
, 
// eslint-disable-next-line
[location])//for every changes of location useEffect will run and if don't specify or let it empty then useEffect will run only inital/first time after component is mount or return

  const handleLogout=()=>{
    localStorage.removeItem('token');
    navigate('/login');

  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container-fluid">
      <Link className="navbar-brand" to="/">iNotebook</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className={`nav-link ${location.pathname==="/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${location.pathname==="/about" ? "active" : ""}`}to="/about">About</Link>
          </li>
        
        </ul>
        {/* If user is not logged in then show him "login and signup" Otherwise (loggedin) show him "logout"  */}
       { !localStorage.getItem('token') ? <form className="d-flex">
        <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
        <Link className="btn btn-primary mx-1" to="/signup" role="button">Signup</Link>
        </form> : <button className='btn btn-primary' onClick={handleLogout}> Logout </button> }
      </div>
    </div>
  </nav>
  )

}

export default Navbar