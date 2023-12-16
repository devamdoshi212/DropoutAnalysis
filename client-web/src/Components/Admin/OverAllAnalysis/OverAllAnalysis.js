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
const Analysis = () => {
    const [stateName, setStateName] = useState([]);
    const [TalukaName, setTalukaName] = useState([]);
    const [DistrictName, setDistrictName] = useState([]);
    const [CityName, setCityName] = useState([]);

    const [selectedState, setSelectedState] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedTaluka, setSelectedTaluka] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    useEffect(() => {
        FetchState().then((res) => {
            setStateName(res);
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
                <GenderwiseDropoutAnalysis
                    selectedCity={selectedCity}
                    selectedTaluka={selectedTaluka}
                    selectedDistrict={selectedDistrict}
                    selectedState={selectedState}
                />
                <ReasonwiseDropoutAnalysis
                    selectedCity={selectedCity}
                    selectedTaluka={selectedTaluka}
                    selectedDistrict={selectedDistrict}
                    selectedState={selectedState}
                />
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
                <YearwiseGenderAnalysis
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
            </div>
        </>
    );
};

export default Analysis;
