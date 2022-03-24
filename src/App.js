import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./views/landingPage";
import MainPage from "./views/mainPage";
import Hospitals from "./views/hospitals";
import RegisterCard from "./components/registerCard";
import LoginCard from "./components/loginCard";
// import { AuthProvider } from "./contexts/authContext";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* <AuthProvider> */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/ocms" element={<MainPage />} />
          <Route path="/ocms/hospitals" element={<Hospitals />} />
          <Route path="/ocms/register" element={<RegisterCard />} />
          <Route path="/ocms/login" element={<LoginCard />} />
        </Routes>
        {/* </AuthProvider> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
