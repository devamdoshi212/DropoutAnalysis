import { useEffect, useState } from "react";
import FetchState from "../../../API/FetchState";
import FetchDistrict from "../../../API/FetchDistrict";
import FetchTaluka from "../../../API/FetchTaluka";
import FetchCity from "../../../API/FetchCity";
import StandardwiseDropoutAnalysis from "./StandardwiseDropoutAnalysis";
import GenderwiseDropoutAnalysis from "./GenderwiseDropoutAnalysis";
import ReasonwiseDropoutAnalysis from "./ReasonwiseDropoutAnalysis";
import CastewiseDropoutAnalysis from "./CastewiseDropoutAnalysis";
import DisablitywiseDropoutAnalysis from "./DisablitywiseDropoutAnalysis";
import FamilyIncomewiseDropoutAnalysis from "./IncomewiseDropoutAnalysis";
import ReasonwiseGenderDropoutAnalysis from "./ReasonwiseGenderDropoutAnalysis";
import YearwiseGenderAnalysis from "./YearwiseGenderAnalysis";
import MediumwiseDropoutAnalysis from "./MediumwiseDropoutAnalysis";
import AreawiseDropoutAnalysis from "./AreawiseDropoutAnalysis";
import ParentOccupationwiseDropoutAnalysis from "./ParentOccupationwiseDropoutAnalysis";
import StandardGenderwiseAnalysis from "./StandardGenderwiseAnalysis";
import ReasonAreawiseAnalysis from "./ReasonAreawiseAnalysis";
import YearwiseLineChart from "./LineChart/YearwiseChart";
import ParentEducationwiseAnalysis from "./ParentEducationwiseAnalysis";
import AcademicsWiseAnalysis from "./AcademicsWiseAnalysis";
import DropoutReasonwiseTrend from "./LineChart/DropoutReasonwiseTrend";
import ParentMaritalwiseAnalysis from "./ParentMaritalwiseAnalysis";
import ReasonwiseCasteAnalysis from "./ReasonwiseCasteAnalysis";
import AreaReasonwiseAnalysis from "./AreaReasonwiseAnalysis";
import ReasonwiseFamilyIncomeAnalysis from "./ReasonwiseFamilyIncomeAnalysis";

