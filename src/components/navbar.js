import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logout from "../utils/logout";


const Navbar = (props) => {
  const [isMobNavbarOpen, setIsMobNavbarOpen] = useState(false);

  let navigate = useNavigate();
  console.log("props =", props.data )

  return (
    <div className="navbar" isopen={String(isMobNavbarOpen)}>
      <div
        className="hamburger"
        onClick={() => setIsMobNavbarOpen(!isMobNavbarOpen)}
      >
        {/* {isMobNavbarOpen ? <UilTimes /> : <UilBars />} */}
      </div>
      <div className="navbar-links">
          {
            props.data.map((option) => {
                return(
                <div className="link" onClick={() => navigate(`${option.link}`)}>{option.text}</div>)
              })
          }
        <button className="button" onClick={logout}>Log Out</button>
      </div>
    </div>
  );
};

export default Navbar;
