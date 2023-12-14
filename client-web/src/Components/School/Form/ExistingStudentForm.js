import React from "react";
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  middleName: Yup.string(),
  lastName: Yup.string().required('Last Name is required'),
  standard: Yup.string().required('Student Standard is required'),
  gender: Yup.string().required('Gender is required'),
  dob: Yup.date().required('Date of Birth is required'),
  aadharCard: Yup.string().required('Aadhar Card Number is required'),
  schoolName: Yup.string().required('School Name is required'),
  state: Yup.string().required('State is required'),
  district: Yup.string().required('District is required'),
  taluka: Yup.string().required('Taluka is required'),
  city: Yup.string().required('City is required'),
  caste: Yup.string().required('Caste is required'),
  cityArea: Yup.string().required('City Area is required'),
  familyIncome: Yup.number().required('Family Annual Income is required'),
  disability: Yup.string(),
});

const initialValues = {
  firstName: '',
  middleName: '',
  lastName: '',
  standard: '',
  gender: '',
  dob: null,
  aadharCard: '',
  schoolName: '',
  state: '',
  district: '',
  taluka: '',
  city: '',
  caste: '',
  cityArea: '',
  familyIncome: '',
  disability: '',
};

const ExistingStudentForm = () => {

  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="min-w-fit mx-auto mt-8 p-8 border rounded bg-white shadow-md">
          <div className="mb-4">
            <label htmlFor="firstName" className=" text-gray-700 text-sm font-bold mb-2">First Name</label>
            <Field type="text" name="firstName" className="border-solid border-2 float-right" />
            <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm"  />
          </div>

          <div className="mb-4">
            <label htmlFor="middleName" className=" text-gray-700 text-sm font-bold mb-2">Middle Name</label>
            <Field type="text" name="middleName" className="border-solid border-2 float-right" />
            <ErrorMessage name="middleName" component="div" className="text-red-500 text-sm"  />
          </div>

          <div className="mb-4">
            <label htmlFor="lastName" className=" text-gray-700 text-sm font-bold mb-2">Last Name</label>
            <Field type="text" name="lastName" className="border-solid border-2 float-right" />
            <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm"  />
          </div>

          <div className="mb-4">
            <label htmlFor="standard" className=" text-gray-700 text-sm font-bold mb-2">Student Standard</label>
            <Field as="select" name="standard" className="border-solid border-2 float-right w-44">
              <option value="">Select Standard</option>
              <option value="1">Standard 1</option>
              <option value="1">Standard 2</option>
              <option value="1">Standard 3</option>
            </Field>
            <ErrorMessage name="standard" component="div" className="text-red-500 text-sm"  />
          </div>

          <div className="mb-4">
            <label className=" text-gray-700 text-sm font-bold mb-2">Gender</label>
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
            <ErrorMessage name="gender" component="div" className="text-red-500 text-sm"  />
          </div>

          <div className="mb-4">
            <label htmlFor="dob" className=" text-gray-700 text-sm font-bold mb-2">Date of Birth</label>
            <Field name="dob" className="">
              {({ form, field }) => (
                <DatePicker
                  {...field}
                  selected={form.values.dob}
                  onChange={(date) => form.setFieldValue('dob', date)}
                  dateFormat="yyyy-MM-dd"
                  className="border-solid border-2 ml-28"
                />
              )}
            </Field>
            <ErrorMessage name="dob" component="div" className="text-red-500 text-sm"  />
          </div>

          <div className="mb-4">
            <label htmlFor="aadharCard" className=" text-gray-700 text-sm font-bold mb-2">Aadhar Card Number</label>
            <Field type="text" name="aadharCard" className="border-solid border-2 float-right" />
            <ErrorMessage name="aadharCard" component="div" className="text-red-500 text-sm"  />
          </div>

          <div className="mb-4">
            <label htmlFor="schoolName" className=" text-gray-700 text-sm font-bold mb-2">School Name</label>
            <Field type="text" name="schoolName" className="border-solid border-2 float-right" />
            <ErrorMessage name="schoolName" component="div" className="text-red-500 text-sm"  />
          </div>

          <div className="mb-4">
            <label htmlFor="state" className=" text-gray-700 text-sm font-bold mb-2">State</label>
            <Field as="select" name="state" className="border-solid border-2 float-right w-44">
              <option value="">Select State</option>
              <option value="1">State 1</option>
              <option value="1">State 2</option>
              <option value="1">State 3</option>
            </Field>
            <ErrorMessage name="state" component="div" className="text-red-500 text-sm"  />
          </div>

          <div className="mb-4">
            <label htmlFor="district" className="text-gray-700 text-sm font-bold mb-2">District</label>
            <Field as="select" name="district" className="border-solid border-2 float-right w-44">
              <option value="">Select District</option>
              <option value="1">District 1</option>
              <option value="1">District 2</option>
              <option value="1">District 3</option>
            </Field>
            <ErrorMessage name="district" component="div" className="text-red-500 text-sm"  />
          </div>

          <div className="mb-4">
            <label htmlFor="taluka" className="text-gray-700 text-sm font-bold mb-2">Taluka</label>
            <Field as="select" name="taluka" className="border-solid border-2 float-right w-44">
              <option value="">Select Taluka</option>
              <option value="1">Taluka 1</option>
              <option value="1">Taluka 2</option>
              <option value="1">Taluka 3</option>
            </Field>
            <ErrorMessage name="taluka" component="div" className="text-red-500 text-sm"  />
          </div>

          <div className="mb-4">
            <label htmlFor="city" className="text-gray-700 text-sm font-bold mb-2">City</label>
            <Field as="select" name="city" className="border-solid border-2 float-right w-44">
              <option value="">Select City</option>
              <option value="1">City 1</option>
              <option value="1">City 2</option>
              <option value="1">City 3</option>
            </Field>
            <ErrorMessage name="city" component="div" className="text-red-500 text-sm"  />
          </div>

          <div className="mb-4">
            <label htmlFor="caste" className="text-gray-700 text-sm font-bold mb-2">Caste</label>
            <Field type="text" name="caste" className="border-solid border-2 float-right w-44" />
            <ErrorMessage name="caste" component="div" className="text-red-500 text-sm"  />
          </div>

          <div className="mb-4">
            <label htmlFor="cityArea" className="text-gray-700 text-sm font-bold mb-2">City Area (Urban/Rural)</label>
            <Field as="select" name="cityArea" className="border-solid border-2 float-right w-44">
              <option value="">Select City Area</option>
              <option value="urban">Urban</option>
              <option value="rural">Rural</option>
            </Field>
            <ErrorMessage name="cityArea" component="div" className="text-red-500 text-sm"  />
          </div>

          <div className="mb-4">
            <label htmlFor="familyIncome" className="text-gray-700 text-sm font-bold mb-2">Family Annual Income</label>
            <Field as="select" name="familyIncome" className="border-solid border-2 float-right w-44">
              <option value="">Select Income</option>
              <option value="1">Income 1</option>
              <option value="1">Income 2</option>
              <option value="1">Income 3</option>
            </Field>
            <ErrorMessage name="familyIncome" component="div" className="text-red-500 text-sm"  />
          </div>

          <div className="mb-4">
            <label htmlFor="disability" className=" text-gray-700 text-sm font-bold mb-2">Disability</label>
            <Field type="text" name="disability" className="border-solid border-2 float-right" />
            <ErrorMessage name="disability" component="div" className="text-red-500 text-sm"  />
          </div>

          <div className="mt-4">
            <button type="submit" className="btn bg-blue-500 text-white font-bold py-2 px-4 rounded float-right">
              Submit
            </button>
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default ExistingStudentForm;
