import React, { useRef } from 'react'
import {TextField} from '@mui/material'
import { Email, Password } from '@mui/icons-material'
import {  createUserWithEmailAndPassword } from "firebase/auth";
import {Button} from '@mui/material'
import { auth } from '../../Config/firebase/Firebaseconfig';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const navigate=useNavigate()
  const nameRef=useRef(null)
  const emailRef =useRef(null)
 const passwordRef=useRef(null)
  const hanldesubmit =(event)=>{
  event.preventDefault()
  const    name   = nameRef.current.value
  const email = emailRef.current.value;
  const password = passwordRef.current.value;
  
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log(user);
    navigate('/login')
    
  })
  .catch((error) => {
  
    const errorMessage = error.message;
    console.log(errorMessage);
    
    
  });





  
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
<Button variant="contained" type='submit'>Register</Button>
</form>
</div>
  </div>
    
    </>
  )
}

export default Login