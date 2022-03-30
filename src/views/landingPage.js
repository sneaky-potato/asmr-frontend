import { useNavigate } from "react-router-dom";

const LandingPage = () => {

//   const handleBackClick = () => eventRef.current.scrollIntoView({ behavior: "smooth" });
  let navigate = useNavigate();

  return (
    <div className="landing-page">
      <div className="landing-header">
          <div className="landing-header-sf">
              ASMR
          </div>
          <div className="landing-btns">
            <div className="landing-header-btn">
                Team
            </div>
            <div className="landing-header-btn">
                Tech Stack
            </div>
            <div className="landing-header-btn">
                Continue to omcs
            </div>
          </div>
          
      </div>
      <div className="landing-main">
        <div className="landing-title-text">
            Online Medical Consultation System
        </div>
        <div className="landing-title-btn link" onClick={() => navigate("/omcs")}>
            Continue to omcs
        </div>
      </div>
      <div className="landing-team">
      </div>
      <div className="landing-tech">
      </div>
    </div>
  );
}

export default LandingPage;