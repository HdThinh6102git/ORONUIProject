
import { makeRequest } from "../../axios";
import Post from "../post/Post";
import "./posts.scss"

import {  useQuery } from 'react-query'


const Posts = () => {
        
    
    const { isLoading, error, data } = useQuery(['posts'], () =>
        makeRequest.get("post").then(( res)=>{
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

export default Posts