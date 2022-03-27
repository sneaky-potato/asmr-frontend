import CustomAxios from "../utils/customAxios";

const AppointmentCard = (props) => {

  let patients = (JSON.parse(localStorage.getItem("patientList"))).find((patient, index) => {
    return patient.id == props.patient;
  })
  let doctors = (JSON.parse(localStorage.getItem("doctors"))).find((doctor, index) => {
    return doctor.id == props.doctor;
  })

  async function handleAcceptAppointment(event) {
    event.preventDefault();
    CustomAxios.put(`appointments/${props.id}/`, {
      id: props.id,
      doctor_id: props.doctor, 
      patient_id: props.patient, 
      description: props.description,
      status: 1,
      date: props.date
    }).then((response) => {
      console.log("appointment edited =", response);
      window.location.reload(true)
    })
    .catch((err) => {
      console.log(err)
    }) 
  }
  async function handleDeleteAppointment(event) {
    event.preventDefault();
    CustomAxios.delete(`appointments/${props.id}/`, {})
    
  }

  return(
    <div className="appointment-card">
      <div className="appointment-title">Appointment with</div>
      <div className="appointment-title">
        {
          props.byPatient ? (props.doctor.first_name) : (patients.first_name + " " + patients.last_name)
        } </div>
      <div className="appointment-description">{props.description}</div>
      <div className="appointment-show-date">{props.date}</div>
      <div className="appointment-button-grid">
      {
        props.pendingByDoctor ? 
        <button className="appointment-button button" onClick={handleAcceptAppointment}>Accept</button> : <div></div> 
      }
      {
        props.pendingByDoctor ? 
        <button className="appointment-button button" onClick={handleAcceptAppointment}>Delete</button> : <div></div> 
      }
      </div>
      {
        <div className="appointment-status">
          {
            props.status == 1 ? 'ACCEPTED' : 'PENDING'
          }
        </div> 
      }
    </div>
  )
}

export default AppointmentCard;