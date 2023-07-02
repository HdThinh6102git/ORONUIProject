import { useState } from "react"
import "./register.scss"
import { Link } from "react-router-dom"
import axios from 'axios';

const Register = () => {
  const [inputs, setInputs] = useState({
    userName: "", 
    password: "",
    displayName:"",
    emailAddress:"",
    phoneNumber:"",
    address:""
  })

  const [err, setErr] = useState(null);

  const handleChange = e=>{
    setInputs(prev =>({...prev, [e.target.name] : e.target.value }));
  };

  const handleClick = async e =>{
      e.preventDefault()
      try {
        await axios.post("http://localhost:8081/api/register", inputs);

      } catch (err) {
        setErr(err.response.data);
      }
  };
  

  
  return (
    <div className="register">
      <div className="card">
            <div className="left">
                    <h1>ORON</h1>
                    <p>
                     
                      Our redundances other necessaries.
                    </p>
                    <span>Don't you have an account?</span>
                    <Link to="/login">
                    <button>Login</button>
                    </Link>
                    
            </div>
            <div className="right">
                  <h1>Register</h1>
                  <form >
                    <input type="text" placeholder="Username" name = "userName" onChange={handleChange}/>
                    <input type="password" placeholder="Password" name = "password" onChange={handleChange}/>
                    <input type="text" placeholder="Display name" name = "displayName" onChange={handleChange}/>                  
                    <input type="email" placeholder="Email address"  name = "emailAddress" onChange={handleChange}/>
                    <input type="text" placeholder="Phone number"  name = "phoneNumber" onChange={handleChange}/>
                    <input type="text" placeholder="Address"  name = "address" onChange={handleChange}/>
                    {err && err}
                    <button onClick={handleClick}>Register</button>
                  </form>
            </div>
      </div>
    
    </div>
  )
}

export default Register