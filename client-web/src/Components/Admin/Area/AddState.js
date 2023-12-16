import React, { useState } from "react";

const AddState = () => {
  const [Name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");

  const [stateName, setStateName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        name: stateName,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const response = await fetch(
        "http://localhost:9999/addState",
        requestOptions
      );
      const result = await response.json();
      console.log(result);
      if (result.rcode === 200) {
        console.log("State added successfully");

        try {
          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");

          var raw = JSON.stringify({
            Name: Name,
            Email: email,
            ContactNumber: contactNumber,
            Role: 1,
            State: result.data._id,
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
            console.log("State Authority assigned successfully");
            setName("");
            setEmail("");
            setContactNumber("");
          } else {
            console.error("Failed to add State Authority assigned");
          }
        } catch (err) {
          console.error("Error:", err);
        }

        setStateName("");
      } else {
        console.error("Failed to add state");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="bg-[#f8f9fa] m-5 h-screen ">
    <div className="w-1/3  mx-auto mt-8 p-4 bg-gray-100 rounded shadow-md shadow-gray-600">
      <h2 className="text-2xl font-semibold mb-4 text-center">Add State</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-4">
          <span className="font-bold text-md text-gray-500">State Name</span>
          <input
            type="text"
            className="mt-1 p-2 w-full border rounded-md outline-2 focus:outline-gray-300"
            value={stateName}
            onChange={(e) => setStateName(e.target.value)}
            required
          />
        </label>
        <label className="block mb-4">
          <span className="font-bold text-md text-gray-500">Name</span>
          <input
            type="text"
            className="mt-1 p-2 w-full border rounded-md outline-2 focus:outline-gray-300"
            value={Name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label className="block mb-4">
          <span className="font-bold text-md text-gray-500">Email</span>
          <input
            type="email"
            className="mt-1 p-2 w-full border rounded-md outline-2 focus:outline-gray-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className="block mb-4">
          <span className="font-bold text-md text-gray-500">Contact Number</span>
          <input
            type="tel"
            className="mt-1 p-2 w-full border rounded-md outline-2 focus:outline-gray-300"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            required
          />
        </label>
        <div className="flex items-center justify-center">
        <button
          type="submit"
          className="bg-blue-700 text-white py-2 px-4 rounded-md font-semibold hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue"
        >
          Add State
        </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default AddState;
