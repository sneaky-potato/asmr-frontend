import { useNavigate } from "react-router-dom";
import { UilStethoscopeAlt } from '@iconscout/react-unicons'
// import Login from "../components/register";
// import token from "../utils/rough";
const MainPage = () => {

//   const handleBackClick = () => eventRef.current.scrollIntoView({ behavior: "smooth" });
  let navigate = useNavigate();

  return (
    <div className="main-page">
      <div className="main-header">
          <div className="main-header-sf">
              <UilStethoscopeAlt className="main-header-icon" />OMCS
          </div>
          <div className="main-btns">
            <div className="main-title-btn link" onClick={() => navigate("/omcs/hospitals")}>
                Hospitals
            </div>
            <div className="main-title-btn link" onClick={() => window.location.replace("#webflow")}>
                Webapp Flow
            </div>
            <div className="main-title-btn link" onClick={() => navigate("/omcs/register/doctor")}>
                Doctor Register
            </div>
            <div className="main-title-btn link" onClick={() => navigate("/omcs/register/patient")}>
                Patient Register
            </div>
            <div className="main-title-btn link" onClick={() => navigate("/omcs/login")}>
                Login
            </div>
          </div>
          
      </div>
      <div className="main-title">
        <div className="main-title-text">
            Medical ERP
        </div>
        <div className="main-title-btn link">
            Welcome to Online Medical Consultation System
        </div>
      </div>
      <div className="webflow" id="webflow">
        <div className="webflow-heading">
          WebFlow of the application
        </div>
        <div className="webflow-img">
          <div className="inside-img">
            </div>
          {/* <img src="../assets/webflow.png" alt="webflow"></img> */}
          </div>
      </div>
    </div>
  );
}

export default MainPage;