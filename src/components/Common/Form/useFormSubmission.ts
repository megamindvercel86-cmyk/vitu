import { useFormik } from "formik";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { db, storage } from "@/firebase/firebaseConfig";
import { formValidationSchema } from "./validations";
export interface FormValues {
  fullName: string;
  email: string;
  phone: string;
  comments: string;
  whatsapp: boolean;
  option: string;
  resume: File | null;
}
export const useFormSubmission = (page: string) => {
  const handleFormSubmission = async (values: FormValues) => {
    let resumeUrl: string | null = null;

    // Upload resume only for "Career Applications"
    if (page === "Career Application" && values.resume) {
      const storageRef = ref(storage, `resumes/${values.resume.name}`);
      const uploadResult = await uploadBytes(storageRef, values.resume);
      resumeUrl = uploadResult.ref.fullPath;
    }

    // Determine collection name
    const collectionName =
      page === "General Enquire"
        ? "generalEnquiries"
        : page === "Project Enquire"
        ? "projectEnquiries"
        : "careerApplications";

    // Filter values based on page type
    const filteredValues =
      page === "General Enquire"
        ? {
            fullName: values.fullName,
            email: values.email,
            phone: values.phone,
            comments: values.comments,
            whatsapp: values.whatsapp,
          }
        : page === "Project Enquire"
        ? {
            fullName: values.fullName,
            email: values.email,
            phone: values.phone,
            whatsapp: values.whatsapp,
            interestedIn: values.option,
          }
        : {
            fullName: values.fullName,
            email: values.email,
            phone: values.phone,
            postionApplyingfor: values.option,
            resumeUrl, // Store the uploaded resume URL in DB
          };

    // Save filtered data to Firestore
    const collectionRef = collection(db, collectionName);
    await addDoc(collectionRef, filteredValues);

    // Send email notification
    try {
      await fetch("/api/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...filteredValues, page, resumeUrl }),
      });
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  const formik = useFormik<FormValues>({
    initialValues: {
      fullName: "",
      email: "",
      phone: "",
      comments: "",
      whatsapp: false,
      option: "",
      resume: null,
    },
    validationSchema: formValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await handleFormSubmission(values);
        resetForm();
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
  });

  return formik;
};
