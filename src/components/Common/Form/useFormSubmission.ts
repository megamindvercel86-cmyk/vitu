import { useFormik } from "formik";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import { formValidationSchema } from "./validations";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

export interface FormValues {
  fullName: string;
  email: string;
  phone: string;
  comments: string;
  whatsapp: boolean;
  option: string;
  resume: File | null;
}

const uploadToFirebaseStorage = async (file: File): Promise<string> => {
  const storage = getStorage();
  const fileRef = ref(storage, `resumes/${file.name}-${Date.now()}`);

  try {
    const snapshot = await uploadBytes(fileRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading file to Firebase Storage:", error);
    throw error;
  }
};


export const useFormSubmission = (page: string, callback?: () => void) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFormSubmission = async (values: FormValues): Promise<void> => {
    let resumeUrl: string | null = null;
    setIsLoading(true);

    try {
      if (page === "Career Application" && values.resume) {
        resumeUrl = await uploadToFirebaseStorage(values.resume);
      }

      const collectionName =
        page === "General Enquire"
          ? "generalEnquiries"
          : page === "Project Enquire"
            ? "projectEnquiries"
            : "careerApplications";

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
                interstedIn: values.option,
              }
            : {
                fullName: values.fullName,
                email: values.email,
                phone: values.phone,
                postionAppliedFor: values.option,
                resumeUrl,
              };

      const collectionRef = collection(db, collectionName);
      await addDoc(collectionRef, filteredValues);

      await fetch("/api/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...filteredValues, page, resumeUrl }),
      });

      toast.success("Form submitted successfully!");

      if (callback) {
        callback(); // Call the callback function after successful submission
      }
    } catch (error) {
      toast.error("Error submitting form. Please try again later.");
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
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
    onSubmit: async (values, { resetForm }): Promise<void> => {
      return handleFormSubmission(values)
        .then(() => {
          resetForm();
        })
        .catch((error) => {
          console.error("Error submitting form:", error);
        });
    },
  });

  return { formik, isLoading };
};
