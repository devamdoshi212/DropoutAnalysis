import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import FetchReasons from "../../../API/FetchReasons";
import Resources from "../../Admin/Remedies/Resouces";

const Remedies = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const reason = searchParams.get("reason");
  const [rea, setReason] = useState([]);
  const [input, setInput] = useState("");
  console.log(reason);
  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`http://localhost:9999/getReason?reason=${reason}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setReason(result.data[0]);
      })
      .catch((error) => console.log("error", error));
  }, [reason]);

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`http://localhost:9999/customeSearch?q=${input}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setReason(result.data[0]);
      })
      .catch((error) => console.log("error", error));
  }, [input]);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <>
    <div className="bg-[#f8f9fa] m-5 h-screen">
      {/* <div className="flex " >
      <h2 className="font-bold text-lg m-1">Search By KeyWord : </h2>
      <input type="text" onChange={handleChange} value={input} className="border  border-gray-800 rounded-md w-1/3 focus:outline-gray-600 p-1.5" />
      </div> */}
      {rea &&
        rea.resources &&
        rea.resources.map((item) => (
          
            <div className=" mx-auto mt-8 p-4 bg-gray-100 rounded shadow-md shadow-gray-600 w-2/3 space-y-2">

              <div className="flex items-center justify-center">
                 <h2 className="font-bold text-3xl text-gray-800 ">Remedies Resources  </h2>
              </div>

              <div className="flex">
                <label className="text-gray-600 font-bold w-1/3">Title</label>
                <div className="mx-2">:</div>
                <div>{reason}</div>
              </div>

              <div className="flex">
                <label className="text-gray-600 font-bold w-1/3">STD </label>
                <div className="mx-2">:</div>
                <div>{item.standard}</div>
              </div>

              <div className="flex">
                {item.pdf && (
                  <div className="text-gray-600 font-bold w-1/3">PDF </div>
                )}
                <div className="mx-2">:</div>
                <ui className="list-none">
                  {item.pdf &&
                    item.pdf.map((e) => (
                      <li>
                        {" "}
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={`http://localhost:9999/resources/${e.name}`}
                          className="text-blue-700 hover:text-purple-800"
                        >
                          {e.name}
                        </a>
                      </li>
                    ))}
                </ui>
              </div>
              <div className="flex">
                {item.video && (
                  <div className="text-gray-600 font-bold w-1/3">Video </div>
                )}
                <div className="mx-2">:</div>
                <ui className="list-none">
                  {item.video &&
                    item.video.map((e) => (
                      <li>
                        {" "}
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={`http://localhost:9999/resources/${e.name}`}
                          className="text-blue-700 hover:text-purple-800"
                        >
                          {e.name}
                        </a>
                      </li>
                    ))}
                </ui>
              </div>
              <div className="flex">
                {item.pptx && (
                  <div className="text-gray-600 font-bold w-1/3">PPT </div>
                )}
                <div className="mx-2">:</div>
                <ui className="list-none">
                  {item.pptx &&
                    item.pptx.map((e) => (
                      <li>
                        {" "}
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={`http://localhost:9999/resources/${e.name}`}
                          className="text-blue-700 hover:text-purple-800"
                        >
                          {e.name}
                        </a>
                      </li>
                    ))}
                </ui>
              </div>
              <div className="flex">
                {item.links && (
                  <div className="text-gray-600 font-bold w-1/3">Links: </div>
                )}
                <div className="mx-2">:</div>
                <ui className="list-none">
                  {item.links &&
                    item.links.map((e) => (
                      <li>
                        {" "}
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={e}
                          className="text-blue-700 hover:text-purple-800"
                        >
                          {e}
                        </a>
                      </li>
                    ))}
                </ui>
              </div>
            </div>
         
        ))}
        </div>
    </>
  );
};

export default Remedies;
