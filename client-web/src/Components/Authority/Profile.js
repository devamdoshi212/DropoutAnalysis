import React from "react";
import { useSelector } from "react-redux";

const AuthorityProfile = () => {
  const userData = useSelector((state) => state.user.user);
  return (
    <div className="container mx-auto my-8">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-gray-800 font-serif  mb-2">
          {userData.Name}
        </h2>
        <p className="text-xl font-semibold text-indigo-600 mb-4">
          {userData.State.name} Authority
        </p>
        <ul className="list-none">
          <li className="flex items-center mb-2">
            <span className="mr-2 text-gray-700 font-semibold w-1/6">E-mail</span>
            <span className="text-gray-800">: {userData.Email}</span>
          </li>
          <li className="flex items-center mb-2">
            <span className="mr-2 text-gray-700  font-semibold w-1/6">State </span>
            <span className="text-gray-800">: {userData.State.name}</span>
          </li>

          <li className="flex items-center mb-2">
            <span className="mr-2 text-gray-700  font-semibold w-1/6">Phone</span>
            <span className="text-gray-800">: {userData.ContactNumber}</span>
          </li>
          {/* Add more profile information as needed */}
        </ul>
      </div>
    </div>
  );
};

export default AuthorityProfile;
