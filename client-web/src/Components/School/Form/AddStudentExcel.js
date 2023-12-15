import React from "react";
import { ErrorMessage, Form, Formik, useFormik } from "formik";
import { useDropzone } from "react-dropzone";
import { excelFileSchema } from "../../../Schemas";

const initialValues = {
  excelfile: null,
};

const AddStudentExcel = () => {
  const handleSubmit = async (values, action) => {
    console.log(values);

    // Use FormData and append the file from the ref
    var formdata = new FormData();
    formdata.append("excelfile", values.excelfile[0], values.excelfile[0].name);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "http://localhost:9999/addStudentExcel",
        requestOptions
      );
      const result = await response.json();

      if (result.rcode === 200) {
        console.log(result.message);
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };

  // Use useFormik hook to access formik methods, including setFieldValue
  const formik = useFormik({
    initialValues,
    validationSchema: excelFileSchema,
    onSubmit: handleSubmit, // Use onSubmit for form submission
  });

  const onDrop = (acceptedFiles) => {
    // Use formik.setFieldValue instead of setFieldValue
    formik.setFieldValue("excelfile", acceptedFiles);

    console.log(acceptedFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      <Formik {...formik}>
        <Form className="min-w-fit w-3/5 mx-auto my-8 p-8 border rounded bg-gray-100 shadow-md shadow-gray-400 space-y-5">
          <div className="mb-4">
            <div className="flex">
              <label
                htmlFor="excelfile"
                className="w-1/3 text-gray-500 text-md font-bold mb-2"
              >
                Upload Excel File
              </label>
              <div
                {...getRootProps()}
                className={`w-2/3 border-solid border-2 float-right p-1.5 rounded-md focus:outline-2 focus:outline-gray-400 ${
                  isDragActive ? "border-blue-500" : ""
                }`}
              >
                <input {...getInputProps()} name="excelfile" id="fileInput" />
                {isDragActive ? (
                  <p>Drop the file here ...</p>
                ) : (
                  <p>Drag and drop Excel file here or Click to select file</p>
                )}
              </div>
            </div>
            <ErrorMessage
              name="excelfile"
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

export default AddStudentExcel;
