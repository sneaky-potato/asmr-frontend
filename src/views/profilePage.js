import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { BACKEND_URL } from '../constants';
import axios from 'axios';
import AdminPage from "../pages/adminPage";
import DoctorPage from "../pages/doctorPage";
import PatientPage from "../pages/patientPage";

const ProfilePage = () => {

  let navigate = useNavigate();
  const [userDetail, setUserDetail] = useState({});

  useEffect(() => {
      if (localStorage.getItem("userDetail") !== null) setUserDetail(JSON.parse(localStorage.getItem("userDetail")));
      var access = JSON.parse(localStorage.getItem("access_token"))

      axios.get(`${BACKEND_URL}/api/auth/ping`, {
        headers: {
          'content-type': 'application/json',
          'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem("access_token"))
        }
      }).then((response) => {
        console.log("redirct from ping");
        axios.get(`${BACKEND_URL}/api/auth/me`, {
          headers: {
              'content-type': 'application/json',
              'Authorization': 'Bearer ' + access
          }
      })
            .then((response) => {
                console.log("response =", response)
                setUserDetail(response.data.me)
            })
            .catch((err) => console.log(err))
    })
    .catch((err) => {
      console.log(err);
      if (err.response.status == 401) {
        axios.post(`${BACKEND_URL}/api/auth/token/refresh/`, {
          refresh: JSON.parse(localStorage.getItem("refresh_token"))
        })
        .then((response) => {
          console.log("redirected from refresh")
          console.log(response);
          localStorage.setItem("access_token", JSON.stringify(response.data.access));
          axios.get(`${BACKEND_URL}/api/auth/me`, {
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + access
            }
        })
              .then((response) => {
                  console.log("response =", response)
                  setUserDetail(response.data.me)
              })
              .catch((err) => console.log(err))

        })
        .catch((err) => {
          console.log(err);
          // Handle refresh token expiration
          

          
        })
      }
    });
  }, []);

  localStorage.setItem("userDetail", JSON.stringify(userDetail));
  console.log("details =", userDetail)
  
  return(
    <div className="profile-page">
        { userDetail.role == 1 ? <AdminPage /> : (userDetail.role == 2 ? <DoctorPage /> : <PatientPage />) }
    </div>
  )
  
}

export default ProfilePage;