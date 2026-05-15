import { Outlet } from "react-router-dom";
import Navbar from "./../../common/navbar/navbar";
import Footer from "./../../common/footer/footer";
import ShowForm from "./../../components/ShowForm/ShowForm";
export default function Layout() {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <ShowForm></ShowForm>
      <Footer></Footer>
    </div>
  );
}
