import axios from "axios";

export const makeRequest = axios.create(
  {
    baseURL: "http://localhost:8081/api/", 
    
    headers: {
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken
      }
  }
);
