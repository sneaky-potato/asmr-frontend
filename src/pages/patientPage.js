import { useState, useEffect } from "react";
import Navigation from "../components/navbar";
import CustomAxios from "../utils/customAxios";
import DoctorCard from "../components/doctorCard";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


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

const Errors = () => {
  return(
    <div className="appointment">
      Please input PIN CODE first
    </div>
  )
}

const BookAppointmentContent = (props) => {
  const [startDate, setStartDate] = useState(new Date());
  return(
    <div className="appointment-content">
      <div className="appointment-date"><label className="type-label">Select Date: </label><DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
        </div>
      { 
        props.availDoctorList.map((doctor, index) => {
            return(
              <DoctorCard
              key={index}
              id={doctor.id} 
              name={doctor.first_name}
              lastname={doctor.last_name}
              hospital={doctor.hospital}
              speciality={doctor.speciality}
              address={doctor.address}
              pincode={doctor.pincode}
              contact={doctor.contact}
              email={doctor.email}
              date={startDate}
              byPatient={true}
              />
              )
            })
      }
      </div>
  )
}

const BookAppointment = (props) => {

  const [pincode, setPincode] = useState("");
  const [doctorList, setDoctorList] = useState([])
  const [availDoctorList, setAvailDoctorList] = useState([])
  const [show, setShow] = useState(false);

  function checkPincode() {
    return (/^\d+$/.test(pincode) && pincode.length == 6);
  }
  
  function pincodeSearch(event)
  {
    event.preventDefault();
    const availableDoctors = doctorList.filter((doctor, index) => {
      return doctor.pincode == pincode
    })
    setShow(true)
    setAvailDoctorList(availableDoctors)
    console.log(availDoctorList)
  }

  useEffect(() => {
    CustomAxios.get('doctors')
    .then((response) => {
      console.log(response)
      setDoctorList(response.data.doctors)
      localStorage.setItem("doctors", JSON.stringify(response.data.doctors))
    })
    .catch((err) => console.log(err))
  }, []);

  let BodyContent;
  console.log(show)
  if(show) BodyContent = BookAppointmentContent
  else BodyContent = Errors

  return(
    <div className="appointment-container">
      <div className="appointment-pincode">
        <label className="type-label">Input pin code: </label>
          <input id="pincode" type="text" onChange={(e) => 
            {
              setPincode(e.target.value)
              if(!(/^\d+$/.test(pincode) && pincode.length == 6)) {setShow(false)}
          }} value={pincode} />
          <button className="navbar-button button" disabled={!checkPincode} onClick={pincodeSearch}>Search</button>
      </div>
      <BodyContent availDoctorList={availDoctorList} />
    </div>
  )
}

const AppointmentHistory = (props) => {
  const [appointmentList, setAppointmentList] = useState([]);
  useEffect(() => {
    CustomAxios.get('appointments', {})
    .then((response) => {
      console.log("appointment fetch =", response);
      setAppointmentList(response.data.appointments)

    })
    .catch((err) => {
      console.log(err)
    }) 
  }, []);
  return(
    <div className="appointment-list">
      {
        appointmentList.map((appointment, index) => {
          return(
            <div className="appointment" key={index}>
              <div className="appointment-doctor">
                Appointment with Dr. {JSON.parse(localStorage.getItem("doctors")).find((doctor) => {
                  return doctor.id == appointment.doctor_id
                }).first_name}
                </div>
              {appointment.description}
            </div>
          )
        })
      }
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