import { useCallback, useEffect, useState } from "react";
import type { VilasamLandingField } from "@/lib/vilasamLandingForm";
import {
  getAllTouchedVilasamLandingForm,
  getInitialVilasamLandingFormData,
  getInitialVilasamLandingFormErrors,
  getInitialVilasamLandingFormTouched,
  resetVilasamLandingFormData,
  validateVilasamLandingField,
  validateVilasamLandingForm,
} from "@/lib/vilasamLandingForm";

export function useVilasamLandingForm() {
  const [formData, setFormData] = useState(getInitialVilasamLandingFormData);
  const [errors, setErrors] = useState(getInitialVilasamLandingFormErrors);
  const [touched, setTouched] = useState(getInitialVilasamLandingFormTouched);
  const [isFormValid, setIsFormValid] = useState(false);

  const validateForm = useCallback((): boolean => {
    const { errors: nextErrors, isValid } = validateVilasamLandingForm(formData);
    setErrors(nextErrors);
    setIsFormValid(isValid);
    return isValid;
  }, [formData]);

  useEffect(() => {
    validateForm();
  }, [validateForm]);

  const setFieldValue = useCallback((field: VilasamLandingField, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: validateVilasamLandingField(field, value) }));
  }, []);

  const blurField = useCallback((field: VilasamLandingField) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: validateVilasamLandingField(field, formData[field]) }));
  }, [formData]);

  const setPhoneValue = useCallback((value: string) => {
    setFormData((prev) => ({ ...prev, phone: value }));

    if (touched.phone) {
      setErrors((prev) => ({
        ...prev,
        phone: validateVilasamLandingField("phone", value),
      }));
    }
  }, [touched.phone]);

  const setWhatsappConsent = useCallback((checked: boolean) => {
    setFormData((prev) => ({ ...prev, whatsapp: checked }));
  }, []);

  const markAllTouched = useCallback(() => {
    setTouched(getAllTouchedVilasamLandingForm());
  }, []);

  const resetForm = useCallback(() => {
    setFormData(resetVilasamLandingFormData());
    setTouched(getInitialVilasamLandingFormTouched());
    setErrors(getInitialVilasamLandingFormErrors());
    setIsFormValid(false);
  }, []);

  return {
    formData,
    errors,
    touched,
    isFormValid,
    validateForm,
    setFieldValue,
    blurField,
    setPhoneValue,
    setWhatsappConsent,
    markAllTouched,
    resetForm,
  };
}
