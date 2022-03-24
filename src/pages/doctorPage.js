import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navigation from "../components/navbar";

const DoctorPage = () => {

  let navigate = useNavigate();
  const [userDetail, setUserDetail] = useState({});

  const navData = [
    {
      'text': 'List of Appointments',
      'link': '/'
    },
    {
      'text': 'List of Hospitals',
      'link': '/'
    }
  ]

  // localStorage.setItem("userDetail", JSON.stringify(userDetail));
  useEffect(() => {
    setUserDetail(JSON.parse(localStorage.getItem("userDetail")))
  }, []);

  // if(userDetail.role == 1) return (<)
  return(
    <div className="doctor-page">
      <Navigation data={navData} />
      <div className="doctor-info">
        You are currently logged in as 
      </div>
      <div className="doctor-card">
        <div className="doctor-card-name">
          Dr. {userDetail.first_name} {userDetail.last_name}
        </div>
      </div>
    </div>
  )
}

export default DoctorPage;