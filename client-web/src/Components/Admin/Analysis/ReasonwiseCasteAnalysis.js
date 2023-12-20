import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const ReasonwiseCasteAnalysis = ({
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
        text: "Reason and Caste wise Dropout Analysis",
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
      `http://localhost:9999/FilterStudentinGroupByTwo?state=${selectedState}&district=${selectedDistrict}&city=${selectedCity}&taluka=${selectedTaluka}&type1=Reasons&type2=Caste&standard=${standard}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);

        const data = result.data.StudentsData;

        // console.log(uniqueReasonCasteWiseCount);
        const casteReasonCounts = {
          ST: [],
          SEBC: [],
          SC: [],
          General: [],
        };

        // Initialize an object to store unique reasons
        const uniqueReasons = {};

        // Iterate through the studentsData array
        data.forEach((student) => {
          const { numOfStudent, Reasons, Caste } = student;

          // Add the reason to the uniqueReasons object
          uniqueReasons[Reasons] = true;

          // Initialize the array for the caste if not exists
          if (!casteReasonCounts[Caste]) {
            casteReasonCounts[Caste] = [];
          }

          // Update the count for the reason
          casteReasonCounts[Caste].push({
            reason: Reasons,
            count: numOfStudent,
          });
        });

        // Convert the uniqueReasons object to an array
        const uniqueReasonArray = Object.keys(uniqueReasons);

        // Convert the casteReasonCounts object to arrays
        const resultArrayST = casteReasonCounts.ST.map((entry) => entry.count);
        const resultArraySEBC = casteReasonCounts.SEBC.map(
          (entry) => entry.count
        );
        const resultArraySC = casteReasonCounts.SC.map((entry) => entry.count);
        const resultArrayGeneral = casteReasonCounts.General.map(
          (entry) => entry.count
        );

        // console.log("ST Array:", resultArrayST);
        // console.log("SEBC Array:", resultArraySEBC);
        // console.log("SC Array:", resultArraySC);
        // console.log("General Array:", resultArrayGeneral);

        setChartData({
          ...chartData,
          series: [
            {
              name: "ST",
              data: resultArrayST,
            },
            {
              name: "SC",
              data: resultArraySC,
            },
            {
              name: "SEBC",
              data: resultArraySEBC,
            },
            {
              name: "General",
              data: resultArrayGeneral,
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

export default ReasonwiseCasteAnalysis;
