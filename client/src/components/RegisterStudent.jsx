import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

function RegisterStudent() {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    console.log("Register page")
    if (currentUser) navigate('/dashboard')
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    for (let index in Array.from(e.target)) {
      if (!e.target[index].value && e.target[index].tagName.toLowerCase() != "button") {
        const errorMessage = "Please enter values in all inputs"
        console.log(errorMessage);
        setErrMsg(errorMessage);
        return;
      }
    }
    const id = e.target[0].value
    const password = e.target[1].value

    // Make a POST request to server
    try {
      const res = await fetch('http://localhost:8080/api/hostel/students', {
        method: 'POST',
        body: JSON.stringify({ id, password }),
        headers: { 'Content-Type': 'application/json' }
      })
      console.log(res)
      const data = await res.json()
      if (data.success) navigate('/login')
      else setErrMsg(data.message)
    } catch (error) {
      console.log(error)
      setErrMsg(error.message)
    }
  }
  return (
    <>
      <h2><b>Register Student</b></h2>
      <div className='border-solid border-2 flex align-center justify-center p-2'>
        <form onSubmit={handleSubmit}>
          <table className='text-left border-separate border-spacing-2'>
            <tbody>
              <tr>
                <td>
                  <label htmlFor="idInput">ID:</label>
                </td>
                <td>
                  <input type="text" placeholder='Enter your ID' id='idInput' />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="passwordInput">Password:</label>
                </td>
                <td>
                  <input type="password" placeholder='Enter Password' id='passwordInput' />
                </td>
              </tr>
            </tbody>
          </table>
          <button className='btn btn-outline-primary mt-2'>Submit</button>
        </form>
      </div>
      {errMsg && <p>{errMsg}</p>}
      <Link to="/register/admin" className="navbar-brand">
        <button className="btn btn-outline-primary" type="submit">
          Register Admin
        </button>
      </Link>
    </>
  )
}

export default RegisterStudent