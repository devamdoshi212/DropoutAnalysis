import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

const AdminDashboard = () => {
  const [data, setdata] = useState({});
  const [visible, setvisible] = useState(false);
  const userData = useSelector((state) => state.user.user);

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
  console.log(data);
  return (
    <div className="m-5">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 my-5  grid-rows-6">
        {/* <Link to={"districtWiseSportsComplex"}> */}
        <div className=" text-center rounded-lg bg-gray-300 ">
          <div className="font-semibold p-5 text-2xl h-3/5">Total States</div>
          <AnimatedCount finalCount={visible && data.states} />
        </div>

        <div className=" text-center rounded-lg bg-gray-300 ">
          <div className="font-semibold p-5 text-2xl h-3/5">Total District</div>
          <AnimatedCount finalCount={visible && data.districts} />
        </div>
       

        <div className=" text-center rounded-lg bg-gray-300 ">
          <div className="font-semibold p-5 text-2xl h-3/5">Total Talukas</div>
          <AnimatedCount finalCount={visible && data.taluka} />
        </div>
       
        <div className=" text-center rounded-lg bg-gray-300 ">
          <div className="font-semibold p-5 text-2xl h-3/5">Total Village/Town</div>
          <AnimatedCount finalCount={visible && data.city} />
        </div>
        
        <div className=" text-center rounded-lg bg-gray-300 ">
          <div className="font-semibold p-5 text-2xl h-3/5">Total Students</div>
          <AnimatedCount finalCount={visible && data.students} />
        </div>

        <div className=" text-center rounded-lg bg-gray-300 ">
          <div className="font-semibold p-5 text-2xl h-3/5">
            Total Male Students
          </div>
          <AnimatedCount finalCount={visible && data.malestudents} />
        </div>

        <div className=" text-center rounded-lg bg-gray-300 ">
          <div className="font-semibold p-5 text-2xl h-3/5">
            Total Female Students
          </div>
          <AnimatedCount finalCount={visible && data.femalestudents} />
        </div>

        <div className=" text-center rounded-lg bg-gray-300 ">
          <div className="font-semibold p-5 text-2xl h-3/5">
            Total Other Students
          </div>
          <AnimatedCount finalCount={visible && data.otherstudents} />
        </div>

        <div className=" text-center rounded-lg bg-gray-300 ">
          <div className="font-semibold p-5 text-2xl h-3/5">
            Active Students
          </div>
          <AnimatedCount finalCount={visible && data.activestudents} />
        </div>
        
        <div className=" text-center rounded-lg bg-gray-300 ">
          <div className="font-semibold p-5 text-2xl h-3/5">
            Total Inactive Students
          </div>
          <AnimatedCount finalCount={visible && data.inactivestudents} />
        </div>
        
      
        <div className=" text-center rounded-lg bg-gray-300 ">
          <div className="font-semibold p-5 text-2xl h-3/5">
            Total Dropout Students without Reason
          </div>
          <AnimatedCount finalCount={visible && data.dropwithoutreason} />
        </div>
        <div className=" text-center rounded-lg bg-gray-300 ">
          <div className="font-semibold p-5 text-2xl h-3/5">
            Total Dropout Students with Reason
          </div>
          <AnimatedCount finalCount={visible && data.dropwithreason} />
        </div>

        <div className=" text-center rounded-lg bg-gray-300 ">
          <div className="font-semibold p-5 text-2xl h-3/5">Total Schools</div>
          <AnimatedCount finalCount={visible && data.schools} />
        </div>

        <div className=" text-center rounded-lg bg-gray-300 ">
          <div className="font-semibold p-5 text-2xl h-3/5">
            Total Government Schools
          </div>
          <AnimatedCount finalCount={visible && data.govtschools} />
        </div>

        <div className=" text-center rounded-lg bg-gray-300 ">
          <div className="font-semibold p-5 text-2xl h-3/5">
            Total Semi-Government Schools
          </div>
          <AnimatedCount finalCount={visible && data.semigovtschools} />
        </div>

        

        <div className=" text-center rounded-lg bg-gray-300 ">
          <div className="font-semibold p-5 text-2xl h-3/5">
            Total Private Schools
          </div>
          <AnimatedCount finalCount={visible && data.privateschools} />
        </div>
       
        <div className=" text-center rounded-lg bg-gray-300 ">
          <div className="font-semibold p-5 text-2xl h-3/5">
            Total InterNational Schools
          </div>
          <AnimatedCount finalCount={visible && data.internationalschools} />
        </div>
      
      </div>
    </div>
  );
};

export default AdminDashboard;
