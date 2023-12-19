// Step 1 - Including react
import React, { useState, useEffect } from "react";

// Step 2 - Including the react-fusioncharts component
import ReactFC from "react-fusioncharts";

// Step 3 - Including the fusioncharts library
import FusionCharts from "fusioncharts";

// Step 4 - Including the map renderer
import FusionMaps from "fusioncharts/fusioncharts.maps";
import { useSelector } from "react-redux";

// Step 5 - Including the map definition file
import Gujarat from "fusionmaps/maps/fusioncharts.gujarat";
import Madhyapradesh from "fusionmaps/maps/fusioncharts.madhyapradesh";
import Karnataka from "fusionmaps/maps/fusioncharts.karnataka";
import Rajasthan from "fusionmaps/maps/fusioncharts.rajasthan";
import Uttarpradesh from "fusionmaps/maps/fusioncharts.uttarpradesh";
import Maharashtra from "fusionmaps/maps/fusioncharts.maharashtra";
import Tamilnadu from "fusionmaps/maps/fusioncharts.tamilnadu";

// Step 6 - Including the theme as fusion
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import FetchDistrict from "../../../API/FetchDistrict";
import FetchReasons from "../../../API/FetchReasons";

// Step 7 - Adding the map and theme as dependency to the core fusioncharts
ReactFC.fcRoot(
  FusionCharts,
  FusionMaps,
  Gujarat,
  Madhyapradesh,
  Karnataka,
  Rajasthan,
  Uttarpradesh,
  Maharashtra,
  Tamilnadu,
  FusionTheme
);

const stateAbbreviation = (state) => {
  switch (state) {
    case "Andaman and Nicobar Islands":
      return "AN";
    case "Andhra Pradesh":
      return "AP";
    case "Arunachal Pradesh":
      return "AR";
    case "Assam":
      return "AS";
    case "Bihar":
      return "BI";
    case "Chandigarh":
      return "CH";
    case "Chhattisgarh":
      return "CA";
    case "Dadra and Nagar Haveli":
      return "DN";
    case "Daman and Diu":
      return "DD";
    case "Delhi":
      return "DE";
    case "Goa":
      return "GO";
    case "Gujarat":
      return "GU";
    case "Haryana":
      return "HA";
    case "Himachal Pradesh":
      return "HP";
    case "Jammu and Kashmir":
      return "JK";
    case "Jharkhand":
      return "JH";
    case "Karnataka":
      return "KA";
    case "Kerala":
      return "KE";
    case "Ladakh":
      return "LA";
    case "Lakshadweep":
      return "LK";
    case "Madhya Pradesh":
      return "MP";
    case "Maharashtra":
      return "MA";
    case "Manipur":
      return "MN";
    case "Meghalaya":
      return "ME";
    case "Mizoram":
      return "MI";
    case "Nagaland":
      return "NA";
    case "Odisha":
      return "OR";
    case "Puducherry":
      return "PO";
    case "Punjab":
      return "PU";
    case "Rajasthan":
      return "RA";
    case "Sikkim":
      return "SI";
    case "Tamil Nadu":
      return "TN";
    case "Telangana":
      return "TL";
    case "Tripura":
      return "TR";
    case "Uttar Pradesh":
      return "UP";
    case "Uttarakhand":
      return "UT";
    case "West Bengal":
      return "WB";
    default:
      return "Unknown";
  }
};

