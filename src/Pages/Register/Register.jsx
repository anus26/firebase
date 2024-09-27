import React, { useRef, useState } from 'react'
import {  createUserWithEmailAndPassword } from "firebase/auth";
import {TextField} from '@mui/material'
import {Button} from '@mui/material'
import { auth,db } from '../../Config/firebase/Firebaseconfig';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc,getDocs } from "firebase/firestore";
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { getStorage, ref, uploadBytes ,getDownloadURL} from "firebase/storage";


const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});












const Register = () => {
  const navigate=useNavigate()
  const nameRef=useRef(null)
  const emailRef =useRef(null)
 const passwordRef=useRef(null)
const storage=getStorage()


const hanldesubmit=async(event)=>{
  event.preventDefault()
  const    name   = nameRef.current.value
  const email = emailRef.current.value;
  const password = passwordRef.current.value;
  



                                            
     try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log(user);
      navigate('/login')

















      
      // Add user data to Firestore
      const docRef = await addDoc(collection(db, "users"), {
        name: name,
        email: email,
        userId: user.uid
         


      });
      console.log("Document written with ID: ",  docRef.id);
    
    } catch (error) {
      console.error("Error: ", error.message);

    }
    
const querySnapshot = await getDocs(collection(db, "users"));
querySnapshot.forEach((doc) => {
  console.log(`${doc.id} => ${doc.data()}`);
});




  // 'file' comes from the Blob or File API


  
   console.log('Name',name);
   
  console.log('Email', email);
  console.log('Password', password);
  
 }


 const handleFileUpload=async(event)=>{
  const file=event.target.files[0]
  if (!file) return
    
  const storageRef=ref(storage,`image/${emailRef.current.value}/${file.name}`)
  try{
    const snapshot=await uploadBytes(storageRef,file)
    const downloadURL=await getDownloadURL(snapshot.ref)
    console.log('File ha:',downloadURL);
    
  }catch(error){
    console.log(error);
    
  }
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





    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
    >
      Upload files
      <VisuallyHiddenInput
        type="file"
        onChange={handleFileUpload}
        multiple
        
      />
    </Button>
  <br /><br />











<Button variant="contained" type='submit'>Register</Button>
</form>
</div>
  </div>
    
    </>
  )
}

export default Register








