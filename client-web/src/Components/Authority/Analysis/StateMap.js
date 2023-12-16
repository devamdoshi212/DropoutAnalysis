// Step 1 - Including react
import React from "react";

// Step 2 - Including the react-fusioncharts component
import ReactFC from "react-fusioncharts";

// Step 3 - Including the fusioncharts library
import FusionCharts from "fusioncharts";

// Step 4 - Including the map renderer
import FusionMaps from "fusioncharts/fusioncharts.maps";

// Step 5 - Including the map definition file
import Gujarat from "fusionmaps/maps/fusioncharts.gujarat";

// Step 6 - Including the theme as fusion
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

// Step 7 - Adding the map and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, FusionMaps, Gujarat, FusionTheme);

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

const District = (district) => {
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

const colorrange = {
  minvalue: "0",
  startlabel: "Low",
  endlabel: "High",
  code: "e44a00",
  gradient: "1",
  color: [
    { maxvalue: "2500", code: "f8bd19" },
    { maxvalue: "5000", code: "6baa01" },
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
  return (
    <>
      <div>
        <ReactFC {...chartConfigs} />;
      </div>
    </>
  );
};

export default StateMap;
