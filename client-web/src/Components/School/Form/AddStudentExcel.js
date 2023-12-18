import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const AddStudentExcel = () => {
  const initialValues = {
    file: null,
  };

  const fileSchema = Yup.object().shape({
    file: Yup.mixed()
      .required("File is required")
      .test(
        "fileType",
        "Only Excel or CSV files are allowed",
        (value) =>
          value &&
          (value[0].type ===
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
            value[0].type === "text/csv")
      )
      .test(
        "fileSize",
        "File size must be less than 5MB",
        (value) => value && value[0].size <= 5242880
      ),
  });

  const onSubmit = async (values) => {
    // console.log(values.file.name)
    const fileInput = document.getElementById("fileInput");
    var formdata = new FormData();
    formdata.append("excelfile", fileInput.files[0], values.file[0].name);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch("http://localhost:9999/addStudentExcel", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  const formik = useFormik({
    initialValues,
    fileSchema,
    onSubmit,
  });
  const handleOneFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    formik.setFieldValue("file", selectedFiles);
  };
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="min-w-fit w-3/5 mx-auto my-5 mt-8 p-5 border rounded bg-gray-100 shadow-md shadow-gray-400 space-y-5">
        <div className="mx-5 space-x-3">
          <label htmlFor="file" className="font-semibold text-gray-500">
            Choose Excel File :
          </label>
          <input
            id="fileInput"
            name="file"
            type="file"
            onChange={handleOneFileChange}
            onBlur={formik.handleBlur}
            // accept='.xls .xlsx'
          />
          {formik.touched.file && formik.errors.file && (
            <div style={{ color: "red" }}>{formik.errors.file}</div>
          )}
        </div>
        <button
          type="submit"
          className="mx-5 bg-blue-700 text-white font-bold tracking-wider py-2 px-5  rounded-md hover:bg-blue-600 uppercase"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default AddStudentExcel;
