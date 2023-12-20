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
export default function SCTable() {
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

  const renderHeader = () => {
    return (
      <>
        <div className="flex align-items-center justify-end gap-2 m-2"></div>
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
  const scholarshipDataIndia = [
    {
      _id: 1,
      educationLevel: "School",
      scholarships: [
        {
          name: "National Merit Scholarship",
          amount: "INR 5,000",
          eligibility:
            "Awarded to top-performing students in Class 10 board exams",
        },
        {
          name: "Girl Child Scholarship",
          amount: "INR 3,000",
          eligibility:
            "Available for female students excelling in academics in Class 12",
        },
      ],
    },
    {
      _id: 2,
      educationLevel: "Undergraduate",
      scholarships: [
        {
          name: "Financial Assistance Grant",
          amount: "INR 10,000",
          eligibility:
            "Open to economically disadvantaged undergraduate students",
        },
        {
          name: "Sports Excellence Scholarship",
          amount: "INR 8,000",
          eligibility: "For talented athletes pursuing undergraduate studies",
        },
      ],
    },
    {
      _id: 3,
      educationLevel: "Postgraduate",
      scholarships: [
        {
          name: "Research Fellowship",
          amount: "INR 15,000",
          eligibility:
            "For postgraduate students engaged in innovative research projects",
        },
        {
          name: "Social Impact Scholarship",
          amount: "INR 12,000",
          eligibility:
            "Open to postgraduate students working on projects with social impact",
        },
      ],
    },
    // Add more education levels and corresponding scholarships as needed
  ];

  return (
    <>
      <div className="card ">
        <DataTable
          ref={dt}
          value={scholarshipDataIndia}
          paginator
          showGridlines
          stripedRows
          rows={10}
          rowsPerPageOptions={[10, 25, 50]}
          loading={loading}
          dataKey="id"
          filters={filters}
          globalFilterFields={["educationLevel"]}
          header={header}
          emptyMessage="No Students found."
          removableSort
        >
          <Column
            header="Title"
            field="educationLevel"
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
            header="Scholarship Name"
            headerStyle={{ color: "#fff", backgroundColor: "#333" }}
            style={{
              backgroundColor: "#e9e9e9",
              border: "solid",
              borderCollapse: "collapse",
              borderColor: "#c0c0c0",
              borderWidth: "1px",
            }}
            body={(e) => {
              return (
                <div>
                  {e.scholarships.map((scholarship, index) => (
                    <div key={index}>
                      <strong>{scholarship.name}</strong>
                    </div>
                  ))}
                </div>
              );
            }}
          />

          <Column
            header="Scholarship Amount"
            headerStyle={{ color: "#fff", backgroundColor: "#333" }}
            style={{
              backgroundColor: "#e9e9e9",
              border: "solid",
              borderCollapse: "collapse",
              borderColor: "#c0c0c0",
              borderWidth: "1px",
            }}
            body={(e) => {
              return (
                <div>
                  {e.scholarships.map((scholarship, index) => (
                    <div key={index}>
                      <strong>{scholarship.amount}</strong>
                    </div>
                  ))}
                </div>
              );
            }}
          />
          <Column
            header="Scholarship Eligibility"
            headerStyle={{ color: "#fff", backgroundColor: "#333" }}
            style={{
              backgroundColor: "#e9e9e9",
              border: "solid",
              borderCollapse: "collapse",
              borderColor: "#c0c0c0",
              borderWidth: "1px",
            }}
            body={(e) => {
              return (
                <div>
                  {e.scholarships.map((scholarship, index) => (
                    <div key={index}>
                      <strong>{scholarship.eligibility}</strong>
                    </div>
                  ))}
                </div>
              );
            }}
          />
        </DataTable>
      </div>
    </>
  );
}
