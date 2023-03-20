import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";
import "./nav.css";

function Nav() {
   const [activeNav, setActiveNav] = useState(false);
   var buttonText = activeNav ? "close" : "open";
   const { currentUser } = useContext(AuthContext);
   let navigate = useNavigate();
   //  console.log(currentUser);

   const handleNavMenu = () => {
      setActiveNav(!activeNav);
   };

   const signUserOut = () => {
      signOut(auth).then(() => {
         navigate("/");
      });
   };

   return (
      <nav className={`navbar ${activeNav ? "active" : ""}`}>
         <div className="container">
            <div className="nav-brand-wrapper">
               <p className="h2 mb-0">Exhib</p>
            </div>
            <button
               className="nav-trigger d-block d-lg-none m-0 ml-auto"
               onClick={handleNavMenu}
            >
               {buttonText}
            </button>
            <ul className="nav-menu d-flex align-items-center justify-content-center flex-column flex-lg-row">
               <li className="link">
                  <Link to="/">Home</Link>
               </li>
               <li className="link mx-4 my-5 my-lg-0">
                  <Link to="/about">About</Link>
               </li>
               <li>
                  <Link to={currentUser ? "/profile" : "/login"}>
                     Add Project
                  </Link>
               </li>
            </ul>
            {currentUser && (
               <div style={{ cursor: "pointer" }} onClick={signUserOut}>
                  Logout
               </div>
            )}
         </div>
      </nav>
   );
}

export default Nav;
