import React, { useEffect, useState } from "react";
import FetchState from "../../../API/FetchState";
import FetchDistrict from "../../../API/FetchDistrict";
import FetchTaluka from "../../../API/FetchTaluka";

const AddCity = () => {
  const [stateName, setStateName] = useState([]);
  const [TalukaName, setTalukaName] = useState([]);
  const [DistrictName, setDistrictName] = useState([]);

  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedTaluka, setSelectedTaluka] = useState("");
  const [selectedCityType, setSelectedCityType] = useState("");
  const [cityName, setCityName] = useState("");

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
        taluka: selectedTaluka,
        city: cityName,
        cityType: selectedCityType,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const response = await fetch(
        "http://localhost:9999/addCities",
        requestOptions
      );
      const result = await response.json();
      console.log(result);
      if (result.rcode === 200) {
        console.log("City added successfully");
        setSelectedState("");
        setSelectedDistrict("");
        setSelectedTaluka("");
        setCityName("");
        setSelectedCityType("");
      } else {
        console.error("Failed to add city");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-gray-100 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Add City/Village</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-4">
          <span className="text-gray-700">Select State:</span>
          <select
            className="mt-1 p-2 w-full border rounded-md"
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
          <span className="text-gray-700">Select District:</span>
          <select
            className="mt-1 p-2 w-full border rounded-md"
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
        <label className="block mb-4">
          <span className="text-gray-700">Select Taluka:</span>
          <select
            className="mt-1 p-2 w-full border rounded-md"
            value={selectedTaluka}
            onChange={(e) => setSelectedTaluka(e.target.value)}
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
        <label className="block mb-4">
          <span className="text-gray-700">Select Area Type:</span>
          <select
            className="mt-1 p-2 w-full border rounded-md"
            value={selectedCityType}
            onChange={(e) => setSelectedCityType(e.target.value)}
            required
          >
            <option value="">Select Area Type</option>
            <option value="0">Urban</option>
            <option value="1">Rural</option>
          </select>
        </label>

        <label className="block mb-4">
          <span className="text-gray-700">City/Village Name:</span>
          <input
            type="text"
            className="mt-1 p-2 w-full border rounded-md"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            required
          />
        </label>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
        >
          Add City/Village
        </button>
      </form>
    </div>
  );
};

export default AddCity;
