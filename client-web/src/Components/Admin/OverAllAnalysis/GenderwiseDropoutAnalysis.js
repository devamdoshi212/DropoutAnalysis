import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const GenderwiseDropoutAnalysis = ({
  selectedCity,
  selectedTaluka,
  selectedDistrict,
  selectedState,
}) => {
  const [chartData, setChartData] = useState({
    series: [30, 40, 35, 50], // Adjust the series data accordingly
    options: {
      chart: {
        type: "donut", // Change the chart type to 'donut'
        height: 350,
      },
      labels: ["Cricket", "Basket Ball", "Volly Ball", "Tennis"], // Use labels instead of categories for donut chart
      title: {
        text: "Gender wise Dropout Analysis",
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
      colors: ["#3366FF", "#FFCC33", "#FF3366"],
      fill: {
        opacity: 1,
      },
      plotOptions: {
        pie: {
          donut: {
            size: "60%",
            labels: {
              show: true,
              total: {
                show: true,
                showAlways: false,
                label: "Total",
                fontSize: "22px",
                fontFamily: "Helvetica, Arial, sans-serif",
                fontWeight: 600,
                color: "#373d3f",
                formatter: function (w) {
                  let total = w.globals.seriesTotals.reduce((a, b) => a + b, 0).toFixed(2);
                  return total;
                },
              },
            },
          },
        },
      },
    },
  });

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `http://localhost:9999/FilterStudentinGroup/Gender?state=${selectedState}&district=${selectedDistrict}&city=${selectedCity}&taluka=${selectedTaluka}&school`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        const datas = result.data;
        // const categories = datas.StudentsData.map(
        //   (s) => s.Gender
        // );
        // const percentages = datas.StudentsData.map((student, index) => {
        //   const totalStudent = datas.total[index].numOfStudent;
        //   return totalStudent;
        // });

        const categories = datas.StudentsData.map((s) => s.Gender);

        const percentages = datas.StudentsData.map((student, index) => {
          const gender = student.Gender;

          const totalStudent = datas.total.find((total) => total.Gender === gender);

          if (totalStudent) {
            const percentage = parseFloat(((student.numOfStudent / totalStudent.numOfStudent) * 100).toFixed(2));
            return percentage;
          } else {
            return 0;
          }
        });

        setChartData({
          ...chartData,
          series: percentages,
          options: {
            ...chartData.options,
            labels: categories,
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
        type="donut"
        height={chartData.options.chart.height}
      />
    </div>
  );
};

export default GenderwiseDropoutAnalysis;
