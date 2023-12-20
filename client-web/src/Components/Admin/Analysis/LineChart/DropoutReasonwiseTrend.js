import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const DropoutReasonwiseTrend = ({
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
            size: 10,
          },
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
      colors: [
        "#66FF33",
        "#FF3366",
        "#3366FF",
        "#FFCC00",
        "#9933CC",
        "#FF6600",
        "#0099CC",
        "#FF66B2",
        "#66FF66",
        "#FF6666",
        "#6666FF",
        "#FFFF66",
        "#66FFFF",
        "#FF9933",
        "#33CCFF",
        "#FF3366",
        "#66CC33",
        "#FF99CC",
      ],
      stroke: {
        show: true,
        curve: "smooth",
        lineCap: "butt",
        colors: undefined,
        width: 2,
        dashArray: 0, // Set the curve property to smooth
      },
      title: {
        text: "Dropout-Reason wise Dropout Student Analysis",
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
      `http://localhost:9999/reasonYearTrend?state=${selectedState}&district=${selectedDistrict}&city=${selectedCity}&taluka=${selectedTaluka}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        const data = result.data;
        console.log(data);

        const transformedData = {
          years: [...new Set(data.map((item) => item.year))].sort(),
          reasons: [],
        };

        // Create a set of unique reasons
        const uniqueReasons = [...new Set(data.map((item) => item.reason))];

        // Iterate through unique reasons and years to count occurrences
        uniqueReasons.forEach((reason) => {
          const reasonData = { reason, count: [] };

          transformedData.years.forEach((year) => {
            const count = data
              .filter((item) => item.year === year && item.reason === reason)
              .reduce((sum, item) => sum + item.numOfStudent, 0);

            reasonData.count.push(count);
          });

          transformedData.reasons.push(reasonData);
        });

        const seriesData = transformedData.reasons.map((entry) => ({
          name: entry.reason, // Assuming you want to use the year as the series name
          data: entry.count,
        }));
        console.log(transformedData);

        setChartData({
          ...chartData,
          series: seriesData,
          options: {
            ...chartData.options,
            xaxis: {
              ...chartData.options.xaxis,
              categories: transformedData.years,
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

export default DropoutReasonwiseTrend;
