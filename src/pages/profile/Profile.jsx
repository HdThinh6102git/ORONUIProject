import "./profile.scss"
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ProfilePost from "../../components/profilePost/ProfilePost";
import { useLocation } from "react-router-dom";
import { makeRequest } from "../../axios";
import {  useQuery } from 'react-query';
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
const Profile = () => {
  const {currentUser} = useContext(AuthContext);
  const userId = parseInt(useLocation().pathname.split("/")[2])
  const { isLoading, error, data } = useQuery("user", () =>
        makeRequest.get("user/" + userId).then(( res)=>{
            return res.data;
        })
    );
  
  return (
   
    <div className="profile">
     
      {isLoading ? "loading": <>
      <div className="images">
        <img src={data.coverPic}
        alt="" 
        className="cover" />
        <img src={data.profilePic}
        alt="" 
        className="profilePic" />
      </div>
      <div className="profileContainer">
            <div className="uInfo">
                  <div className="left">
                        <a href="http://facebook.com">
                          <FacebookTwoToneIcon fontSize="large" />
                        </a>
                        <a href="http://facebook.com">
                          <InstagramIcon fontSize="large" />
                        </a>
                        <a href="http://facebook.com">
                          <LinkedInIcon fontSize="large" />
                        </a>
                  </div>
                  <div className="center">
                      <span>{data.displayName}</span>
                      <div className="info">
                          <div className="item">
                            <PlaceIcon/>
                            <span>Vietnam</span>
                          </div>
                          <div className="item">
                            <LanguageIcon/>
                            <span>{data.displayName}.dev</span>
                          </div>
                      </div>
                      {userId === currentUser.id ? (<button>Update</button>) : <button>follow</button>}
                  </div>
                  <div className="right">
                      <EmailOutlinedIcon/>
                      <MoreVertIcon/>
                  </div>
            </div>
            <ProfilePost userid={userId}/>
      </div>
      </> }
      
    </div>
  );
};

export default Profile