const DistrictCode = (district) => {
  switch (district) {
    case "Ahmedabad":
      return "AH";
    case "Amreli":
      return "AM";
    case "Anand":
      return "AN";
    case "Aravalli":
      return "AR";
    case "Banaskantha":
      return "BK";
    case "Bharuch":
      return "BR";
    case "Bhavnagar":
      return "BN";
    case "Botad":
      return "BT";
    case "Chhota Udepur":
      return "CU";
    case "Dahod":
      return "DA";
    case "Devbhoomi Dwarka":
      return "DD";
    case "Gandhinagar":
      return "GA";
    case "Gir Somnath":
      return "GS";
    case "Jamnagar":
      return "JM";
    case "Junagadh":
      return "JG";
    case "Kachchh":
      return "KA";
    case "Kheda":
      return "KD";
    case "Mehsana":
      return "MA";
    case "Mahisagar":
      return "MS";
    case "Morbi":
      return "MB";
    case "Narmada":
      return "NR";
    case "Navsari":
      return "NV";
    case "Panchmahal":
      return "PC";
    case "Patan":
      return "PA";
    case "Porbandar":
      return "PO";
    case "Rajkot":
      return "RK";
    case "Sabarkantha":
      return "SB";
    case "Surat":
      return "SR";
    case "Surendranagar":
      return "SD";
    case "Tapi":
      return "TP";
    case "Dangs (Ahwa)":
      return "DG";
    case "Vadodara":
      return "VA";
    case "Valsad":
      return "VL";
    default:
      return "Unknown";
  }
};

//Step 8 - Defining map data
const mapData = [
  { id: "IN.GU.AN", value: 1000 },
  { id: "IN.GU.AM", value: 2000 },
  { id: "IN.GU.AR", value: 3000 },
  { id: "IN.GU.BK", value: 4000 },
  { id: "IN.GU.AH", value: 4500 },
];

// const defaultColor = "F8EF78";
const getColorBasedOnValue = (value) => {
  if (value > 30) {
    return "FF0000"; // Red for values greater than 30
  } else if (value >= 10 && value <= 30) {
    return "459E40"; // Blue for values between 10 and 30 (inclusive)
  } else {
    return "459E40"; // Green for values less than 10
  }
};

const colorrange = {
  minvalue: "0",
  startlabel: "Low",
  endlabel: "High",
  code: "e44a00",
  gradient: "1",
  color: [
    { maxvalue: "10", code: getColorBasedOnValue(10) },
    { maxvalue: "30", code: getColorBasedOnValue(30) },
    { maxvalue: "60", code: getColorBasedOnValue(60) },
    { maxvalue: "100", code: getColorBasedOnValue(100) },
  ],
};

//dynamic State convert small case
const s = "gujarat";
// Step 9 - Creating the JSON object to store the map configurations
const chartConfigs = {
  type: `maps/${s}`,
  width: "1000",
  height: "650",
  dataFormat: "json",
  dataSource: {
    chart: {
      animation: "0",
      showbevel: "0",
      usehovercolor: "1",
      showlegend: "1",
      legendposition: "BOTTOM",
      legendborderalpha: "0",
      legendbordercolor: "ffffff",
      legendallowdrag: "0",
      legendshadow: "0",
      caption: `Dropout Rate in District of ${s}`,
      connectorcolor: "000000",
      fillalpha: "80",
      hovercolor: "CCCCCC",
      theme: "fusion",
    },
    colorrange: colorrange,
    data: mapData,
  },
};

