import { useLocation } from "react-router-dom";

const Remedies = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const reason = searchParams.get("reason");

  console.log(reason);
  return (
    <>

<div className="bg-[#f8f9fa] m-5 h-screen">
     <div className=" mx-auto mt-8 p-4 bg-gray-100 rounded shadow-md shadow-gray-600 w-2/3 space-y-2">
      <div className="flex">
      <label className="text-gray-600 font-bold w-1/3">Title</label>
       <div className="mx-2">:</div> 
       <div>XYZ</div>
       </div>

       <div className="flex">
      <label  className="text-gray-600 font-bold w-1/3">STD </label>
       <div className="mx-2">:</div> 
       <div>XYZ</div>
       </div>

      
      <div className="flex">
      <div className="text-gray-600 font-bold w-1/3">PDF </div>
      <div className="mx-2">:</div>
      <ui className="list-none">
        <li>
          {" "}
          <a href="/" className="text-blue-700 hover:text-purple-800">Link 1</a>
        </li>
        <li>
          {" "}
          <a href="/" className="text-blue-700  hover:text-purple-800">Link 2</a>
        </li>
      </ui>
      </div>
      <div className="flex">
      <div className="text-gray-600 font-bold w-1/3">Video </div>
      <div className="mx-2">:</div>
      <ui className="list-none">
        <li>
          <a href="/" className="text-blue-700  hover:text-purple-800">Link 1</a>
        </li>
        <li>
          <a href="/" className="text-blue-700  hover:text-purple-800">Link 2</a>
        </li>
      </ui>
      </div>
      <div className="flex">
      <div className="text-gray-600 font-bold w-1/3">PPT </div>
      <div className="mx-2">:</div>
      <ui className="list-none">
        <li>
          <a href="/" className="text-blue-700  hover:text-purple-800">Link 1</a>
        </li>
        <li>
          <a href="/" className="text-blue-700  hover:text-purple-800">Link 2</a>
        </li>
      </ui>
      </div>
      <div className="flex">
      <div className="text-gray-600 font-bold w-1/3">Links </div>
      <div className="mx-2">:</div>
      <ui className="list-none">
        <li>
          <a href="/" className="text-blue-700  hover:text-purple-800">Link 1</a>
        </li>
        <li>
          <a href="/" className="text-blue-700  hover:text-purple-800">Link 2</a>
        </li>
      </ui>
      </div>
      </div>
    
    </div>
  
    </>
  );
};

export default Remedies;
