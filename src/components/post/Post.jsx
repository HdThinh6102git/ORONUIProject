import "./post.scss"
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import { useState } from "react";
import { Button } from "@mui/material";
import {  useMutation, useQueryClient } from 'react-query'
import { makeRequest } from "../../axios";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import moment from 'moment';
import { pink } from "@mui/material/colors";
const Post = ({post}) => {
  var status = "Available";
  if(post.status === 1){
      status = "Available"
  }else if(post.status === 2){
    status = "Transfering"
  }else if(post.status === 3){
    status = "Received"
  }
  const [commentOpen, setCommentOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  
  const {currentUser} = useContext(AuthContext);
  const [err, setErr] = useState(null);
  const [succ, setSucc] = useState(null);
  const inputs = {
    postId : post.id, 
    userId : currentUser.id
  }
  const [inputsUpdatePost, setInputsUpdatePost]=useState({
    description: post.description,
    displayScope: post.displayScope, 
    pictures: post.pictures, 
    status: post.status,
    numberReaction: post.numberReaction
  }) ;
  
  
  
  var liked = false;
  const queryClient = useQueryClient();
  const deleteMutation = useMutation(
    (postId) => {
      
      return makeRequest.delete("/post/" + post.id);
    },
    {
      onSuccess : () =>{
          queryClient.invalidateQueries(["posts"])
      },
    }
  );
  const handleDelete = () => {
    deleteMutation.mutate(post.id)
  };
  

  const registerMutation = useMutation(
    (postId) => {
      
      return makeRequest.post("/postregister", inputs);
    },
    {
      onSuccess : () =>{
          setSucc("Register successfully")
          queryClient.invalidateQueries(['other', 1])
      },
      onError: (err) => {
          
          setErr(err.response.data);
      },
    }
  );
  const handleRegister = () => {
    registerMutation.mutate(post.id);
  };
  //handle like button
  const likeMutation = useMutation(
    (postId) => {
      
      return makeRequest.put("/post/"+ postId, inputsUpdatePost);
    },
    {
      onSuccess : () =>{
        console.log("Success")
        queryClient.invalidateQueries(["posts"])
      },
      onError: (err) => {
          
          setErr(err.response.data);
      },
    }
  );
  const handleLike = (event) => {
    var newNumberReaction = post.numberReaction + 1
    liked = true
    setInputsUpdatePost(prev =>({...prev, numberReaction : newNumberReaction }))
    likeMutation.mutate(event.currentTarget.id)
    
  };


 

  return (
    <div className="post">
      <div className="container">
              <div className="user">
                    <div className="userInfo">
                        <img src={post.profilePic} alt="" />
                        <div className="details">
                          <Link
                              to={`/profile/${post.userId}`}
                              style={{ textDecoration: "none", color: "inherit" }}
                            >
                            <span className="name">{post.createdBy}</span>
                          </Link>
                          <span className = "date">{moment(post.modifiedDate).fromNow()}</span>

                          <Button onClick={handleRegister} >Register</Button>
                          <span>Status: {status}</span>
                          <div> {succ && succ}</div>
                         
                          {err && err}
                        </div>
                    </div>
                    
                    <MoreHorizIcon onClick = {()=> setMenuOpen(!menuOpen)}/>
                    {menuOpen && <Button onClick={handleDelete} >delete</Button>}
                </div>
                <div className="content">
                  <p>{post.description}</p>
                  <img src={post.pictures} alt="" />
                </div>
                <div className="info">
                    <div className="item" id = {post.id} onClick = {handleLike}>
                        {liked ? <FavoriteOutlinedIcon style = {{color : "red"}}  /> : <FavoriteBorderOutlinedIcon/>}
                        {post.numberReaction}
                    </div>
                    <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
                        <TextsmsOutlinedIcon/>     
                         Comments
                    </div>
                    <div className="item">
                       <ShareOutlinedIcon/>
                       Share
                    </div>
                </div>
                {commentOpen && <Comments postId = {post.id}/>}
      </div>
    </div>
  )
}

export default Post