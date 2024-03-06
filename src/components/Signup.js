import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {

    const host ="http://localhost:5000"

    const [credentials, setCredentials] = useState({name :"", email:"", password:"" ,cpassword : ""});
   
    //Its used to navigate through components path
      let navigate = useNavigate();
   
    const onChange =(e)=>{
   
       //let properties of "...note" (Spread Operator) intact and overide or add the properties of "[e.target.name] : e.target.value"
       setCredentials({...credentials,[e.target.name] : e.target.value})
   }
   
   
       const handleSubmit= async(e) =>{
           e.preventDefault();//prvent lodaing of page
   
           const {name, email,password} = credentials;
           const response = await fetch(`${host}/api/auth/createuser`, {
               method: "POST", // *GET, POST, PUT, DELETE, etc.
         
               headers: {
                 "Content-Type": "application/json"
                 
               },
               body: JSON.stringify({name ,email,password })
             });
         
             const json = await response.json();
             console.log(json);
   
             if(json.success)//if Successfully signip and returns "authToken"
             {
               localStorage.setItem("token",json.authToken)//Save "authToken" to localstorage
               navigate("/");//navigate to "/" path which is "Home" after login
               props.showAlert("Account Created Successfully!!!","success")
             }
             
             else{
                props.showAlert("Invalid Details","danger")
             }
            } 


  return (
    <div className='container mt-3'>
             <h2 className='my-3'>Please Signup to use iNotebook</h2>
        <form onSubmit={handleSubmit}>
    <div className="my-3">
        <label htmlFor="name" className="form-label">Name</label>
        <input type="text" className="form-control" name='name' id="name" aria-describedby="emailHelp" value={credentials.name} onChange={onChange}  />
        
    </div>

    <div className="mb-3">
        <label htmlFor="email" className="form-label">Email address</label>
        <input type="email" className="form-control" name='email' id="email" aria-describedby="emailHelp" value={credentials.email} onChange={onChange}  />
        <div id="emailHelp" className="form-text" >We'll never share your email with anyone else.</div>
    </div>

    <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input type="password" className="form-control" name='password' id="password" value={credentials.password} onChange={onChange} required minLength={5}/>
    </div>

    <div className="mb-3">
        <label htmlFor="cpassword" className="form-label">Confirm Password</label>
        <input type="password" className="form-control" name='cpassword' id="cpassword" value={credentials.cpassword} onChange={onChange} required minLength={5}/>
    </div>

    <button type="submit" className="btn btn-primary" >Submit</button>
</form>
</div>
  )

}

export default Signup;