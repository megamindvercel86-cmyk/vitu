import { db } from "@/firebase/firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export interface FormValues {
  fullName: string;
  email: string;
  phone: string;
  whatsapp: boolean;
  option: string;
  userType: string;
}

export const handleFormSubmitVCE = async (values: FormValues) => {
  const payload = {
    fullName: values.fullName,
    email: values.email,
    phone: values.phone,
    project: "Vaikuntam City Elite",
    whatsapp: values.whatsapp,
    interestedIn: values.option,
    userType: values.userType || "", 
    createdAt: serverTimestamp(),
  };

  try {
    // Firestore submission
    const collectionRef = collection(db, "elite");
    await addDoc(collectionRef, payload);

    // Email submission
    const emailPayload = {
      ...payload,
      page: "Project Enquire",
    };

    await fetch("/api/sendEmail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(emailPayload),
    });

    console.log("Form submitted successfully!");
  } catch (error) {
    console.error("Error submitting form:", error);
  }
};
