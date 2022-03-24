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
      console.log(localStorage.getItem("access_token"))
      var access = JSON.parse(localStorage.getItem("access_token"))
      console.log('Authorization', 'Bearer ' + access)
      axios.get(`${BACKEND_URL}/api/auth/me`, {
        headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + access
        }
    })
          .then((response) => {
              console.log(response)
              setUserDetail(response.data.me)
          })
          .catch((err) => console.log(err))
  }, []);

  localStorage.setItem("userDetail", JSON.stringify(userDetail));

  // if(userDetail.role == 1) return (<)
}

export default ProfilePage;