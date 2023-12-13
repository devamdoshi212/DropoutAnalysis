import { createBrowserRouter, RouterProvider } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <div className="bg-red-500">Hello world!</div>,
  },
]);
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
