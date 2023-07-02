import "./rightbar.scss"

import { makeRequest } from "../../axios";
import {  useQuery} from 'react-query'
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import {  useMutation, useQueryClient } from 'react-query'
import moment from 'moment';

const RightBar = () => {
  const {currentUser} = useContext(AuthContext)
  const inputAccept = {
    status: 2
  }
  const inputsReceived = {
    status: 3
  }
    // const {
    //   isLoading: loadingOwner,
    //   error: errorOwner,
    //   data: ownerData,
    // } = useQuery(['owner',1], () =>
    // makeRequest.get("postregister/forowner/" + currentUser.id)
    //     .then((res) => res.data)
    // );
    const {
      isLoading: loadingOther,
      error: errorOther,
      data: otherData,
    } = useQuery(['other',1], () =>
    makeRequest.get("postregister/byuserid/" + currentUser.id)
        .then((res) => res.data)
    );


    const {
      isLoading: loadingOwner,
      error: errorOwner,
      data: ownerData,
    } = useQuery(
      ['owner', 'other', 1],
      () =>
      makeRequest.get("postregister/forowner/" + currentUser.id)
          .then((res) => res.data),
      {
        enabled: otherData && Object.keys(otherData).length > 0,
      }
    );
    //delete button 
    const queryClient = useQueryClient();
    const deleteMutation = useMutation(
      (registerid) => {
        
        return makeRequest.delete("/postregister/" + registerid);
      },
      {
        onSuccess : () =>{
            queryClient.invalidateQueries(['other', 1])
            queryClient.invalidateQueries(['owner', 'other', 1])
            
        },
      }
    );
    const handleDelete= (event) => {
      
      deleteMutation.mutate(event.currentTarget.id)
    };



    //handle accept 
    

    const acceptMutation = useMutation(
      ([postid, registerId]) => {
        deleteMutation.mutate(registerId)
        return makeRequest.put("post/updatestatus/" + postid,inputAccept);
      },
      {
        onSuccess : () =>{
          queryClient.invalidateQueries(['other', 1])
          queryClient.invalidateQueries(['owner'])
          queryClient.invalidateQueries(["posts"])
           
        },
      }
    );
    const handleAccept = (event)=>{
        acceptMutation.mutate([event.currentTarget.getAttribute("data-id"),event.currentTarget.getAttribute("data-key") ]);
        

    }

    //handle received
    const receivedMutation = useMutation(
      ([postid, registerId]) => {
        
        deleteMutation.mutate(registerId)
        return makeRequest.put("post/updatestatus/" + postid,inputsReceived);
      },
      {
        onSuccess : () =>{
            
          queryClient.invalidateQueries(['other', 1])
          queryClient.invalidateQueries(["posts"])
          
        },
      }
    );
    const handleReceived = (event)=>{
      receivedMutation.mutate([event.currentTarget.getAttribute("data-id"), event.currentTarget.getAttribute("data-key") ])
      // console.log("postId" + event.currentTarget.getAttribute("data-id"));
      // console.log("registerId"+ event.currentTarget.getAttribute("data-key"));
    }

    
  return (
    <div className="rightBar">
      <div className="container">
        {/* First item */}
        <div className="item">
          <span>Registrations For Your Posts</span>
          {errorOwner
                ?"Something went wrong"
                  : loadingOwner
                    ? "loading"
                      :ownerData.map(
                        (register) =>(
                        <div className="user" key={register.id}>
                          <div className="userInfo">
                            <img src={register.profilePic} alt="" />
                            <span className = "postRegister">
                              <span>User: {register.createdBy}</span>
                              <span>Post's name: {register.description}</span>
                              <span>{moment(register.createdDate).fromNow()}</span>
                            </span>
                          </div>
                          <div className="buttons">
                            <button data-key = {register.id} data-id = {register.postId} onClick={handleAccept}>Accept</button>
                            <button id = {register.id} onClick={handleDelete}  >Dismiss</button>
                          </div>
                      </div>
                      )
                )}     
        </div>
        {/* Second item */}
        <div className="item">
              <span>Your Registrations For Other Posts</span>
             
              
                   
                    
                {
          errorOther
          ?"Something went wrong"
            : loadingOther
              ? "loading"
                : otherData.map(
                  (register) =>(
                  <div className="user" key={register.id}>
                    <div className="userInfo">
                      <img src={register.profilePic} alt="" />
                      <span className = "postRegister">
                        <span>Owner: {register.createdBy}</span>
                        <span>Post's name: {register.description}</span>
                        <span>{moment(register.createdDate).fromNow()}</span>
                      </span>
                    </div>
                    <div className="buttons">
                      <button data-key = {register.id} data-id = {register.postId} onClick={handleReceived}>Received</button>
                      <button id = {register.id} onClick={handleDelete} >Delete</button>
                    </div>
                </div>
                )
           )}
        </div>
        {/* Third Item */}
              {/* <div className="item">
                  <span>Online Friends</span>
                  
                      <div className="user">
                            <div className="userInfo">
                                  <img src={ProfileImg} alt="" />
                                  <div className="online"/>
                                  <span>Minh Nhat</span> 
                            </div>
                      </div>
                
              </div> */}
      </div>
    </div>
  )
}

export default RightBar