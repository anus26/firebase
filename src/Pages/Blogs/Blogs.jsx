// import React, { useState } from 'react'

// const Blogs = () => {
//   const [counter, setCounter]=useState(0)
//   return (
// <>
// <h1>hello world{counter}</h1>
// <button onClick={()=>setCounter(counter+1)}>add</button>
// <button onClick={()=>setCounter(counter-1)}>less</button>
// {counter < 10 ? <p>bach ho</p> : counter > 10 ? <p>Han bhai 1000 dedo</p> : <p>AAja bhai</p>}
// </>
//   )
// }

// export default Blogs












































// import React, { useEffect, useState } from 'react'

// const Blogs = () => {
//   const [products,setProducts] = useState([]);
//   useEffect(() => {
//     fetch('https://dummyjson.com/products')
//       .then(res => res.json())
//       .then(res => {
//         console.log(res.products);
//         setProducts(res.products)
//       });
//   }, [])
//   return (
//     <div>
//       {products.length > 0 ? products.map(item => {
//         if () {
          
//         }else{

//         }
//       }) : <h1>loading..</h1>}
//     </div>
//   )
// }

// export default Blogs


import React, { useRef } from 'react'
import { Card, CardActions,AvatarGroup,Avatar,Box} from "@mui/material";
import { CardContent } from "@mui/material";
import { Typography } from "@mui/material";
import  FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import { IconButton } from "@mui/material";
import { Button } from '@mui/material';
import { TextField } from '@mui/material';
import { auth } from '../../Config/firebase/Firebaseconfig';
import {getAuth, updatePassword , reauthenticateWithCredential,EmailAuthProvider} from 'firebase/auth';
const Blogs = () => {
const oldpasswordRef=useRef(null)
const passwordRef=useRef(null)
const repeatpasswordRef=useRef(null)


const handlesubmit=async(event)=>{
  event.preventDefault()
  
  const oldPassword = oldpasswordRef.current.value;
  const newPassword = passwordRef.current.value;
  const repeatPassword = repeatpasswordRef.current.value;
  
oldpasswordRef.current.value=''
passwordRef.current.value=''
repeatpasswordRef.current.value=''
if (newPassword !== repeatPassword) {
  console.log('new password do not match');
  return;
  
}

const user = auth.currentUser;
if (user) {
  
  const credential = EmailAuthProvider.credential(
    user.email,
    oldPassword
  );
  reauthenticateWithCredential(user, credential)
  .then(() => {
    updatePassword(user, newPassword).then(() => {
      console.log('new password update successfully');
      
    }).catch((error) => {
      console.log('error update password',error);
      
    });
  }).catch((error) => {
 console.log('error reauthenticate', error);
 
});
} else {
  console.log('not user singin');
  
}

console.log();

}

  return (
    <>
<div style={{
  display:'flex',
  justifyContent:"center"
}}>
<Card
      variant="outlined"
      sx={{
        width: 420,
        margin:"20px",
        padding:'30px',
        // to make the card resizable
        overflow: 'auto',
        resize: 'horizontal'
        ,

      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Avatar src="/static/images/avatar/1.jpg" size="lg" />
    
      </Box>
      <CardContent>
        <Typography level="title-lg">Password</Typography>

 
      </CardContent>
      <form onSubmit={handlesubmit}>
<TextField id="standard-Old Password" type='password' label="Old Password" variant="standard" inputRef={oldpasswordRef} /><br /><br />
<TextField id="standard-New Password" type='password' label="New Password" variant="standard" inputRef={passwordRef} /><br /><br />
<TextField id="standard-Repeat Password" type='password' label="Repeat Password" variant="standard" inputRef={repeatpasswordRef} /><br /><br />

<Button size="lg" type='submit'>Update Password</Button>
      </form>
      {/* <CardActions buttonFlex="0 1 120px">
        <IconButton variant="outlined" color="neutral" sx={{ mr: 'auto' }}>
          <FavoriteBorder />
        </IconButton>
        <Button variant="outlined" color="neutral">
          View
        </Button>
        <Button variant="solid" color="primary">
          Join
        </Button>
      </CardActions> */}
    </Card>
    </div>
    </>
  )
}

export default Blogs

