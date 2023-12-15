import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const AdminDashboard = () => {
  const [data, setdata] = useState({});
  const [visible, setvisible] = useState(false);

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://localhost:9999/AdmindashboardCount", requestOptions)
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
          <div className="font-semibold p-5 text-2xl">Active Students</div>
          <AnimatedCount finalCount={visible && data.activestudents} />
        </div>
        <div className=" text-center rounded-lg bg-gray-300 ">
          <div className="font-semibold p-5 text-2xl">Total States</div>
          <AnimatedCount finalCount={visible && data.states} />
        </div>
        <div className=" text-center rounded-lg bg-gray-300 ">
          <div className="font-semibold p-5 text-2xl">Total Talukas</div>
          <AnimatedCount finalCount={visible && data.taluka} />
        </div>
        <div className=" text-center rounded-lg bg-gray-300 ">
          <div className="font-semibold p-5 text-2xl">Total Students</div>
          <AnimatedCount finalCount={visible && data.students} />
        </div>
        <div className=" text-center rounded-lg bg-gray-300 ">
          <div className="font-semibold p-5 text-2xl">Total City</div>
          <AnimatedCount finalCount={visible && data.city} />
        </div>
        <div className=" text-center rounded-lg bg-gray-300 ">
          <div className="font-semibold p-5 text-2xl">
            Total Dropout Students without Reason
          </div>
          <AnimatedCount finalCount={visible && data.dropwithoutreason} />
        </div>
        <div className=" text-center rounded-lg bg-gray-300 ">
          <div className="font-semibold p-5 text-2xl">
            Total Dropout Students with Reason
          </div>
          <AnimatedCount finalCount={visible && data.dropwithreason} />
        </div>
        <div className=" text-center rounded-lg bg-gray-300 ">
          <div className="font-semibold p-5 text-2xl">
            Total Female Students
          </div>
          <AnimatedCount finalCount={visible && data.femalestudents} />
        </div>
        <div className=" text-center rounded-lg bg-gray-300 ">
          <div className="font-semibold p-5 text-2xl">Total Male Students</div>
          <AnimatedCount finalCount={visible && data.malestudents} />
        </div>
        <div className=" text-center rounded-lg bg-gray-300 ">
          <div className="font-semibold p-5 text-2xl">
            Total Government Schools
          </div>
          <AnimatedCount finalCount={visible && data.govtschools.length} />
        </div>
        <div className=" text-center rounded-lg bg-gray-300 ">
          <div className="font-semibold p-5 text-2xl">
            Total InterNational Schools
          </div>
          <AnimatedCount
            finalCount={visible && data.internationalschools.length}
          />
        </div>
        <div className=" text-center rounded-lg bg-gray-300 ">
          <div className="font-semibold p-5 text-2xl">
            Total Private Schools
          </div>
          <AnimatedCount finalCount={visible && data.privateschools.length} />
        </div>
        <div className=" text-center rounded-lg bg-gray-300 ">
          <div className="font-semibold p-5 text-2xl">
            Total Semi-Government Schools
          </div>
          <AnimatedCount finalCount={visible && data.semigovtschools.length} />
        </div>
        <div className=" text-center rounded-lg bg-gray-300 ">
          <div className="font-semibold p-5 text-2xl">
            Total Inactive Students
          </div>
          <AnimatedCount finalCount={visible && data.inactivestudents} />
        </div>
        <div className=" text-center rounded-lg bg-gray-300 ">
          <div className="font-semibold p-5 text-2xl">Total Schools</div>
          <AnimatedCount finalCount={visible && data.schools} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
