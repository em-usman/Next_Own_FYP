export const emailJSConfig = {
  serviceId: process.env.EXPO_PUBLIC_EMAILJS_SERVICE_ID || "",
  templateId: process.env.EXPO_PUBLIC_EMAILJS_TEMPLATE_ID || "",
  publicKey: process.env.EXPO_PUBLIC_EMAILJS_PUBLIC_KEY || "",
  receiverEmail: process.env.EXPO_PUBLIC_EMAILJS_RECEIVER_EMAIL || "",
};

export const validateEmailJSConfig = (): boolean => {
  const { serviceId, templateId, publicKey, receiverEmail } = emailJSConfig;
  if (!serviceId || !templateId || !publicKey || !receiverEmail) {
    console.warn("⚠️ EmailJS configuration is incomplete.");
    return false;
  }
  return true;
};
