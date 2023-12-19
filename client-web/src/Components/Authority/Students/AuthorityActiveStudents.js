import React, { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { FilterMatchMode } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import FetchState from "../../../API/FetchState";
import FetchDistrict from "../../../API/FetchDistrict";
import FetchTaluka from "../../../API/FetchTaluka";
import FetchCity from "../../../API/FetchCity";

import { AuthorityActiveServices } from "./AuthorityActiveServices";
import { useSelector } from "react-redux";
export default function AuthorityActiveStudents() {
  const [deleterefresh, setdeleterefresh] = useState(true);
  const [customers, setCustomers] = useState(null);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");

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

  const userData = useSelector((state) => state.user.user);

  useEffect(() => {
    FetchDistrict(userData.State._id).then((res) => {
      setDistrictName(res);
    });
  }, [userData.State._id]);

  useEffect(() => {
    AuthorityActiveServices.getCustomersXLarge(
      userData.State._id,
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
    userData.State._id,
    selectedDistrict,
    selectedTaluka,
    selectedCity,
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
    console.log(customers);
    await customers.map((customer) => {
      let newObject = {
        UID: customer._id,
        Name: customer.Name,
        Standard: customer.Standard,
        Gender: customer.Gender,
        AadharNumber: customer.AadharNumber,
        DOB: customer.DOB,
        Caste: customer.Caste,
        ContactNumber: customer.ContactNumber,
        SchoolID: customer.SchoolID[0].Name,
        State: customer.State.name,
        District: customer.District.district,
        Taluka: customer.Taluka.taluka,
        City: customer.City.city,
        Address: customer.Address,
        Disability: customer.Disability ? customer.Disability : 0,
        FamilyIncome: customer.FamilyIncome,
        ParentMaritalStatus: customer.ParentMaritalStatus,
        ParentOccupation: customer.ParentOccupation,
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

      saveAsExcelFile(excelBuffer, "Student Data");
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

  const PromoteHandler = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      students: selectedStudents,
    });

    var requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`http://localhost:9999/promteStudent`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Student Promote Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        setdeleterefresh(false);
      })
      .catch((error) => console.log("error", error));
  };
  const InactiveHandler = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      status: 0,
      students: selectedStudents,
    });

    var requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`http://localhost:9999/deactivateStudent`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Student Inactive Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        setdeleterefresh(false);
      })
      .catch((error) => console.log("error", error));
  };

  const handleDropdownChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const renderHeader = () => {
    return (
      <>
        <div>
          <div className="flex align-items-center justify-end gap-2 m-2 ">
            <Button
              type="button"
              icon="pi pi-file-excel"
              severity="success"
              rounded
              onClick={exportExcel}
              data-pr-tooltip="XLS"
              className=" bg-green-900 text-white hover:bg-green-700 p-2 rounded-md"
              label="Download Excel File"
            >
              {" "}
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
            {/* <Button
              type="button"
              label="Promote"
              outlined
              className="px-4 py-2  rounded-lg bg-green-800 ring-0  hover:bg-green-700 text-white tracking-wider font-bold uppercase"
              onClick={PromoteHandler}
            />
            <Button
              type="button"
              label="Dropout"
              outlined
              className="px-4 py-2 rounded-lg bg-red-800 ring-0  hover:bg-red-700 text-white tracking-wider font-bold uppercase"
              onClick={openModal}
            />
            <Button
              type="button"
              label="Inactive"
              outlined
              className="px-4 py-2 rounded-lg bg-gray-800 ring-0  hover:bg-gray-700 text-white tracking-wider font-bold uppercase"
              onClick={InactiveHandler}
            /> */}
            <span className="p-input-icon-left">
              <InputText
                value={globalFilterValues.Name}
                onChange={onGlobalFilterChange}
                placeholder="Keyword Search"
                className="p-2 ring-1 ring-opacity-50 ring-black focus:ring-blue-600 focus:ring-2 focus:ring-opacity-70 hover:ring-opacity-100 hover:ring-blue-400"
              />
            </span>
          </div>
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

  const dropOutHandler = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      status: 1,
      students: selectedStudents,
      reason: selectedValue,
    });

    var requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`http://localhost:9999/deactivateStudent`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Student Dropout Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        setdeleterefresh(false);
      })
      .catch((error) => console.log("error", error));
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImages, setModalImages] = useState("");
  const [selectedRowData, setSelectedRowData] = useState(null);
  const modalOverlayRef = useRef(null);

  const openModal = (rowdata) => {
    setModalImages(rowdata.image);
    setSelectedRowData(rowdata);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalImages([]);
    setSelectedRowData(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        modalOverlayRef.current &&
        !modalOverlayRef.current.contains(event.target)
      ) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isModalOpen]);
  const header = renderHeader();
  const [first, setFirst] = useState(0);

  const calculateIndex = (currentPage, rowIndex) => {
    return currentPage * 10 + rowIndex + 1;
  };

  return (
    <>
      {isModalOpen && (
        <div
          ref={modalOverlayRef}
          className="fixed inset-0 z-50 flex items-center justify-center modal-overlay bg-gray-900 bg-opacity-80"
        >
          <div className="modal-above-screen bg-white rounded-lg p-4 relative">
            <div>
              <span
                className="close absolute top-1 right-1 text-3xl cursor-pointer"
                onClick={closeModal}
              >
                &times;
              </span>
            </div>
            <div className="relative m-5">
              <select
                name="dropoutreason"
                className="p-2 border border-gray-300 rounded w-full outline-2 focus:outline-gray-500 "
                onChange={handleDropdownChange}
              >
                <option value="">Choose</option>
                <option value="Cultural or Language Barriers">
                  Cultural or Language Barriers
                </option>
                <option value="Repeating Grades">Repeating Grades</option>
                <option value="Inadequate Support Systems">
                  Inadequate Support Systems
                </option>
                <option value="Transportation and Access">
                  Transportation and Access
                </option>
                <option value="Early Employment">Early Employment</option>
                <option value="Peer Pressure">Peer Pressure</option>
                <option value="School Environment">School Environment</option>
                <option value="Health and Personal Issues">
                  Health and Personal Issues
                </option>
                <option value="Family and Economic Factors">
                  Family and Economic Factors
                </option>
                <option value="Bullying and Social Issues">
                  Bullying and Social Issues
                </option>
                <option value="Lack of Interest or Engagement">
                  Lack of Interest or Engagement
                </option>
                <option value="Academic Struggles">Academic Struggles</option>
              </select>
            </div>
            <div className="flex items-center justify-center">
              <button
                className="px-4 p-2 bg-blue-700 hover:bg-blue-500 rounded-lg font-bold text-white"
                onClick={dropOutHandler}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="m-5">
        <div className="flex mb-5 justify-between">
          <label className="w-1/4 m-3">
            <span className="text-gray-700 font-bold w-1/3">
              Select District
            </span>
            <select
              className="mt-1 p-2 w-full border rounded-md focus:outline-2 focus:outline-gray-400"
              value={selectedDistrict}
              onChange={(e) => {
                setSelectedDistrict(e.target.value);
                FetchTaluka(userData.State._id, e.target.value).then((res) => {
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
                FetchCity(
                  userData.State._id,
                  selectedDistrict,
                  e.target.value
                ).then((res) => {
                  console.log(res);
                  setCityName(res);
                });
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

        <div className="card p-2">
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
              body={(e) => {
                return e.City.cityType === 0 ? "Urban" : "Rural";
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
            />

            <Column
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
            />
          </DataTable>
        </div>
      </div>
    </>
  );
}
