import React, { useState, useContext} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { BACKEND_URL } from "../constants";
import axios from "axios";

export default function LoginCard() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
      axios.post(`${BACKEND_URL}/api/auth/login`, {
          email: email,
          password: password
      }).then((response) => {
          console.log(response);

          localStorage.setItem("access_token", response.data.access);
          localStorage.setItem("refresh_token", response.data.refresh);

          axios.post(`${BACKEND_URL}/api/auth/ping`, {}, {
            headers: {
              'content-type': 'application/json',
              'Authorization': 'Bearer ' + JSON.stringify(localStorage.getItem("access_token"))
            }
          }).then((response) => {
            console.log(response);
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status == 401) {
            axios.post(`${BACKEND_URL}/api/auth/token/refresh/`, {refresh: localStorage.getItem("refresh_token")})
            .then((response) => {
              console.log(response);
              localStorage.setItem("access_token", response.data.access);
            })
            .catch((err) => {
              console.log(err);
              

              // Handle refresh token expiration
              
            })
          }
        });
    })
    .catch((err) => {
        console.log(err);
    });
  }

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit} className="login-form">
        <Form.Group size="lg" controlId="email" className="login-email-box">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password" className="login-password-box">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button block size="lg" type="submit" disabled={!validateForm()}>
          Login
        </Button>
      </Form>
    </div>
  );
}