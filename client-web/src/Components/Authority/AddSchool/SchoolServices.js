export const SchoolServices = {
  getData(selectedState, selectedDistrict, selectedTaluka, selectedCity) {
    return fetch(
      `http://localhost:9999/getSchool` +
        (selectedState && `?State=${selectedState}`) +
        (selectedDistrict && `&District=${selectedDistrict}`) +
        (selectedTaluka && `&Taluka=${selectedTaluka}`) +
        (selectedCity && `&City=${selectedCity}`)
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
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
    selectedState,
    selectedDistrict,
    selectedTaluka,
    selectedCity
  ) {
    return Promise.resolve(
      this.getData(
        selectedState,
        selectedDistrict,
        selectedTaluka,
        selectedCity
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
