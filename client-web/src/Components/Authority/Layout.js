import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Outlet,
  NavLink,
  Link,
  useNavigate,
  useLoaderData,
} from "react-router-dom";
import image from "./../../Assets/logo.jpg";
import Swal from "sweetalert2";
import { UserActions } from "../../Store/UserData";

const AuthorityLayout = () => {
  const dispatch = useDispatch();
  const userData = useLoaderData();
  dispatch(UserActions.getuserdata(useLoaderData()));
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const LogoutHandler = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You redirect to Login page...",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Logout",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        navigate("/");
      }
    });
  };
  return (
    <div className="bg-[#f8f9fa] font-family-karla flex ">
      <aside className="relative  bg-[#13459c] w-1/5   hidden sm:block shadow-xl shadow-gray-200 h-screen overflow-y-hidden ">
        <div className=" top-0 left-0 p-6 text-center">
          <img
            src={image}
            alt="symbol"
            className="opacity-70 m-auto w-36 h-36 rounded-full "
          />
          <Link
            to={"/authority"}
            className="text-white text-3xl  first-letter:font-semibold uppercase hover:text-gray-300 "
          >
            {userData.State.name}
          </Link>
        </div>
        <div className=" top-0 left-0 p-6 text-center">
          {/* <img src={image} alt="symbol" className="opacity-60 w-2/3 m-auto  " /> */}
          <Link
            to={"/authority"}
            className="text-white text-3xl  first-letter:font-semibold uppercase hover:text-gray-300 "
          >
            Authority
          </Link>
        </div>
        <nav className=" text-base font-semibold  overflow-y-scroll h-4/6">
          <div className=" hover:shadow-gray-400 hover:shadow-md">
            <Link
              to={"/authority"}
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
              to={"profile"}
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
              Profile
            </Link>
          </div>
          <div className=" hover:shadow-gray-400 hover:shadow-md">
            <Link
              to={"dropoutstudents"}
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
              Dropout Students
            </Link>
          </div>
          <div className=" hover:shadow-gray-400 hover:shadow-md">
            <Link
              to={"activestudents"}
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
              Active Students
            </Link>
          </div>

          <div className=" hover:shadow-gray-400 hover:shadow-md">
            <Link
              to={"schooldetails"}
              className="flex items-center active-nav-link text-white py-4 pl-6 nav-item gap-2 focus:outline-none focus:shadow-md focus:shadow-gray-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z"
                />
              </svg>
              School Details
            </Link>
          </div>
          <div className=" hover:shadow-gray-400 hover:shadow-md">
            <Link
              to={"stateMap"}
              className="flex items-center active-nav-link text-white py-4 pl-6 nav-item gap-2 focus:outline-none focus:shadow-md focus:shadow-gray-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>
              State Map
            </Link>
          </div>
          <div className=" hover:shadow-gray-400 hover:shadow-md">
            <Link
              to={"addSchool"}
              className="flex items-center active-nav-link text-white py-4 pl-6 nav-item gap-2 focus:outline-none focus:shadow-md focus:shadow-gray-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              Add School
            </Link>
          </div>
          <div className=" hover:shadow-gray-400 hover:shadow-md">
            <Link
              to={"overallanalysis"}
              className="flex items-center active-nav-link text-white py-4 pl-6 nav-item gap-2 focus:outline-none focus:shadow-md focus:shadow-gray-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              Overall Analysis
            </Link>
          </div>
          <div className=" hover:shadow-gray-400 hover:shadow-md">
            <Link
              to={"analysis"}
              className="flex items-center active-nav-link text-white py-4 pl-6 nav-item gap-2 focus:outline-none focus:shadow-md focus:shadow-gray-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              Droped Analysis
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
              onClick={LogoutHandler}
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
              Authority
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

export default AuthorityLayout;
