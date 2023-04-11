import "./login.css"
import { useNavigate } from "react-router-dom"
const Login = () =>{
    const page = useNavigate()
    const login = async()=>{
        const Email = document.getElementById("LgFull").value 
        const Password = document.getElementById("LgPass").value
      
        const Request = await fetch('/Login',{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
                Email:Email,
                Password:Password
            })
        })
        const Response = await Request.json()
        if (Response.status == true){
            page('/Menu')
        }
        if (Response.status == false){
            alert("Invalid Details")
        }
    }
    return(
        <div id = "LoginContainer">
            <h1>Login</h1>
            <h2>Email</h2> 
            <input  id = "LgFull" type = "text" placeholder="Enter The Email"/>    
            <h2>Password</h2>
            <input id = "LgPass" type = "password" placeholder="Enter The Password" />
            <button onClick={login} id = "LgButt">Login</button>
        </div>

    )
}
export default Login