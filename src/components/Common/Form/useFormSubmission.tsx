import { useFormik } from "formik";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import { EliteFormValidationSchema, GeneralFormValidationSchema } from "./validations";
import { ProjectFormValidationSchema } from "./validations";
import { CareerFormValidationSchema } from "./validations";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebase/firebaseConfig";
import Image from "next/image";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const handleFormSubmission = async (values: FormValues): Promise<void> => {
    console.log("butom clicked", values);
    let resumeUrl: string | null = null;
    setIsLoading(true);
    console.log("ded");
    try {
      if (page === "Career Application" && values.resume) {
        resumeUrl = await uploadToFirebaseStorage(values.resume);
      }

      const collectionName =
        page === "General Enquire"
          ? "generalEnquiries"
          : page === "Project Enquire"
            ? "projectEnquiries"
            : page === "Vaikuntam City Elite"
              ? "elite"
              : "careerApplications";

      const filteredValues =
        page === "General Enquire"
          ? {
              fullName: values.fullName,
              email: values.email,
              phone: values.phone,
              comments: values.comments,
              whatsapp: values.whatsapp,
              createdAt: serverTimestamp(), // Use Firebase serverTimestamp with createdAt field
            }
          : page === "Project Enquire" || page === "Vaikuntam City Elite"
            ? {
                fullName: values.fullName,
                email: values.email,
                phone: values.phone,
                project: "Vaikuntam City Elite",
                whatsapp: values.whatsapp,
                interstedIn: values.option,
                createdAt: serverTimestamp(), // Use Firebase serverTimestamp with createdAt field
              }
            : {
                fullName: values.fullName,
                email: values.email,
                phone: values.phone,
                postionAppliedFor: values.option,
                resumeUrl,
                createdAt: serverTimestamp(), // Use Firebase serverTimestamp with createdAt field
              };

      const collectionRef = collection(db, collectionName);
      console.log(collectionRef, filteredValues);
      await addDoc(collectionRef, filteredValues);

      if (page === "Vaikuntam City Elite") {
        router.push("/vaikuntam-city-elite/pre-launch/thank-you");
        return
      }

      if (page === "Project Enquire") {
        router.push("/project-enquire/thank-you");
        return
      }
       if (page === "Career Application") {
        router.push("/career-application/thank-you");
        return
      }
          if (page === "General Enquire") {
        router.push("/general-enquire/thank-you");
        return
      }
      await fetch("/api/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...filteredValues, page, resumeUrl }),
      });

      toast.success(
        <div style={{ display: "flex", alignItems: "center", gap: "12px", position: "relative", width: "100%", height: "100px" }}>
          <div style={{ position: "absolute", width: "100%", height: "100%", zIndex: 0 }}>
            <Image src="/formsucess.png" alt="toast background" fill style={{ objectFit: "cover" }} className="" />
          </div>
          {/* Icon Wrapper */}
        </div>,
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          icon: false,
          progress: undefined,
          style: {
            borderRadius: "10px",
            padding: "0px",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
            display: "flex",
            alignItems: "center",
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
      page === "Vaikuntam City Elite"
        ? EliteFormValidationSchema
        : page === "General Enquire"
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
