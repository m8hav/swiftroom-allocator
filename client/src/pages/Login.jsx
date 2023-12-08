import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function Login() {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    console.log("Login page")
    if (currentUser) navigate('/dashboard')
  }, [])

  const handleSubmit = (e) => {

    e.preventDefault();

    for (let index in Array.from(e.target)) {
      if (!e.target[index].value && e.target[index].tagName.toLowerCase() != "button") {
        const errorMessage = "Please enter values in all inputs"
        console.log(errorMessage);
        setErrMsg(errorMessage);
        return;
      }
    }

    console.log("ID: " + e.target[0].value)
    console.log("Password: " + e.target[1].value)
    console.log("User Type: " + e.target[2].value)

    setErrMsg("")

    setCurrentUser({
      uid: "1",
      name: e.target[0].value,
      type: e.target[2].value,
      phone: "1234567890",
      email: "bart@gmail.com",
      city: "Mumbai",
      state: "Maharashtra",
      batch: "2020",
      course: "B.E.",
      branch: "CSE",
      hosteller: false,
      room: "101",
    })

    navigate('/dashboard');
  }

  return (
    <>
      <h2>Login page</h2>
      <div className='border-solid border-2 flex align-center justify-center'>
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
          <button>Submit</button>
        </form>
      </div>
      {errMsg && <p>{errMsg}</p>}
    </>
  )
}

export default Login