import { useState, useEffect } from "react";
import HospitalCard from "../components/hospitalCard";
import { BACKEND_URL } from '../constants';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const Hospitals = () => {

    const [hospitalList, setHospitalList] = useState([]);

    useEffect(() => {

        if (localStorage.getItem("hospitalList") !== null) setHospitalList(JSON.parse(localStorage.getItem("hospitalList")));
        
        axios.get(`${BACKEND_URL}/api/auth/hospitals`)
            .then((response) => {
                setHospitalList(response.data.hospitals)
                console.log(response)
            })
            .catch((err) => console.log(err));
    }, []);

    localStorage.setItem("hospitalList", JSON.stringify(hospitalList));

    let navigate = useNavigate();

    return (
        <div className="hospital-list">
            {
                hospitalList.map((hospital, index) => {
                    return (<HospitalCard 
                        key={index} 
                        name={hospital.name} 
                        address={hospital.address} 
                        pincode={hospital.pincode}
                        index={index} />);
                })
            }
        </div>
  );
}

export default Hospitals;