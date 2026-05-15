import Form from "../../features/form/form";
import { useUI } from "../../context/showForm-Context";
import "./ShowForm.css";

export default function ShowForm() {
  // const { isFormVisible, toggleForm } = useUI();

  return (
    <div className="conatiner">
      {/* <button onClick={toggleForm}>
        {isFormVisible ? "Hide Form" : "Add New Post"}
      </button>

      {isFormVisible && (
        <div id="form-section">
          <Form />
        </div> */}
      {/* )} */}
    </div>
  );
}
