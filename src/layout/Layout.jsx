import { Outlet } from "react-router-dom";
import Navbar from "../features/layout/Navbar";
import Footer from "../features/layout/Footer";

function Layout() {
  return (
    <>
      <Navbar />
      <>
        <Outlet />
      </>
      <Footer />
    </>
  );
}

export default Layout;
