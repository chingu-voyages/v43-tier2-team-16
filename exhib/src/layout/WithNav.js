import Nav from "./Nav";
import Footer from "./Footer";
import { Outlet } from "react-router";

const WithNav = () => {
   return (
      <>
         <Nav />
         <div style={{ marginTop: "80px" }}/> {/* nav is fixed, so we want the content to start below the navbar */}
         <Outlet />
         <Footer />
      </>
   );
};

export default WithNav;
