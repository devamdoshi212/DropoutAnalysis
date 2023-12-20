import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const ReasonwiseFamilyIncomeAnalysis = ({
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
        text: "Reason and Family Income wise Dropout Analysis",
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
      `http://localhost:9999/FilterStudentinGroupByTwo?state=${selectedState}&district=${selectedDistrict}&city=${selectedCity}&taluka=${selectedTaluka}&type1=Reasons&type2=FamilyIncome&standard=${standard}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        const data = result.data.StudentsData;
        console.log(data);
        const incomeReasonCounts = {
          "More than 6 lakh": [],
          "4-6 Lakh": [],
          "2-4 Lakh": [],
          "1-2 Lakh": [],
        };

        // Initialize an object to store unique reasons
        const uniqueReasons = {};

        // Iterate through the studentsData array
        data.forEach((student) => {
          const { numOfStudent, Reasons, FamilyIncome } = student;

          // Add the reason to the uniqueReasons object
          uniqueReasons[Reasons] = true;

          // Initialize the array for the income category if not exists
          if (!incomeReasonCounts[FamilyIncome]) {
            incomeReasonCounts[FamilyIncome] = [];
          }

          // Update the count for the reason and income category
          incomeReasonCounts[FamilyIncome].push({
            reason: Reasons,
            count: numOfStudent,
          });
        });

        // Convert the uniqueReasons object to an array
        const uniqueReasonArray = Object.keys(uniqueReasons);

        // Convert the incomeReasonCounts object to arrays
        const resultArrayMoreThan6Lakh = incomeReasonCounts[
          "More than 6 lakh"
        ].map((entry) => entry.count);
        const resultArray4to6Lakh = incomeReasonCounts["4-6 Lakh"].map(
          (entry) => entry.count
        );
        const resultArray2to4Lakh = incomeReasonCounts["2-4 Lakh"].map(
          (entry) => entry.count
        );
        const resultArray1to2Lakh = incomeReasonCounts["1-2 Lakh"].map(
          (entry) => entry.count
        );

        setChartData({
          ...chartData,
          series: [
            {
              name: "More Than 6 Lakh",
              data: resultArrayMoreThan6Lakh,
            },
            {
              name: "Between 4 to 6 Lakh",
              data: resultArray4to6Lakh,
            },
            {
              name: "Between 2 to 4 Lakh",
              data: resultArray2to4Lakh,
            },
            {
              name: "Between 1 to 2 Lakh",
              data: resultArray1to2Lakh,
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

export default ReasonwiseFamilyIncomeAnalysis;
