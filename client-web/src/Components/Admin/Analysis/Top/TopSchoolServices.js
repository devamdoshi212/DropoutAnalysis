export const TopSchoolServices = {
  getData(selectedState, selectedDistrict, selectedTaluka, selectedCity) {
    return fetch(
      `http://localhost:9999/groupBySchool?state=${selectedState}&district=${selectedDistrict}&city=${selectedCity}&taluka=${selectedTaluka}`
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res.data);
        return res.data;
      });
  },

  getCustomersSmall() {
    return Promise.resolve(this.getData().slice(0, 10));
  },

  getCustomersMedium() {
    return Promise.resolve(this.getData().slice(0, 50));
  },

  getCustomersLarge() {
    return Promise.resolve(this.getData().slice(0, 200));
  },

  getCustomersXLarge(
    selectedDistrict,
    selectedTaluka,
    selectedCity,
    selectedState
  ) {
    return Promise.resolve(
      this.getData(
        selectedDistrict,
        selectedTaluka,
        selectedCity,
        selectedState
      )
    );
  },

  // getCustomers(params) {
  //   const queryParams = params
  //     ? Object.keys(params)
  //         .map(
  //           (k) => encodeURIComponent(k) + "=" + encodeURIComponent(params[k])
  //         )
  //         .join("&")
  //     : "";

  //   return fetch("http://localhost:9999/getSportsComplex" + queryParams).then(
  //     (res) => res.json()
  //   );
  // },
};
