import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
// import DatePicker from "react-datepicker";
import Swal from "sweetalert2";
import { Calendar } from "primereact/calendar";
import "react-datepicker/dist/react-datepicker.css";
import { RegistrationvalidationSchema } from "../../../Schemas";
import AddStudentExcel from "./AddStudentExcel";
import FetchState from "../../../API/FetchState";
import FetchDistrict from "../../../API/FetchDistrict";
import FetchTaluka from "../../../API/FetchTaluka";
import FetchCity from "../../../API/FetchCity";
import { useSelector } from "react-redux";

const initialValues = {
  firstName: "",
  middleName: "",
  lastName: "",
  standard: "",
  gender: "",
  dob: null,
  aadharCard: "",
  // state: "",
  // district: "",
  // taluka: "",
  // city: "",
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
  const [stateName, setStateName] = useState([]);
  const [TalukaName, setTalukaName] = useState([]);
  const [DistrictName, setDistrictName] = useState([]);
  const [CityName, setCityName] = useState([]);

  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedTaluka, setSelectedTaluka] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const schoolData = useSelector((state) => state.user.user);
  const sId = schoolData.School._id;

  const parentOccupations = [
    "Engineer",
    "Doctor",
    "Teacher",
    "Lawyer",
    "Business Owner",
    "IT Professional",
    "Artist",
    "Nurse",
    "Police Officer",
    "Chef",
    "Scientist",
    "Construction Worker",
    "Pilot",
    "Pharmacist",
    "Social Worker",
    "Financial Analyst",
    "Writer",
    "Graphic Designer",
    "Veterinarian",
    "Librarian",
    "Athlete",
    "Marketing Specialist",
    "Human Resources Manager",
    "Actor/Actress",
    "Fitness Instructor",
    "Journalist",
    "Military Personnel",
    "Event Planner",
    "Public Relations Specialist",
    "Travel Agent",
    "Interior Designer",
    "Dentist",
    "Orthodontist",
    "Psychologist",
    "Real Estate Agent",
    "Electrician",
    "Plumber",
    "Carpenter",
    "Taxi Driver",
    "Phlebotomist",
    "Biologist",
    "Meteorologist",
    "Architect",
    "Translator",
    "Firefighter",
    "Paramedic",
    "Zookeeper",
    "Dancer",
    "Librarian",
    "Geologist",
    "Podcast Host",
    "Video Game Developer",
    "Cartoonist",
    "Botanist",
    "Magician",
    "Ethical Hacker",
    "Cryptocurrency Trader",
    "None",
  ];

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
      City: selectedCity,
      Taluka: selectedTaluka,
      District: selectedDistrict,
      State: selectedState,
      SchoolID: sId,
      FatherEducation: values.fathereducation,
      MotherEducation: values.mothereducation,
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
    setSelectedState("");
    setSelectedDistrict("");
    setSelectedTaluka("");
    setSelectedCity("");
  };

  useEffect(() => {
    FetchState().then((res) => {
      setStateName(res);
    });
  }, []);

  return (
    <>
      <AddStudentExcel />
      <Formik
        initialValues={initialValues}
        validationSchema={RegistrationvalidationSchema}
        onSubmit={handleSubmit}
      >
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

            <ErrorMessage
              name="firstName"
              component="div"
              className="text-red-500 text-sm text-center mx-4"
            />
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
            <ErrorMessage
              name="middleName"
              component="div"
              className="text-red-500 text-sm  text-center mx-4"
            />
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
            <ErrorMessage
              name="lastName"
              component="div"
              className="text-red-500 text-sm  text-center mx-4"
            />
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
                <option value="-1">Junior KG</option>
                <option value="0">Senior KG</option>
                <option value="1">Standard 1</option>
                <option value="2">Standard 2</option>
                <option value="3">Standard 3</option>
                <option value="4">Standard 4</option>
                <option value="5">Standard 5</option>
                <option value="6">Standard 6</option>
                <option value="7">Standard 7</option>
                <option value="8">Standard 8</option>
                <option value="9">Standard 9</option>
                <option value="10">Standard 10</option>
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
                <label className="ml-4">
                  <Field type="radio" name="gender" value="other" />
                  Other
                </label>
              </div>
            </div>
            <ErrorMessage
              name="gender"
              component="div"
              className="text-red-500 text-sm  text-center mx-4"
            />
          </div>

          <div className="mb-4">
            <div className="flex">
              <label
                htmlFor="dob"
                className="w-1/3 text-gray-500 text-md font-bold mb-2"
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
                    className="border-2 w-2/3 float-right  p-1.5 rounded-md"
                    maxDate={new Date()}
                    style={{ width: "300px" }}
                  />
                )}
              </Field>
            </div>
            <ErrorMessage
              name="dob"
              component="div"
              className="text-red-500 text-sm  text-center mx-4"
            />
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
            <ErrorMessage
              name="aadharCard"
              component="div"
              className="text-red-500 text-sm  text-center mx-4"
            />
          </div>

          <label className="flex mb-4">
            <span className="text-gray-500 font-bold w-1/3">Select State</span>
            <select
              className="mt-1 p-2 w-2/3 border rounded-md focus:outline-2 focus:outline-gray-400"
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
          <label className="flex mb-4">
            <span className="text-gray-500 font-bold w-1/3">
              Select District
            </span>
            <select
              className="w-2/3 mt-1 p-2  border rounded-md focus:outline-2 focus:outline-gray-400"
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
          <label className="flex mb-4">
            <span className="text-gray-500 font-bold w-1/3">Select Taluka</span>
            <select
              className="mt-1 p-2 w-2/3 border rounded-md focus:outline-2 focus:outline-gray-400"
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
          <label className="flex mb-4">
            <span className="text-gray-500 font-bold w-1/3">Select City</span>
            <select
              className="mt-1 p-2 w-2/3 border rounded-md focus:outline-2 focus:outline-gray-400"
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
            <ErrorMessage
              name="address"
              component="div"
              className="text-red-500 text-sm  text-center mx-4"
            />
          </div>

          <div className="mb-4">
            <div className="flex">
              <label
                htmlFor="caste"
                className="text-gray-500 text-md font-bold mb-2 w-1/3"
              >
                Caste
              </label>
              {/* <Field
                type="text"
                name="caste"
                className="border-solid border-2 float-right w-2/3 p-1.5 rounded-md focus:outline-2 focus:outline-gray-400"
              /> */}
              <Field
                as="select"
                name="caste"
                className="border-solid border-2 float-right w-2/3 p-1.5 rounded-md focus:outline-2 focus:outline-gray-400"
              >
                <option value="">Select Caste</option>
                <option value="Open">Open</option>
                <option value="General">General-EWS</option>
                <option value="SEBC">SEBC</option>
                <option value="SC">SC</option>
                <option value="ST">ST</option>
              </Field>
            </div>
            <ErrorMessage
              name="caste"
              component="div"
              className="text-red-500 text-sm  text-center mx-4"
            />
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
                as="select"
                name="familyIncome"
                className="border-solid border-2 float-right w-2/3 p-1.5 rounded-md focus:outline-2 focus:outline-gray-400"
              >
                <option value="">Select Family Income</option>
                <option value="1-2 Lakh">1-2 Lakh</option>
                <option value="2-4 Lakh">2-4 Lakh</option>
                <option value="4-6 Lakh">4-6 Lakh</option>
                <option value="More than 6 lakh">More than 6 lakh</option>
              </Field>
            </div>
            <ErrorMessage
              name="familyIncome"
              component="div"
              className="text-red-500 text-sm  text-center mx-4"
            />
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
                as="select"
                name="parentoccupation"
                className="border-solid border-2 float-right w-2/3 p-1.5 rounded-md focus:outline-2 focus:outline-gray-400"
              >
                <option value="">Select Father Occupation</option>
                {parentOccupations.map((occupation, index) => (
                  <option key={index} value={occupation} label={occupation} />
                ))}
              </Field>
              {/* <Field
                type="text"
                name="parentoccupation"
                className="border-solid border-2 float-right w-2/3 p-1.5 rounded-md focus:outline-2 focus:outline-gray-400"
              /> */}
            </div>
            <ErrorMessage
              name="parentoccupation"
              component="div"
              className="text-red-500 text-sm  text-center mx-4"
            />
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
            <ErrorMessage
              name="contact"
              component="div"
              className="text-red-500 text-sm  text-center mx-4"
            />
          </div>

          <div className="mb-4">
            <div className="flex">
              <label
                htmlFor="fathereducation"
                className="text-gray-500 text-md font-bold mb-2 w-1/3"
              >
                Father's Education :
              </label>
              <Field
                as="select"
                name="fathereducation"
                className="border-solid border-2 float-right w-2/3 p-1.5 rounded-md focus:outline-2 focus:outline-gray-400"
              >
                <option value="">Select Father's Education</option>
                <option value="0">No Formal Education</option>
                <option value="1">Primary Education</option>
                <option value="2">Secondary Education</option>
                <option value="3">Higher Education</option>
                <option value="4">Graduate</option>
              </Field>
            </div>
            <ErrorMessage
              name="fathereducation"
              component="div"
              className="text-red-500 text-sm  text-center mx-4"
            />
          </div>
          <div className="mb-4">
            <div className="flex">
              <label
                htmlFor="mothereducation"
                className="text-gray-500 text-md font-bold mb-2 w-1/3"
              >
                Mother's Education :
              </label>
              <Field
                as="select"
                name="mothereducation"
                className="border-solid border-2 float-right w-2/3 p-1.5 rounded-md focus:outline-2 focus:outline-gray-400"
              >
                <option value="">Select Mother's Education</option>
                <option value="0">No Formal Education</option>
                <option value="1">Primary Education</option>
                <option value="2">Secondary Education</option>
                <option value="3">Higher Education</option>
                <option value="4">Graduate</option>
              </Field>
            </div>
            <ErrorMessage
              name="mothereducation"
              component="div"
              className="text-red-500 text-sm  text-center mx-4"
            />
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
                className="border-solid border-2 float-right w-2/3 p-1.5 rounded-md focus:outline-2 focus:outline-gray-400"
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
                className="border-solid border-2 float-right w-2/3 p-1.5 rounded-md focus:outline-2 focus:outline-gray-400"
              />
            </div>
            <ErrorMessage
              name="disability"
              component="div"
              className="text-red-500 text-sm  text-center mx-4"
            />
          </div>

          <div className="mt-4 flex items-center justify-center">
            <button
              type="submit"
              className="btn bg-blue-700 text-white font-bold tracking-wider py-2 px-5 my-3 rounded-md hover:bg-blue-600 uppercase "
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
