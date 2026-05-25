import { auth } from "../../firebaseConfig";
import {
  createTransaction,
  getUserActiveSubscription,
  getUserTransactions,
  updateTransaction,
} from "@/utils/transactionStorage";
import { useCallback, useState } from "react";

interface Plan {
  id: string;
  name: string;
  price: number;
  currency: string;
  description: string;
  features: string[];
}

interface PaymentResult {
  success: boolean;
  transactionId?: string;
  error?: string;
}

export const PLANS: Plan[] = [
  {
    id: "basic",
    name: "Basic Plan",
    price: 1999,
    currency: "PKR",
    description: "Get started with basic features",
    features: ["List up to 10 items", "Basic analytics", "Chat support"],
  },
  {
    id: "pro",
    name: "Pro Plan",
    price: 4999,
    currency: "PKR",
    description: "Perfect for active sellers",
    features: [
      "List up to 50 items",
      "Advanced analytics",
      "Priority chat support",
      "Featured listings",
    ],
  },
  {
    id: "premium",
    name: "Premium Plan",
    price: 9999,
    currency: "PKR",
    description: "Maximum exposure and features",
    features: [
      "Unlimited listings",
      "Premium analytics",
      "24/7 phone support",
      "Verified seller badge",
      "Featured listings",
    ],
  },
];

export const usePayment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initializePayment = useCallback(
    async (plan: Plan): Promise<PaymentResult> => {
      setLoading(true);
      setError(null);

      try {
        const user = auth.currentUser;
        if (!user) {
          throw new Error("User not authenticated");
        }

        // Verify SafePay configuration
        const publicKey = process.env.EXPO_PUBLIC_SAFEPAY_PUBLIC_KEY;
        if (!publicKey) {
          throw new Error("SafePay public key not configured");
        }

        // Create transaction record in Firebase first
        const orderId = `ORDER-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

        const transactionId = await createTransaction({
          userId: user.uid,
          planId: plan.id,
          planName: plan.name,
          amount: plan.price,
          currency: "PKR",
          status: "pending",
          orderId: orderId,
          paymentMethod: "SafePay",
        });

        // Initialize SafePay payment with order details
        // This will typically open SafePay payment gateway
        // The response will contain payment details that need to be processed

        // For now, we're simulating the payment initiation
        // In production, you would call the actual SafePay SDK method
        const paymentRequest = {
          amount: plan.price,
          currency: "PKR",
          orderId: orderId,
          description: `Purchase ${plan.name}`,
          redirectUrl: "next-own://payment-callback",
          publicKey: publicKey,
          metadata: {
            userId: user.uid,
            planId: plan.id,
            transactionId: transactionId,
            userEmail: user.email,
          },
        };

        // Here you would integrate with SafePay's actual payment gateway
        // Example (adjust based on actual SafePay SDK):
        // const paymentSession = await SafePaySDK.initializePayment(paymentRequest);

        // If payment initialization is successful
        console.log("Payment initialized with order:", orderId);

        return {
          success: true,
          transactionId: transactionId,
        };
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Payment failed";
        setError(errorMessage);

        // Log error to Firebase if transaction was created
        console.error("Payment error:", errorMessage);

        return {
          success: false,
          error: errorMessage,
        };
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const completePayment = useCallback(
    async (transactionId: string, paymentData: any) => {
      try {
        // Update transaction status to completed
        await updateTransaction(transactionId, {
          status: "completed",
          transactionId: paymentData.transactionId,
        });

        return { success: true };
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to complete payment";
        setError(errorMessage);
        return {
          success: false,
          error: errorMessage,
        };
      }
    },
    [],
  );

  const failPayment = useCallback(
    async (transactionId: string, errorMessage: string) => {
      try {
        await updateTransaction(transactionId, {
          status: "failed",
          errorMessage: errorMessage,
        });

        return { success: true };
      } catch (err) {
        console.error("Error updating failed payment:", err);
        return {
          success: false,
          error: "Failed to update payment status",
        };
      }
    },
    [],
  );

  const getActiveSubscription = useCallback(async () => {
    try {
      const user = auth.currentUser;
      if (!user) return null;

      return await getUserActiveSubscription(user.uid);
    } catch (err) {
      console.error("Error fetching active subscription:", err);
      return null;
    }
  }, []);

  const getTransactionHistory = useCallback(async () => {
    try {
      const user = auth.currentUser;
      if (!user) return [];

      return await getUserTransactions(user.uid);
    } catch (err) {
      console.error("Error fetching transaction history:", err);
      return [];
    }
  }, []);

  return {
    loading,
    error,
    initializePayment,
    completePayment,
    failPayment,
    getActiveSubscription,
    getTransactionHistory,
    PLANS,
  };
};
