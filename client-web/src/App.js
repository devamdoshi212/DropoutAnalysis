import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
    ],
  },
]);
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
