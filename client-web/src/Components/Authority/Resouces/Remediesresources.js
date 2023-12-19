import React, { useEffect, useState } from "react";

const Remediesresources = () => {
  const [reason, setReason] = useState([]);
  const [resources, setResources] = useState({});

  const handleReason = (e) => {
    const id = e.target.value;
    const reasonData = reason.find((reason) => reason._id == id);
    setResources(reasonData);
  };

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://localhost:9999/getReason", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setReason(result.data);
      })
      .catch((error) => console.log("error", error));
  }, []);
  return (
    <>
      <div className="bg-[#f8f9fa] m-5 h-screen">
        <div className=" mx-auto mt-8 p-4 bg-gray-100 rounded shadow-md shadow-gray-600 w-2/5">
          <div className="relative m-5 w-80">
            <select
              name="dropoutreason"
              className="p-2 border border-gray-300 rounded w-full outline-2 focus:outline-gray-500 "
              onChange={handleReason}
            >
              <option value="">Choose</option>
              {reason.map((item, index) => (
                <option key={index} value={item._id}>
                  {item.reason}
                </option>
              ))}
            </select>
          </div>
          <div>
            <h2 className="text-center underline text-xl">Resources Links</h2>
            {resources &&
              resources.links &&
              resources.links.map((resource, index) => (
                <a
                  key={index}
                  href={resource}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    color: "blue",
                    margin: "25px",
                  }}
                >
                  {resource}
                </a>
              ))}
            <h2 className="text-center underline text-xl">
              Resources Material
            </h2>

            {resources &&
              resources.resources &&
              resources.resources.map((resource, index) => (
                <a
                  key={index}
                  href={`http://localhost:9999/resources/${resource.file}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    color: "red",
                    margin: "25px",
                  }}
                >
                  {resource.name}
                </a>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Remediesresources;
