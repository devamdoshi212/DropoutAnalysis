import React, { useEffect } from "react";

const Top5Dropout = () => {
  // useEffect(()=>{

  // },[])

  return (
    <section class="bg-gray-100 p-8">
      <div class="max-w-screen-md mx-auto">
        <table class="min-w-full bg-white border border-gray-300 shadow-md rounded">
          <thead>
            <tr>
              <th class="py-2 px-4 border-b">State</th>
              <th class="py-2 px-4 border-b">Dropout Rates</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="py-2 px-4 border-b text-center">Example State 1</td>
              <td class="py-2 px-4 border-b text-center">5%</td>
            </tr>
            <tr>
              <td class="py-2 px-4 border-b">Example State 2</td>
              <td class="py-2 px-4 border-b">8%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Top5Dropout;
