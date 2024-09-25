import React, { useRef, useState } from 'react'

import { Button } from '@mui/material';
import { db } from '../../Config/firebase/Firebaseconfig';
import { collection, addDoc } from "firebase/firestore"; 
import TextField from '@mui/material/TextField';
const Dashboard = () => {
  const [blogs,setBlogs]=useState([])
  const PlacholderRef=useRef(null)
  const commentRef=useRef(null)
  const hanldesubmit=async(event)=>{
    event.preventDefault()
  const placeholder=PlacholderRef.current.value
  const comment=commentRef.current.value
  console.log('Placeholder',placeholder);
  console.log('Comment',comment);


  try {
    const docRef = await addDoc(collection(db, "users"), {
     placeholder:placeholder,
     comment:comment
     
    });
    console.log("Document written with ID: ", docRef.id);
    setBlogs((prevBlogs)=>[
      ...prevBlogs,
      {placeholder:placeholder, comment:comment}
    ])
    PlacholderRef.current.value=''
    commentRef.current.value=''
  } catch (e) {
    console.error("Error adding document: ", e);
  }


  
  
  }
  return (
    <>
<div>
  <h1>Dashboard</h1>
<form onSubmit={hanldesubmit}>
  <div>

   
      <TextField
        hiddenLabel
        id="filled-hidden-label-placeholder"
        
        variant="filled"
        size="small"
        inputRef={PlacholderRef}
        placeholder='placeholder'
        />
        <br /><br />

      <TextField
        hiddenLabel
        id="filled-hidden-label-comment"
        
        variant="filled"
        inputRef={commentRef}
        placeholder='comment'
        
      />
      <br />
<br />
    <Button variant="contained" type='submit'>Enter</Button>
        </div>
        
 
    </form>
{blogs . length >0 ? blogs.map ((item ,index)=>{
return(
  <div key={index}
  style={{
    border:'10px soild black',
    margin:'20px',
    padding:'2px'
  }}
>
    <h1>placeholder:{item.placeholder}</h1>
    <h2>comment:{item.comment}</h2>
  </div>
)
}):<h1>loading...</h1>}
    
    </div>
    </>
  )
}

export default Dashboard