const StateMap = () => {
  const [District, setDistrict] = useState([]);
  const [Reasons, SetReasons] = useState([]);
  const [selectedReasons, setSelectedReasons] = useState("");
  const [selectedcast, setSelectedCaste] = useState("");
  const [selecYear, setSelectedYear] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedstandard, setSelectedStandard] = useState("");

  const userData = useSelector((state) => state.user.user);

  const state = userData.State.name;
  const stateId = userData.State._id;
  const [chartConfigs, setChartConfigs] = useState({
    type: `maps/${s}`,
    width: "1000",
    height: "650",
    dataFormat: "json",
    dataSource: {
      chart: {
        animation: "0",
        showbevel: "0",
        usehovercolor: "1",
        showlegend: "1",
        legendposition: "BOTTOM",
        legendborderalpha: "0",
        legendbordercolor: "ffffff",
        legendallowdrag: "0",
        legendshadow: "0",
        caption: `Dropout Rate in District of ${s}`,
        connectorcolor: "000000",
        fillalpha: "80",
        hovercolor: "CCCCCC",
        theme: "fusion",
      },
      colorrange: colorrange,
      data: mapData,
    },
  });
  const stateCode = stateAbbreviation(state);

  useEffect(() => {
    FetchReasons().then((res) => {
      console.log(res);
      SetReasons(res);
    });
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    fetch(
      `http://localhost:9999/DistrictWiseData?state=${stateId}&reason=${selectedReasons}&year=${selecYear}&caste=${selectedcast}&gender=${selectedGender}&standard=${selectedstandard}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setDistrict(result.data.StudentsData);
      })
      .catch((error) => console.log("error", error));
  }, [
    stateId,
    selectedReasons,
    selecYear,
    selectedGender,
    selectedcast,
    selectedstandard,
  ]);

  useEffect(() => {
    const object = District.map((item) => DistrictCode(item.district));

    const conarray = object.map((item, index) => ({
      id: `IN.${stateCode}.${item}`,
      value: District[index].numOfStudent || 0,
    }));

    updateChartConfig(
      conarray,
      `Dropout Rate in District of ${state}`,
      `maps/${state.toLowerCase().split(" ").join("")}`
    );
  }, [District, state, stateCode]);

  const updateChartConfig = (newData, newCaption, newType) => {
    setChartConfigs((prevChartConfigs) => ({
      ...prevChartConfigs,
      type: newType,
      dataSource: {
        ...prevChartConfigs.dataSource,
        data: newData,
        chart: {
          ...prevChartConfigs.dataSource.chart,
          caption: newCaption,
        },
      },
    }));
  };
  const handleReason = (e) => {
    setSelectedReasons(e.target.value);
  };

  const handleCaste = (e) => {
    setSelectedCaste(e.target.value);
  };
  const handleGender = (e) => {
    setSelectedGender(e.target.value);
  };
  const handleStandard = (e) => {
    setSelectedStandard(e.target.value);
  };
  const handleYear = (e) => {
    setSelectedYear(e.target.value);
  };
  return (
    <>
      <div className="m-auto">
        <div className="flex ">
          <div className="m-5 w-1/5">
            <select
              name="dropoutreason"
              className="p-2 border border-gray-300 rounded w-full outline-2 focus:outline-gray-500 "
              onChange={handleReason}
            >
              <option value="">Select Reason</option>
              {Reasons.map((item, index) => (
                <option key={index} value={item.reason}>
                  {item.reason}
                </option>
              ))}
            </select>
          </div>
          <div className=" m-5 w-1/5">
            <select
              name="dropoutreason"
              className="p-2 border border-gray-300 rounded w-full outline-2 focus:outline-gray-500 "
              onChange={handleCaste}
            >
              <option value="">Select Caste</option>
              <option value="Open">Open</option>
              <option value="General">General-EWS</option>
              <option value="SEBC">SEBC</option>
              <option value="SC">SC</option>
              <option value="ST">ST</option>
            </select>
          </div>
          <div className=" m-5 w-1/5">
            <select
              name="dropoutreason"
              className="p-2 border border-gray-300 rounded w-full outline-2 focus:outline-gray-500 "
              onChange={handleStandard}
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
          </div>
          <div className=" m-5 w-1/5">
            <select
              name="dropoutreason"
              className="p-2 border border-gray-300 rounded w-full outline-2 focus:outline-gray-500 "
              onChange={handleGender}
            >
              <option value="">Select Gender</option>

              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className=" m-5 w-1/5">
            <select
              name="dropoutreason"
              className="p-2 border border-gray-300 rounded w-full outline-2 focus:outline-gray-500 "
              onChange={handleYear}
            >
              <option value="">Select Year</option>

              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
            </select>
          </div>
        </div>
      </div>
      <div className="m-auto">
        <ReactFC {...chartConfigs} />;
      </div>
    </>
  );
};

export default StateMap;
