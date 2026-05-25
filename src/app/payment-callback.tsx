import { AppIcon } from "@/components/Icons/AppIcon";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useTheme } from "@/hooks/use-theme";
import { usePayment } from "@/hooks/usePayment";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

type PaymentCallbackType = "success" | "failure" | "cancel";

export default function PaymentCallbackHandler() {
  const router = useRouter();
  const theme = useTheme();
  const params = useLocalSearchParams();
  const { completePayment, failPayment } = usePayment();

  const [callbackType, setCallbackType] =
    useState<PaymentCallbackType>("success");
  const [processing, setProcessing] = useState(true);
  const [message, setMessage] = useState("Processing your payment...");

  useEffect(() => {
    processPaymentCallback();
  }, [params]);

  const processPaymentCallback = async () => {
    try {
      // Determine callback type from route or params
      const type = (params?.type as PaymentCallbackType) || "success";
      setCallbackType(type);

      const transactionId = params?.transactionId as string;
      const orderId = params?.orderId as string;
      const status = params?.status as string;

      if (!transactionId) {
        throw new Error("Missing transaction ID");
      }

      switch (type) {
        case "success":
          if (status === "completed") {
            await completePayment(transactionId, {
              transactionId: params?.paymentId,
              status: "completed",
            });
            setMessage("✓ Payment completed successfully!");

            // Redirect to success screen after 2 seconds
            setTimeout(() => {
              router.replace("/(tabs)/account");
            }, 2000);
          }
          break;

        case "failure":
          const errorMessage = (params?.error as string) || "Payment failed";
          await failPayment(transactionId, errorMessage);
          setMessage(`✗ ${errorMessage}`);

          setTimeout(() => {
            router.back();
          }, 2000);
          break;

        case "cancel":
          await failPayment(transactionId, "Payment cancelled by user");
          setMessage("Payment was cancelled");

          setTimeout(() => {
            router.back();
          }, 1500);
          break;
      }
    } catch (error) {
      console.error("Error processing payment callback:", error);
      setMessage("Error processing payment");
      setCallbackType("failure");

      setTimeout(() => {
        router.back();
      }, 2000);
    } finally {
      setProcessing(false);
    }
  };

  const getCallbackContent = () => {
    switch (callbackType) {
      case "success":
        return {
          icon: "check-circle",
          color: "#10b981",
          title: "Payment Successful",
          subtitle: "Your plan has been activated",
        };
      case "failure":
        return {
          icon: "alert-circle",
          color: "#ef4444",
          title: "Payment Failed",
          subtitle: "Please try again",
        };
      case "cancel":
        return {
          icon: "close-circle",
          color: "#f59e0b",
          title: "Payment Cancelled",
          subtitle: "You cancelled the transaction",
        };
    }
  };

  const content = getCallbackContent();

  return (
    <ThemedView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <View style={{ alignItems: "center", gap: 16 }}>
        {processing ? (
          <>
            <ActivityIndicator size="large" color={theme.primary} />
            <ThemedText style={{ fontSize: 16, fontWeight: "600" }}>
              {message}
            </ThemedText>
          </>
        ) : (
          <>
            <View
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                backgroundColor: `${content.color}20`,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <AppIcon
                family="material-community"
                name={content.icon}
                size={40}
                color={content.color}
              />
            </View>
            <ThemedText
              style={{ fontSize: 20, fontWeight: "700", marginTop: 8 }}
            >
              {content.title}
            </ThemedText>
            <ThemedText
              themeColor="textSecondary"
              style={{ fontSize: 14, marginTop: 4 }}
            >
              {content.subtitle}
            </ThemedText>
          </>
        )}
      </View>
    </ThemedView>
  );
}