import FetchReasons from "../../../API/FetchReasons";
const Analysis = () => {
  const [stateName, setStateName] = useState([]);
  const [TalukaName, setTalukaName] = useState([]);
  const [DistrictName, setDistrictName] = useState([]);
  const [CityName, setCityName] = useState([]);

  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedTaluka, setSelectedTaluka] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [standard, setStandard] = useState("");
  const [flag, setflag] = useState("0");
  const [type, setType] = useState("0");

  const [reason, setReasons] = useState([]);
  const [rea, setRea] = useState("");
  useEffect(() => {
    FetchState().then((res) => {
      setStateName(res);
    });
    FetchReasons().then((res) => {
      setReasons(res);
    });
  }, []);

  return (
    <>
      <div className="m-5">
        <div className="flex mb-5">
          <label className="w-1/4 m-4">
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
          <label className="w-1/4 m-4">
            <span className="text-gray-500 font-bold w-1/3">
              Select District
            </span>
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
          <label className="w-1/4 m-4">
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
          <label className="w-1/4 m-4">
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
        </div>
        <StandardwiseDropoutAnalysis
          selectedCity={selectedCity}
          selectedTaluka={selectedTaluka}
          selectedDistrict={selectedDistrict}
          selectedState={selectedState}
        />
        <div className="flex">
          <label className="w-1/4 m-4">
            <span className="text-gray-500 font-bold w-1/3">Select Standard</span>
            <select
              className="mt-1 p-2 w-full border rounded-md focus:outline-2 focus:outline-gray-400"
              value={standard}
              onChange={(e) => {
                setStandard(e.target.value);
              }}
              required
            >
              <option value="">Select Standard</option>
              <option value="1">Standard 1</option>
              <option value="2">Standard 2</option>
              <option value="3">Standard 3</option>
              <option value="4">Standard 4</option>
              <option value="5">Standard 5</option>
              <option value="6">Standard 6</option>
              <option value="7">Standard 7</option>
              <option value="8">Standard 8</option>
              <option value="9">Standard 9</option>
              <option value="10">Standard 10</option>
            </select>
          </label>
          <label className="w-1/4 m-4">
            <span className="text-gray-500 font-bold w-1/3">Select Type</span>
            <select
              className="mt-1 p-2 w-full border rounded-md focus:outline-2 focus:outline-gray-400"
              value={flag}
              onChange={(e) => {
                setflag(e.target.value);
              }}
              required
            >
              <option value="">Select Type</option>
              <option value="1">Gender</option>
              <option value="2">Caste</option>
              <option value="3">Area</option>
              <option value="4">Family Income</option>
            </select>
          </label>
        </div>

        {flag === "0" && (
          <ReasonwiseDropoutAnalysis
            selectedCity={selectedCity}
            selectedTaluka={selectedTaluka}
            selectedDistrict={selectedDistrict}
            selectedState={selectedState}
            standard={standard}
          />
        )}
        {flag === "1" && (
          <ReasonwiseGenderDropoutAnalysis
            selectedCity={selectedCity}
            selectedTaluka={selectedTaluka}
            selectedDistrict={selectedDistrict}
            selectedState={selectedState}
            standard={standard}
          />
        )}
        {flag === "2" && (
          <ReasonwiseCasteAnalysis
            selectedCity={selectedCity}
            selectedTaluka={selectedTaluka}
            selectedDistrict={selectedDistrict}
            selectedState={selectedState}
            standard={standard}
          />
        )}
        {flag === "3" && (
          <AreaReasonwiseAnalysis
            selectedCity={selectedCity}
            selectedTaluka={selectedTaluka}
            selectedDistrict={selectedDistrict}
            selectedState={selectedState}
            standard={standard}
          />
        )}
        {flag === "4" && (
          <ReasonwiseFamilyIncomeAnalysis
            selectedCity={selectedCity}
            selectedTaluka={selectedTaluka}
            selectedDistrict={selectedDistrict}
            selectedState={selectedState}
            standard={standard}
          />
        )}

        {/* <label className="w-1/4 m-4">
          <span className="text-gray-500 font-bold w-1/3">Select State</span>
          <select
            className="mt-1 p-2 w-full border rounded-md focus:outline-2 focus:outline-gray-400"
            value={rea}
            onChange={(e) => {
              setRea(e.target.value);
            }}
            required
          >
            <option value="">Select Reason</option>
            {reason.map((item, index) => (
              <option key={index} value={item._id}>
                {item.reason}
              </option>
            ))}
          </select>
        </label>
        <label className="w-1/4 m-4">
          <span className="text-gray-500 font-bold w-1/3">Select Type</span>
          <select
            className="mt-1 p-2 w-full border rounded-md focus:outline-2 focus:outline-gray-400"
            value={type}
            onChange={(e) => {
              setType(e.target.value);
            }}
            required
          >
            <option value="">Select Type</option>
            <option value="1">Gender</option>
            <option value="2">Caste</option>
            <option value="3">Area</option>
            <option value="4">Family Income</option>
          </select>
        </label> */}
        <ReasonwiseDropoutAnalysis
          selectedCity={selectedCity}
          selectedTaluka={selectedTaluka}
          selectedDistrict={selectedDistrict}
          selectedState={selectedState}
        />
        <YearwiseGenderAnalysis
          selectedCity={selectedCity}
          selectedTaluka={selectedTaluka}
          selectedDistrict={selectedDistrict}
          selectedState={selectedState}
        />
        <YearwiseLineChart
          selectedCity={selectedCity}
          selectedTaluka={selectedTaluka}
          selectedDistrict={selectedDistrict}
          selectedState={selectedState}
        />
        <DropoutReasonwiseTrend
          selectedCity={selectedCity}
          selectedTaluka={selectedTaluka}
          selectedDistrict={selectedDistrict}
          selectedState={selectedState}
        />
        {/* <ReasonAreawiseAnalysis
          selectedCity={selectedCity}
          selectedTaluka={selectedTaluka}
          selectedDistrict={selectedDistrict}
          selectedState={selectedState}
          standard={standard}
        /> */}

        <CastewiseDropoutAnalysis
          selectedCity={selectedCity}
          selectedTaluka={selectedTaluka}
          selectedDistrict={selectedDistrict}
          selectedState={selectedState}
        />
        <DisablitywiseDropoutAnalysis
          selectedCity={selectedCity}
          selectedTaluka={selectedTaluka}
          selectedDistrict={selectedDistrict}
          selectedState={selectedState}
        />
        <FamilyIncomewiseDropoutAnalysis
          selectedCity={selectedCity}
          selectedTaluka={selectedTaluka}
          selectedDistrict={selectedDistrict}
          selectedState={selectedState}
        />
        <ReasonwiseGenderDropoutAnalysis
          selectedCity={selectedCity}
          selectedTaluka={selectedTaluka}
          selectedDistrict={selectedDistrict}
          selectedState={selectedState}
        />

        <MediumwiseDropoutAnalysis
          selectedCity={selectedCity}
          selectedTaluka={selectedTaluka}
          selectedDistrict={selectedDistrict}
          selectedState={selectedState}
        />
        <AreawiseDropoutAnalysis
          selectedCity={selectedCity}
          selectedTaluka={selectedTaluka}
          selectedDistrict={selectedDistrict}
          selectedState={selectedState}
        />
        <ParentOccupationwiseDropoutAnalysis
          selectedCity={selectedCity}
          selectedTaluka={selectedTaluka}
          selectedDistrict={selectedDistrict}
          selectedState={selectedState}
        />
        {/* <StandardGenderwiseAnalysis
          selectedCity={selectedCity}
          selectedTaluka={selectedTaluka}
          selectedDistrict={selectedDistrict}
          selectedState={selectedState}
        /> */}

        <ParentEducationwiseAnalysis
          selectedCity={selectedCity}
          selectedTaluka={selectedTaluka}
          selectedDistrict={selectedDistrict}
          selectedState={selectedState}
        />
        <AcademicsWiseAnalysis
          selectedCity={selectedCity}
          selectedTaluka={selectedTaluka}
          selectedDistrict={selectedDistrict}
          selectedState={selectedState}
        />

        <ParentMaritalwiseAnalysis
          selectedCity={selectedCity}
          selectedTaluka={selectedTaluka}
          selectedDistrict={selectedDistrict}
          selectedState={selectedState}
        />
        <GenderwiseDropoutAnalysis
          selectedCity={selectedCity}
          selectedTaluka={selectedTaluka}
          selectedDistrict={selectedDistrict}
          selectedState={selectedState}
        />
      </div>
    </>
  );
};

export default Analysis;
