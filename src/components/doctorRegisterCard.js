import React, { useState, useEffect } from 'react';
import { BACKEND_URL } from '../constants';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

const DoctorRegisterCard = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [lastname, setLastname] = useState("")
  const [address, setAddress] = useState("")
  const [contact, setContact] = useState("")
  const [hospital, setHospital] = useState(1)
  const [spec, setSpec] = useState("")
  const [pin, setPin] = useState("")
  const [hospitalList, setHospitalList] = useState([]);

  useEffect(() => {

    if (localStorage.getItem("hospitalList") !== null) setHospitalList(JSON.parse(localStorage.getItem("hospitalList")));
    
    axios.get(`${BACKEND_URL}/api/auth/hospitals`)
        .then((response) => {
            setHospitalList(response.data.hospitals)
            console.log(response)
        })
        .catch((err) => console.log(err));
}, []);

  const onLoginFormSubmit = (event) => {
    event.preventDefault();
    // console.log(email, password, role)
    axios.post(`${BACKEND_URL}/api/auth/register`, {
            email: email,
            password: password,
            role: 2,
            first_name: name,
            last_name: lastname,
            address: address,
            contact: contact,
            hospital: hospital,
            speciality: spec,
            pincode: pin
        }).then(
            result => {
              console.log(result.data)
              console.log("USER created successfully")
            }
    ).catch (error => {
        console.log(error);
    })
  }
  function validateForm() {
    return email.length > 0 && password.length > 0;
  }
  return (
    <div className="Login">
      <Form onSubmit={onLoginFormSubmit} className="login-form mb-3">
        <Form.Group controlId="formBasicEmail" className="login-email-box">
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

        <Form.Group size="lg" controlId="name" className="login-name-box">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group size="lg" controlId="lastname" className="login-lastname-box">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="lastname"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </Form.Group>

        <Form.Group size="lg" controlId="address" className="login-address-box">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </Form.Group>

        <Form.Group size="lg" controlId="contact" className="login-contact-box">
          <Form.Label>Contact</Form.Label>
          <Form.Control
            type="contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
        </Form.Group>

        <Form.Label>Hospital</Form.Label>
        <Form.Select onChange={(e) => setHospital(parseInt(e.target.value))}>
            {hospitalList.map((option) => (
              <option value={option.id}>{option.name}</option>
            ))}
        </Form.Select>

        <Form.Group size="lg" controlId="spec" className="login-spec-box">
        <Form.Label>Specification</Form.Label>
        <Form.Control
            type="spec"
            value={spec}
            onChange={(e) => setSpec(e.target.value)}
          />
        </Form.Group>
        
        <Form.Group size="lg" controlId="pincode" className="login-pincode-box">
        <Form.Label>Pin code</Form.Label>
        <Form.Control
            type="pincode"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
          />
        </Form.Group>

        <Button block size="lg" type="submit" disabled={!validateForm()}>
          Register
        </Button>
      </Form>
    </div>
  );
}

export default DoctorRegisterCard;
