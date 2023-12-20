import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const YearwiseLineChart = ({
  selectedCity,
  selectedTaluka,
  selectedDistrict,
  selectedState,
}) => {
  const [chartData, setChartData] = useState({
    series: [
      {
        name: "Without Reason Dropout Students",
        data: [30, 40, 35, 50],
      },
      {
        name: "With Reason Dropout Students",
        data: [49, 60, 10, 12],
      },
      {
        name: "Total Dropout Students Students",
        data: [79, 100, 45, 62],
      },
    ],
    options: {
      chart: {
        type: "line", // Change chart type to line
        height: 350,
      },
      plotOptions: {
        line: {
          markers: {
            size: 6,
          },
        },
        curve: "smooth",
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
        categories: ["Cricket", "Basket Ball", "Volley Ball", "Tennis"],
      },
      yaxis: {
        title: {
          text: "Numbers of dropout students",
          style: {
            fontSize: "12px",
            fontFamily: undefined,
            color: "#263238",
          },
        },
      },
      colors: ["#66FF33", "#FF3366", "#3366FF"],
      stroke: {
        show: true,
        curve: "smooth",
        lineCap: "butt",
        colors: undefined,
        width: 2,
        dashArray: 0, // Set the curve property to smooth
      },
      title: {
        text: "Year wise Dropout Student Analysis",
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
      `http://localhost:9999/yearWiseData?state=${selectedState}&district=${selectedDistrict}&city=${selectedCity}&taluka=${selectedTaluka}&school`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        const data = result.data.resultArray;
        const categories = data.map((s) => s.year);
        const withReason = data.map((s) => s.is_active_1);
        const withOutReason = data.map((s) => s.is_active_2);
        const total = data.map((s) => s.is_active_2 + s.is_active_1);

        setChartData({
          ...chartData,
          series: [
            {
              name: "Without Reason Dropout Students",
              data: withOutReason,
            },
            {
              name: "With Reason Dropout Students",
              data: withReason,
            },
            {
              name: "Total Dropout Students Students",
              data: total,
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
        type="line"
        height={chartData.options.chart.height}
      />
    </div>
  );
};

export default YearwiseLineChart;
