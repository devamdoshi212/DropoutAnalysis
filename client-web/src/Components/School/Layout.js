import React, { useState } from "react";
import { Outlet, NavLink, Link, useNavigate } from "react-router-dom";
// import { FetchDistrict } from "../../API/FetchDistrict";
// import image from "./../../Assets/symbol.png";
// import { FetchComplaintType } from "../../API/FetchComplaintType";
const Layout = () => {
  //   FetchDistrict();
  //   FetchComplaintType();
  const [isOpen, setIsOpen] = useState(false);
  //   const navigate = useNavigate();
  //   const LogoutHandler = () => {
  //     Swal.fire({
  //       title: "Are you sure?",
  //       text: "You redirect to Login page...",
  //       icon: "warning",
  //       showCancelButton: true,
  //       confirmButtonColor: "#3085d6",
  //       cancelButtonColor: "#d33",
  //       confirmButtonText: "Logout",
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         localStorage.removeItem("token");
  //         navigate("/");
  //       }
  // });
  //   };
  return (
    <div className="bg-[#f8f9fa] font-family-karla flex ">
      <aside className="relative  bg-[#13459c] w-64   hidden sm:block shadow-xl shadow-gray-200 h-screen overflow-y-hidden ">
        <div className=" top-0 left-0 p-6 text-center">
          {/* <img src={image} alt="symbol" className="opacity-60 w-2/3 m-auto  " /> */}
          <Link
            to={"/school"}
            className="text-white text-3xl  first-letter:font-semibold uppercase hover:text-gray-300 "
          >
            School
          </Link>
        </div>
        <nav className=" text-base font-semibold pt-3 overflow-y-scroll h-4/6">
          <div className=" hover:shadow-gray-400 hover:shadow-md">
            <Link
              to={"/school"}
              className="flex items-center active-nav-link text-white py-4 pl-6 nav-item gap-2 focus:outline-none focus:shadow-md focus:shadow-gray-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                />
              </svg>
              Dashboard
            </Link>
          </div>
          <div className=" hover:shadow-gray-400 hover:shadow-md">
            <Link
              to={"addexistingstudent"}
              className="flex items-center active-nav-link text-white py-4 pl-6 nav-item gap-2 focus:outline-none focus:shadow-md focus:shadow-gray-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                />
              </svg>
              Add Existing Student
            </Link>
          </div>
        </nav>
      </aside>

      <div className="w-full flex flex-col h-screen overflow-y-hidden ">
        <header className="w-full items-center  bg-[#196bde] shadow-gray-900 shadow-md  py-2 px-6 hidden sm:flex">
          <div className="w-1/2"></div>
          <div
            x-data="{ isOpen: false }"
            className="relative w-1/2 flex justify-end"
          >
            {/* <NavLink to={""}> */}

            <button
              //   onClick={LogoutHandler}
              className="realtive z-10 flex  px-2 rounded-lg h-12 hover:shadow-md hover:shadow-gray-800 bg-white overflow-hidden hover:bg-gray-200 hover:border-gray-300 focus:border-gray-300 focus:outline-none "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 m-auto"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                />
              </svg>
              <div className="m-auto">Logout</div>
            </button>
            {/* </NavLink> */}
            <button
              style={{ display: isOpen ? "block" : "none" }}
              onClick={() => setIsOpen(false)}
              className="h-full w-full fixed inset-0 cursor-default"
            ></button>
          </div>
        </header>

        <header
          x-data="{ isOpen: false }"
          className="w-full bg-[#3d68ff] py-5 px-6 sm:hidden"
        >
          <div className="flex items-center justify-between">
            <Link className="text-white text-3xl font-semibold uppercase hover:text-gray-300">
              Admin
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white text-3xl focus:outline-none"
            >
              <svg
                style={{ display: isOpen ? "none" : "block" }}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
              <svg
                style={{ display: isOpen ? "block" : "none" }}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>

          <nav className={isOpen ? "flex flex-col" : "hidden"}>
            <Link
              to={""}
              className="flex items-center active-nav-link text-white py-2 pl-4 nav-item"
            >
              <i className="fas fa-tachometer-alt mr-3"></i>
              Dashboard
            </Link>
            <Link
              //   onClick={LogoutHandler}
              className="flex items-center active-nav-link text-white py-2 pl-4 nav-item"
            >
              <i className="fas fa-tachometer-alt mr-3"></i>
              Logout
            </Link>
            <div>
              <NavLink to={"addauthority"}>
                <button className="w-full bg-white cta-btn font-semibold py-2 mt-5 rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-lg hover:shadow-xl hover:bg-gray-300 flex items-center justify-center">
                  <i className="fas fa-plus mr-3"></i> Add Authority
                </button>
              </NavLink>
              <NavLink to={""}>
                <button className="w-full bg-white cta-btn font-semibold py-2 mt-5 rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-lg hover:shadow-xl hover:bg-gray-300 flex items-center justify-center">
                  <i className="fas fa-plus mr-3"></i> Add Sports Complex
                </button>
              </NavLink>
              <NavLink to={"addfacility"}>
                <button className="w-full bg-white cta-btn font-semibold py-2 mt-5 rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-lg hover:shadow-xl hover:bg-gray-300 flex items-center justify-center">
                  <i className="fas fa-plus mr-3"></i> Add Facility
                </button>
              </NavLink>
            </div>
          </nav>
        </header>

        <div className="w-full overflow-x-hidden border-t flex flex-col scrollbar ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
