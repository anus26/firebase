import React, { useRef, useState ,useEffect} from 'react'
import { Button } from '@mui/material';
import { Card, CardActions,AvatarGroup,Avatar,Box} from "@mui/material";
import { CardContent } from "@mui/material";
import { Typography } from "@mui/material";
import  FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import { IconButton } from "@mui/material";
import { db } from '../../Config/firebase/Firebaseconfig';
import { collection, addDoc } from "firebase/firestore"; 
import TextField from '@mui/material/TextField';
import { doc, deleteDoc , updateDoc} from "firebase/firestore";
import { getDocs } from "firebase/firestore";
import { common } from '@mui/material/colors';
import { useActionData } from 'react-router-dom';

const Dashboard = () => {
  const [blogs,setBlogs]=useState([])
  const [editingblogs,setEditingBlogs]=useState([])
  const PlacholderRef=useRef(null)
  const commentRef=useRef(null)

  useEffect(() => {
    const fetchBlogs = async () => {
      const querySnapshot = await getDocs(collection(db, "blogs"));
      const blogsData = querySnapshot.docs.map(doc => ({
        id: doc.id, // Store the document ID
        ...doc.data() // Store the rest of the document data
      }));
      setBlogs(blogsData); // Set the blogs in state
    };
    fetchBlogs();
  }, []);
  
  const hanldesubmit=async(event)=>{
    event.preventDefault()
  const placeholder=PlacholderRef.current.value
  const comment=commentRef.current.value
  console.log('Placeholder',placeholder);
  console.log('Comment',comment);


  try {
    const docRef = await addDoc(collection(db, "blogs"), {
     placeholder:placeholder,
     comment:comment
     
    });
    console.log("Document written with ID: ", docRef.id);
    setBlogs((prevBlogs)=>[
      ...prevBlogs,
      {placeholder:placeholder, comment:comment, id:docRef.id}
    ])
    PlacholderRef.current.value=''
    commentRef.current.value=''
  } catch (e) {
    console.error("Error adding document: ", e);
  }


  
  
  }


  const handledelete=async(id)=>{
    
    try {
      await deleteDoc(doc(db,'blogs',id))
      setBlogs (prevBlogs=>prevBlogs.filter(blogs=>blogs.id !==id))
    } catch (error) {
      console.log(error);
      
    }
    
 
  
  
  }
  const handleedit =async(id,currentplaceholder,currentcomment)=>{
    const newplaceholder=prompt("Edit placeholder",currentplaceholder)
    const newcomment=prompt("Edit comment",currentcomment)
    if (newplaceholder!==null&& newcomment!==null) {
      
      try {
        await updateDoc(doc(db,'blogs',id),{
        
          placeholder:newplaceholder,
          comment:newcomment
        })
        setEditingBlogs((prevBlogs) =>
          prevBlogs.map(editingblogs =>
            editingblogs.id === id ? { ...editingblogs, placeholder: newplaceholder, comment: newcomment } : editingblogs

          )
        );
  
       console.log('successfully');
       
  
  
  
      } catch (error) {
    console.log(error);
    
      }
    }
    }
  return (
    <>
<div>
  <h1 style={{
    display:'flex',
    justifyContent:"center"
  }}>Dashboard</h1>
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
  <div key={item.id}
 
    
  
>

<Card
      variant="outlined"
      sx={{
        width: 320,
        // to make the card resizable
        overflow: 'auto',
        resize: 'horizontal',
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
        {/* <AvatarGroup size="sm" sx={{ '--Avatar-size': '28px' }}>
          <Avatar src="/static/images/avatar/2.jpg" />
          <Avatar src="/static/images/avatar/3.jpg" />
          <Avatar src="/static/images/avatar/4.jpg" />
          <Avatar>+4K</Avatar> */}
        {/* </AvatarGroup> */}
      </Box>

     
      <CardContent>
        <Typography level="title-lg">{item.placeholder}</Typography>
        <Typography level="body-sm">
          {item.comment}
        </Typography>
      </CardContent>
      <CardActions buttonFlex="0 1 120px">
        <IconButton variant="outlined" color="neutral" sx={{ mr: 'auto' }}>
          <FavoriteBorder />
        </IconButton>
        <Button variant="outlined" color="neutral" onClick={()=>handledelete(item.id)}>
          Delete
        </Button>
        <Button variant="solid" color="primary" onClick={()=>handleedit(item.id,item.placeholder,item.comment
        )}>
          Edit
        </Button>
      </CardActions>
    </Card>
  
  </div>
)
}):<h1>loading...</h1>}
    
    </div>
    </>
  )
}

export default Dashboard
