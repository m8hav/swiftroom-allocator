import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {

    setCurrentUser(
      {
        uid: "12345",
        name: "Madhav Goyal",
        type: "student", // student or admin
        // other data
      }
    )

  }, [])

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }} >
      {children}
    </AuthContext.Provider>
  )
}