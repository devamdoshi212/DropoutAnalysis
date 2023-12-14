import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
// import DatePicker from "react-datepicker";
import Swal from "sweetalert2";
import { Calendar } from "primereact/calendar";
import "react-datepicker/dist/react-datepicker.css";
import { RegistrationvalidationSchema } from "../../../Schemas";

const initialValues = {
  firstName: "",
  middleName: "",
  lastName: "",
  standard: "",
  gender: "",
  dob: null,
  aadharCard: "",
  schoolName: "",
  state: "",
  district: "",
  taluka: "",
  city: "",
  caste: "",
  cityArea: "",
  familyIncome: "",
  disability: "",
  parentoccupation: "",
  parentmaritalstatus: "",
  contact: "",
  address: "",
};

const NewStudentForm = () => {
  const handleSubmit = (values, action) => {
    console.log(values);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      Name: values.firstName + " " + values.middleName + " " + values.lastName,
      DOB: values.dob,
      Gender: values.gender,
      AadharNumber: values.aadharCard,
      ParentOccupation: values.parentoccupation,
      Standard: values.standard,
      FamilyIncome: values.familyIncome,
      Caste: values.caste,
      Disablity: values.disability,
      Address: values.address,
      ContactNumber: values.contact,
      ParentMaritalStatus: values.parentmaritalstatus,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:9999/addStudent", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Student Added Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => console.log("error", error));

    action.resetForm();
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={RegistrationvalidationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="min-w-fit mx-auto mt-8 p-8 border rounded bg-white shadow-md">
          <div className="mb-4">
            <label
              htmlFor="firstName"
              className=" text-gray-700 text-sm font-bold mb-2"
            >
              First Name
            </label>
            <Field
              type="text"
              name="firstName"
              className="border-solid border-2 float-right"
            />
            <ErrorMessage
              name="firstName"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="middleName"
              className=" text-gray-700 text-sm font-bold mb-2"
            >
              Middle Name
            </label>
            <Field
              type="text"
              name="middleName"
              className="border-solid border-2 float-right"
            />
            <ErrorMessage
              name="middleName"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="lastName"
              className=" text-gray-700 text-sm font-bold mb-2"
            >
              Last Name
            </label>
            <Field
              type="text"
              name="lastName"
              className="border-solid border-2 float-right"
            />
            <ErrorMessage
              name="lastName"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="standard"
              className=" text-gray-700 text-sm font-bold mb-2"
            >
              Student Standard
            </label>
            <Field
              as="select"
              name="standard"
              className="border-solid border-2 float-right w-44"
            >
              <option value="">Select Standard</option>
              <option value="1">Standard 1</option>
              <option value="2">Standard 2</option>
              <option value="3">Standard 3</option>
            </Field>
            <ErrorMessage
              name="standard"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div className="mb-4">
            <label className=" text-gray-700 text-sm font-bold mb-2">
              Gender
            </label>
            <div>
              <label>
                <Field type="radio" name="gender" value="male" />
                Male
              </label>
              <label className="ml-4">
                <Field type="radio" name="gender" value="female" />
                Female
              </label>
            </div>
            <ErrorMessage
              name="gender"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="dob"
              className=" text-gray-700 text-sm font-bold mb-2"
            >
              Date of Birth
            </label>
            <Field name="dob" className="">
              {({ field, form }) => (
                <Calendar
                  id="dob"
                  {...field}
                  value={field.value}
                  onChange={(e) => form.setFieldValue("dob", e.value)}
                  showIcon
                  className="border-2 w-44 float-right ml-4"
                  maxDate={new Date()}
                  style={{ width: "300px" }}
                />
              )}
            </Field>
            <ErrorMessage
              name="dob"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="aadharCard"
              className=" text-gray-700 text-sm font-bold mb-2"
            >
              Aadhar Card Number
            </label>
            <Field
              type="text"
              name="aadharCard"
              className="border-solid border-2 float-right"
            />
            <ErrorMessage
              name="aadharCard"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="schoolName"
              className=" text-gray-700 text-sm font-bold mb-2"
            >
              School Name
            </label>
            <Field
              type="text"
              name="schoolName"
              className="border-solid border-2 float-right"
            />
            <ErrorMessage
              name="schoolName"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="state"
              className=" text-gray-700 text-sm font-bold mb-2"
            >
              State
            </label>
            <Field
              as="select"
              name="state"
              className="border-solid border-2 float-right w-44"
            >
              <option value="">Select State</option>
              <option value="1">State 1</option>
              <option value="1">State 2</option>
              <option value="1">State 3</option>
            </Field>
            <ErrorMessage
              name="state"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="district"
              className="text-gray-700 text-sm font-bold mb-2"
            >
              District
            </label>
            <Field
              as="select"
              name="district"
              className="border-solid border-2 float-right w-44"
            >
              <option value="">Select District</option>
              <option value="1">District 1</option>
              <option value="1">District 2</option>
              <option value="1">District 3</option>
            </Field>
            <ErrorMessage
              name="district"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="taluka"
              className="text-gray-700 text-sm font-bold mb-2"
            >
              Taluka
            </label>
            <Field
              as="select"
              name="taluka"
              className="border-solid border-2 float-right w-44"
            >
              <option value="">Select Taluka</option>
              <option value="1">Taluka 1</option>
              <option value="1">Taluka 2</option>
              <option value="1">Taluka 3</option>
            </Field>
            <ErrorMessage
              name="taluka"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="city"
              className="text-gray-700 text-sm font-bold mb-2"
            >
              City
            </label>
            <Field
              as="select"
              name="city"
              className="border-solid border-2 float-right w-44"
            >
              <option value="">Select City</option>
              <option value="1">City 1</option>
              <option value="1">City 2</option>
              <option value="1">City 3</option>
            </Field>
            <ErrorMessage
              name="city"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="address"
              className="text-gray-700 text-sm font-bold mb-2"
            >
              Address
            </label>
            <Field
              type="text"
              name="address"
              className="border-solid border-2 float-right w-44"
            />
            <ErrorMessage
              name="address"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="caste"
              className="text-gray-700 text-sm font-bold mb-2"
            >
              Caste
            </label>
            <Field
              type="text"
              name="caste"
              className="border-solid border-2 float-right w-44"
            />
            <ErrorMessage
              name="caste"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="cityArea"
              className="text-gray-700 text-sm font-bold mb-2"
            >
              City Area (Urban/Rural)
            </label>
            <Field
              as="select"
              name="cityArea"
              className="border-solid border-2 float-right w-44"
            >
              <option value="">Select City Area</option>
              <option value="urban">Urban</option>
              <option value="rural">Rural</option>
            </Field>
            <ErrorMessage
              name="cityArea"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="familyIncome"
              className="text-gray-700 text-sm font-bold mb-2"
            >
              Family Annual Income
            </label>
            <Field
              as="select"
              name="familyIncome"
              className="border-solid border-2 float-right w-44"
            >
              <option value="">Select Income</option>
              <option value="1">Income 1</option>
              <option value="1">Income 2</option>
              <option value="1">Income 3</option>
            </Field>
            <ErrorMessage
              name="familyIncome"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="parentoccupation"
              className="text-gray-700 text-sm font-bold mb-2"
            >
              Parent's Occupation
            </label>
            <Field
              type="text"
              name="parentoccupation"
              className="border-solid border-2 float-right w-44"
            />
            <ErrorMessage
              name="parentoccupation"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="contact"
              className="text-gray-700 text-sm font-bold mb-2"
            >
              Parent's Contact Number
            </label>
            <Field
              type="text"
              name="contact"
              className="border-solid border-2 float-right w-44"
            />
            <ErrorMessage
              name="contact"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="parentmaritalstatus"
              className="text-gray-700 text-sm font-bold mb-2"
            >
              Parent Marrital Status
            </label>
            <Field
              as="select"
              name="parentmaritalstatus"
              className="border-solid border-2 float-right w-44"
            >
              <option value="">Select Staus</option>
              <option value="1">Staus 1</option>
              <option value="1">Staus 2</option>
              <option value="1">Staus 3</option>
            </Field>
            <ErrorMessage
              name="parentmaritalstatus"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="disability"
              className=" text-gray-700 text-sm font-bold mb-2"
            >
              Disability
            </label>
            <Field
              type="text"
              name="disability"
              className="border-solid border-2 float-right"
            />
            <ErrorMessage
              name="disability"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className="btn bg-blue-500 text-white font-bold py-2 px-4 rounded float-right"
            >
              Submit
            </button>
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default NewStudentForm;
