import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { BACKEND_URL } from '../constants';
import axios from 'axios';
import AdminPage from "../pages/adminPage";
import DoctorPage from "../pages/doctorPage";
import PatientPage from "../pages/patientPage";
import CustomAxios from "../utils/customAxios";


const ProfilePage = () => {

  let navigate = useNavigate();
  const [userDetail, setUserDetail] = useState({});

  useEffect(() => {
      if (localStorage.getItem("userDetail") !== null) setUserDetail(JSON.parse(localStorage.getItem("userDetail")));
      var access = JSON.parse(localStorage.getItem("access_token"))

      CustomAxios.get('me')
      .then((response) => {
        console.log("response =", response)
        setUserDetail(response.data.me)
      })
        .catch((err) => console.log(err))

         refresh: JSON.parse(localStorage.getItem("refresh_token"))
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