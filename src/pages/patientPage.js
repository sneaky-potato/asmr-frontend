import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navigation from "../components/navbar";
import CustomAxios from "../utils/customAxios";

const PatientPage = () => {

  let navigate = useNavigate();
  const [userDetail, setUserDetail] = useState({});

  const navData = [
    {
      'text': 'Book Appointment',
      'link': '/'
    },
    {
      'text': 'List of Hospitals',
      'link': '/'
    }
  ] 

  // localStorage.setItem("userDetail", JSON.stringify(userDetail));
  useEffect(() => {
    if (localStorage.getItem("userDetail") !== null) setUserDetail(JSON.parse(localStorage.getItem("userDetail")));
    // console.log("userdetail =", userDetail)
    CustomAxios.get('me')
      .then((response) => {
        console.log("found response =", response)
        setUserDetail(response.data.me)
      })
        .catch((err) => console.log(err))
  }, []);

  localStorage.setItem("userDetail", JSON.stringify(userDetail));
  console.log("details =", userDetail)

  // if(userDetail.role == 1) return (<)
  return(
    <div className="patient-page">
      <Navigation data={navData} />
      <div className="patient-info">
        You are currently logged in as 
      </div>
      <div className="patient-card">
        <div className="patient-card-name">
           {userDetail.first_name} {userDetail.last_name}
        </div>
      </div>
    </div>
  )
}

export default PatientPage;