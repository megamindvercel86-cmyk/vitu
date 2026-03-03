import { useFormik } from "formik";
import { EliteFormValidationSchema, GeneralFormValidationSchema } from "./validations";
import { ProjectFormValidationSchema } from "./validations";
import { CareerFormValidationSchema } from "./validations";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebase/firebaseConfig";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { submitLead } from "@/lib/leadApi";

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
  const searchParams = useSearchParams();
  const utmParams = {
    utm_source: searchParams.get("utm_source") || "direct",
    utm_medium: searchParams.get("utm_medium") || "",
    utm_campaign: searchParams.get("utm_campaign") || "",
    utm_term: searchParams.get("utm_term") || "",
    utm_content: searchParams.get("utm_content") || "",
  };

  const handleFormSubmission = async (values: FormValues): Promise<void> => {
    let resumeUrl: string | null = null;
    setIsLoading(true);
    try {
      if (page === "Career Application" && values.resume) {
        resumeUrl = await uploadToFirebaseStorage(values.resume);
      }

      if (page === "General Enquire") {
        await submitLead({
          intent: "generalEnquire",
          payload: {
            fullName: values.fullName,
            email: values.email,
            phone: values.phone,
            comments: values.comments,
            whatsapp: values.whatsapp,
          },
          utm: utmParams,
          meta: {
            formName: "General Enquire",
          },
        });
      } else if (page === "Project Enquire") {
        await submitLead({
          intent: "projectEnquire",
          payload: {
            fullName: values.fullName,
            email: values.email,
            phone: values.phone,
            whatsapp: values.whatsapp,
            option: values.option,
            project: "Vaikuntam City Elite",
          },
          utm: utmParams,
          meta: {
            formName: "Project Enquire",
          },
        });
      } else if (page === "Vaikuntam City Elite") {
        await submitLead({
          intent: "vaikuntamCityElite",
          payload: {
            fullName: values.fullName,
            email: values.email,
            phone: values.phone,
            whatsapp: values.whatsapp,
            option: values.option,
            userType: "",
          },
          utm: utmParams,
          meta: {
            formName: "Vaikuntam City Elite Form",
          },
        });
      } else {
        await submitLead({
          intent: "careerApplication",
          payload: {
            fullName: values.fullName,
            email: values.email,
            phone: values.phone,
            option: values.option,
            resumeUrl: resumeUrl || "",
          },
          utm: utmParams,
          meta: {
            formName: "Career Application",
          },
        });
      }

      if (page === "Vaikuntam City Elite") {
        router.push("/vaikuntam-city-elite/pre-launch/thank-you");
        return;
      }

      if (page === "Project Enquire") {
        router.push("/project-enquire/thank-you");
        return;
      }
      if (page === "Career Application") {
        router.push("/career-application/thank-you");
        return;
      }
      if (page === "General Enquire") {
        router.push("/general-enquire/thank-you");
        return;
      }
    

      // Accelr Webhook Integration
     

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
