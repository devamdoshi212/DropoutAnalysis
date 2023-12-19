import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const MediumwiseDropoutAnalysis = ({
  selectedCity,
  selectedTaluka,
  selectedDistrict,
  selectedState,
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
        formatter: function (val) {
          return val + "%"; // Append "%" to the label
        },
      },
      xaxis: {
        categories: ["Cricket", "Basket Ball", "Volly Ball", "Tennis"],
      },
      yaxis: {
        title: {
          text: "Percentage of Dropout Students",
          style: {
            fontSize: "12px",
            // fontWeight: "bold",
            fontFamily: undefined,
            color: "#263238",
          }, // Your Y-axis title
        },
      },
      colors: ["#3498db", "#2980b9"],
      title: {
        text: "Medium wise Dropout Analysis",
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
      `http://localhost:9999/mediumWise?state=${selectedState}&district=${selectedDistrict}&city=${selectedCity}&taluka=${selectedTaluka}&school`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        let datas = result.data;
        // const categories = datas.StudentsData.map((s) => s.schoolType);
        // const percentages = datas.StudentsData.map((student, index) => {
        //   const totalStudent = datas.total[index].numOfStudent;
        //   return parseFloat(
        //     ((student.numOfStudent / totalStudent) * 100).toFixed(2)
        //   );
        // });

        const categories = datas.StudentsData.map((s) => s.schoolType);

        const percentages = datas.StudentsData.map((student, index) => {
          const schoolType = student.schoolType;

          const totalStudent = datas.total.find((total) => total.schoolType === schoolType);

          if (totalStudent) {
            const percentage = parseFloat(((student.numOfStudent / totalStudent.numOfStudent) * 100).toFixed(2));
            return percentage;
          } else {
            return 0;
          }
        });

        setChartData({
          ...chartData,
          series: [
            {
              name: "Medium",
              data: percentages,
            },
          ],
          options: {
            ...chartData.options,
            xaxis: {
              ...chartData.options.xaxis,
              categories: categories,
            },
          },
        });
      })
      .catch((error) => console.log("error", error));
  }, [selectedCity, selectedDistrict, selectedState, selectedTaluka]);

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

export default MediumwiseDropoutAnalysis;
