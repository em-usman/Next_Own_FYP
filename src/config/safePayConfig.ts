export const SAFEPAY_CONFIG = {
  publicKey: process.env.EXPO_PUBLIC_SAFEPAY_PUBLIC_KEY || "",
  baseUrl: "https://sandbox.safepay.com.pk",
  currencies: {
    PKR: "Pakistani Rupee",
    USD: "US Dollar",
  },
  default: {
    currency: "PKR",
    country: "PK",
    language: "en",
  },
  redirectUrls: {
    success: "next-own://payment-success",
    failure: "next-own://payment-failure",
    cancel: "next-own://payment-cancel",
  },
  testMode: true,
};

// ✅ btoa use karo — Buffer ki zaroorat nahi
export const generatePaymentSignature = (
  orderId: string,
  amount: number,
  secretKey: string,
): string => {
  const signatureString = `${orderId}${amount}${secretKey}`;
  return btoa(signatureString); // Buffer.from() ki jagah
};

export const validatePaymentResponse = (
  response: any,
  secretKey: string,
): boolean => {
  try {
    const { signature, ...data } = response;
    const expectedSignature = generatePaymentSignature(
      data.orderId,
      data.amount,
      secretKey,
    );
    return signature === expectedSignature;
  } catch (error) {
    console.error("Error validating payment response:", error);
    return false;
  }
};
