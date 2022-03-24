import React, { useState } from 'react';
import { BACKEND_URL } from '../constants';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

function RegisterCard() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState(0)

  const onLoginFormSubmit = (event) => {
    event.preventDefault();
    console.log(email, password, role)
    axios.post(`${BACKEND_URL}/api/auth/register`, {
            email: email,
            password: password,
            role: role
        }).then(
            result => {
              console.log(result.data)
              console.log("USER created successfully")
            }
    ).catch (error => {
        console.log(error);
    })
  }

  return <div>
    <Form onSubmit={onLoginFormSubmit} method="POST">
      <Form.Group controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          onChange={(event)=>{setEmail(event.target.value)}}
          type="text"
          id="email"
          name="email"/>
      </Form.Group>
      <br/>
      <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          onChange={(event)=>{setPassword(event.target.value); setRole(3)}}
          type="text"
          id="password"
          name="password"/>
      </Form.Group>
      <Button type="submit">Login</Button>
    </Form>
  </div>
}

export default RegisterCard;
