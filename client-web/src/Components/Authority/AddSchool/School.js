import React from "react";
import { useNavigate } from "react-router-dom";
import SchoolDataTable from "./SchoolDataTable";

const School = () => {
  const navigate = useNavigate();
  return (
    <div className="px-4">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => {
            navigate("/authority/addschool");
          }}
          className="items-end cta-btn font-semibold py-4 mt-5 rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-lg hover:shadow-xl "
        >
          Add School
        </button>
      </div>
      <SchoolDataTable />
    </div>
  );
};

export default School;
