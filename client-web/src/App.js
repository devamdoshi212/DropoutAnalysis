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
import StatewiseDropoutAnalysis from "./Components/Admin/State/StatewiseDropoutRatioTable";
import DomainDataTable from "./Components/Admin/Area/DomianTable";
import OverAllAnalysis from "./Components/Admin/OverAllAnalysis/OverAllAnalysis";
import StateMap from "./Components/Authority/Analysis/StateMap";
import IndiaMap from "./Components/Admin/Analysis/IndiaMap";
import AuthorityAnalysis from "./Components/Authority/Analysis/AuthorityAnalysis";
import AuthorityOverAllAnalysis from "./Components/Authority/Analysis/AuthorityOverAllAnalysis";
import ActiveStudentsDataTable from "./Components/Admin/Students/ActiveStudentsDataTable";
import DropoutStudentsDataTable from "./Components/Admin/Students/DropoutStudentsDataTable";
import AuthorityDropoutStudents from "./Components/Authority/Students/AuthorityDropoutStudents";
import AuthorityActiveStudents from "./Components/Authority/Students/AuthorityActiveStudents";
import Resouces from "./Components/Admin/Remedies/Resouces";
import Top5Dropout from "./Components/Admin/Analysis/Top/Top5Dropout";
import SchoolProfile from "./Components/School/Profile";
import AuthorityProfile from "./Components/Authority/Profile";
import Remediesresources from "./Components/Authority/Resouces/Remediesresources";
import PredictDropoutDataTable from "./Components/School/StudentDetails/PredictDropoutDataTable";
import Addreasons from "./Components/Admin/Reason/Addreasons";
import Remedies from "./Components/School/StudentDetails/Remedies";
import ScholarShip from "./Components/School/StudentDetails/ScholarShip";

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
        path: "overallanalysis",
        element: <OverAllAnalysis />,
        errorElement: <ErrorPage />,
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
      {
        path: "statewiseDropoutAnalysis",
        element: <StatewiseDropoutAnalysis />,
        errorElement: <ErrorPage />,
      },
      {
        path: "indiaMap",
        element: <IndiaMap />,
        errorElement: <ErrorPage />,
      },
      {
        path: "activestudents",
        element: <ActiveStudentsDataTable />,
        errorElement: <ErrorPage />,
      },
      {
        path: "dropoutstudents",
        element: <DropoutStudentsDataTable />,
        errorElement: <ErrorPage />,
      },
      {
        path: "addresources",
        element: <Resouces />,
        errorElement: <ErrorPage />,
      },
      {
        path: "topanalysis",
        element: <Top5Dropout />,
        errorElement: <ErrorPage />,
      },
      {
        path: "addreason",
        element: <Addreasons />,
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
      {
        path: "stateMap",
        element: <StateMap />,
        errorElement: <ErrorPage />,
      },
      {
        path: "analysis",
        element: <AuthorityAnalysis />,
        errorElement: <ErrorPage />,
      },
      {
        path: "overallanalysis",
        element: <AuthorityOverAllAnalysis />,
        errorElement: <ErrorPage />,
      },
      {
        path: "activestudents",
        element: <AuthorityActiveStudents />,
        errorElement: <ErrorPage />,
      },
      {
        path: "dropoutstudents",
        element: <AuthorityDropoutStudents />,
        errorElement: <ErrorPage />,
      },
      {
        path: "profile",
        element: <AuthorityProfile />,
        errorElement: <ErrorPage />,
      },
      {
        path: "remediesresources",
        element: <Remediesresources />,
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
      {
        path: "profile",
        element: <SchoolProfile />,
        errorElement: <ErrorPage />,
      },
      {
        path: "predicedstudents",
        element: <PredictDropoutDataTable />,
        errorElement: <ErrorPage />,
      },
      {
        path: "remedies",
        element: <Remedies />,
        errorElement: <ErrorPage />,
      },
      {
        path: "scholarship",
        element: <ScholarShip />,
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
