export const PredicatedDropoutServices = {
  getData(id) {
    console.log(id);
    return fetch(`http://localhost:9999/getPrediction?schoolId=${id}`)
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

  getCustomersXLarge(id) {
    return Promise.resolve(this.getData(id));
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
