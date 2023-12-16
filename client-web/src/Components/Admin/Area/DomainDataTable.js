import React, { useState, useEffect, useRef } from "react";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { FilterMatchMode } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";

export default function DomainDataTable() {
  const [deleterefresh, setdeleterefresh] = useState(true);
  const [customers, setCustomers] = useState(null);

  const [filters, setFilters] = useState(null);
  const [loading, setLoading] = useState(false);
  const [globalFilterValues, setGlobalFilterValues] = useState({
    State: "",
    District: "",
    Taluka: "",
    City: "",
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
      State: value,
      District: value,
      Taluka: value,
      City: value,
    });

    setFilters(_filters);
  };

  const initFilters = () => {
    setFilters({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    setGlobalFilterValues({
      State: "",
      District: "",
      Taluka: "",
      City: "",
    });
  };

  const dt = useRef(null);
  let schoolData = [];
  const exportExcel = () => {
    console.log(customers);
    customers.map((customer) => {
      let newObject = {
        "State": customer.State.name,
        "District": customer.District.district,
        "Taluka": customer.Taluka.taluka,
        "City": customer.City.city,
      }
      schoolData.push(newObject);
    });

    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(schoolData);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array'
      });

      saveAsExcelFile(excelBuffer, 'School Data');
    });
  };

  const saveAsExcelFile = (buffer, fileName) => {
    import('file-saver').then((module) => {
      if (module && module.default) {
        let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        let EXCEL_EXTENSION = '.xlsx';
        const data = new Blob([buffer], {
          type: EXCEL_TYPE
        });

        module.default.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
      }
    });
  };

  const renderHeader = () => {
    return (
      <>
        <div className="flex align-items-center justify-content-end gap-2">
          <Button type="button" icon="pi pi-file-excel" severity="success" rounded onClick={exportExcel} data-pr-tooltip="XLS" style={{ backgroundColor: "green" }} />
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

  const header = renderHeader();
  const [first, setFirst] = useState(0);

  const calculateIndex = (currentPage, rowIndex) => {
    return currentPage * 10 + rowIndex + 1;
  };

  return (
    <>
    <div className="m-5">
      <div className=" m-5 flex gap-5 justify-between">
        <Link
          to={"/admin/addstate"}
          className="px-4 py-3 rounded-lg bg-gray-800 ring-0 text-white font-bold  hover:bg-gray-700"
        >
          Add State
        </Link>
        <Link
          to={"/admin/adddistrict"}
          className="px-4 py-3 rounded-lg bg-gray-800 ring-0  text-white font-bold hover:bg-gray-700"
        >
          Add District
        </Link>
        <Link
          to={"/admin/addtaluka"}
          className="px-4 py-3 rounded-lg bg-gray-800 ring-0 text-white font-bold hover:bg-gray-700"
        >
          Add Taluka
        </Link>
        <Link
          to={"/admin/addcity"}
          className="px-4 py-3 rounded-lg bg-gray-800 ring-0  text-white font-bold hover:bg-gray-700"
        >
          Add City
        </Link>
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
          globalFilterFields={["Name", "UID", "AadharNumber", "Standard"]}
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
            style={{ backgroundColor: "#e9e9e9",border:"solid",borderCollapse:"collapse",borderColor:"#c0c0c0",borderWidth:"1px" }}
          />

          <Column
            sortable
            header="State"
            field="State"
            filterField="State"
            headerStyle={{ color: "#fff", backgroundColor: "#333" }}
            style={{backgroundColor: "#e9e9e9",border:"solid",borderCollapse:"collapse",borderColor:"#c0c0c0",borderWidth:"1px" }}
          />
          <Column
            sortable
            header="District"
            field="District"
            filterField="District"
            headerStyle={{ color: "#fff", backgroundColor: "#333" }}
            style={{ backgroundColor: "#e9e9e9",border:"solid",borderCollapse:"collapse",borderColor:"#c0c0c0",borderWidth:"1px" }}
          />

          <Column
            sortable
            header="Taluka"
            field="Taluka"
            filterField="Taluka"
            headerStyle={{ color: "#fff", backgroundColor: "#333" }}
            style={{ backgroundColor: "#e9e9e9",border:"solid",borderCollapse:"collapse",borderColor:"#c0c0c0",borderWidth:"1px" }}
          />
          <Column
            sortable
            header="City"
            field="City"
            filterField="City"
            headerStyle={{ color: "#fff", backgroundColor: "#333" }}
            style={{ backgroundColor: "#e9e9e9",border:"solid",borderCollapse:"collapse",borderColor:"#c0c0c0",borderWidth:"1px" }}
          />
        </DataTable>
      </div>
      </div>
    </>
  );
}
