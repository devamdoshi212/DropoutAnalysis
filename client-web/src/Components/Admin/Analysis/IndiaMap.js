// Step 1 - Including react
import React from "react";
import ReactDOM from "react-dom";

// Step 2 - Including the react-fusioncharts component
import ReactFC from "react-fusioncharts";

// Step 3 - Including the fusioncharts library
import FusionCharts from "fusioncharts";

// Step 4 - Including the map renderer
import FusionMaps from "fusioncharts/fusioncharts.maps";

// Step 5 - Including the map definition file for India
import India from "fusionmaps/maps/fusioncharts.india";

// Step 6 - Including the theme as fusion
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

// Step 7 - Adding the map and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, FusionMaps, India, FusionTheme);

// Step 8 - Defining map data for India
const mapData = [
  { id: "IN.AP", value: 1000 },
  { id: "IN.AR", value: 2000 },
  // Add more data for other states as needed
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

// Step 9 - Creating the JSON object to store the map configurations
const chartConfigs = {
  type: "maps/india",
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
      caption: "Dropout Rate in India",
      connectorcolor: "000000",
      fillalpha: "80",
      hovercolor: "CCCCCC",
      theme: "fusion",
    },
    colorrange: colorrange,
    data: mapData,
  },
};

const IndiaMap = () => {
  return (
    <>
      <div className="m-auto">
        <ReactFC {...chartConfigs} />;
      </div>
    </>
  );
};

export default IndiaMap;
