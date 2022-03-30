import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navigation from "../components/navbar";
import CustomAxios from '../utils/customAxios';
import DoctorCard from "../components/doctorCard";
import { BACKEND_URL } from '../constants';
import axios from "axios";
import { Notyf } from "notyf";

const isPendingDoctor = (doctor) => {
  return (doctor.pending == 1);
}
const isNotPendingDoctor = (doctor) => {
  return (doctor.pending == 0);
}
const Profile = (props) => {
  return (
  <div className="profile">
    <div className="profile-title title">{props.title}</div>
    <div className="admin-info">
      You are currently logged in as 
    </div>
    <div className="admin-card">
      <div className="admin-card-name">
        {props.email}
      </div>
    </div>
  </div>
  )
}

const ListOfDoctors = (props) => {

  const filtered = props.userList.filter(isPendingDoctor)
  const remaining = props.userList.filter(isNotPendingDoctor)
  return(
    <div className="doctor-container">
      <div className="doctor-label">
        Pending Doctors
      </div>

      <div className="doctor-list">
        {
          filtered.map((doctor, index) => {
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
              byAdmin={true}
              toAccept={true}
              />
              )
            })
          }
      </div>


      <div className="doctor-label">
        Enrolled Doctors
      </div>

      <div className="doctor-list">
        {
          remaining.map((doctor, index) => {
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
              byAdmin={true}
              />
              )
            })
          }
      </div>
    </div>
  )
}

const ListOfHospitals = (props) => {

  const notyf = new Notyf();

  const [hospitalName, setHospitalName] = useState("");
  const [hospitalAddress, setHospitalAddress] = useState("");
  const [hospitalPin, setHospitalPin] = useState(""); 

  async function OnAddHospital(event) {
    event.preventDefault();
    CustomAxios.post(`hospitals`, {
        name: hospitalName,
        address: hospitalAddress,
        pincode: hospitalPin
    }).then(
        result => {
          console.log(result.data)
          console.log("hospital created successfully")
          notyf.success("Hospital added to database")
        }
).catch (error => {
    console.log(error);
    notyf.error("Some error occurred")
})
}
  function validateForm() {
    return hospitalName.length > 0 && hospitalPin.length > 0;
  }
  return(
    <div className="hospital-form">
            <form onSubmit={OnAddHospital} className="login-form">
        <div className="form-group">
          {/* <label className="form-label">Na</label> */}
          <input
            placeholder="Hospital Name"
            autoFocus
            type="text"
            value={hospitalName}
            onChange={(e) => setHospitalName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            placeholder="Hospital Address"
            type="text"
            value={hospitalAddress}
            onChange={(e) => setHospitalAddress(e.target.value)}
          />
        </div>

        <div className="form-group">
          <input
            placeholder="Hospital Pin code"
            type="text"
            value={hospitalPin}
            onChange={(e) => setHospitalPin(e.target.value)}
          />
        </div>
        <button type="submit" className="form-button" disabled={!validateForm()}>
          Register
        </button>
      </form>
            </div>
  )
}

const AdminPage = () => {
  const [userDetail, setUserDetail] = useState({});
  let navigate = useNavigate();

  const navData = [
    {
      'text': 'Profile',
      'icon': null
    },
    {
      'text': 'List of Doctors',
      'icon': null
    },
    {
      'text': 'List of Hospitals',
      'icon': null
    }
  ]

  const [currentSelection, setCurrentSelection] = useState(0);
  const [hospitalList, setHospitalList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [filterList, setFilterList] = useState([]);

  var title, BodyContent;

  if (currentSelection === 0) {
      title = "PROFILE";
      BodyContent = Profile;
  }
  else if (currentSelection === 1) {
      title = "LIST OF DOCTORS";
      BodyContent = ListOfDoctors;
  }
  else {
      title = "LIST OF HOSPITALS";
      BodyContent = ListOfHospitals;
  }
 
  useEffect(() => {
    setUserDetail(JSON.parse(localStorage.getItem("userDetail")))
    CustomAxios.get('doctors')
        .then((response) => {
            setUserList(response.data.doctors)
            setUserDetail(JSON.parse(localStorage.getItem("userDetail")))
            CustomAxios.get('hospitals')
            .then((response) => {
              setHospitalList(response.data.hospitals)
              console.log(response.data.hospitals)
              localStorage.setItem('hospitalList', JSON.stringify(response.data.hospitals))
            })
          })
          .catch((err) => console.log(err));
    }, []);
    console.log(userList)
  return(
    <div className="admin-page">
      <Navigation 
        data={navData} 
        currentSelection={currentSelection}
        changeSelection={setCurrentSelection} />
      
    <BodyContent 
    email={userDetail.email}
    userList={userList}/>
  </div>
  )
}

export default AdminPage;