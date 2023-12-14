import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PrimeReactProvider } from "primereact/api";

import Login from "./Pages/Login";
import ErrorPage from "./Pages/ErrorPage";
import Layout from "./Components/School/Layout";
import SchoolDashboard from "./Components/School/Dashboard";
import NewStudentForm from "./Components/School/Form/NewStudentForm";
import ExistingStudentForm from "./Components/School/Form/ExistingStudentForm";
import AdminLayout from "./Components/Admin/Layout";
import Analysis from "./Components/Admin/Analysis/Analysis";
import AuthorityLayout from "./Components/Authority/Layout";
import AuthorityDashboard from "./Components/Authority/Dashboard";
import AdminDashboard from "./Components/Admin/Dashboard";
import AddState from "./Components/Admin/Area/AddState";
import AddDistrict from "./Components/Admin/Area/AddDistrict";
import AddTaluka from "./Components/Admin/Area/AddTaluka";
import AddCity from "./Components/Admin/Area/AddCity";
import CurrentStudent from "./Components/School/StudentDetails/CurrentStudentDetails";
import AddSchoolForm from "./Components/Authority/AddSchool/AddSchoolForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },
      {
        path: "analysis",
        element: <Analysis />,
        errorElement: <ErrorPage />,
      },
      {
        path: "addstate",
        element: <AddState />,
        errorElement: <ErrorPage />,
      },
      {
        path: "adddistrict",
        element: <AddDistrict />,
        errorElement: <ErrorPage />,
      },
      {
        path: "addtaluka",
        element: <AddTaluka />,
        errorElement: <ErrorPage />,
      },
      {
        path: "addcity",
        element: <AddCity />,
        errorElement: <ErrorPage />,
      },
    ],
  },
  {
    path: "/authority",
    element: <AuthorityLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <AuthorityDashboard />,
      },
      {
        path: "addSchool",
        element: <AddSchoolForm />,
        errorElement: <ErrorPage />,
      },
    ],
  },
  {
    path: "/school",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <SchoolDashboard />,
      },
      {
        path: "addnewstudent",
        element: <NewStudentForm />,
        errorElement: <ErrorPage />,
      },
      {
        path: "addexistingstudent",
        element: <ExistingStudentForm />,
        errorElement: <ErrorPage />,
      },
      {
        path: "currentstudent",
        element: <CurrentStudent />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);
const App = () => {
  return (
    <PrimeReactProvider>
      <RouterProvider router={router} />
    </PrimeReactProvider>
  );
};

export default App;
