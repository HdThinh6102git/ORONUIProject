import { useContext, useState } from 'react';
import './comments.scss'
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {AuthContext} from "../../context/authContext"
import {  useMutation, useQueryClient } from 'react-query'
import { makeRequest } from "../../axios";
import {  useQuery } from 'react-query';
import { Button } from "@mui/material";
import moment from 'moment';
const Comments = ({postId}) => {
    const [menuOpen, setMenuOpen] = useState(false)
    const {currentUser} = useContext(AuthContext)
    const [contents, setContents] =useState("") ;
    //load comments
    const { isLoading, error, data } = useQuery(['comments'], () =>
        makeRequest.get("comment/" + postId).then(( res)=>{
            return res.data;
        })
    );
    //add comments begin 
    const queryClient = useQueryClient();
              const addMutation = useMutation(
              (newComments) => {
                
                return makeRequest.post("comment", newComments);
              },
              {
                onSuccess : () =>{
                    queryClient.invalidateQueries(["comments"])
                },
              }
            );
const handleClick =  () => {
                
              addMutation.mutate({postId : postId, userId : currentUser.id, content: contents})
              setContents("");
};
    //add comments end
    //delete comment begin 
    
        const deleteMutation = useMutation(
            (commentId) => {
            
            return makeRequest.delete("comment/" + commentId);
            },
            {
            onSuccess : () =>{
                queryClient.invalidateQueries(["comments"])
            },
            }
        );
        const handleDelete = (event) => {
           
            deleteMutation.mutate(event.currentTarget.id)
        };
    //delete comment end 
  return (
    <div className="comments">
        <div className="write">
            <img src={currentUser.profilePic} alt="" />
            <input type='text' 
            placeholder='write a comment' 
            value = {contents}
            onChange = {e => setContents(e.target.value)}/>
            <button onClick={handleClick}>Send</button>
        </div>
        {   error
            ?"Something went wrong" 
            :isLoading
                ? "Loading"
                :data.map(comment =>(
                    <div key = {comment.id} className="comment">
                        <img src={comment.profilePic} alt="" />
                        <div className="info">
                            <div>
                                <span>{comment.createdBy}</span>
                                <MoreHorizIcon onClick = {()=> setMenuOpen(!menuOpen)}/>
                                {menuOpen && <Button onClick={handleDelete} id = {comment.id}  >delete</Button>}
                            </div>
                            
                            <p>{comment.content}</p>
                            
                        </div>
                        
                        <span className = "date">{moment(comment.modifiedDate).fromNow()}</span>
                    </div>
                ))
        }
    </div>
  )
}

export default Comments