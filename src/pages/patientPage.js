import { useState, useEffect } from "react";
import Navigation from "../components/navbar";
import CustomAxios from "../utils/customAxios";
import DoctorCard from "../components/doctorCard";

const Profile = (props) => {
  return (
  <div className="profile">
    <div className="patient-card">
      <div className="profile-title title">{props.title}</div>
      <div className="patient-info">
        You are currently logged in as 
      </div>
      <div className="patient-card-name">
        {props.profile.first_name} {props.profile.last_name}
      </div>
    </div>
  </div>
  )
}

const BookAppointment = (props) => {

  const [pincode, setPincode] = useState("");
  const [doctorList, setDoctorList] = useState([])
  const [availDoctorList, setAvailDoctorList] = useState([])

  function checkPincode() {
    return (/^\d+$/.test(pincode) && pincode.length == 6);
  }
  
  function pincodeSearch(event)
  {
    event.preventDefault();
    // console.log("helu");
    const availableDoctors = doctorList.filter((doctor, index) => {
      return doctor.pincode == pincode
    })
    setAvailDoctorList(availableDoctors)
    console.log(availDoctorList)
  }

  useEffect(() => {
    CustomAxios.get('users')
    .then((response) => {
      console.log(response)
      setDoctorList(response.data.users)
    })
    .catch((err) => console.log(err))
  }, []);

  const messageSuccess = 'No Doctors found in this pin code'
  const messageFailure = 'Doctors found in this pin code'
  return(
    <div className="appointment-container">
      <div className="appointment-pincode">
        <label className="type-label">Input pin code: </label>
          <input id="pincode" type="text" onChange={(e) => setPincode(e.target.value)} value={pincode} />
          <button className="navbar-button button" disabled={!checkPincode} onClick={pincodeSearch}>Search</button>
      </div>
      <div className="appointment-content">
      { 
        availDoctorList.map((doctor, index) => {
            return(
              <DoctorCard
              id={doctor.id} 
              password={doctor.password}
              name={doctor.first_name}
              lastname={doctor.last_name}
              hospital={doctor.hospital}
              speciality={doctor.speciality}
              address={doctor.address}
              pincode={doctor.pincode}
              contact={doctor.contact}
              email={doctor.email}
              />
              )
            })
      }
      </div>
    </div>
  )
}

const AppointmentHistory = (props) => {
  return(
    <div className="hospital-list">
      hospital
    </div>
  )
}


const PatientPage = () => {

  const [userDetail, setUserDetail] = useState({});
  const [currentSelection, setCurrentSelection] = useState(0);

  const navData = [
    {
      'text': 'Profile',
      'icon': null
    },
    {
      'text': 'Book an appointment',
      'icon': null
    },
    {
      'text': 'View appointment',
      'icon': null
    }
  ]
  
  var title, BodyContent;
  
  if (currentSelection === 0) {
    title = "PROFILE";
    BodyContent = Profile;
  }
  else if (currentSelection === 1) {
    title = "BOOK APPOINTMENT";
    BodyContent =   BookAppointment;
  }
  else {
    title = "APPOINTMENT HISTORY";
    BodyContent = AppointmentHistory;
  }

  useEffect(() => {
    setUserDetail(JSON.parse(localStorage.getItem("userDetail")));
    console.log("userdetail =", userDetail) 
    CustomAxios.get('me')
      .then((response) => {
        setUserDetail(response.data.me)
      })
        .catch((err) => console.log(err))
  }, []);

  return(
    <div className="patient-page">
      <Navigation 
        data={navData} 
        currentSelection={currentSelection}
        changeSelection={setCurrentSelection} />
      
    <BodyContent
    title={title} 
    profile={userDetail} />
    </div>
  )
}

export default PatientPage;