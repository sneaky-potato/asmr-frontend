import { useNavigate } from "react-router-dom";
// import Login from "../components/register";
// import token from "../utils/rough";
const MainPage = () => {

//   const handleBackClick = () => eventRef.current.scrollIntoView({ behavior: "smooth" });
  let navigate = useNavigate();

  return (
    <div className="main-page">
      <div className="main-header">
          <div className="main-header-sf">
              OCMS
          </div>
          <div className="main-btns">
            <div className="main-title-btn link" onClick={() => navigate("/ocms/hospitals")}>
                Hospitals
            </div>
            <div className="main-title-btn link" onClick={() => navigate("/ocms")}>
                Webapp Flow
            </div>
            <div className="main-title-btn link" onClick={() => navigate("/ocms/register")}>
                Register
            </div>
            <div className="main-title-btn link" onClick={() => navigate("/ocms/login")}>
                Login
            </div>
          </div>
          
      </div>
      <div className="main-title">
        <div className="main-title-text">
            Medical ERP
        </div>
        <div className="main-title-btn link" onClick={() => navigate("/ocms")}>
            Continue to OCMS
        </div>
      </div>
    </div>
  );
}

export default MainPage;