const DoctorCard = (props) => {
    console.log(props)

    return (
        <div className="doctor-card">
            <div className="doctor-title">{props.name}</div>
            <div className="doctor-title-surname">{props.lastname}</div>
            <div className="doctor-hospital">{props.hospital}</div>
            <div className="doctor-address">{props.address}</div>
            <div className="doctor-pincode">{props.pincode}</div>
            <div className="doctor-contact">{props.contact}</div>
            <div className="doctor-email">{props.email}</div>
            {/* <img src={props.image} alt={props.name}></img> */}
        </div>
    )
}

export default DoctorCard;