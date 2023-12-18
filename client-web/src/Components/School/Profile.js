import React from "react";
import { useSelector } from "react-redux";

const SchoolProfile = () => {
  const schoolData = useSelector((state) => state.user.user);

  return (
    <div className="container mx-auto my-8">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          School Name : {schoolData.School.Name}
        </h2>
        <p className="text-gray-600 mb-4">
          {" "}
          Address : {schoolData.School.Address}
        </p>
        <ul className="list-none">
          <li className="flex items-center mb-2">
            <span className="mr-2">Email:</span>
            <span className="text-gray-700">{schoolData.Email}</span>
          </li>
          {/* <li className="flex items-center mb-2">
            <span className="mr-2">Location:</span>
            <span className="text-gray-700">City, Country</span>
          </li> */}
          {/* Add more SchoolProfile information as needed */}
        </ul>
      </div>
    </div>
  );
};

export default SchoolProfile;
