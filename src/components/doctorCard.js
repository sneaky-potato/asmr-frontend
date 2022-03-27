import CustomAxios from "../utils/customAxios";

const DoctorCard = (props) => {
    const user = JSON.parse(localStorage.getItem("userDetail"));
    console.log(user)
    async function handleAppointment(event) {
      event.preventDefault();
      CustomAxios.post('appointments', {
        doctor_id: props.id, 
        patient_id: user.id,
        description: 'lodupanti',
        date: (props.date).toISOString().slice(0,10)
      }).then((response) => {
        console.log("appointment creted =", response);
        window.location.reload(true)
      })
      .catch((err) => {
        console.log(err)
      }) 
    }

    async function handleAccept(event) {
        event.preventDefault();
        CustomAxios.put(`users/${props.id}/`, {
            id: props.id,
            email: props.email,
            password: props.password,
            role: 2,
            first_name: props.name,
            last_name: props.lastname,
            address: props.address,
            contact: props.contact,
            hospital: props.hospital,
            speciality: props.speciality,
            pincode: props.pincode,
            pending: 0

          }).then((response) => {
            console.log("User edited =", response);
            window.location.reload(true)
          })
          .catch((err) => {
            console.log(err)
          }) 
    }

    return (
        <div className="doctor-card">
            <div className="doctor-title">Dr. {props.name} {props.lastname}</div>
            {/* <div className="doctor-title-surname"></div> */}
            <div className="doctor-hospital">{props.hospital}</div>
            <div className="doctor-speciality">{props.speciality}</div>
            <div className="doctor-address">{props.address}</div>
            <div className="doctor-pincode">{props.pincode}</div>
            <div className="doctor-contact">{props.contact}</div>
            <div className="doctor-email">{props.email}</div>
            {
              props.byAdmin ? ( props.toAccept ? <button className="navbar-button button" onClick={handleAccept}>Accept</button> 
              : <button className="navbar-button button" onClick={handleAccept}>Remove</button> )
              : <button className="navbar-button button" onClick={handleAppointment}>Book appointment</button>
            }
        </div>
    )
}

export default DoctorCard;