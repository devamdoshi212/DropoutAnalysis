import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const ExistingStudentForm = () => {
  const [uidInput, setUidInput] = useState("");
  const [aadharInput, setAadharInput] = useState("");
  const [selectedStudent, setSelectedStudent] = useState([]);
  const [studentFlage, setStudentFlage] = useState(null);
  const findStudentByUid = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    // const uidNumber = parseInt(uidInput, 10);
    fetch(`http://localhost:9999/getStudent?_id=${uidInput}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        const data = result.data[0];
        setSelectedStudent(data);
        setStudentFlage(1);
      })
      .catch((error) => console.log("error", error));
  };

  const findStudentByAadhar = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    const aadharNumber = parseInt(aadharInput, 10);
    fetch(
      `http://localhost:9999/getStudent?AadharNumber=${aadharNumber}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        const data = result.data[0];
        setSelectedStudent(data);
        setStudentFlage(1);
      })
      .catch((error) => console.log("error", error));
  };

  const schoolData = useSelector((state) => state.user.user);
  const sId = schoolData.School._id;

  const addStudentToSchool = () => {
    // console.log(selectedOption);
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `http://localhost:9999/addExistingStudent?schoolID=${sId}&standard=${selectedOption}&studentId=${selectedStudent._id}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Student Successfully in Your School",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => console.log("error", error));
  };

  const initialValues = {
    firstName:
      selectedStudent && selectedStudent.Name
        ? selectedStudent.Name.split(" ")[0]
        : "",
    middleName:
      selectedStudent && selectedStudent.Name
        ? selectedStudent.Name.split(" ")[1]
        : "",
    lastName:
      selectedStudent && selectedStudent.Name
        ? selectedStudent.Name.split(" ")[2]
        : "",
    standard:
      selectedStudent && selectedStudent.Standard
        ? selectedStudent.Standard
        : "",
    gender:
      selectedStudent && selectedStudent.Gender ? selectedStudent.Gender : "",
    dob:
      selectedStudent && selectedStudent.DOB
        ? selectedStudent.DOB.split("T")[0]
        : "",
    aadharCard:
      selectedStudent && selectedStudent.AadharNumber
        ? selectedStudent.AadharNumber
        : "",
    schoolName:
      selectedStudent &&
      selectedStudent.SchoolID &&
      selectedStudent.SchoolID[selectedStudent.SchoolID.length - 1]
        ? selectedStudent.SchoolID[selectedStudent.SchoolID.length - 1].Name
        : "",

    state:
      selectedStudent && selectedStudent.State && selectedStudent.State.name
        ? selectedStudent.State.name
        : "",
    district:
      selectedStudent &&
      selectedStudent.District &&
      selectedStudent.District.district
        ? selectedStudent.District.district
        : "",
    taluka:
      selectedStudent && selectedStudent.Taluka && selectedStudent.Taluka.taluka
        ? selectedStudent.Taluka.taluka
        : "",
    city:
      selectedStudent && selectedStudent.City && selectedStudent.City.city
        ? selectedStudent.City.city
        : "",
    caste:
      selectedStudent && selectedStudent.Caste ? selectedStudent.Caste : "",
    cityArea:
      selectedStudent &&
      selectedStudent.City &&
      selectedStudent.City.cityType !== undefined
        ? selectedStudent.City.cityType === 1
          ? "Rural"
          : "Urban"
        : "",

    familyIncome:
      selectedStudent && selectedStudent.FamilyIncome
        ? selectedStudent.FamilyIncome
        : "",
    disability:
      selectedStudent && selectedStudent.Disablity
        ? selectedStudent.Disablity
        : "0 %",
    parentoccupation:
      selectedStudent && selectedStudent.ParentOccupation
        ? selectedStudent.ParentOccupation
        : "",
    parentmaritalstatus:
      selectedStudent && selectedStudent.ParentMaritalStatus
        ? selectedStudent.ParentMaritalStatus
        : "",
    contact:
      selectedStudent && selectedStudent.ContactNumber
        ? selectedStudent.ContactNumber
        : "",
    address:
      selectedStudent && selectedStudent.Address ? selectedStudent.Address : "",
  };

  const options = [
    { value: "", label: "Select Standard" },
    { value: "-1", label: "Junior KG" },
    { value: "0", label: "Senior KG" },
    { value: "1", label: "Standard 1" },
    { value: "2", label: "Standard 2" },
    { value: "3", label: "Standard 3" },
    { value: "4", label: "Standard 4" },
    { value: "5", label: "Standard 5" },
    { value: "6", label: "Standard 6" },
    { value: "7", label: "Standard 7" },
    { value: "8", label: "Standard 8" },
    { value: "9", label: "Standard 9" },
    { value: "10", label: "Standard 10" },
  ];
  const [selectedOption, setSelectedOption] = useState(
    selectedStudent && selectedStudent.Standard
      ? selectedStudent.Standard.toString()
      : ""
  );

  useEffect(() => {
    // Update selected option when initialValues change
    setSelectedOption(
      initialValues.standard
        ? initialValues.standard.toString()
        : selectedStudent && selectedStudent.Standard
        ? selectedStudent.Standard.toString()
        : ""
    );
  }, [initialValues.standard, selectedStudent]);

  return (
    <>
      <div className="bg-[#f8f9fa] m-5 h-screen">
        <div
          className="mx-auto mt-8 p-8 border rounded bg-gray-100 shadow-md shadow-gray-700 "
          style={{ width: "50%" }}
        >
          <h2 className="text-xl font-bold mb-4">
            Add Existing Student to School
          </h2>

          <div className="mb-4">
            <label
              className="block text-gray-600 text-md font-bold mb-2"
              htmlFor="uidInput"
            >
              Student UID Number
            </label>
            <input
              type="text"
              id="uidInput"
              className="border rounded-md p-2 focus:outline-gray-500 outline-2"
              style={{ width: "100%" }}
              value={uidInput}
              onChange={(e) => setUidInput(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-600 text-md font-bold mb-2"
              htmlFor="aadharInput"
            >
              Aadhar Number
            </label>
            <input
              type="text"
              id="aadharInput"
              className="border rounded-md p-2 focus:outline-gray-500 outline-2"
              style={{ width: "100%" }}
              value={aadharInput}
              onChange={(e) => setAadharInput(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <button
              type="button"
              className="btn bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
              onClick={findStudentByUid}
            >
              Find by UID
            </button>
            <button
              type="button"
              className="btn bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 ml-2 rounded"
              onClick={findStudentByAadhar}
            >
              Find by Aadhar
            </button>
          </div>
        </div>

        {studentFlage && (
          <div>
            <Formik initialValues={initialValues}>
              <Form className="min-w-fit w-3/5 mx-auto my-8 p-8 border rounded bg-gray-100 shadow-md shadow-gray-400 space-y-5">
                <div className="mb-4">
                  <div className="flex">
                    <label
                      htmlFor="firstName"
                      className="w-1/3 text-gray-500 text-md font-bold mb-2"
                    >
                      First Name
                    </label>
                    <Field
                      type="text"
                      name="firstName"
                      disabled
                      className="w-2/3 border-solid border-2 float-right rounded-md p-1.5 focus:outline-2 bg-gray-300 focus:outline-gray-400"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex">
                    <label
                      htmlFor="middleName"
                      className="w-1/3 text-gray-500 text-md font-bold mb-2"
                    >
                      Middle Name
                    </label>
                    <Field
                      type="text"
                      name="middleName"
                      disabled
                      className="w-2/3 border-solid border-2 float-right rounded-md p-1.5 focus:outline-2 bg-gray-300 focus:outline-gray-400"
                    />
                  </div>
                </div>

                {/* <div className="mb-4">
                  <div className="flex">
                    <label
                      htmlFor="lastName"
                      className="w-1/3 text-gray-500 text-md font-bold mb-2"
                    >
                      Last Name
                    </label>
                    <Field
                      type="text"
                      name="lastName"
                      disabled
                      className="w-2/3 border-solid border-2 float-right rounded-md p-1.5 focus:outline-2 bg-gray-300 focus:outline-gray-400"
                    />
                  </div>
                </div> */}

                <div className="mb-4">
                  <div className="flex">
                    <label
                      htmlFor="standard"
                      className="w-1/3 text-gray-500 text-md font-bold mb-2"
                    >
                      Student Standard
                    </label>
                    <Field
                      as="select"
                      name="standard"
                      onChange={(e) => {
                        setSelectedOption(e.target.value);
                      }}
                      value={selectedOption}
                      className="w-2/3 border-solid border-2 float-right rounded-md p-1.5 focus:outline-2 focus:outline-gray-400"
                    >
                      {options
                        .filter(
                          (option) =>
                            parseInt(option.value, 10) >
                            parseInt(initialValues.standard, 10)
                        )
                        .map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                    </Field>
                  </div>
                  <ErrorMessage
                    name="standard"
                    component="div"
                    className="text-red-500 text-sm text-center mx-4"
                  />
                </div>

                <div className="mb-4 ">
                  <div className="flex">
                    <label className="w-1/3 text-gray-500 text-md font-bold mb-2">
                      Gender
                    </label>
                    <div className="w-2/3">
                      <label>
                        <Field
                          type="radio"
                          name="gender"
                          value="male"
                          disabled
                        />
                        Male
                      </label>
                      <label className="ml-4">
                        <Field
                          type="radio"
                          name="gender"
                          value="female"
                          disabled
                        />
                        Female
                      </label>
                      <label className="ml-4">
                        <Field
                          type="radio"
                          name="gender"
                          value="other"
                          disabled
                        />
                        Other
                      </label>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex">
                    <label
                      htmlFor="dob"
                      className="w-1/3 text-gray-500 text-md font-bold mb-2"
                    >
                      Date of Birth
                    </label>
                    <Field name="dob" className="bg-gray-300" disabled />
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex">
                    <label
                      htmlFor="aadharCard"
                      className="w-1/3 text-gray-500 text-md font-bold mb-2"
                    >
                      Aadhar Card Number
                    </label>
                    <Field
                      type="text"
                      name="aadharCard"
                      disabled
                      className="w-2/3 border-solid border-2 float-right rounded-md p-1.5 focus:outline-2 bg-gray-300 focus:outline-gray-400"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex">
                    <label
                      htmlFor="schoolName"
                      className="w-1/3 text-gray-500 text-md font-bold mb-2"
                    >
                      School Name
                    </label>
                    <Field
                      type="text"
                      name="schoolName"
                      disabled
                      className="w-2/3 border-solid border-2 float-right rounded-md p-1.5 focus:outline-2 bg-gray-300 focus:outline-gray-400"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex">
                    <label
                      htmlFor="state"
                      className="w-1/3 text-gray-500 text-md font-bold mb-2"
                    >
                      State
                    </label>
                    <Field
                      type="text"
                      name="state"
                      disabled
                      className="w-2/3 border-solid border-2 float-right rounded-md p-1.5 focus:outline-2 bg-gray-300 focus:outline-gray-400"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex">
                    <label
                      htmlFor="district"
                      className="w-1/3 text-gray-500 text-md font-bold mb-2"
                    >
                      District
                    </label>
                    <Field
                      type="text"
                      name="district"
                      disabled
                      className="w-2/3 border-solid border-2 float-right rounded-md p-1.5 focus:outline-2 bg-gray-300 focus:outline-gray-400"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex">
                    <label
                      htmlFor="taluka"
                      className="w-1/3 text-gray-500 text-md font-bold mb-2"
                    >
                      Taluka
                    </label>
                    <Field
                      type="text"
                      name="taluka"
                      disabled
                      className="w-2/3 border-solid border-2 float-right rounded-md p-1.5 focus:outline-2 bg-gray-300 focus:outline-gray-400"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex">
                    <label
                      htmlFor="city"
                      className="w-1/3 text-gray-500 text-md font-bold mb-2"
                    >
                      City
                    </label>
                    <Field
                      type="text"
                      name="city"
                      disabled
                      className="w-2/3 border-solid border-2 float-right rounded-md p-1.5 focus:outline-2 bg-gray-300 focus:outline-gray-400"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex">
                    <label
                      htmlFor="address"
                      className="w-1/3 text-gray-500 text-md font-bold mb-2"
                    >
                      Address
                    </label>
                    <Field
                      type="text"
                      name="address"
                      disabled
                      className="w-2/3 border-solid border-2 float-right rounded-md p-1.5 focus:outline-2 bg-gray-300 focus:outline-gray-400"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex">
                    <label
                      htmlFor="caste"
                      className="text-gray-500 text-md font-bold mb-2 w-1/3"
                    >
                      Caste
                    </label>
                    <Field
                      type="text"
                      name="caste"
                      disabled
                      className="w-2/3 border-solid border-2 float-right rounded-md p-1.5 focus:outline-2 bg-gray-300 focus:outline-gray-400"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex">
                    <label
                      htmlFor="cityArea"
                      className="text-gray-500 text-md font-bold mb-2 w-1/3"
                    >
                      City Area (Urban/Rural)
                    </label>
                    <Field
                      type="text"
                      name="cityArea"
                      disabled
                      className="w-2/3 border-solid border-2 float-right rounded-md p-1.5 focus:outline-2 bg-gray-300 focus:outline-gray-400"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex">
                    <label
                      htmlFor="familyIncome"
                      className="text-gray-500 text-md font-bold mb-2 w-1/3"
                    >
                      Family Annual Income
                    </label>
                    <Field
                      type="text"
                      name="familyIncome"
                      disabled
                      className="w-2/3 border-solid border-2 float-right rounded-md p-1.5 focus:outline-2 bg-gray-300 focus:outline-gray-400"
                    />
                  </div>
                </div>

                <div className="mb-4 ">
                  <div className="flex">
                    <label
                      htmlFor="parentoccupation"
                      className="flex text-gray-500 text-md font-bold mb-2 w-1/3"
                    >
                      Parent's Occupation
                    </label>
                    <Field
                      type="text"
                      name="parentoccupation"
                      disabled
                      className="w-2/3 border-solid border-2 float-right rounded-md p-1.5 focus:outline-2 bg-gray-300 focus:outline-gray-400"
                    />
                  </div>
                </div>

                <div className="mb-4 ">
                  <div className="flex">
                    <label
                      htmlFor="contact"
                      className=" text-gray-500 text-md font-bold mb-2 w-1/3"
                    >
                      Parent's Contact Number
                    </label>
                    <Field
                      type="text"
                      name="contact"
                      disabled
                      className="w-2/3 border-solid border-2 float-right rounded-md p-1.5 focus:outline-2 bg-gray-300 focus:outline-gray-400"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex">
                    <label
                      htmlFor="parentmaritalstatus"
                      className="text-gray-500 text-md font-bold mb-2 w-1/3"
                    >
                      Parent Marital Status
                    </label>
                    <Field
                      as="select"
                      name="parentmaritalstatus"
                      disabled
                      className="w-2/3 border-solid border-2 float-right rounded-md p-1.5 focus:outline-2 bg-gray-300 focus:outline-gray-400"
                    >
                      <option value="">Select Status</option>
                      <option value="0">Without Parent</option>
                      <option value="1">Without Father</option>
                      <option value="2">Without Mother</option>
                      <option value="3">With Both</option>
                    </Field>
                  </div>
                  <ErrorMessage
                    name="parentmaritalstatus"
                    component="div"
                    className="text-red-500 text-sm  text-center mx-4"
                  />
                </div>

                <div className="mb-4">
                  <div className="flex">
                    <label
                      htmlFor="disability"
                      className=" text-gray-500 text-md font-bold mb-2 w-1/3"
                    >
                      Disability
                    </label>
                    <Field
                      type="text"
                      name="disability"
                      disabled
                      className="w-2/3 border-solid border-2 float-right rounded-md p-1.5 focus:outline-2 bg-gray-300 focus:outline-gray-400"
                    />
                  </div>
                </div>
              </Form>
            </Formik>
            <button
              type="button"
              className="btn bg-green-500 text-white font-bold py-2 px-4 rounded mt-2"
              onClick={addStudentToSchool}
            >
              Add to School
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ExistingStudentForm;
