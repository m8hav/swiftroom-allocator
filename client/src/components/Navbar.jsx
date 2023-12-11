import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../contexts/AuthContext';
import { Link, Route, Routes, useLocation } from 'react-router-dom';

function Navbar() {
  let { pathname } = useLocation();

  const { currentUser } = useContext(AuthContext);

  return (
    <nav className="navbar bg-body-tertiary border-2">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">Swiftroom Allocator</Link>
        <div>
          {
            (!(pathname.includes("/dashboard")) && !currentUser) &&
            <Link to="/dashboard" className="navbar-brand">
              <button className="btn btn-outline-primary" type="submit">
                Dashboard
              </button>
            </Link>
          }
          {
            !(pathname.includes("/login")) &&
            <Link to={currentUser ? "/logout" : "/login"} className="navbar-brand">
              <button className="btn btn-outline-primary" type="submit">
                {
                  currentUser ? "Logout" : "Login"
                }
              </button>
            </Link>
          }
          {
            (!(pathname.includes("/register")) && !currentUser) &&
            <Link to="/register" className="navbar-brand">
              <button className="btn btn-outline-primary" type="submit">
                Register
              </button>
            </Link>
          }
        </div>
      </div>
    </nav>
  )
}

export default Navbar