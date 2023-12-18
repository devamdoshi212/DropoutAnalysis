import React, { useEffect, useState } from "react";

const Top5State = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`http://localhost:9999/top5state`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setData(result[0].stateWiseCounts);
      })
      .catch((error) => console.log("error", error));
  }, []);

  return (
    <section class="bg-gray-100 p-8">
      <div class="max-w-screen-md mx-auto">
        <table class="min-w-full bg-white border border-gray-300 shadow-md rounded">
          <thead>
            <tr>
              <th class="py-2 px-4 border-b">State</th>
              <th class="py-2 px-4 border-b">Dropout Students</th>
              <th class="py-2 px-4 border-b">Total Students</th>

              <th class="py-2 px-4 border-b">Dropout Rates</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b text-center">{item.city}</td>
                <td className="py-2 px-4 border-b text-center">
                  {item.dropout}
                </td>
                <td className="py-2 px-4 border-b text-center">{item.total}</td>
                <td className="py-2 px-4 border-b text-center">
                  {item.rate} %
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Top5State;
