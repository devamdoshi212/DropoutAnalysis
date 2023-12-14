import * as Yup from "yup";

export const LoginvalidationSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  middleName: Yup.string(),
  lastName: Yup.string().required("Last Name is required"),
  standard: Yup.string().required("Student Standard is required"),
  gender: Yup.string().required("Gender is required"),
  dob: Yup.date().required("Date of Birth is required"),
  aadharCard: Yup.string().required("Aadhar Card Number is required"),
  schoolName: Yup.string().required("School Name is required"),
  state: Yup.string().required("State is required"),
  district: Yup.string().required("District is required"),
  taluka: Yup.string().required("Taluka is required"),
  city: Yup.string().required("City is required"),
  caste: Yup.string().required("Caste is required"),
  cityArea: Yup.string().required("City Area is required"),
  familyIncome: Yup.number().required("Family Annual Income is required"),
  disability: Yup.string(),
});
