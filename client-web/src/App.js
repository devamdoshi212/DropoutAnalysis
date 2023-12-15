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
import LoginVerify from "./Components/Auth/LoginVerify";
import Verify from "./Components/Auth/Verify";
import SchoolDataTable from "./Components/Authority/AddSchool/SchoolDataTable";
import AdminSchoolDataTable from "./Components/Admin/School/SchoolDataTable";
import DropedStudents from "./Components/School/StudentDetails/DropedStudents";
import InactiveStudent from "./Components/School/StudentDetails/InactiveStudents";
import DomainDataTable from "./Components/Admin/Area/DomainDataTable";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    loader: LoginVerify,
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    loader: () => {
      return Verify(0);
    },
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
      {
        path: "schooldetails",
        element: <AdminSchoolDataTable />,
        errorElement: <ErrorPage />,
      },
      {
        path: "adddomain",
        element: <DomainDataTable />,
        errorElement: <ErrorPage />,
      },
    ],
  },
  {
    path: "/authority",
    element: <AuthorityLayout />,
    loader: () => {
      return Verify(1);
    },
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
      {
        path: "schooldetails",
        element: <SchoolDataTable />,
        errorElement: <ErrorPage />,
      },
    ],
  },
  {
    path: "/school",
    element: <Layout />,
    loader: () => {
      return Verify(5);
    },
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
      {
        path: "dropedstudent",
        element: <DropedStudents />,
        errorElement: <ErrorPage />,
      },
      {
        path: "inactivetudent",
        element: <InactiveStudent />,
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
