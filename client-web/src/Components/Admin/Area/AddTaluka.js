import React, { useEffect, useState } from "react";
import FetchState from "../../../API/FetchState";
import FetchDistrict from "../../../API/FetchDistrict";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { PrimeIcons } from "primereact/api"; // Import PrimeIcons
import Swal from "sweetalert2";

const AddTaluka = () => {
  const [stateName, setStateName] = useState([]);
  const [DistrictName, setDistrictName] = useState([]);

  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [talukaName, setTalukaName] = useState("");

  useEffect(() => {
    FetchState().then((res) => {
      setStateName(res);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        state: selectedState,
        district: selectedDistrict,
        taluka: talukaName,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const response = await fetch(
        "http://localhost:9999/addTalukas",
        requestOptions
      );
      const result = await response.json();
      console.log(result);
      if (result.rcode === 200) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Taluka Added Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        setSelectedState("");
        setSelectedDistrict("");
        setTalukaName("");
      } else {
        console.error("Failed to add taluka");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const navigate = useNavigate();

  return (
    <div className="bg-[#f8f9fa] m-5 h-screen">
      <Button
        type="button"
        label="Back"
        outlined
        icon={PrimeIcons.CHEVRON_LEFT}
        className="px-4 py-2 rounded-lg bg-gray-800 ring-0 text-white font-bold tracking-wider hover:bg-gray-700"
        onClick={() => {
          navigate(-1);
        }}
      />
      <div className="max-w-md mx-auto mt-8 p-4 bg-gray-100 rounded shadow-md shadow-gray-600">
        <h2 className="text-2xl font-semibold mb-4 text-center">Add Taluka</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-4">
            <span className="font-bold text-md text-gray-500">
              Select State
            </span>
            <select
              className="mt-1 p-2 w-full border rounded-md outline-2 focus:outline-gray-300"
              value={selectedState}
              onChange={(e) => {
                setSelectedState(e.target.value);
                FetchDistrict(e.target.value).then((res) => {
                  setDistrictName(res);
                });
              }}
              required
            >
              <option value="">Select State</option>
              {stateName.map((item, index) => (
                <option key={index} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>
          <label className="block mb-4">
            <span className="font-bold text-md text-gray-500">
              Select District
            </span>
            <select
              className="mt-1 p-2 w-full border rounded-md outline-2 focus:outline-gray-300"
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              required
            >
              <option value="">Select District</option>
              {DistrictName.map((item, index) => (
                <option key={index} value={item._id}>
                  {item.district}
                </option>
              ))}
            </select>
          </label>
          <label className="block mb-4">
            <span className="font-bold text-md text-gray-500">Taluka Name</span>
            <input
              type="text"
              className="mt-1 p-2 w-full border rounded-md outline-2 focus:outline-gray-300"
              value={talukaName}
              onChange={(e) => setTalukaName(e.target.value)}
              required
            />
          </label>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-blue-700 text-white py-2 px-4 rounded-md font-semibold hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue"
            >
              Add Taluka
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaluka;
