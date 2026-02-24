import { db } from "@/firebase/firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import type { LandingUtmParams, VilasamLandingFormData } from "@/lib/vilasamLandingForm";

export interface FormValues {
  fullName: string;
  email: string;
  phone: string;
  whatsapp: boolean;
  option: string;
  userType: string;
}

// 🔹 Helper to capture UTM parameters from the URL
const getUTMParams = () => {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);

  return {
    utm_term: params.get("utm_term") || "",
    utm_source: params.get("utm_source") || "direct",
    utm_medium: params.get("utm_medium") || "",
    utm_matchtype: params.get("utm_matchtype") || "",
    utm_content: params.get("utm_content") || "",
    utm_campaign: params.get("utm_campaign") || "",
    campaign_id: params.get("campaign_id") || params.get("campaign_Id") || "",
    ad_id: params.get("ad_id") || params.get("ad_Id") || "",
    ad_group_id: params.get("ad_group_id") || params.get("ad_group_Id") || "",
    device: params.get("device") || "",
    site_source_name: params.get("site_source_name") || "",
  };
};

export const handleFormSubmitVCE = async (values: FormValues) => {
  const utmData = getUTMParams();

  const payload = {
    fullName: values.fullName,
    email: values.email,
    phone: values.phone,
    project: "Vaikuntam City Elite",
    whatsapp: values.whatsapp,
    interestedIn: values.option,
    userType: values.userType || "",
    createdAt: serverTimestamp(),
    ...utmData, // merge UTM params into Firestore payload
  };

  try {
    // 1️⃣ Send to Google Script (Sheet integration)
    const googleScriptUrl =
      (values.userType === "Investor"
        ? process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL_CALL_INVESTOR
        : process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL_CALL_HOME) || "";

    await fetch(googleScriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        fullName: values.fullName,
        email: values.email,
        phone: values.phone,
        project: "Vaikuntam City Elite",
        whatsapp: values.whatsapp ? "Yes" : "No",
        interestedIn: values.option,
        userType: values.userType || "",
        createdAt: new Date().toLocaleString("en-US", {
          timeZone: "Asia/Kolkata",
        }),
      }),
      mode: "no-cors",
    });

    // 2️⃣ Save to Firestore
    const collectionRef = collection(db, "elite");
    await addDoc(collectionRef, payload);

    // 3️⃣ Send email
    const emailPayload = {
      ...payload,
      page: "Project Enquire",
    };
    await fetch("/api/sendEmail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(emailPayload),
    });

    await fetch("/api/send-whatsapp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: values.fullName,
        phone: values.phone,
      }),
    });

    // 4️⃣ Send JSON to Pabbly Webhook
    try {
      await fetch("https://connect.pabbly.com/workflow/sendwebhookdata/IjU3NjUwNTZiMDYzMDA0MzQ1MjZmNTUzNzUxMzMi_pc", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          utm_term: utmData.utm_term,
          utm_source: utmData.utm_source,
          utm_medium: utmData.utm_medium,
          utm_matchtype: utmData.utm_matchtype,
          utm_content: utmData.utm_content,
          utm_campaign: utmData.utm_campaign,
          form_name: "Vaikuntam City Elite Form",
          form_id: values.userType,
          device: utmData.device,
          campaign_id: utmData.campaign_id,
          ad_id: utmData.ad_id,
          ad_group_id: utmData.ad_group_id,
          plots: values.option,
          phone: values.phone,
          name: values.fullName,
          email: values.email,
          additional_parameters: "",
        }),
      });
    } catch (pabblyError) {
      console.error("Pabbly Webhook Error:", pabblyError);
    }

    // 5️⃣ Accelr Webhook Integration
    try {
      await fetch("/api/accelr-webhook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          formName: "Vaikuntam City Elite Form",
          source: "website",
        }),
      });
    } catch (webhookError) {
      console.error("Accelr Webhook Error:", webhookError);
    }

    console.log("Form submitted successfully!");
  } catch (error) {
    console.error("Error submitting form:", error);
  }
};

interface HandleVilasamSubmitOptions {
  formName?: string;
}

export const handleFormSubmitVilasam = async (
  values: VilasamLandingFormData,
  utmParams: LandingUtmParams,
  options: HandleVilasamSubmitOptions = {},
) => {
  const formName = options.formName || "Vilasam Landing Page Form";

  const payload = {
    ...values,
    project: "Vilasam",
    createdAt: serverTimestamp(),
    ...utmParams,
  };

  try {
    // 1️⃣ Save to Firestore
    const collectionRef = collection(db, "projectEnquiries");
    await addDoc(collectionRef, payload);

    // 2️⃣ Send email
    await fetch("/api/sendEmail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...values, page: "Project Enquire" }),
    });

    // 3️⃣ Send WhatsApp
    await fetch("/api/send-whatsapp-vaikuntamcity", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: values.fullName,
        phone: values.phone,
      }),
    });

    // 4️⃣ Send to Pabbly Webhook
    try {
      await fetch("https://connect.pabbly.com/workflow/sendwebhookdata/IjU3NjUwNTZiMDYzMDA0MzQ1MjZmNTUzNzUxMzMi_pc", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...utmParams,
          form_name: formName,
          form_id: values.interstedIn || "",
          plots: values.interstedIn || "",
          phone: values.phone,
          name: values.fullName,
          email: values.email,
        }),
      });
    } catch (pabblyError) {
      console.error("Pabbly Webhook Error:", pabblyError);
    }

    // 5️⃣ Accelr Webhook Integration
    try {
      await fetch("/api/accelr-webhook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          formName,
          source: "website",
        }),
      });
    } catch (webhookError) {
      console.error("Accelr Webhook Error:", webhookError);
    }

    console.log("Vilasam Form submitted successfully!");
  } catch (error) {
    console.error("Error submitting Vilasam form:", error);
    throw error;
  }
};
