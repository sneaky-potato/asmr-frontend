import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navigation from "../components/navbar";
import CustomAxios from '../utils/customAxios';
import DoctorCard from "../components/doctorCard";

const isPendingDoctor = (doctor) => {
  return (doctor.role == 2 && doctor.pending == 1);
}

const AdminPage = () => {
  const [userDetail, setUserDetail] = useState({});
  let navigate = useNavigate();
  // const [userDetail, setUserDetail] = useState({});

  const navData = [
    {
      'text': 'List of Doctors',
      'link': '/'
    },
    {
      'text': 'List of Hospitals',
      'link': '/'
    }
  ]

  const [userList, setUserList] = useState([]);
  const [filterList, setFilterList] = useState([]);

  // localStorage.setItem("userDetail", JSON.stringify(userDetail));
 
  useEffect(() => {

    // if (localStorage.getItem("doctorList") !== null) setDoctorList(JSON.parse(localStorage.getItem("doctorList")));
    // let filtered = []
    
    CustomAxios.get('users')
        .then((response) => {
            // setHospitalList(response.data.hospitals/
            setUserList(response.data.users)
            setFilterList(userList.filter(isPendingDoctor)) 
            setUserDetail(JSON.parse(localStorage.getItem("userDetail")))
          })
          .catch((err) => console.log(err));
    }, []);
        
        
  // filtered = userList.filter(isPendingDoctor);

// if(userDetail.role == 1) return (<)
return(
    <div className="admin-page">
      <Navigation data={navData} />
      {/* <EditDoctors data={userList}/>  */}
      {/* {
        filterList.map((doctor) => {
          return(
            <DoctorCard 
              key={doctor.id}
              email={doctor.email}
              name={doctor.first_name}
              lastname={doctor.last_name}
              hospital={doctor.hospital}
              contact={doctor.contact}
              address={doctor.address}
              pincode={doctor.pincode}
              editable={true}
              />
          )
        })
      } */}
      <div className="admin-info">
        You are currently logged in as 
      </div>
      <div className="admin-card">
        <div className="admin-card-name">
          {userDetail.email}
        </div>
    </div>
  </div>
  )
}

export default AdminPage;