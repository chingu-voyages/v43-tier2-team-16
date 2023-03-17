import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase-config";
import "./login.css";

const Login = () => {
   const [loginEmail, setLoginEmail] = useState("");
   const [loginPassword, setLoginPassword] = useState("");

   let navigate = useNavigate();

   const login = async e => {
      e.preventDefault();
      try {
         await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
         // console.log(user);
         navigate("/");
      } catch (error) {
         console.log(error.message);
      }
   };

   return (
      <div className="wrapper signIn">
         {/* <button className="login-google-btn">Sign In with Google</button> */}
         <div className="form">
            <div className="heading">LOGIN</div>
            <form>
               <div>
                  <label htmlFor="e-mail">E-Mail</label>
                  <input
                     type="email"
                     id="e-mail"
                     placeholder="Enter you mail"
                     onChange={event => {
                        setLoginEmail(event.target.value);
                     }}
                  />
               </div>
               <div>
                  <label htmlFor="password">Password</label>
                  <input
                     type="password"
                     id="password"
                     placeholder="Enter your password"
                     onChange={event => {
                        setLoginPassword(event.target.value);
                     }}
                  />
               </div>
               <button type="submit" onClick={login}>
                  Submit
               </button>
            </form>
            <p>
               Don't have an account ? <Link to="/signup"> Sign In </Link>
            </p>
         </div>
      </div>
   );
};

export default Login;
