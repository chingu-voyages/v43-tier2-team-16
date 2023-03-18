import Nav from "./Nav";
import Footer from "./Footer";
import { Outlet } from "react-router";

const WithNav = () => {
   return (
      <>
         <Nav />
         <Outlet />
         <Footer />
      </>
   );
};

export default WithNav;
