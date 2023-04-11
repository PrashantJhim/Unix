import './signup.css'
import { useState } from "react"
import { passwordStrength } from 'check-password-strength'
const Signup = () =>{
    const validator = require("email-validator")
    const [Confirm,ChangeConfirm] = useState(false)
    const [EmailChk,ChangeEmailCheck] = useState(false)
    const [Fullname,ChangeFulln] = useState(false)
    const [FullStr,ChangePassCheck] = useState(false)
    const ConfirmPassword = () =>{
        const Password1 = document.getElementById("Pass1").value 
        const Password2 = document.getElementById("Pass2").value 
        if (Password1 == Password2 ){
            document.getElementById("Pass2").style.borderBottomColor = "green"
            ChangeConfirm(true)
        }
        if (Password1 != Password2){
            ChangeConfirm(false)
        }
    }


    

    const StrongPassword = () =>{
        const password = document.getElementById("Pass1").value;
        const passwordHint = document.getElementById("passwordHint");
        const uppercaseRegex = /[A-Z]/;
        const lowercaseRegex = /[a-z]/;
        const numberRegex = /\d/;
        const specialCharRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
        
        let hint = "";
        if (password.length < 8) {
          hint = "Password must be at least 8 characters long.";
          passwordHint.className = "weak";
          ChangePassCheck(false)
        }
        else if (!uppercaseRegex.test(password)) {
          hint = "Password must contain at least one uppercase letter.";
          passwordHint.className = "weak";
          ChangePassCheck(false)
        }

        else if (!lowercaseRegex.test(password)) {
          hint = "Password must contain at least one lowercase letter.";
          passwordHint.className = "weak";
          ChangePassCheck(false)
        }
        else if (!numberRegex.test(password)) {
          hint = "Password must contain at least one number.";
          passwordHint.className = "medium";
          ChangePassCheck(true)
        }

        else if (!specialCharRegex.test(password)) {
          hint = "Password must contain at least one special character.";
          passwordHint.className = "medium";
          ChangePassCheck(true)
        }
        else {
          hint = "Password is strong.";
          passwordHint.className = "strong";
          ChangePassCheck(true)
        }
      
        
        passwordHint.innerHTML = hint;
    }

    const EmailCheck = async() =>{
        const Email = document.getElementById("Email").value
        const Request = await fetch('/CheckUser',{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
                Email:Email
            })
        })
        const Response = await Request.json()
       
        const List = Response
        const Validate = validator.validate(Email)
       
       if ( Validate == false){
        ChangeEmailCheck(false)
        console.log("im")
        document.getElementById("Email").style.borderBottomColor = "crimson"
       }
       if ( Validate == true){
        ChangeEmailCheck(false)
        document.getElementById("Email").style.borderBottomColor = "green"

        if (List.status == false){
            ChangeEmailCheck(false)
            document.getElementById("Email").style.borderBottomColor = "crimson"
           }
           if (List.status == true ){
            ChangeEmailCheck(true)
            document.getElementById("Email").style.borderBottomColor = "green"
           }   
       }

    }

    const FullNameCheck = async() =>{
       
       
        const value = document.getElementById("FullName").value
        if (value.length >= 0  && value.length <=8 ){
            document.getElementById("FullName").style.borderBottomColor = "green"
            ChangeFulln(true)
        }
        if (value.length > 8){
            document.getElementById("FullName").style.borderBottomColor = "crimson"
            ChangeFulln(false)
        }
        
    }

    const ShowPassword = () =>{
        const Show  = document.getElementById("show").checked
        const Value1 = document.getElementById("Pass1").type
        const Value2 = document.getElementById("Pass2").type
        if (Value1 == "password" && Value2 == "password" && Show == true){
            document.getElementById("Pass2").type = "text"
            document.getElementById("Pass1").type = "text"
        }
        if (Value1 != "password" && Value2 != "password" && Show == false){
            document.getElementById("Pass2").type = "password"
            document.getElementById("Pass1").type = "password"

        }
    }
    const RegisterData = async() =>{
        const Checkd = document.getElementById("admincheck").checked
        ConfirmPassword()
        FullNameCheck()
        StrongPassword()
        EmailCheck()

        if (Confirm == true && Fullname == true && FullStr == true && EmailChk == true){
            const Request = await fetch('/Register',{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({
                    FullName:document.getElementById("FullName").value,
                    Password:document.getElementById("Pass1").value,
                    Email:document.getElementById("Email").value,
                    Type:Checkd
                })
            })
            const Response =  await Request.json()
            if (Response.status == true){
                alert("Your are Registered")
            }
        }
        if (Confirm == false){
            alert("Passwords Donot Match")
        }
        if (Fullname == false){
            alert("FullName is not valid")
        }
        if (FullStr == false){
            alert("Password is not Strong")
        }
        if (EmailChk == false){
            alert("Email is not Valid")
        }

    }
    return (
        <div>
           <div id = "SignupContainer">
            <h1>Signup</h1>
           <h2>FullName</h2>
            <input onChange={FullNameCheck} id ="FullName" type = "text" placeholder="Enter The FullName"/>
            <h2>Email</h2>
            <input onChange={EmailCheck} id ="Email" type = "text" placeholder="Enter The Email"/>
            <h2>Password</h2>

            <input onChange={StrongPassword} id = "Pass1" type="password" />
           <p id="passwordHint"></p>
            <h2>Confirm Password</h2>
            <input onChange = {ConfirmPassword} id = "Pass2" type =  "password" placeholder="Confirm The Password"/>
            <div id = "ShowContainer">
                <input  id = "show" onChange={ShowPassword} type = "checkbox" / >
                    <p>Show Password</p>
            </div>
            <div id = "CheckedContainer">
                <input id="admincheck" type = "checkbox" / >
                    <p>Admin</p>
            </div>
            <button  onClick = {RegisterData} id = "RegisterButton">Register</button>
           </div>
            
        </div>
    )
}
export default Signup