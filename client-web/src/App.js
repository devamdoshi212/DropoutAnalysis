import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Pages/Login";
import ErrorPage from "./Pages/ErrorPage";
import Layout from "./Components/School/Layout";
import SchoolDashboard from "./Components/School/Dashboard";
import NewStudentForm from "./Components/School/Form/NewStudentForm";
import ExistingStudentForm from "./Components/School/Form/ExistingStudentForm";
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
]);
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
