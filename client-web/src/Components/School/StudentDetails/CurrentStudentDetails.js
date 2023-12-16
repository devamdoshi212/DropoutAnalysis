import React, { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { FilterMatchMode } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Link } from "react-router-dom";
import { CurrentStudentServices } from "./CuurentStudentServices";
import { useSelector } from "react-redux";

export default function CurrentStudent() {
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

  //   const DeleteHandler = (rowdata) => {
  //     Swal.fire({
  //       title: "Are you sure?",
  //       text: "You won't be able to revert this!",
  //       icon: "warning",
  //       showCancelButton: true,
  //       confirmButtonColor: "#3085d6",
  //       cancelButtonColor: "#d33",
  //       confirmButtonText: "Yes, Delete it!",
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         var myHeaders = new Headers();
  //         myHeaders.append("token", cookies.token);
  //         var requestOptions = {
  //           method: "DELETE",
  //           headers: myHeaders,
  //           redirect: "follow",
  //         };
  //         fetch(`http://localhost:9999/deleteblog/${rowdata._id}`, requestOptions)
  //           .then((response) => response.text())
  //           .then((result) => {
  //             setdeleterefresh(!deleterefresh);
  //           })
  //           .catch((error) => console.log("error", error));
  //         console.log("Deleted !!");
  //         Swal.fire("Deleted!", "Your file has been deleted.", "success");
  //       }
  //     });
  //   };
  const schoolData = useSelector((state) => state.user.user);

  const sId = schoolData.School._id;

  useEffect(() => {
    CurrentStudentServices.getCustomersXLarge(sId).then((data) => {
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
        setdeleterefresh(false);
      })
      .catch((error) => console.log("error", error));
  };

  const handleDropdownChange = (event) => {
    setSelectedValue(event.target.value);
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
        <Button
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
  // console.log(selectedStudents);
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
      <div className="card p-10">
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
          globalFilterFields={["Name", "UID", "AadharNumber", "Standard"]}
          header={header}
          emptyMessage="No Students found."
          removableSort
          selection={selectedStudents}
          onSelectionChange={(e) => setSelectedStudents(e.value)}
        >
          <Column
            selectionMode="multiple"
            headerStyle={{ color: "#fff", backgroundColor: "#333" }}
            style={{backgroundColor: "#e9e9e9",border:"solid",borderCollapse:"collapse",borderColor:"#c0c0c0",borderWidth:"1px" }}
          />

          <Column
            field="index"
            header="Index"
            body={(rowData) => {
              const rowIndex = customers.indexOf(rowData);
              return calculateIndex(Math.floor(first / 10), rowIndex);
            }}
            headerStyle={{ color: "#fff", backgroundColor: "#333" }}
            style={{backgroundColor: "#e9e9e9",border:"solid",borderCollapse:"collapse",borderColor:"#c0c0c0",borderWidth:"1px" }}
          />

          <Column
            header="Name"
            field="Name"
            filterField="Name"
            headerStyle={{ color: "#fff", backgroundColor: "#333" }}
            style={{ backgroundColor: "#e9e9e9",border:"solid",borderCollapse:"collapse",borderColor:"#c0c0c0",borderWidth:"1px" }}
          />
          <Column
            sortable
            header="UID"
            field="UID"
            filterField="UID"
            headerStyle={{ color: "#fff", backgroundColor: "#333" }}
            style={{ backgroundColor: "#e9e9e9",border:"solid",borderCollapse:"collapse",borderColor:"#c0c0c0",borderWidth:"1px" }}
          />
          <Column
            sortable
            header="Gender"
            field="Gender"
            filterField="location"
            headerStyle={{ color: "#fff", backgroundColor: "#333" }}
            style={{ backgroundColor: "#e9e9e9",border:"solid",borderCollapse:"collapse",borderColor:"#c0c0c0",borderWidth:"1px" }}
          />
          <Column
            header="Aadhar Number"
            field="AadharNumber"
            filterField="AadharNumber"
            headerStyle={{ color: "#fff", backgroundColor: "#333" }}
            style={{ backgroundColor: "#e9e9e9",border:"solid",borderCollapse:"collapse",borderColor:"#c0c0c0",borderWidth:"1px" }}
          />

          <Column
            sortable
            header="School Standard"
            field="Standard"
            filterField="Standard"
            headerStyle={{ color: "#fff", backgroundColor: "#333" }}
            style={{ backgroundColor: "#e9e9e9",border:"solid",borderCollapse:"collapse",borderColor:"#c0c0c0",borderWidth:"1px" }}
          />
          <Column
            header="DOB"
            field="DOB"
            filterField="DOB"
            body={dateBodyTemplate}
            headerStyle={{ color: "#fff", backgroundColor: "#333" }}
            style={{ backgroundColor: "#e9e9e9",border:"solid",borderCollapse:"collapse",borderColor:"#c0c0c0",borderWidth:"1px" }}
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
            header="City"
            field="City"
            filterField="City"
            headerStyle={{ color: "#fff", backgroundColor: "#333" }}
            style={{ backgroundColor: "#e9e9e9",border:"solid",borderCollapse:"collapse",borderColor:"#c0c0c0",borderWidth:"1px"}}
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
            header="Caste"
            field="Caste"
            filterField="Caste"
            headerStyle={{ color: "#fff", backgroundColor: "#333" }}
            style={{ backgroundColor: "#e9e9e9",border:"solid",borderCollapse:"collapse",borderColor:"#c0c0c0",borderWidth:"1px" }}
          />

          <Column
            header="City Type"
            field="City_type"
            filterField="City_type"
            headerStyle={{ color: "#fff", backgroundColor: "#333" }}
            style={{backgroundColor: "#e9e9e9",border:"solid",borderCollapse:"collapse",borderColor:"#c0c0c0",borderWidth:"1px" }}
          />

          <Column
            sortable
            header="School_medium"
            field="School_medium" // Replace 'districtName' with the actual field name
            filterField="School_medium" // Make sure this matches the actual field name
            headerStyle={{ color: "#fff", backgroundColor: "#333" }}
            style={{backgroundColor: "#e9e9e9",border:"solid",borderCollapse:"collapse",borderColor:"#c0c0c0",borderWidth:"1px" }} // filterMatchMode={FilterMatchMode.CONTAINS}
            // filterValue={globalFilterValues.District}
          />
          <Column
            header="Address"
            field="Address"
            filterField="Address"
            headerStyle={{ color: "#fff", backgroundColor: "#333" }}
            style={{ backgroundColor: "#e9e9e9",border:"solid",borderCollapse:"collapse",borderColor:"#c0c0c0",borderWidth:"1px" }}
          />
          <Column
            header="Created At"
            field="createdAt" // Replace 'districtName' with the actual field name
            filterField="createdAt" // Make sure this matches the actual field name
            headerStyle={{ color: "#fff", backgroundColor: "#333" }}
            style={{ backgroundColor: "#e9e9e9",border:"solid",borderCollapse:"collapse",borderColor:"#c0c0c0",borderWidth:"1px" }}
            body={dateBodyTemplate}
          />
        </DataTable>
      </div>
    </>
  );
}
