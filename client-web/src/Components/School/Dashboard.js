import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

const SchoolDashboard = () => {
  const [data, setdata] = useState({});
  const [visible, setvisible] = useState(false);

  const userData = useSelector((state) => state.user.user);
  // console.log(userData);

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `http://localhost:9999/schoolcount?School_ID=${userData.School._id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setdata(result);
        setvisible(true);
      })
      .catch((error) => console.log("error", error));
  }, []);

  const AnimatedCount = ({ finalCount }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      const animationDuration = 500; // in milliseconds
      const steps = finalCount;
      const stepDuration = animationDuration / steps;

      let currentStep = 0;

      const interval = setInterval(() => {
        if (currentStep <= steps) {
          setCount(currentStep);
          currentStep += 1;
        } else {
          clearInterval(interval);
        }
      }, stepDuration);

      return () => clearInterval(interval);
    }, [finalCount]);

    return <div className="font-bold p-3 text-4xl">{count}</div>;
  };
  return (
    <div className="m-5">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
        {/* <Link to={"districtWiseSportsComplex"}> */}
        <div className=" text-center rounded-lg bg-gray-300 ">
          <div className="font-semibold p-5 text-2xl">
            Total Active Students
          </div>
          <AnimatedCount finalCount={visible && data.activestudents} />
        </div>
        <div className=" text-center rounded-lg bg-gray-300 ">
          <div className="font-semibold p-5 text-2xl">Total Students</div>
          <AnimatedCount finalCount={visible && data.students} />
        </div>
        <div className=" text-center rounded-lg bg-gray-300 ">
          <div className="font-semibold p-5 text-2xl">Total Male Students</div>
          <AnimatedCount finalCount={visible && data.malestudents} />
        </div>
        <div className=" text-center rounded-lg bg-gray-300 ">
          <div className="font-semibold p-5 text-2xl">
            Total FeMale Students
          </div>
          <AnimatedCount finalCount={visible && data.femalestudents} />
        </div>
        <div className=" text-center rounded-lg bg-gray-300 ">
          <div className="font-semibold p-5 text-2xl">
            Total Inactive Students
          </div>
          <AnimatedCount finalCount={visible && data.inactivestudents} />
        </div>
        <div className=" text-center rounded-lg bg-gray-300 ">
          <div className="font-semibold p-5 text-2xl">
            Total Dropout Students without Reasons
          </div>
          <AnimatedCount finalCount={visible && data.dropwithoutreason} />
        </div>
        <div className=" text-center rounded-lg bg-gray-300 ">
          <div className="font-semibold p-5 text-2xl">
            Total Dropout Students with Reasons
          </div>
          <AnimatedCount finalCount={visible && data.dropwithreason} />
        </div>
      </div>
    </div>
  );
};

export default SchoolDashboard;
