import React, { useState, useEffect, useRef } from "react";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { FilterMatchMode } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import FetchTaluka from "../../../API/FetchTaluka";
import FetchDistrict from "../../../API/FetchDistrict";
import FetchCity from "../../../API/FetchCity";
import FetchState from "../../../API/FetchState";
import { AdminSchoolServices } from "./AdminSchoolServices";
export default function AdminSchoolDataTable() {
  const [deleterefresh, setdeleterefresh] = useState(true);
  const [customers, setCustomers] = useState(null);

  const [filters, setFilters] = useState(null);
  const [loading, setLoading] = useState(false);
  const [globalFilterValues, setGlobalFilterValues] = useState({
    Name: "",
    ContactNum: "",
    Email: "",
    District: "",
  });

  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedTaluka, setSelectedTaluka] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [TalukaName, setTalukaName] = useState([]);
  const [stateName, setStateName] = useState([]);

  const [DistrictName, setDistrictName] = useState([]);
  const [CityName, setCityName] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  useEffect(() => {
    FetchState().then((res) => {
      setStateName(res);
    });
  }, []);

  useEffect(() => {
    AdminSchoolServices.getCustomersXLarge(
      selectedState,
      selectedDistrict,
      selectedTaluka,
      selectedCity
    ).then((data) => {
      setCustomers(getCustomers(data));
      setLoading(false);
    });
    initFilters();
  }, [
    deleterefresh,
    selectedDistrict,
    selectedState,
    selectedCity,
    selectedTaluka,
  ]);

  const getCustomers = (data) => {
    return [...(data || [])].map((d) => {
      d.date = new Date(d.date);
      return d;
    });
  };

  const clearFilter = () => {
    initFilters();
  };

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;
    // Update the global filter value for all fields
    setGlobalFilterValues({
      Name: value,
      ContactNum: value,
      Email: value,
      District: value,
    });

    setFilters(_filters);
  };

  const initFilters = () => {
    setFilters({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    setGlobalFilterValues({
      Name: "",
      ContactNum: "",
      Email: "",
      District: "",
    });
  };

  const dt = useRef(null);
  let schoolData = [];
  const exportExcel = () => {
    console.log(customers);
    customers.map((customer) => {
      let newObject = {
        SchoolID: customer.SchoolID,
        SchoolName: customer.Name,
        Medium: customer.Medium.name,
        Type: customer.Type,
        ContactNumber: customer.ContactNumber,
        State: customer.State.name,
        District: customer.District.district,
        Taluka: customer.Taluka.taluka,
        City: customer.City.city,
        Address: customer.Address,
      };
      schoolData.push(newObject);
    });

    import("xlsx").then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(schoolData);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      saveAsExcelFile(excelBuffer, "School Data");
    });
  };

  const saveAsExcelFile = (buffer, fileName) => {
    import("file-saver").then((module) => {
      if (module && module.default) {
        let EXCEL_TYPE =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        let EXCEL_EXTENSION = ".xlsx";
        const data = new Blob([buffer], {
          type: EXCEL_TYPE,
        });

        module.default.saveAs(
          data,
          fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
        );
      }
    });
  };

  const renderHeader = () => {
    return (
      <>
        <div className="flex align-items-center justify-end gap-2 m-2">
          <Button
            type="button"
            icon="pi pi-file-excel"
            severity="success"
            onClick={exportExcel}
            data-pr-tooltip="XLS"
            className=" bg-green-900 text-white hover:bg-green-700 p-2 rounded-md"
          >
            Download Excel File
          </Button>
        </div>
        <div className="flex justify-between mr-2">
          <Button
            type="button"
            label="Clear"
            outlined
            className="px-4 py-2 rounded-lg text-blue-800 ring-0 border-2 border-blue-700 hover:bg-gray-200"
            onClick={clearFilter}
          />

          <span className="p-input-icon-left">
            <InputText
              value={globalFilterValues.Name}
              onChange={onGlobalFilterChange}
              placeholder="Keyword Search"
              className="p-2 ring-1 ring-opacity-50 ring-black focus:ring-blue-600 focus:ring-2 focus:ring-opacity-70 hover:ring-opacity-100 hover:ring-blue-400"
            />
          </span>
        </div>
      </>
    );
  };

  const dateBodyTemplate = (rowData) => {
    const date = new Date(rowData.DOB);
    return formatDate(date);
  };

  const formatDate = (value) => {
    if (value instanceof Date) {
      const year = value.getFullYear();
      const month = String(value.getMonth() + 1).padStart(2, "0");
      const day = String(value.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }
    return "";
  };

  const dateFilterTemplate = (options) => {
    return (
      <Calendar
        value={options.value}
        onChange={(e) => options.filterCallback(e.value, options.index)}
        dateFormat="mm/dd/yy"
        placeholder="mm/dd/yyyy"
        mask="99/99/9999"
      />
    );
  };

  const typeBodyTemplate = (rowData) => {
    if (rowData.Type === 0) {
      return <h1>Government</h1>;
    } else if (rowData.Type === 1) {
      return <h1>Private</h1>;
    } else if (rowData.Type === 2) {
      return <h1>Semin Government</h1>;
    } else if (rowData.Type === 3) {
      return <h1>International</h1>;
    }
  };

  const header = renderHeader();
  const [first, setFirst] = useState(0);

  const calculateIndex = (currentPage, rowIndex) => {
    return currentPage * 10 + rowIndex + 1;
  };

  return (
    <>
      <div className="m-5">
        <div className="flex mb-5">
          <label className="m-3 w-1/4">
            <span className="text-gray-700 font-bold w-1/3">Select State</span>
            <select
              className="mt-1 p-2 w-full border rounded-md focus:outline-2 focus:outline-gray-400"
              value={selectedState}
              onChange={(e) => {
                setSelectedState(e.target.value);
                FetchDistrict(e.target.value).then((res) => {
                  setDistrictName(res);
                });
              }}
              required
            >
              <option value="">Select State</option>
              {stateName.map((item, index) => (
                <option key={index} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>

          <label className="w-1/4 m-3">
            <span className="text-gray-700 font-bold w-1/3">
              Select District
            </span>
            <select
              className="mt-1 p-2 w-full border rounded-md focus:outline-2 focus:outline-gray-400"
              value={selectedDistrict}
              onChange={(e) => {
                setSelectedDistrict(e.target.value);
                FetchTaluka(selectedState, e.target.value).then((res) => {
                  setTalukaName(res);
                });
              }}
              required
            >
              <option value="">Select District</option>
              {DistrictName.map((item, index) => (
                <option key={index} value={item._id}>
                  {item.district}
                </option>
              ))}
            </select>
          </label>
          <label className="w-1/4 m-3">
            <span className="text-gray-700 font-bold w-1/3">Select Taluka</span>
            <select
              className="mt-1 p-2 w-full border rounded-md focus:outline-2 focus:outline-gray-400"
              value={selectedTaluka}
              onChange={(e) => {
                setSelectedTaluka(e.target.value);
                FetchCity(selectedState, selectedDistrict, e.target.value).then(
                  (res) => {
                    console.log(res);
                    setCityName(res);
                  }
                );
              }}
              required
            >
              <option value="">Select Taluka</option>
              {TalukaName.map((item, index) => (
                <option key={index} value={item._id}>
                  {item.taluka}
                </option>
              ))}
            </select>
          </label>
          <label className="w-1/4 m-3">
            <span className="text-gray-700 font-bold w-1/3">Select City</span>
            <select
              className="mt-1 p-2 w-full border rounded-md focus:outline-2 focus:outline-gray-400"
              value={selectedCity}
              onChange={(e) => {
                setSelectedCity(e.target.value);
              }}
              required
            >
              <option value="">Select City/Village</option>
              {CityName.map((item, index) => (
                <option key={index} value={item._id}>
                  {item.city}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="card ">
          <DataTable
            ref={dt}
            value={customers}
            paginator
            showGridlines
            stripedRows
            rows={10}
            rowsPerPageOptions={[10, 25, 50]}
            loading={loading}
            dataKey="_id"
            filters={filters}
            globalFilterFields={[
              "Name",
              "SchoolID",
              "Medium.name",
              "ContactNumber",
              "City.city",
              "Taluka.taluka",
              "District.district",
              "State.name",
              "Type",
            ]}
            header={header}
            emptyMessage="No School found."
            removableSort
          >
            <Column
              field="index"
              header="Index"
              body={(rowData) => {
                const rowIndex = customers.indexOf(rowData);
                return calculateIndex(Math.floor(first / 10), rowIndex);
              }}
              headerStyle={{ color: "#fff", backgroundColor: "#333" }}
              style={{
                backgroundColor: "#e9e9e9",
                border: "solid",
                borderCollapse: "collapse",
                borderColor: "#c0c0c0",
                borderWidth: "1px",
              }}
            />

            <Column
              header="Name"
              field="Name"
              filterField="Name"
              headerStyle={{ color: "#fff", backgroundColor: "#333" }}
              style={{
                backgroundColor: "#e9e9e9",
                border: "solid",
                borderCollapse: "collapse",
                borderColor: "#c0c0c0",
                borderWidth: "1px",
              }}
            />
            <Column
              sortable
              header="SchoolID"
              field="SchoolID"
              filterField="SchoolID"
              headerStyle={{ color: "#fff", backgroundColor: "#333" }}
              style={{
                backgroundColor: "#e9e9e9",
                border: "solid",
                borderCollapse: "collapse",
                borderColor: "#c0c0c0",
                borderWidth: "1px",
              }}
            />

            <Column
              sortable
              header="Medium"
              field="Medium.name"
              filterField="Medium.name"
              headerStyle={{ color: "#fff", backgroundColor: "#333" }}
              style={{
                backgroundColor: "#e9e9e9",
                border: "solid",
                borderCollapse: "collapse",
                borderColor: "#c0c0c0",
                borderWidth: "1px",
              }}
            />
            <Column
              header="Type"
              field="Type"
              filterField="Type"
              body={typeBodyTemplate}
              headerStyle={{ color: "#fff", backgroundColor: "#333" }}
              style={{
                backgroundColor: "#e9e9e9",
                border: "solid",
                borderCollapse: "collapse",
                borderColor: "#c0c0c0",
                borderWidth: "1px",
              }}
            />
            <Column
              sortable
              header="State"
              field="State.name"
              filterField="State.name"
              headerStyle={{ color: "#fff", backgroundColor: "#333" }}
              style={{
                backgroundColor: "#e9e9e9",
                border: "solid",
                borderCollapse: "collapse",
                borderColor: "#c0c0c0",
                borderWidth: "1px",
              }}
            />
            <Column
              sortable
              header="District"
              field="District.district"
              filterField="District.district"
              headerStyle={{ color: "#fff", backgroundColor: "#333" }}
              style={{
                backgroundColor: "#e9e9e9",
                border: "solid",
                borderCollapse: "collapse",
                borderColor: "#c0c0c0",
                borderWidth: "1px",
              }}
            />

            <Column
              header="Taluka"
              field="Taluka.taluka"
              filterField="Taluka"
              headerStyle={{ color: "#fff", backgroundColor: "#333" }}
              style={{
                backgroundColor: "#e9e9e9",
                border: "solid",
                borderCollapse: "collapse",
                borderColor: "#c0c0c0",
                borderWidth: "1px",
              }}
            />

            <Column
              sortable
              header="City"
              field="City.city"
              filterField="City"
              headerStyle={{ color: "#fff", backgroundColor: "#333" }}
              style={{
                backgroundColor: "#e9e9e9",
                border: "solid",
                borderCollapse: "collapse",
                borderColor: "#c0c0c0",
                borderWidth: "1px",
              }}
            />
            <Column
              header="Address"
              field="Address"
              filterField="Address"
              headerStyle={{ color: "#fff", backgroundColor: "#333" }}
              style={{
                backgroundColor: "#e9e9e9",
                border: "solid",
                borderCollapse: "collapse",
                borderColor: "#c0c0c0",
                borderWidth: "1px",
              }}
            />
            <Column
              header="Contact Number"
              field="ContactNumber"
              filterField="ContactNumber"
              headerStyle={{ color: "#fff", backgroundColor: "#333" }}
              style={{
                backgroundColor: "#e9e9e9",
                border: "solid",
                borderCollapse: "collapse",
                borderColor: "#c0c0c0",
                borderWidth: "1px",
              }}
            />
          </DataTable>
        </div>
      </div>
    </>
  );
}
