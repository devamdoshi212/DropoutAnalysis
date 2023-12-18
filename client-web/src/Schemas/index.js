import * as Yup from "yup";

export const RegistrationvalidationSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  middleName: Yup.string().required("Middle Name is required"),
  // lastName: Yup.string().required("Last Name is required"),
  standard: Yup.string().required("Student Standard is required"),
  gender: Yup.string().required("Gender is required"),
  dob: Yup.date().required("Date of Birth is required"),
  aadharCard: Yup.string().required("Aadhar Card Number is required"),
  // schoolName: Yup.string().required("School Name is required"),
  // state: Yup.string().required("State is required"),
  // district: Yup.string().required("District is required"),
  // taluka: Yup.string().required("Taluka is required"),
  // city: Yup.string().required("City is required"),
  caste: Yup.string().required("Caste is required"),
  // cityArea: Yup.string().required("City Area is required"),
  address: Yup.string().required("Address is required"),
  familyIncome: Yup.string().required("Family Annual Income is required"),
  disability: Yup.string(),
  parentoccupation: Yup.string().required("Parent's occupation is required"),
  parentmaritalstatus: Yup.string().required(
    "Parent's marital Status is required"
  ),
  contact: Yup.string().required("Contact Number is required"),
});

export const LoginValidationSchemas = Yup.object().shape({
  Email: Yup.string().required("Email is required"),
  Password: Yup.string().required("Password is required"),
});

export const excelFileSchema = Yup.object().shape({
  excelfile: Yup.mixed()
    .required("Excel file is required")
    .test(
      "fileType",
      "Only Excel files are allowed",
      (value) =>
        value &&
        value[0].type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    )
    .test(
      "fileSize",
      "File size must be less than 5MB",
      (value) => value && value[0].size <= 5242880
    ),
});

export const schoolvalidationSchema = Yup.object().shape({
  Name: Yup.string().required("Name is required"),
  Email: Yup.string().email("Invalid email").required("Email is required"),
  Address: Yup.string().required("Address is required"),
  ContactNumber: Yup.string().required("Contact Number is required"),
});
