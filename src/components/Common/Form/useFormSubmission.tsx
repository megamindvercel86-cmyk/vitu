import { useFormik } from "formik";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import { GeneralFormValidationSchema } from "./validations";
import { ProjectFormValidationSchema } from "./validations";
import { CareerFormValidationSchema } from "./validations";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebase/firebaseConfig";

const uploadToFirebaseStorage = async (file: File): Promise<string> => {
  const fileRef = ref(storage, `resumes/${Date.now()}-${file.name}`);

  try {
    const snapshot = await uploadBytes(fileRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading to Firebase Storage:", error);
    throw error;
  }
};

export interface FormValues {
  fullName: string;
  email: string;
  phone: string;
  comments: string;
  whatsapp: boolean;
  option: string;
  resume: File | null;
}

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

      toast.success(
        <div className="flex items-center gap-3">
          <div className="text-2xl">🎉</div>
          <div>
            <h2 className="text-xl font-semibold text-brown-800">Woo-Hoo</h2>
            <p className="text-sm text-gray-600">{page === "General Enquire"
          ? "generalEnquiries"
          : page === "Project Enquire"
          ? "projectEnquiries"
          : "careerApplications"}</p>
          </div>
        </div>,
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          icon: false,
          style: {
            background: "#f0fdf4",
            borderRadius: "10px",
            padding: "16px",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
          },
        }
      );

      if (callback) {
        callback();
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
      whatsapp: true,
      option: "",
      resume: null,
    },
    validationSchema:
      page === "General Enquire"
        ? GeneralFormValidationSchema
        : page === "Project Enquire"
        ? ProjectFormValidationSchema
        : CareerFormValidationSchema,

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