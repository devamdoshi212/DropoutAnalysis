import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const ReasonwiseCasteAnalysis = ({
    selectedCity,
    selectedTaluka,
    selectedDistrict,
    selectedState,
    standard
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
                text: "Reason and Gender wise Dropout Analysis",
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
                console.log(result.data.StudentsData);
                // const data = result.data.StudentsData.filter(
                //     (s) =>
                //         s.Reasons !== "undefined" &&
                //         s.Reasons !== null &&
                //         s.Reasons !== "" &&
                //         s.Reasons !== undefined
                // );
                // let reasonGenderCount = {};

                // data.forEach((entry) => {
                //     let reason = entry["Reasons"];
                //     let gender = entry["Gender"];

                //     if (!reasonGenderCount[reason]) {
                //         reasonGenderCount[reason] = { male: 0, female: 0, other: 0 };
                //     }

                //     reasonGenderCount[reason][gender] += entry["numOfStudent"];
                // });
                // // console.log(reasonGenderCount);
                // const reason = Object.keys(reasonGenderCount);

                // const count = Object.values(reasonGenderCount);
                // const total = count.map((s) => s.male + s.female + s.other);
                // const male = count.map((s) => s.male);
                // const female = count.map((s) => s.female);
                // const other = count.map((s) => s.other);
                // setChartData({
                //     ...chartData,
                //     series: [
                //         {
                //             name: "Total",
                //             data: total,
                //         },
                //         {
                //             name: "Male",
                //             data: male,
                //         },
                //         {
                //             name: "Female",
                //             data: female,
                //         },
                //         {
                //             name: "Other",
                //             data: other,
                //         },
                //     ],
                //     options: {
                //         ...chartData.options,
                //         xaxis: {
                //             ...chartData.options.xaxis,
                //             categories: reason,
                //         },
                //     },
                // });
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
