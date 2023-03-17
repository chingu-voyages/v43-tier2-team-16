import NavBar from "./Nav";
import Footer from "./Footer";
import { Outlet } from "react-router";

const WithNav = () => {
   return (
      <>
         <NavBar />
         <Outlet />
         <Footer />
      </>
   );
};

export default WithNav;
