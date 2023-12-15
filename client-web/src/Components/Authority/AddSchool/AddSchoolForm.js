import React, { useEffect, useState } from "react";
import FetchState from "../../../API/FetchState";
import FetchDistrict from "../../../API/FetchDistrict";
import FetchTaluka from "../../../API/FetchTaluka";
import FetchCity from "../../../API/FetchCity";
import FetchSchoolMedium from "../../../API/FetchSchoolMedium";

const AddSchoolForm = () => {
  const [stateName, setStateName] = useState([]);
  const [TalukaName, setTalukaName] = useState([]);
  const [DistrictName, setDistrictName] = useState([]);
  const [CityName, setCityName] = useState([]);

  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedTaluka, setSelectedTaluka] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [medium, setMedium] = useState([]);
  const [selectedMedium, setSelectedMedium] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    FetchState().then((res) => {
      setStateName(res);
    });
    FetchSchoolMedium().then((res) => {
      setMedium(res);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        Name: name,
        Address: address,
        ContactNumber: contactNumber,
        Medium: selectedMedium,
        Type: type,
        State: selectedState,
        District: selectedDistrict,
        Taluka: selectedTaluka,
        City: selectedCity,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const response = await fetch(
        "http://localhost:9999/addSchool",
        requestOptions
      );
      const result = await response.json();
      console.log(result);
      if (result.rcode === 200) {
        console.log("School added successfully");

        try {
          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");

          var raw = JSON.stringify({
            Name: name,
            Email: email,
            ContactNumber: contactNumber,
            Role: 5,
            School: result.data._id,
          });

          var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
          };

          const response = await fetch(
            "http://localhost:9999/signup",
            requestOptions
          );
          const result2 = await response.json();
          console.log(result2);
          if (result2.rcode === 200) {
            console.log("School Login assigned successfully");
          } else {
            console.error("Failed to add School Login assigned");
          }
        } catch (err) {
          console.error("Error:", err);
        }

        setEmail("");
        setName("");
        setAddress("");
        setContactNumber("");
        setSelectedMedium("");
        setType("");
        setSelectedState("");
        setSelectedDistrict("");
        setSelectedTaluka("");
        setSelectedCity("");
      } else {
        console.error("Failed to add school");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="mx-auto my-8 p-4 bg-gray-100 rounded shadow-md shadow-gray-400 w-3/5">
      <h2 className="text-2xl font-semibold mb-4 text-center">Add School</h2>
      <form onSubmit={handleSubmit}>
        <label className="mb-4 flex ">
          <span className="text-gray-500 font-bold w-1/3 ">Name</span>

          <input
            type="text"
            className="mt-1 p-2 w-full border rounded-md focus:outline-2 focus:outline-gray-400"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label className="flex mb-4">
          <span className="text-gray-500 font-bold w-1/3">Email</span>
          <input
            type="text"
            className="mt-1 p-2 w-full border rounded-md focus:outline-2 focus:outline-gray-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className="flex mb-4">
          <span className="text-gray-500 font-bold w-1/3">Address</span>
          <input
            type="text"
            className="mt-1 p-2 w-full border rounded-md focus:outline-2 focus:outline-gray-400"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </label>
        <label className="flex mb-4">
          <span className="text-gray-500 font-bold w-1/3">Contact Number</span>
          <input
            type="tel"
            className="mt-1 p-2 w-full border rounded-md focus:outline-2 focus:outline-gray-400"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            required
          />
        </label>
        <label className="flex mb-4">
          <span className="text-gray-500 font-bold w-1/3">Medium</span>
          <select
            className="mt-1 p-2 w-full border rounded-md focus:outline-2 focus:outline-gray-400"
            value={selectedMedium}
            onChange={(e) => setSelectedMedium(e.target.value)}
            required
          >
            <option value="">Select Medium</option>
            {medium.map((item, index) => (
              <option key={index} value={item._id}>
                {item.name}
              </option>
            ))}
            {/* <option value="English">English</option>
            <option value="Other">Other</option> */}
          </select>
        </label>
        <label className="flex mb-4">
          <span className="text-gray-500 font-bold w-1/3">Type</span>
          <select
            className="mt-1 p-2 w-full border rounded-md focus:outline-2 focus:outline-gray-400"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          >
            <option value="">Select Type</option>
            <option value="0">Government</option>
            <option value="1">Private</option>
            <option value="2">Semi-Government</option>
            <option value="3">International</option>
          </select>
        </label>
        <label className="flex mb-4">
          <span className="text-gray-500 font-bold w-1/3">Select State</span>
          <select
            className="mt-1 p-2 w-full border rounded-md focus:outline-2 focus:outline-gray-400"
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
        <label className="flex mb-4">
          <span className="text-gray-500 font-bold w-1/3">Select District</span>
          <select
            className="mt-1 p-2 w-full border rounded-md focus:outline-2 focus:outline-gray-400"
            value={selectedDistrict}
            onChange={(e) => {
              setSelectedDistrict(e.target.value);
              FetchTaluka(selectedState, e.target.value).then((res) => {
                setTalukaName(res);
              });
            }}
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
        <label className="flex mb-4">
          <span className="text-gray-500 font-bold w-1/3">Select Taluka</span>
          <select
            className="mt-1 p-2 w-full border rounded-md focus:outline-2 focus:outline-gray-400"
            value={selectedTaluka}
            onChange={(e) => {
              setSelectedTaluka(e.target.value);
              FetchCity(selectedState, selectedDistrict, e.target.value).then(
                (res) => {
                  console.log(res);
                  setCityName(res);
                }
              );
            }}
            required
          >
            <option value="">Select Taluka</option>
            {TalukaName.map((item, index) => (
              <option key={index} value={item._id}>
                {item.taluka}
              </option>
            ))}
          </select>
        </label>
        <label className="flex mb-4">
          <span className="text-gray-500 font-bold w-1/3">Select City</span>
          <select
            className="mt-1 p-2 w-full border rounded-md focus:outline-2 focus:outline-gray-400"
            value={selectedCity}
            onChange={(e) => {
              setSelectedCity(e.target.value);
            }}
            required
          >
            <option value="">Select City/Village</option>
            {CityName.map((item, index) => (
              <option key={index} value={item._id}>
                {item.city}
              </option>
            ))}
          </select>
        </label>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-700 my-5 text-white py-2 px-4 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue"
          >
            Add School
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSchoolForm;
