import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../firebase-config";
import { doc, setDoc } from "@firebase/firestore";
import "./login.css";
import { toast, ToastContainer } from "react-toastify";

const Signup = () => {
   const [registerName, setRegisterName] = useState("");
   const [registerEmail, setRegisterEmail] = useState("");
   const [registerPassword, setRegisterPassword] = useState("");

   let navigate = useNavigate();

   const register = async e => {
      e.preventDefault();
      try {
         const res = await createUserWithEmailAndPassword(
            auth,
            registerEmail,
            registerPassword
         );
         await updateProfile(res.user, {
            displayName: registerName,
         });
         await setDoc(doc(db, "users", res.user.uid), {
            uid: res.user.uid,
            registerName,
            registerEmail,
            projects: [],
         });

         toast.success("You Have Successfully Registered .");
         navigate("/profile");
      } catch (err) {
         console.log(err.message);
         toast.error("Error, Kindly follow signup instructions");
      }
   };

   return (
      <div className="wrapper signUp">
         <div className="form">
            <div className="heading">CREATE AN ACCOUNT</div>
            <form>
               <div>
                  <label htmlFor="name">Name</label>
                  <input
                     type="text"
                     id="name"
                     placeholder="Enter your name"
                     onChange={event => {
                        setRegisterName(event.target.value);
                     }}
                  />
               </div>
               <div>
                  <label htmlFor="email">E-Mail</label>
                  <input
                     type="text"
                     id="email"
                     placeholder="Enter your mail"
                     onChange={event => {
                        setRegisterEmail(event.target.value);
                     }}
                  />
               </div>
               <div>
                  <label htmlFor="password">Password</label>
                  <input
                     type="password"
                     id="password"
                     placeholder="Enter you password"
                     onChange={event => {
                        setRegisterPassword(event.target.value);
                     }}
                  />
                  <span>minimum 6 characters</span>
               </div>
               
               <button type="submit" onClick={register}>
                  Submit
               </button>
               
               {/* <h2 align="center" className="or">
                  OR
               </h2> */}
               
            </form>
            <h6 >
               Have an account ? <Link to="/login"> Login </Link>
            </h6>
          
            <ToastContainer />
            
         </div>
      </div>
   );
};

export default Signup;
