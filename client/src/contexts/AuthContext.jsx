import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {

    setCurrentUser({
      uid: "1",
      name: "Madhav Goyal",
      type: "student",
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

  }, [])

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }} >
      {children}
    </AuthContext.Provider>
  )
}