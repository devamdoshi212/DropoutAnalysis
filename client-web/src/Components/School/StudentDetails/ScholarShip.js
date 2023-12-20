import { useLocation } from "react-router-dom";
import SCTable from "./SCTable";
const ScholarShip = () => {
  const location = useLocation();
  const data = location.state;
  console.log(data);
  return (
    <>
      <div className="bg-[#f8f9fa] m-5 h-screen">
        <div className=" mx-auto mt-8 p-4 bg-gray-100 rounded shadow-md shadow-gray-600 w-2/3 space-y-2">
          <div className="flex">
            <label className="w-1/2 text-gray-600 font-bold">Name </label>
            <div className="mx-2">:</div>
            <div>{data.Name}</div>
          </div>
          <div className="flex">
            <label className=" w-1/2 text-gray-600 font-bold">Caste</label>{" "}
            <div className="mx-2">:</div>
            <div>{data.Caste}</div>
          </div>
          <div className="flex">
            <label className="w-1/2 text-gray-600 font-bold">
              Family Income
            </label>{" "}
            <div className="mx-2">:</div> <div>{data.FamilyIncome}</div>
          </div>

          <div className="flex">
            <label className=" w-1/2 text-gray-600 font-bold">
              Parent Occupation{" "}
            </label>
            <div className="mx-2">:</div>
            <div>{data.ParentOccupation}</div>
          </div>
          <div className="flex">
            <label className="w-1/2 text-gray-600 font-bold">Standard </label>{" "}
            <div className="mx-2">:</div>
            <div>{data.Standard}</div>
          </div>
          <div className="flex">
            <label className=" w-1/2 text-gray-600 font-bold">
              AcademicLevel
            </label>{" "}
            <div className="mx-2">:</div>
            <div>{data.academicLevel === 0 ? "Low" : "High"}</div>{" "}
          </div>
          <div className="flex">
            <label className=" w-1/2 text-gray-600 font-bold">
              Contact Number
            </label>{" "}
            <div className="mx-2">:</div>
            <div>{data.ContactNumber}</div>
          </div>
          <div className="flex">
            <label className=" w-1/2 text-gray-600 font-bold">city </label>
            <div className="mx-2">:</div>
            <div>{data.City.city}</div>
          </div>
        </div>
        <SCTable />
      </div>
    </>
  );
};

export default ScholarShip;
