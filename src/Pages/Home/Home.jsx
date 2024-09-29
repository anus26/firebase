import React, { useEffect, useState } from 'react'
import { getDocs } from 'firebase/firestore';
import { collection, addDoc } from "firebase/firestore"; 
import { db } from '../../Config/firebase/Firebaseconfig';
import { Card, CardActions,AvatarGroup,Avatar,Box} from "@mui/material";
import { CardContent } from "@mui/material";
import { Typography } from "@mui/material";
import  FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import { IconButton } from "@mui/material";
import { Button } from '@mui/material';
const Home =() => {
  const [blogs,setBlogs]=useState([])

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "blogs"));
        const blogsData = querySnapshot.docs.map(doc => ({
          id: doc.id, // Store the document ID
          ...doc.data() // Store the rest of the document data
        }));
        setBlogs(blogsData); // Set the blogs in state
      
      } catch (error) {
        console.log(error);
      }
      }
     
    fetchBlogs();
  }, []);
   
  
  
  return (
<><h1>All Blogs</h1>
{blogs.length > 0 ? (
        blogs.map((blog) => (
          <div key={blog.id}>
        

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
       
      </Box>
      <CardContent>
        <Typography level="title-lg">{blog.placeholder}</Typography>
        <Typography level="body-sm">
        {blog.comment}
        </Typography>
      </CardContent>
      <CardActions buttonFlex="0 1 120px">
        <IconButton variant="outlined" color="neutral" sx={{ mr: 'auto' }}>
          <FavoriteBorder />
        </IconButton>
        <Button variant="outlined" color="neutral">
          View
        </Button>
        <Button variant="solid" color="primary">
          Join
        </Button>
      </CardActions>
    </Card>
          </div>
        ))
      ) : (
        <h1>Loading...</h1>
      )}


</>
  )
}

export default Home