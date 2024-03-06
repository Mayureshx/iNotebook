import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = (props) => {

 const host ="http://localhost:5000"

 const [credentials, setCredentials] = useState({email:"", password:"" });

 //Its used to navigate through components path
   let navigate = useNavigate();

 const onChange =(e)=>{

    //let properties of "...note" (Spread Operator) intact and overide or add the properties of "[e.target.name] : e.target.value"
    setCredentials({...credentials,[e.target.name] : e.target.value})
}


    const handleSubmit= async(e) =>{
        e.preventDefault();

        const response = await fetch(`${host}/api/auth/login`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
      
            headers: {
              "Content-Type": "application/json"
              
            },
            body: JSON.stringify({ email :credentials.email, password : credentials.password })
          });
      
          const json = await response.json();
          console.log(json);

          if(json.success)//if Successfully login and returns "authToken"
          {
            localStorage.setItem("token",json.authToken)//Save "authToken" to localstorage
            props.showAlert("Logged In Successfully!!!","success")
            navigate("/");//navigate to "/" path which is "Home" after login
            
        }
        
        else{
           props.showAlert("Invalid Details","danger")
        }

    }
    return (
        <div className='mt-3'>
             <h2>Please Login to use iNotebook</h2>
            
            <form onSubmit={handleSubmit}>
           
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" name='email' id="email" aria-describedby="emailHelp" value={credentials.email} onChange={onChange} />
                <div id="emailHelp" className="form-text" >We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" name='password' id="password" value={credentials.password} onChange={onChange}/>
            </div>

            <button type="submit" className="btn btn-primary" >Submit</button>
        </form>
        </div>
    )
}

export default Login