import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function App() {
  const [posts, setPosts] = useState(null)
  const [user,setUser] = useState(null)

  const cfnamRef = useRef()
  const clnamRef = useRef()
  const lfnamRef = useRef()
  const llnamRef = useRef()
  const postRef = useRef()


  const postReload = ()=>{
    const t = fetch("http://hyeumine.com/forumGetPosts.php?page=1").then(response => response.json()).then(
      (data)=>{
        setPosts(data)
        console.log(data);

      });
    console.log(t)
  }
  useEffect(()=>{
   postReload();
  },[])

  const newUser = ()=>{
    axios.post("http://hyeumine.com/forumCreateUser.php", {
      username: cfnamRef.current.value,
      password: clnamRef.current.value,
    }, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
      })
      .then(response=> setUser(response.data))
  }

  const loginUser = ()=>{
    axios.post("http://hyeumine.com/forumLogin.php",{
      username: lfnamRef.current.value,
      password: llnamRef.current.value,
    },
    {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
    }
  )
  .then(function (response) {
    if(response.status==200 && response.statusText=="OK"){
      // do something...
     //console.log(response.data)
     setUser(response.data.user)
    }
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  }

  const postAPost = ()=>{
    axios.post("http://hyeumine.com/forumNewPost.php", {
      id: user.id,
      post: postRef.current.value,
    }, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
      })
      .then((response)=> {
        console.log(response.data);
        postReload();
      })
  }
  const replyAPost = (postid)=>{
    axios.post("http://hyeumine.com/forumReplyPost.php", {
      user_id: user.id,
      post_id: postid,
      reply: document.getElementById("reply-"+postid).value,
    }, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
      })
      .then((response)=> {
        console.log(response.data)
        postReload()
      })
  }


  

  return (
    <>

    <h1>Silence is Golden!</h1>
    <h4>Welcome : {user!=null? user.id: "Unknown"}</h4>
    <input type="text" ref={cfnamRef} placeholder='First Name'/>
    <input type="text" ref={clnamRef} placeholder='Last Name'/>
    <Button variant='contained' onClick={newUser}>Create New User</Button><br/>
    
    {user==null?<>
    <input type="text" ref={lfnamRef} placeholder='First Name'/>
    <input type="text" ref={llnamRef} placeholder='Last Name'/>
    <Button variant='contained' onClick={loginUser}>Login User</Button><br/>
    </>:<>
    <input type='text' ref={postRef} placeholder='Post'/>
    <Button variant='contained' onClick={postAPost}>Post a Post</Button>
    </>}
    {
      posts!=null?
          posts.map((post, k)=>{
            return <PostTemplate data={post} key={k} replyPost={replyAPost} />
          }):<p>Looadddingggg dataaaa...</p>}
    </>
  )
}

function PostTemplate(props){
  return <>
    <Card sx={{ minWidth: 300, margin:".3rem", textAlign:"left" }}  >
      <CardContent>
        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
          {props.data.date}
        </Typography>
        <Typography variant="h5" component="div">
          {props.data.user}
        </Typography>
        <Typography variant="body2">
         {props.data.post}
        </Typography>
      </CardContent>
      <CardActions>
        <input type='text' id={"reply-"+props.data.id}/>
        <Button variant="contained" onClick={()=>{props.replyPost(props.data.id)}}>Reply</Button>
      </CardActions>
      {props.data.reply? <>
        {props.data.reply.map((reply,k)=>{
          return <>
            <Card sx={{ minWidth: 290, backgroundColor: "#eee", margin:".2rem", marginLeft:10, textAlign:"left" }}  >
              <CardContent>
                <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                  {reply.date}
                </Typography>
                <Typography variant="h5" component="div">
                  {reply.user}
                </Typography>
                <Typography variant="body2">
                {reply.reply}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions>
              </Card>
          </>
        })}
        
      </>:""}
    </Card>
  </>
}

export default App
