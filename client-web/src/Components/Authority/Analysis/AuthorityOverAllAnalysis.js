import { useEffect, useState } from "react";
import FetchState from "../../../API/FetchState";
import FetchDistrict from "../../../API/FetchDistrict";
import FetchTaluka from "../../../API/FetchTaluka";
import FetchCity from "../../../API/FetchCity";
import StandardwiseDropoutAnalysis from "../../Admin/OverAllAnalysis/StandardwiseDropoutAnalysis";
import GenderwiseDropoutAnalysis from "../../Admin/OverAllAnalysis/GenderwiseDropoutAnalysis";
import ReasonwiseDropoutAnalysis from "../../Admin/OverAllAnalysis/ReasonwiseDropoutAnalysis";
import CastewiseDropoutAnalysis from "../../Admin/OverAllAnalysis/CastewiseDropoutAnalysis";
import DisablitywiseDropoutAnalysis from "../../Admin/OverAllAnalysis/DisablitywiseDropoutAnalysis";
import FamilyIncomewiseDropoutAnalysis from "../../Admin/OverAllAnalysis/IncomewiseDropoutAnalysis";
import ReasonwiseGenderDropoutAnalysis from "../../Admin/OverAllAnalysis/ReasonwiseGenderDropoutAnalysis";
import YearwiseGenderAnalysis from "../../Admin/OverAllAnalysis/YearwiseGenderAnalysis";
import MediumwiseDropoutAnalysis from "../../Admin/OverAllAnalysis/MediumwiseDropoutAnalysis";
import AreawiseDropoutAnalysis from "../../Admin/OverAllAnalysis/AreawiseDropoutAnalysis";
import ParentOccupationwiseDropoutAnalysis from "../../Admin/OverAllAnalysis/ParentOccupationwiseDropoutAnalysis";
import { useSelector } from "react-redux";
const Analysis = () => {
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedTaluka, setSelectedTaluka] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [TalukaName, setTalukaName] = useState([]);
    const [stateName, setStateName] = useState([]);

    const [DistrictName, setDistrictName] = useState([]);
    const [CityName, setCityName] = useState([]);
    const [selectedState, setSelectedState] = useState("");

    const userData = useSelector((state) => state.user.user);

    useEffect(() => {
        FetchDistrict(userData.State._id).then((res) => {
            setDistrictName(res);
        });
    }, [userData.State._id]);
    return (
        <>
            <div className="m-5">
                <div className="flex mb-5 justify-between">
                    <label className="w-1/4 m-3">
                        <span className="text-gray-700 font-bold w-1/3">Select District</span>
                        <select
                            className="mt-1 p-2 w-full border rounded-md focus:outline-2 focus:outline-gray-400"
                            value={selectedDistrict}
                            onChange={(e) => {
                                setSelectedDistrict(e.target.value);
                                FetchTaluka(userData.State._id, e.target.value).then((res) => {
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
                    <label className="w-1/4 m-3">
                        <span className="text-gray-700 font-bold w-1/3">Select Taluka</span>
                        <select
                            className="mt-1 p-2 w-full border rounded-md focus:outline-2 focus:outline-gray-400"
                            value={selectedTaluka}
                            onChange={(e) => {
                                setSelectedTaluka(e.target.value);
                                FetchCity(
                                    userData.State._id,
                                    selectedDistrict,
                                    e.target.value
                                ).then((res) => {
                                    console.log(res);
                                    setCityName(res);
                                });
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
                    <label className="w-1/4 m-3">
                        <span className="text-gray-700 font-bold w-1/3">Select City</span>
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
                    selectedState={userData.State._id}
                />
                <GenderwiseDropoutAnalysis
                    selectedCity={selectedCity}
                    selectedTaluka={selectedTaluka}
                    selectedDistrict={selectedDistrict}
                    selectedState={userData.State._id}
                />
                <ReasonwiseDropoutAnalysis
                    selectedCity={selectedCity}
                    selectedTaluka={selectedTaluka}
                    selectedDistrict={selectedDistrict}
                    selectedState={userData.State._id}
                />
                <CastewiseDropoutAnalysis
                    selectedCity={selectedCity}
                    selectedTaluka={selectedTaluka}
                    selectedDistrict={selectedDistrict}
                    selectedState={userData.State._id}
                />
                <DisablitywiseDropoutAnalysis
                    selectedCity={selectedCity}
                    selectedTaluka={selectedTaluka}
                    selectedDistrict={selectedDistrict}
                    selectedState={userData.State._id}
                />
                <FamilyIncomewiseDropoutAnalysis
                    selectedCity={selectedCity}
                    selectedTaluka={selectedTaluka}
                    selectedDistrict={selectedDistrict}
                    selectedState={userData.State._id}
                />
                <ReasonwiseGenderDropoutAnalysis
                    selectedCity={selectedCity}
                    selectedTaluka={selectedTaluka}
                    selectedDistrict={selectedDistrict}
                    selectedState={userData.State._id}
                />
                <YearwiseGenderAnalysis
                    selectedCity={selectedCity}
                    selectedTaluka={selectedTaluka}
                    selectedDistrict={selectedDistrict}
                    selectedState={userData.State._id}
                />
                <MediumwiseDropoutAnalysis
                    selectedCity={selectedCity}
                    selectedTaluka={selectedTaluka}
                    selectedDistrict={selectedDistrict}
                    selectedState={userData.State._id}
                />
                <AreawiseDropoutAnalysis
                    selectedCity={selectedCity}
                    selectedTaluka={selectedTaluka}
                    selectedDistrict={selectedDistrict}
                    selectedState={userData.State._id}
                />
                <ParentOccupationwiseDropoutAnalysis
                    selectedCity={selectedCity}
                    selectedTaluka={selectedTaluka}
                    selectedDistrict={selectedDistrict}
                    selectedState={userData.State._id}
                />
            </div>
        </>
    );
};

export default Analysis;
