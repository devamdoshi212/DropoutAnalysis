import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const AreaReasonwiseAnalysis = ({
  selectedCity,
  selectedTaluka,
  selectedDistrict,
  selectedState,
  standard,
}) => {
  const [chartData, setChartData] = useState({
    series: [
      {
        name: "Capacity",
        data: [30, 40, 35, 50],
      },
      {
        name: "Enroll Athelte",
        data: [49, 60, 10, 12],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: true,
        offsetY: -10,
        style: {
          fontSize: "12px",
          fontWeight: "bold",
          colors: ["#000"],
        },
      },
      xaxis: {
        categories: ["Cricket", "Basket Ball", "Volly Ball", "Tennis"],
      },
      yaxis: {
        title: {
          text: "Number of Dropout Student",
          style: {
            fontSize: "12px",
            // fontWeight: "bold",
            fontFamily: undefined,
            color: "#263238",
          }, // Your Y-axis title
        },
      },
      colors: ["#1abc9c", "#3498db", "#e74c3c", "#f39c12"],
      title: {
        text: "Reason and Area Type wise Dropout Analysis",
        align: "center",
        margin: 50,
        offsetX: 0,
        offsetY: 0,
        floating: false,
        style: {
          fontSize: "26px",
          fontWeight: "bold",
          fontFamily: undefined,
          color: "#263238",
        },
      },
      fill: {
        opacity: 1,
      },
    },
  });

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `http://localhost:9999/ReasonAndAreaWise?state=${selectedState}&district=${selectedDistrict}&city=${selectedCity}&taluka=${selectedTaluka}&standard=${standard}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);

        const data = result.data.StudentsData;
        console.log(data);
        const citytypeReasonCounts = {
          0: [],
          1: [],
        };

        // Initialize an object to store unique reasons
        const uniqueReasons = {};

        // Iterate through the studentsData array
        data.forEach((student) => {
          const { numOfStudent, reason, citytype } = student;

          // Add the reason to the uniqueReasons object
          uniqueReasons[reason] = true;

          // Initialize the array for the citytype if not exists
          if (!citytypeReasonCounts[citytype]) {
            citytypeReasonCounts[citytype] = [];
          }

          // Update the count for the reason and citytype
          citytypeReasonCounts[citytype].push({ reason, count: numOfStudent });
        });

        // Convert the uniqueReasons object to an array
        const uniqueReasonArray = Object.keys(uniqueReasons);

        // Convert the citytypeReasonCounts object to arrays
        const resultArrayCitytype1 = citytypeReasonCounts["1"].map(
          (entry) => entry.count
        );
        const resultArrayCitytype0 = citytypeReasonCounts["0"].map(
          (entry) => entry.count
        );

        setChartData({
          ...chartData,
          series: [
            {
              name: "Urban",
              data: resultArrayCitytype1,
            },
            {
              name: "Rural",
              data: resultArrayCitytype0,
            },
          ],
          options: {
            ...chartData.options,
            xaxis: {
              ...chartData.options.xaxis,
              categories: uniqueReasonArray,
            },
          },
        });
      })
      .catch((error) => console.log("error", error));
  }, [selectedCity, selectedDistrict, selectedState, selectedTaluka, standard]);

  return (
    <div className="chart m-8">
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="bar"
        height={chartData.options.chart.height}
      />
    </div>
  );
};

export default AreaReasonwiseAnalysis;
