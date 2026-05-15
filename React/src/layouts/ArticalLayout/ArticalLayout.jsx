import { Outlet } from "react-router-dom";
import Navbar from "../../common/navbar/navbar";
import Footer from "../../common/footer/footer";

export default function ArticalLayout() {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
}
