import React, { useRef, useState } from 'react'
import {TextField} from '@mui/material'
import { Email, Password } from '@mui/icons-material'
import {  createUserWithEmailAndPassword } from "firebase/auth";
import {Button} from '@mui/material'
import { auth } from '../../Config/firebase/Firebaseconfig';
import { useNavigate } from 'react-router-dom';
import { db } from '../../Config/firebase/Firebaseconfig';
import { collection, addDoc } from "firebase/firestore"; 

const Login = () => {
  const navigate=useNavigate()
  const nameRef=useRef(null)
  const emailRef =useRef(null)
 const passwordRef=useRef(null)
const hanldesubmit=async(event)=>{
  event.preventDefault()
  const    name   = nameRef.current.value
  const email = emailRef.current.value;
  const password = passwordRef.current.value;
  


                                            
     try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log(user);
      navigate('/login');
      
      // Add user data to Firestore
      const docRef = await addDoc(collection(db, "users"), {
        name: name,
        email: email,
        userId: user.uid


    
      


      });
      console.log("Document written with ID: ",  docRef.id);
    
    } catch (error) {
      console.error("Error: ", error.message,);

    }


    


  
   console.log('Name',name);
   
  console.log('Email', email);
  console.log('Password', password);
  
 }

  return (
    <>
    <div style={{
      display: 'flex',
      justifyContent : 'center'

    }}>
      <h1>Register</h1>
<div style={{
  display:'flex',
  justifyContent:'center',
  
  margin:'50px'
}}>

<form onSubmit={hanldesubmit}>
<TextField id="standard-name" type='name' label="Name" variant="standard"  inputRef={nameRef}/><br /><br />
<TextField id="standard-email" type='email' label="Email" variant="standard"  inputRef={emailRef}/><br /><br />
<TextField id="standard-password" type='password' label="Password" variant="standard" inputRef={passwordRef}/><br /><br />




<input type="file"  />
 
<Button variant="contained" type='submit'>Register</Button>
</form>
</div>
  </div>
    
    </>
  )
}

export default Login