import React from "react";
import Top5State from "./Top5State";
import TopSchool from "./TopSchool";

const Top5Dropout = () => {
  return (
    <div>
      <h1 className="text-center text-3xl">Top State</h1>
      <Top5State />
      <h1 className="text-center text-3xl">High Dropout School</h1>
      <TopSchool />
    </div>
  );
};

export default Top5Dropout;
