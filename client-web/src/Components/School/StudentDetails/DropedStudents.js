import React, { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { FilterMatchMode } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { DropedStudentsServices } from "./DropoutStudentServices";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
export default function DropedStudents() {
  const [deleterefresh, setdeleterefresh] = useState(true);
  const [customers, setCustomers] = useState(null);
  const [selectedStudents, setSelectedStudents] = useState([]);

  const [filters, setFilters] = useState(null);
  const [loading, setLoading] = useState(false);
  const [globalFilterValues, setGlobalFilterValues] = useState({
    Name: "",
    ContactNum: "",
    Email: "",
    District: "",
  });

  const schoolData = useSelector((state) => state.user.user);

  const sId = schoolData.School._id;

  useEffect(() => {
    DropedStudentsServices.getCustomersXLarge(sId).then((data) => {
      setCustomers(getCustomers(data));
      setLoading(false);
    });
    initFilters();
  }, [deleterefresh]);

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

    // Set the global filter values for all fields to empty strings
    setGlobalFilterValues({
      Name: "",
      ContactNum: "",
      Email: "",
      District: "",
    });
  };

  const dt = useRef(null);

  // console.log(customers);
  let customerData = [];

  const exportExcel = async () => {
    await customers.map((customer) => {
      let newObject = {
        AadharNumber: customer.AadharNumber,
        Address: customer.Address,
        Caste: customer.Caste,
        City: customer.City.city,
        ContactNumber: customer.ContactNumber,
        DOB: customer.DOB,
        Disability: customer.Disability ? customer.Disability : 0,
        District: customer.District.district,
        FamilyIncome: customer.FamilyIncome,
        Gender: customer.Gender,
        Name: customer.Name,
        ParentMaritalStatus: customer.ParentMaritalStatus,
        ParentOccupation: customer.ParentOccupation,
        SchoolID: customer.SchoolID[0].Name,
        Standard: customer.Standard,
        State: customer.State.name,
        Taluka: customer.Taluka.taluka,
        _id: customer._id,
      };
      customerData.push(newObject);
    });

    import("xlsx").then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(customerData);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      saveAsExcelFile(excelBuffer, "Dropout Student Data");
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

  const header = renderHeader();
  const [first, setFirst] = useState(0);
  const [Reason, setReason] = useState({});
  const calculateIndex = (currentPage, rowIndex) => {
    return currentPage * 10 + rowIndex + 1;
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalOverlayRef = useRef(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleRemidies = (reason) => {
    // var requestOptions = {
    //   method: "GET",
    //   redirect: "follow",
    // };
    // fetch(`http://localhost:9999/getReason?reason=${reason}`, requestOptions)
    //   .then((response) => response.json())
    //   .then((result) => {
    //     console.log(result);
    //     setReason(result.data[0]);
    //   })
    //   .catch((error) => console.log("error", error));
    // openModal();
  };
  const navigate = useNavigate();
  return (
    <>
      {/* {isModalOpen && (
        <div>
          <h2 className="text-xl font-semibold mb-3">Reason:</h2>
          {Reason && Reason.links && Reason.links.length > 0 && (
            <div>
              {Reason.links.map((resource, index) => (
                <a
                  key={index}
                  href={resource}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    color: "blue",
                    margin: "25px",
                  }}
                >
                  {resource}
                </a>
              ))}
            </div>
          )}
          <h2 className="text-xl font-semibold mb-3">Resource:</h2>
          {Reason && Reason.resources && Reason.resources.length > 0 && (
            <div>
              {Reason.resources.map((resource, index) => (
                <a
                  key={index}
                  href={`http://localhost:9999/resources/${resource.file}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    color: "red",
                    margin: "25px",
                  }}
                >
                  {resource.name}
                </a>
              ))}
            </div>
          )}
        </div>
      )} */}

      <div className="card p-10">
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
            "UID",
            "AadharNumber",
            "Standard",
            "SchoolID.Medium.name",
            "City.cityType",
            "Caste",
            "Taluka.taluka",
            "City.city",
            "District.district",
            "Gender",
          ]}
          header={header}
          emptyMessage="No Students found."
          removableSort
          selection={selectedStudents}
          onSelectionChange={(e) => setSelectedStudents(e.value)}
        >
          <Column
            selectionMode="multiple"
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
            header="UID"
            field="_id"
            filterField="UID"
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
            header="Gender"
            field="Gender"
            filterField="location"
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
            header="Reason"
            field="Reasons"
            filterField="Reasons"
            headerStyle={{ color: "#fff", backgroundColor: "#333" }}
            style={{
              backgroundColor: "#e9e9e9",
              border: "solid",
              borderCollapse: "collapse",
              borderColor: "#c0c0c0",
              borderWidth: "1px",
            }}
            body={(rowdata) => {
              if (rowdata.Reasons) {
                return rowdata.Reasons;
              } else {
                return "-";
              }
            }}
          />
          <Column
            header="Dropout Type"
            field="is_active"
            sortable
            filterField="is_active"
            headerStyle={{ color: "#fff", backgroundColor: "#333" }}
            style={{
              backgroundColor: "#e9e9e9",
              border: "solid",
              borderCollapse: "collapse",
              borderColor: "#c0c0c0",
              borderWidth: "1px",
            }}
            body={(rowdata) => {
              if (rowdata.is_active === 1) {
                return "Student Dropout With Reason";
              } else {
                return "Student Dropout with Predicted Reason";
              }
            }}
          />
          <Column
            header="Aadhar Number"
            field="AadharNumber"
            filterField="AadharNumber"
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
            header="School Standard"
            field="Standard"
            filterField="Standard"
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
            header="DOB"
            field="DOB"
            filterField="DOB"
            body={dateBodyTemplate}
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
            filterField="District"
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
            sortable
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
            header="Caste"
            field="Caste"
            filterField="Caste"
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
            header="City Type"
            field="City.cityType"
            filterField="City_type"
            headerStyle={{ color: "#fff", backgroundColor: "#333" }}
            style={{
              backgroundColor: "#e9e9e9",
              border: "solid",
              borderCollapse: "collapse",
              borderColor: "#c0c0c0",
              borderWidth: "1px",
            }}
            body={(e) => {
              return e.City.cityType === 0 ? "Urban" : "Rural";
            }}
          />
          <Column
            header="Actions"
            field="City"
            filterField="City_type"
            headerStyle={{ color: "#fff", backgroundColor: "#333" }}
            style={{
              backgroundColor: "#e9e9e9",
              border: "solid",
              borderCollapse: "collapse",
              borderColor: "#c0c0c0",
              borderWidth: "1px",
            }}
            body={(e) => {
              // const objectString = encodeURIComponent(JSON.stringify(e));

              return (
                <button
                  onClick={() => {
                    navigate("/school/scholarship", { state: e });
                  }}
                  className="bg-blue-900 font-semibold text-white p-2 hover:bg-blue-600 rounded-md"
                >
                  Get ScholarShip
                </button>
              );
            }}
          />
          <Column
            header="Actions"
            field="City"
            filterField="City_type"
            headerStyle={{ color: "#fff", backgroundColor: "#333" }}
            style={{
              backgroundColor: "#e9e9e9",
              border: "solid",
              borderCollapse: "collapse",
              borderColor: "#c0c0c0",
              borderWidth: "1px",
            }}
            body={(e) => {
              const reason = e.Reasons;
              return (
                <Link
                  to={`/school/remedies?reason=${encodeURIComponent(reason)}`}
                >
                <Button className="bg-green-900 font-semibold text-white p-2 hover:bg-green-600 ">Get Remedies</Button>  
                </Link>
              );
            }}
          />

          {/* <Column
          sortable
          header="School Medium"
          field="SchoolID.Medium.name" // Replace 'districtName' with the actual field name
          filterField="School_medium" // Make sure this matches the actual field name
          headerStyle={{ color: "#fff", backgroundColor: "#333" }}
          style={{
            backgroundColor: "#e9e9e9",
            border: "solid",
            borderCollapse: "collapse",
            borderColor: "#c0c0c0",
            borderWidth: "1px",
          }}
          body={(e) => {
            return e.SchoolID[e.SchoolID.length - 1].Medium.name;
          }}
        /> */}
          {/* <Column
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
        /> */}
          {/* <Column
          header="Created At"
          field="createdAt" // Replace 'districtName' with the actual field name
          filterField="createdAt" // Make sure this matches the actual field name
          headerStyle={{ color: "#fff", backgroundColor: "#333" }}
          style={{
            backgroundColor: "#e9e9e9",
            border: "solid",
            borderCollapse: "collapse",
            borderColor: "#c0c0c0",
            borderWidth: "1px",
          }}
          body={dateBodyTemplate}
        /> */}
        </DataTable>
      </div>
    </>
  );
}
