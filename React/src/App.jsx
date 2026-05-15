import { Suspense, lazy } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import Loader from "./components/loaders/Loader";
import { Provider } from "react-redux";


//  EAGER LAYOUTS (We load Layouts immediately so the shell is always visible)
import Layout from "./layouts/layout/layout";
import ArticalLayout from "./layouts/ArticalLayout/ArticalLayout";
import AuthLayout from "./features/auth/AuthLayout/AuthLayout";

//  GUARDS (Logic should be loaded immediately)
import ProtectedRoute from "./guards/ProtectedRoute";
import PublicRoute from "./guards/PublicRoute";
import store from "./Redux/store/store";

//  LAZY LOADED PAGES & FEATURES
// These only download when the user navigates to them!
const HomePage = lazy(() => import("./pages/HomePage"));
const ArticalDetails = lazy(
  () => import("./components/ArticalDetails/ArticalDetails"),
);
const Form = lazy(() => import("./features/form/form")); // Adjust path based on your rename
const Login = lazy(() => import("./features/auth/login/Login"));
const Register = lazy(() => import("./features/auth/Register/Register"));

export default function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Navigate to="home" replace /> },
        {
          path: "home",
          element: (
            <Suspense fallback={<Loader />}>
              <HomePage />
            </Suspense>
          ),
        },
        {
          path: "addNew",
          element: (
            <ProtectedRoute>
              <Suspense fallback={<Loader />}>
                <Form />
              </Suspense>
            </ProtectedRoute>
          ),
        },
      ],
    },

    // 2. ARTICLE DETAILS
    {
      path: "/article",
      element: <ArticalLayout />,
      children: [
        {
          path: ":id",
          element: (
            <Suspense fallback={<Loader />}>
              <ArticalDetails />
            </Suspense>
          ),
        },
      ],
    },

    // 3. AUTHENTICATION
    {
      path: "/auth",
      element: (
        <PublicRoute>
          <AuthLayout />
        </PublicRoute>
      ),
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={<Loader />}>
              <Login />
            </Suspense>
          ),
        },
        {
          path: "register",
          element: (
            <Suspense fallback={<Loader />}>
              <Register />
            </Suspense>
          ),
        },
      ],
    },
  ]);

  return (<Provider store={store}>
    <RouterProvider router={routes} /></Provider>)
}
