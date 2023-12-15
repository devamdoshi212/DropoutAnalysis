import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";

const ExistingStudentForm = () => {
  const [uidInput, setUidInput] = useState("");
  const [aadharInput, setAadharInput] = useState("");
  const [selectedStudent, setSelectedStudent] = useState([]);
  const [studentFlage, setStudentFlage] = useState(null);

  const findStudentByUid = () => {};

  const findStudentByAadhar = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `http://localhost:9999/getStudent?AadharNumber=${aadharInput}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        const data = result.data[0];
        setSelectedStudent(data);
        setStudentFlage(1);
      })
      .catch((error) => console.log("error", error));
  };

  console.log(selectedStudent);

  const addStudentToSchool = () => {
    if (selectedStudent) {
      console.log(`Added student ${selectedStudent.name} to the school.`);
    } else {
      console.log("No student selected.");
    }
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
    gender: selectedStudent.Gender,
    dob: selectedStudent.DOB,
    aadharCard: selectedStudent.AadharNumber,
    schoolName: selectedStudent.Name,
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
    caste: selectedStudent.Caste,
    cityArea:
      selectedStudent &&
      selectedStudent.City &&
      selectedStudent.City.cityType !== undefined
        ? selectedStudent.City.cityType === 1
          ? "Rural"
          : "Urban"
        : "",

    familyIncome: selectedStudent.FamilyIncome,
    disability: selectedStudent.Disablity,
    parentoccupation: selectedStudent.ParentOccupation,
    parentmaritalstatus: selectedStudent.ParentMaritalStatus,
    contact: selectedStudent.ContactNumber,
    address: selectedStudent.Address,
  };

  return (
    <>
      <div
        className="mx-auto mt-8 p-8 border rounded bg-white shadow-md"
        style={{ width: "50%" }}
      >
        <h2 className="text-xl font-bold mb-4">
          Add Existing Student to School
        </h2>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="uidInput"
          >
            Student UID Number
          </label>
          <input
            type="text"
            id="uidInput"
            className="border-2"
            style={{ width: "100%" }}
            value={uidInput}
            onChange={(e) => setUidInput(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="aadharInput"
          >
            Aadhar Number
          </label>
          <input
            type="text"
            id="aadharInput"
            className="border-2"
            style={{ width: "100%" }}
            value={aadharInput}
            onChange={(e) => setAadharInput(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <button
            type="button"
            className="btn bg-blue-500 text-white font-bold py-2 px-4 rounded"
            onClick={findStudentByUid}
          >
            Find by UID
          </button>
          <button
            type="button"
            className="btn bg-blue-500 text-white font-bold py-2 px-4 ml-2 rounded"
            onClick={findStudentByAadhar}
          >
            Find by Aadhar
          </button>
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
                      className="w-2/3 border-solid border-2 float-right rounded-md p-1.5 focus:outline-2 focus:outline-gray-400"
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
                      className="w-2/3 border-solid border-2 float-right rounded-md p-1.5 focus:outline-2 focus:outline-gray-400"
                    />
                  </div>
                </div>

                <div className="mb-4">
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
                      className="w-2/3 border-solid border-2 float-right rounded-md p-1.5 focus:outline-2 focus:outline-gray-400"
                    />
                  </div>
                </div>

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
                      className="w-2/3 border-solid border-2 float-right rounded-md p-1.5 focus:outline-2 focus:outline-gray-400"
                    >
                      <option value="">Select Standard</option>
                      <option value="1">Standard 1</option>
                      <option value="2">Standard 2</option>
                      <option value="3">Standard 3</option>
                    </Field>
                  </div>
                  <ErrorMessage
                    name="standard"
                    component="div"
                    className="text-red-500 text-sm  text-center mx-4"
                  />
                </div>

                <div className="mb-4 ">
                  <div className="flex">
                    <label className="w-1/3 text-gray-500 text-md font-bold mb-2">
                      Gender
                    </label>
                    <div className="w-2/3">
                      <label>
                        <Field type="radio" name="gender" value="male" />
                        Male
                      </label>
                      <label className="ml-4">
                        <Field type="radio" name="gender" value="female" />
                        Female
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
                    <Field name="dob" className="" />
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
                      className="w-2/3 border-solid border-2 float-right p-1.5 rounded-md focus:outline-2 focus:outline-gray-400"
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
                      className="w-2/3 border-solid border-2 float-right p-1.5 rounded-md focus:outline-2 focus:outline-gray-400"
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
                      className="w-2/3 border-solid border-2 float-right p-1.5 rounded-md focus:outline-2 focus:outline-gray-400"
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
                      className="border-solid border-2 float-right w-2/3 p-1.5 rounded-md focus:outline-2 focus:outline-gray-400"
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
                      className="w-2/3 border-solid border-2 float-right p-1.5 rounded-md focus:outline-2 focus:outline-gray-400"
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
                      className="border-solid border-2 float-right w-2/3 p-1.5 rounded-md focus:outline-2 focus:outline-gray-400"
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
                      className="border-solid border-2 float-right w-2/3 p-1.5 rounded-md focus:outline-2 focus:outline-gray-400"
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
                      className="border-solid border-2 float-right w-2/3 p-1.5 rounded-md focus:outline-2 focus:outline-gray-400"
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
                      className="border-solid border-2 float-right w-2/3 p-1.5 rounded-md focus:outline-2 focus:outline-gray-400"
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
                      className="border-solid border-2 float-right w-2/3 p-1.5 rounded-md focus:outline-2 focus:outline-gray-400"
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
                      className="border-solid border-2 float-right w-2/3 p-1.5 rounded-md focus:outline-2 focus:outline-gray-400"
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
                      className="border-solid border-2 float-right w-2/3 p-1.5 rounded-md focus:outline-2 focus:outline-gray-400"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex">
                    <label
                      htmlFor="parentmaritalstatus"
                      className="text-gray-500 text-md font-bold mb-2 w-1/3"
                    >
                      Parent Marrital Status
                    </label>
                    <Field
                      type="text"
                      name="parentmaritalstatus"
                      className="border-solid border-2 float-right w-2/3 p-1.5 rounded-md focus:outline-2 focus:outline-gray-400"
                    />
                  </div>
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
                      className="border-solid border-2 float-right w-2/3 p-1.5 rounded-md focus:outline-2 focus:outline-gray-400"
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
