import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navigation from "../components/navbar";
import CustomAxios from '../utils/customAxios';
import DoctorCard from "../components/doctorCard";

const isPendingDoctor = (doctor) => {
  return (doctor.role == 2 && doctor.pending == 1);
}
const isNotPendingDoctor = (doctor) => {
  return (doctor.role == 2 && doctor.pending == 0);
}
const Profile = (props) => {
  return (
  <div className="profile">
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
              />
              )
            })
          }
      </div>
    </div>
  )
}

const ListOfHospitals = (props) => {
  return(
    <div className="hospital-list">
      hospital
    </div>
  )
}

const AdminPage = () => {
  const [userDetail, setUserDetail] = useState({});
  let navigate = useNavigate();
  // const [userDetail, setUserDetail] = useState({});

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
    CustomAxios.get('users')
        .then((response) => {
            setUserList(response.data.users)
            setUserDetail(JSON.parse(localStorage.getItem("userDetail")))
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