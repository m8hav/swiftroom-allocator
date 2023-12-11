import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { saveAuthToken, saveUserDetails } from '../utils/auth';

function Login() {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    console.log("Login page")
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
    const type = e.target[2].value

    // Make a POST request to server
    // If successful, save the token in local storage
    try {
      const res = await fetch(`http://localhost:8080/api/hostel/${type === 'student' ? 'students' : 'admins'}/login`, {
        method: 'POST',
        body: JSON.stringify({ id, password }),
        headers: { 'Content-Type': 'application/json' }
      })
      console.log(res)
      if (res.ok) {
        const data = await res.json()
        saveAuthToken(data.token)
        // get user details
        const res2 = await fetch(`http://localhost:8080/api/hostel/${type === 'student' ? 'students' : 'admins'}/${id}`, {
          headers: { 'Authorization': `Bearer ${data.token}` }
        })
        if (res2.ok) {
          const data2 = await res2.json()
          console.log(data2)
          const fullUserDetails = { ...(data2.data), type, token: data.token }
          setCurrentUser(fullUserDetails)
          saveUserDetails(fullUserDetails)
          navigate('/dashboard')
        }
      }
      else setErrMsg("Invalid credentials")
    } catch (error) {
      console.log(error)
      setErrMsg(error.message)
    }
  }

  return (
    <>
      <h2><b>Login</b></h2>
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
              <tr>
                <td>
                  <label htmlFor="userTypeInput">User Type:</label>
                </td>
                <td>
                  <select name="userTypeInput" id="userTypeInput" defaultValue={""}>
                    <option value="" disabled hidden>--select user type--</option>
                    <option value="student">Student</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
          <button className='btn btn-outline-primary mt-2'>Submit</button>
        </form>
      </div>
      {errMsg && <p>{errMsg}</p>}
    </>
  )
}

export default Login