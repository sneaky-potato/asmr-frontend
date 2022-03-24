import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./views/landingPage";
import MainPage from "./views/mainPage";
import Hospitals from "./views/hospitals";
import DoctorRegisterCard from "./components/doctorRegisterCard";
import PatientRegisterCard from "./components/patientRegisterCard";
import LoginCard from "./components/loginCard";
import ProfilePage from "./views/profilePage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/ocms" element={<MainPage />} />
          <Route path="/ocms/hospitals" element={<Hospitals />} />
          <Route path="/ocms/register/doctor" element={<DoctorRegisterCard />} />
          <Route path="/ocms/register/patient" element={<PatientRegisterCard />} />
          <Route path="/ocms/login" element={<LoginCard />} />
          <Route path="/ocms/me" element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
