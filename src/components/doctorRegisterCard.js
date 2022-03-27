import React, { useState, useEffect } from 'react';
import { BACKEND_URL } from '../constants';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Notyf } from 'notyf';

const DoctorRegisterCard = () => {

  const notyf = new Notyf();

  const navigate = useNavigate()

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
              notyf.success("User created successfully")
              navigate("/ocms/login")              
            }
    ).catch (error => {
        console.log(error);
        notyf.error("Email is already in use")
    })
  }
  function validateForm() {
    return email.length > 0 && password.length > 0;
  }
  console.log(validateForm())
  return (
    <div className="Login">
      <form onSubmit={onLoginFormSubmit} className="login-form">
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
          <label className="form-label">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Name</label>
          <input
            type="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Last Name</label>
          <input
            type="lastname"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Address</label>
          <input
            type="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Contact</label>
          <input
            type="contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
        </div>

        <label>Hospital</label>
        <select onChange={(e) => setHospital(parseInt(e.target.value))}>
            {hospitalList.map((option) => (
              <option value={option.id}>{option.name}</option>
            ))}
        </select>

        <div className="form-group">
        <label className="form-label">Specification</label>
        <input
            type="spec"
            value={spec}
            onChange={(e) => setSpec(e.target.value)}
          />
        </div>
        
        <div className="form-group">
        <label className="form-label">Pin code</label>
        <input
            type="pincode"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
          />
        </div>

        <button className="form-button" type="submit" disabled={!validateForm()}>
          Register
        </button>
      </form>
    </div>
  );
}

export default DoctorRegisterCard;
