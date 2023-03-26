import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";
import "./nav.scss";

function Nav() {
   const [activeNav, setActiveNav] = useState(false);
   const { currentUser } = useContext(AuthContext);
   let navigate = useNavigate();
   //  console.log(currentUser);

   useEffect(() => {
      document.body.classList.toggle('no-scroll', activeNav);
   },[activeNav])

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
               <p className="h2 mb-0">
                  <Link to="/">Exhib</Link>
               </p>
            </div>
            <button className="menu-burger d-block d-lg-none m-0 ml-auto btn-trans" onClick={handleNavMenu}>
               <span></span>
               <span></span>
               <span></span>
            </button>
            <ul className="nav-menu d-flex align-items-center justify-content-center flex-column flex-lg-row">
               <li className="link">
                  <Link to="/">Home</Link>
               </li>
               <li className="link">
                  <Link to="/about">About</Link>
               </li>
               <li className="link">
                  <Link to={currentUser ? "/profile" : "/login"}>
                     Add Project
                  </Link>
               </li>
               {currentUser && (
                  <li className="link">
                        <button className="btn-trans" onClick={signUserOut}>
                           Logout
                        </button>
                  </li>
               )}
            </ul>
         </div>
      </nav>
   );
}

export default Nav;
