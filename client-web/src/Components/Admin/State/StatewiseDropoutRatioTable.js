import React, { useState, useEffect } from "react";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { FilterMatchMode } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { StatewiseDropoutAnalysisServices } from "./StatewiseDropoutRatioServices";
export default function StatewiseDropoutAnalysis() {
  const [customers, setCustomers] = useState(null);

  const [filters, setFilters] = useState(null);
  const [loading, setLoading] = useState(false);
  const [globalFilterValues, setGlobalFilterValues] = useState({
    Name: "",
    ContactNum: "",
    Email: "",
    District: "",
  });

  useEffect(() => {
    StatewiseDropoutAnalysisServices.getCustomersXLarge().then((data) => {
      setCustomers(getCustomers(data));
      setLoading(false);
    });
    initFilters();
  }, []);

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

  const renderHeader = () => {
    return (
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

  console.log(customers);
  return (
    <>
      <div className="m-5">
        <div className="card ">
          <DataTable
            value={customers}
            paginator
            showGridlines
            stripedRows
            rows={10}
            rowsPerPageOptions={[10, 25, 50]}
            loading={loading}
            dataKey="_id"
            filters={filters}
            globalFilterFields={["State"]}
            header={header}
            emptyMessage="No Data found."
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
              header="State"
              field="State"
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
              header="Total Students"
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
              body={(e) => {
                return e.Counts[3] + e.Counts[0] + e.Counts[1] + e.Counts[2];
              }}
            />

            <Column
              sortable
              header="Total Active Students"
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
              body={(e) => {
                return e.Counts[3];
              }}
            />
            <Column
              header="Total Inactive Students"
              field="Type"
              filterField="Type"
              headerStyle={{ color: "#fff", backgroundColor: "#333" }}
              style={{
                backgroundColor: "#e9e9e9",
                border: "solid",
                borderCollapse: "collapse",
                borderColor: "#c0c0c0",
                borderWidth: "1px",
              }}
              body={(e) => {
                return e.Counts[0];
              }}
            />
            <Column
              sortable
              header="Total Dropout Students"
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
              body={(e) => {
                return e.Counts[1] + e.Counts[2];
              }}
            />

            <Column
              sortable
              header="Dropout Ratio"
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
              body={(e) => {
                const total =
                  e.Counts[3] + e.Counts[0] + e.Counts[1] + e.Counts[2];
                const dropout = e.Counts[1] + e.Counts[2];
                return ((dropout / total) * 100).toFixed(2) + "%";
              }}
            />
          </DataTable>
        </div>
      </div>
    </>
  );
}
