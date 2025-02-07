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

    if (values.resume) {
      const storageRef = ref(storage, `resumes/${values.resume.name}`);
      const uploadResult = await uploadBytes(storageRef, values.resume);
      resumeUrl = uploadResult.ref.fullPath;
    }

    const collectionName =
      page === "General Enquire"
        ? "generalEnquiries"
        : page === "Project Enquire"
        ? "projectEnquiries"
        : "careerApplications";

    const collectionRef = collection(db, collectionName);
    await addDoc(collectionRef, { ...values, resumeUrl });
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