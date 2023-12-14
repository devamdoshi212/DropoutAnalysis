import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Pages/Login";
import ErrorPage from "./Pages/ErrorPage";
import Layout from "./Components/School/Layout";
import SchoolDashboard from "./Components/School/Dashboard";
import NewStudentForm from "./Components/School/Form/NewStudentForm";
import ExistingStudentForm from "./Components/School/Form/ExistingStudentForm";
import AdminLayout from "./Components/Admin/Layout";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <ErrorPage />,
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
  {
    path: "/admin",
    element: <AdminLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <div>Hello</div>,
      },
    ],
  },
]);
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
