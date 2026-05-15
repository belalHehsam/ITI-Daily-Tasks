import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import "./index.css";
import App from "./App.jsx";
import StateProvider from "./context/StateProvider.jsx";
import "./i18n"

const savedTheme = localStorage.getItem("theme") || "dark";

document.documentElement.setAttribute("data-theme", savedTheme);

createRoot(document.getElementById("root")).render(

  <StateProvider>
    <Toaster position="bottom-right" />
    <App />
  </StateProvider>,
);
