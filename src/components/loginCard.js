import React, { useState, useEffect } from "react";
import { BACKEND_URL } from "../constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CustomAxios from "../utils/customAxios";
import { Notyf } from 'notyf';


export default function LoginCard() {
  
  const notyf = new Notyf();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  function validateForm() {
    return email.length > 0 && password.length > 0;
  }
  
  let navigate = useNavigate()
  
  useEffect(() => {    
    if(localStorage.getItem("refresh_token")) 
    {
      axios.post(`${BACKEND_URL}/api/auth/token/refresh/`, {
        refresh: JSON.parse(localStorage.getItem("refresh_token"))
      }).then((response) => {
        navigate('/ocms/me');
        notyf.success("Already logged in")

      }).catch((err) => {
        console.log(err);
      })
    }
}, []);


  async function h(event) {
    event.preventDefault();
      axios.post(`${BACKEND_URL}/api/auth/token/obtain/`, {
        email: email,
        password: password
      }).then((response) => {
        localStorage.setItem("refresh_token", JSON.stringify(response.data.refresh));
          CustomAxios.post('login', {
            email: email,
            password: password
          }).then((response) => {
            notyf.success("Successfully logged in")
            navigate('/ocms/me')
          })
          .catch((err) => {
            if(!err.response)
            {
              notyf.error("Please wait for the admin to approve")
              localStorage.removeItem("access_token")
              localStorage.removeItem("refresh_token")
            } else {
            notyf.error("Some error occurred")
            console.log(err)
            }
          }) 
      }).catch((err) => {
        console.log(err)
        notyf.error("Email or password incorrect")
      })
    }

  return (
    <div className="Login">
      <form onSubmit={h} className="login-form">
        <div className="form-group">
          Login 
        </div>
        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="lable-form">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          </div>
        <button type="submit"  className="form-button" disabled={!validateForm()}>
          Login
        </button>
      </form>
    </div>
  );
}