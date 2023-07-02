
import { makeRequest } from "../../axios";
import Post from "../post/Post";
import "./profilePost.scss"

import {  useQuery } from 'react-query'


const ProfilePost = ({userid}) => {
        
    //TEMPORARY
    const { isLoading, error, data } = useQuery(['posts'], () =>
        makeRequest.get("post/profile/" + userid ).then(( res)=>{
            return res.data;
        })
    );
    
        return (
                <div className="posts">
                    {error 
                        ? "Something went wrong" 
                        :isLoading 
                            ? "loading" 
                            : data.map((post)=>(<Post post={post} key={post.id}/>))
                    }
                </div>
        );
}

export default ProfilePost