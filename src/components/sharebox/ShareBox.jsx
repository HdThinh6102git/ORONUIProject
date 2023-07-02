import"./shareBox.scss"
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import PermMediaIcon from '@mui/icons-material/PermMedia';
import LabelIcon from '@mui/icons-material/Label';
import PlaceIcon from '@mui/icons-material/Place';
import MoodIcon from '@mui/icons-material/Mood';
import { useState } from "react";
import {  useMutation, useQueryClient } from 'react-query'

import { makeRequest } from "../../axios";
export default function Share() {
    const {currentUser} = useContext(AuthContext);
    
    const [inputs, setInputs] = useState({
      description: "", 
      pictures:"", 
      userId: currentUser.id

    })
    const [err, setErr] = useState(null);
    const handleChange = e=>{
      setInputs(prev =>({...prev, [e.target.name] : e.target.value }));
    };

    //add post with react mutation 
              const queryClient = useQueryClient();
              const addMutation = useMutation(
              (inputs) => {
                
                return makeRequest.post("post", inputs);
              },
              {
                onSuccess : () =>{
                    queryClient.invalidateQueries(["posts"])
                },
              }
            );
            const handleClick = () => {
              addMutation.mutate(inputs)
            };
    //




  //   const handleClick = async e =>{
  //     e.preventDefault()
  //     try {
  //       await makeRequest.post("http://localhost:8081/api/post", inputs);
        
  //     } catch (err) {
  //       setErr(err.response.data);
  //     }
  // };
  const descPlaceHolder = "What's in your mind "+ currentUser.displayName + "?";
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img className="shareProfileImg" src={currentUser.profilePic}  alt="" />
          <input
            placeholder={descPlaceHolder} 
            className="shareInput"
            name = "description"
            onChange={handleChange}
          />
          
        </div>
        <hr className="shareHr"/>
        
        <div className="shareBottom">
            <div className="shareOptions">
                <div className="shareOption">
                    <PermMediaIcon htmlColor="tomato" className="shareIcon"/>
                        <input
                        placeholder="Input link image"
                        className="pictureInput"
                        name = "pictures"
                        onChange={handleChange}
                        />
                    <span className="shareOptionText">Photo or Video</span>
                </div>
                <div className="shareOption">
                    <LabelIcon htmlColor="blue" className="shareIcon"/>
                    <span className="shareOptionText">Tag</span>
                </div>
                <div className="shareOption">
                    <PlaceIcon htmlColor="green" className="shareIcon"/>
                    <span className="shareOptionText">Location</span>
                </div>
                <div className="shareOption">
                    <MoodIcon htmlColor="goldenrod" className="shareIcon"/>
                    <span className="shareOptionText">Feelings</span>
                </div>
            </div>
            {err && err}
            <button className="shareButton" onClick={handleClick}>Share</button>
        </div>
      </div>
    </div>
  );
}