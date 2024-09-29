import React, { useRef } from 'react'
import {TextField} from '@mui/material'
import {  signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../Config/firebase/Firebaseconfig';
import {Button} from '@mui/material'
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const emailRef =useRef(null)
 const passwordRef=useRef(null)
 const navigate=useNavigate()
 const hanldesubmit =(event)=>{
  event.preventDefault()
  
  const email = emailRef.current.value;
  const password = passwordRef.current.value;
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log(user);
    navigate('/dashboard')
  })
  .catch((error) => {
    const errorMessage = error.message;
    console.log(errorMessage);
    
  });







  console.log('Email', email);
  console.log('Password', password);
  
 }

  return (
    <>
    <div style={{
      display: 'flex',
      
      justifyContent : 'center'

    }}>
      <h1>Login</h1>
<div style={{
  display:'flex',
  justifyContent:'center',
  
  margin:'50px'
}}>

<form onSubmit={hanldesubmit}>

<TextField id="standard-email" type='email' label="Email" variant="standard"  inputRef={emailRef}/><br /><br />
<TextField id="standard-password" type='password' label="Password" variant="standard" inputRef={passwordRef}/><br /><br />
<Button variant="contained" type='submit'>Login</Button>
</form>
</div>
    </div>
    
    </>
  )
}

export default Login