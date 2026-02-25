"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { submitLead } from "@/lib/leadApi";

interface InvestorsFormState {
    fullName: string;
    phone: string;
    email: string;
    interestedIn: string;
    preferredPlotOrientation: string;
    consent: boolean;
}

const initialFormState: InvestorsFormState = {
    fullName: "",
    phone: "",
    email: "",
    interestedIn: "",
    preferredPlotOrientation: "",
    consent: true,
};

const interestedInOptions = [
    "Investment Opportunity",
    "Book Site Visit",
    "Project Details",
];

const plotOrientationOptions = [
    "East Facing",
    "West Facing",
    "North Facing",
    "South Facing",
];

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function InvestorsContactSection() {
    const [form, setForm] = useState<InvestorsFormState>(initialFormState);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const getUtmPayload = () => {
        if (typeof window === "undefined") {
            return {
                utm_source: "direct",
                utm_medium: "",
                utm_campaign: "",
                utm_term: "",
                utm_content: "",
                campaign_id: "",
                ad_id: "",
                ad_group_id: "",
                device: "",
            };
        }

        const params = new URLSearchParams(window.location.search);
        return {
            utm_source: params.get("utm_source") || "direct",
            utm_medium: params.get("utm_medium") || "",
            utm_campaign: params.get("utm_campaign") || "",
            utm_term: params.get("utm_term") || "",
            utm_content: params.get("utm_content") || "",
            campaign_id: params.get("campaign_id") || "",
            ad_id: params.get("ad_id") || "",
            ad_group_id: params.get("ad_group_id") || "",
            device: params.get("device") || "",
        };
    };

    const updateField = <K extends keyof InvestorsFormState>(
        key: K,
        value: InvestorsFormState[K],
    ) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const validate = (): string => {
        if (!form.fullName.trim()) return "Name is required.";

        const phone = form.phone.replace(/\D/g, "");
        if (phone.length < 10) return "Enter a valid phone number.";

        if (!emailRegex.test(form.email.trim())) return "Enter a valid email address.";
        if (!form.interestedIn) return "Please select what you are interested in.";
        if (!form.preferredPlotOrientation) return "Please select plot orientation.";
        if (!form.consent) return "Please provide consent to continue.";

        return "";
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError("");

        const validationError = validate();
        if (validationError) {
            setError(validationError);
            return;
        }

        const normalizedPhone = form.phone.replace(/\D/g, "");
        const interstedIn = `${form.interestedIn} | ${form.preferredPlotOrientation}`;

        try {
            setIsSubmitting(true);

            await submitLead({
                intent: "vilasamLanding",
                payload: {
                    fullName: form.fullName.trim(),
                    email: form.email.trim(),
                    phone: normalizedPhone,
                    interstedIn,
                    interestedIn: interstedIn,
                    preferredPlotOrientation: form.preferredPlotOrientation,
                    whatsapp: true,
                },
                utm: getUtmPayload(),
                meta: {
                    formName: "Vilasam Investors Contact Form",
                },
            });

            setForm(initialFormState);
            router.push("/vilasam/thank-you");
        } catch (submitError) {
            if (submitError instanceof Error) {
                setError(submitError.message);
                return;
            }
            setError("Unable to submit your details. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="bg-[#fafafa] px-5 py-12 md:px-8 md:py-16 lg:px-12 lg:py-24">
            <div className="mx-auto max-w-7xl xl:max-w-[90vw]">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">

                    {/* Left Side: Google Maps Embed */}
                    <div className="relative h-[350px] w-full overflow-hidden rounded-[16px] md:h-[450px] lg:h-full lg:min-h-[500px]">
                        <iframe
                            src="https://maps.app.goo.gl/4LVFvgR3NdBHPhig8"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="absolute inset-0 h-full w-full object-cover"
                        ></iframe>
                    </div>

                    {/* Right Side: Contact Form */}
                    <div className="flex flex-col justify-center">
                        <h2 className="mb-8 font-ttCommons text-[36px] font-bold leading-tight text-[#222] md:text-[42px]">
                            Book a Site Visit
                        </h2>

                        <form onSubmit={handleSubmit} className="w-full">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-5">

                                {/* Full Width Name Row */}
                                <div className="col-span-1 md:col-span-2">
                                    <input
                                        type="text"
                                        value={form.fullName}
                                        onChange={(event) => updateField("fullName", event.target.value)}
                                        placeholder="Name"
                                        className="h-12 w-full rounded-md border border-[#eaeaea] bg-white px-4 text-[14px] text-[#333] outline-none placeholder:text-[#9d9d9d] transition-colors focus:border-[#8ea7a5]"
                                    />
                                </div>

                                {/* Phone & Email Row */}
                                <div className="flex h-12 items-center rounded-md border border-[#eaeaea] bg-white transition-colors focus-within:border-[#8ea7a5]">
                                    <div className="flex h-full items-center gap-1.5 border-r border-[#eaeaea] px-3.5 text-[14px] text-[#555]">
                                        +91
                                        <svg width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1 1L4 4L7 1" stroke="#555" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    <input
                                        type="tel"
                                        value={form.phone}
                                        onChange={(event) => updateField("phone", event.target.value)}
                                        placeholder="Phone"
                                        className="h-full w-full bg-transparent px-3 text-[14px] text-[#333] outline-none placeholder:text-[#9d9d9d]"
                                    />
                                </div>

                                <input
                                    type="email"
                                    value={form.email}
                                    onChange={(event) => updateField("email", event.target.value)}
                                    placeholder="Email"
                                    className="h-12 w-full rounded-md border border-[#eaeaea] bg-white px-4 text-[14px] text-[#333] outline-none placeholder:text-[#9d9d9d] transition-colors focus:border-[#8ea7a5]"
                                />

                                {/* Dropdowns Row */}
                                <select
                                    value={form.interestedIn}
                                    onChange={(event) => updateField("interestedIn", event.target.value)}
                                    className="h-12 w-full appearance-none rounded-md border border-[#eaeaea] bg-white px-4 text-[14px] text-[#7b7b7b] outline-none transition-colors focus:border-[#8ea7a5]"
                                >
                                    <option value="">Interested In</option>
                                    {interestedInOptions.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>

                                <select
                                    value={form.preferredPlotOrientation}
                                    onChange={(event) =>
                                        updateField("preferredPlotOrientation", event.target.value)
                                    }
                                    className="h-12 w-full appearance-none rounded-md border border-[#eaeaea] bg-white px-4 text-[14px] text-[#7b7b7b] outline-none transition-colors focus:border-[#8ea7a5]"
                                >
                                    <option value="">Preferred Plot Orientation</option>
                                    {plotOrientationOptions.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Consent Row */}
                            <label className="mt-5 flex items-start gap-2.5 text-[11px] text-[#7f7f7f] md:text-[12px]">
                                <input
                                    type="checkbox"
                                    checked={form.consent}
                                    onChange={(event) => updateField("consent", event.target.checked)}
                                    className="mt-[3px] h-3.5 w-3.5 accent-[#0d5f5a]"
                                />
                                <span>Consent to contact me via Call, SMS, Email, or WhatsApp</span>
                            </label>

                            {error ? (
                                <p className="mt-3 text-sm text-[#b32727]">{error}</p>
                            ) : null}

                            {/* Submit Button */}
                            <div className="mt-8 flex justify-end">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="inline-flex h-11 items-center justify-center rounded-md bg-[#0a5a56] px-10 font-ttCommons text-[15px] font-semibold text-white transition hover:bg-[#084943] disabled:cursor-not-allowed disabled:opacity-70 md:h-12"
                                >
                                    {isSubmitting ? "Submitting..." : "Submit"}
                                </button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </section>
    );
}
