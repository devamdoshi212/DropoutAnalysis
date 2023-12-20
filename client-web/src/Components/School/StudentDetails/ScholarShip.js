import { useLocation } from "react-router-dom";

const ScholarShip = () => {
  const location = useLocation();
  const data = location.state;
  console.log(data);
  return (
    <>
      <div>Name :{data.Name}</div>
      <div>Caste :{data.Caste}</div>
      <div>Family Income :{data.FamilyIncome}</div>
      <div>Parent Occupation :{data.ParentOccupation}</div>
      <div>Standard :{data.Standard}</div>
      <div>AcademicLevel :{data.academicLevel === 0 ? "Low" : "High"}</div>
      <div>Contact Number :{data.ContactNumber}</div>
      <div>city :{data.City.city}</div>
    </>
  );
};

export default ScholarShip;
