import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { auth } from "../Config/firebase/Firebaseconfig";
const ProtectedRoutes = ({component}) => {
    const [userLoggedIn,setuserLoggedIn]=useState(false)
    const navigate=useNavigate()
    useEffect(()=>{
        onAuthStateChanged( auth,(user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/auth.user
              console.log(user.uid);
              setuserLoggedIn(true)
              
              // ...
            } else {
             navigate('login')
             
            }
          });
          if (!userLoggedIn) {
            navigate('login')
            
          }
    })
  return (
   <>
   {userLoggedIn? component:null}
   </> 
  )
}

export default ProtectedRoutes