import { AppIcon } from "@/components/Icons/AppIcon";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useTheme } from "@/hooks/use-theme";
import { PLANS, usePayment } from "@/hooks/usePayment";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";

const ScreenHeader = () => {
  const router = useRouter();
  const theme = useTheme();

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: theme.border,
        backgroundColor: theme.backgroundElement,
      }}
    >
      <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
        <AppIcon name="chevron-back" size={24} color={theme.text} />
      </TouchableOpacity>
      <ThemedText style={{ fontSize: 18, fontWeight: "600", marginLeft: 12 }}>
        Upgrade Plan
      </ThemedText>
    </View>
  );
};

export default function UpgradePlanScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { initializePayment, loading, error } = usePayment();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handlePlanSelection = async (planId: string) => {
    setSelectedPlan(planId);
    const plan = PLANS.find((p) => p.id === planId);

    if (!plan) return;

    try {
      const result = await initializePayment(plan);

      if (result.success) {
        Alert.alert(
          "Payment Processing",
          "You will be redirected to SafePay to complete your payment.",
          [{ text: "OK" }],
        );
      } else {
        Alert.alert("Payment Failed", result.error || "Something went wrong", [
          { text: "Try Again" },
        ]);
      }
    } catch (err) {
      Alert.alert("Error", "Failed to initialize payment", [{ text: "OK" }]);
    } finally {
      setSelectedPlan(null);
    }
  };

  return (
    <ThemedView style={{ flex: 1 }}>
      <ScreenHeader />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        {/* Header Section */}
        <View style={{ paddingHorizontal: 16, paddingVertical: 24 }}>
          <ThemedText
            style={{ fontSize: 24, fontWeight: "700", marginBottom: 8 }}
          >
            Choose Your Plan
          </ThemedText>
          <ThemedText
            themeColor="textSecondary"
            style={{ fontSize: 14, lineHeight: 20 }}
          >
            Unlock more features and reach more buyers with premium plans
          </ThemedText>
        </View>

        {/* Plans Grid */}
        <View style={{ paddingHorizontal: 16, gap: 16 }}>
          {PLANS.map((plan) => (
            <TouchableOpacity
              key={plan.id}
              onPress={() => handlePlanSelection(plan.id)}
              activeOpacity={0.8}
              style={{
                paddingHorizontal: 16,
                paddingVertical: 20,
                borderRadius: 16,
                borderWidth: 2,
                borderColor:
                  selectedPlan === plan.id ? theme.primary : theme.border,
                backgroundColor:
                  selectedPlan === plan.id
                    ? `${theme.primary}15`
                    : theme.backgroundElement,
              }}
            >
              {/* Plan Header */}
              <View style={{ marginBottom: 16 }}>
                <ThemedText
                  style={{
                    fontSize: 18,
                    fontWeight: "700",
                    marginBottom: 8,
                  }}
                >
                  {plan.name}
                </ThemedText>
                <ThemedText themeColor="textSecondary" style={{ fontSize: 13 }}>
                  {plan.description}
                </ThemedText>
              </View>

              {/* Price */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "baseline",
                  marginBottom: 16,
                  paddingBottom: 16,
                  borderBottomWidth: 1,
                  borderBottomColor: theme.divider,
                }}
              >
                <ThemedText
                  style={{
                    fontSize: 28,
                    fontWeight: "700",
                    color: theme.primary,
                  }}
                >
                  {plan.price.toLocaleString()}
                </ThemedText>
                <ThemedText
                  themeColor="textSecondary"
                  style={{ fontSize: 13, marginLeft: 6 }}
                >
                  {plan.currency}/month
                </ThemedText>
              </View>

              {/* Features */}
              <View style={{ marginBottom: 16 }}>
                {plan.features.map((feature, idx) => (
                  <View
                    key={idx}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: idx !== plan.features.length - 1 ? 8 : 0,
                    }}
                  >
                    <AppIcon
                      family="material-community"
                      name="check-circle"
                      size={16}
                      color={theme.primary}
                      style={{ marginRight: 10 }}
                    />
                    <ThemedText style={{ fontSize: 13 }}>{feature}</ThemedText>
                  </View>
                ))}
              </View>

              {/* Subscribe Button */}
              <TouchableOpacity
                onPress={() => handlePlanSelection(plan.id)}
                disabled={loading && selectedPlan === plan.id}
                style={{
                  paddingVertical: 12,
                  borderRadius: 10,
                  backgroundColor: theme.primary,
                  alignItems: "center",
                  opacity: loading && selectedPlan === plan.id ? 0.6 : 1,
                }}
              >
                {loading && selectedPlan === plan.id ? (
                  <ActivityIndicator color={theme.background} size="small" />
                ) : (
                  <ThemedText
                    style={{
                      fontSize: 14,
                      fontWeight: "600",
                      color: theme.background,
                    }}
                  >
                    Subscribe Now
                  </ThemedText>
                )}
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>

        {/* FAQ Section */}
        <View style={{ paddingHorizontal: 16, marginTop: 32 }}>
          <ThemedText
            style={{ fontSize: 16, fontWeight: "600", marginBottom: 12 }}
          >
            Frequently Asked Questions
          </ThemedText>

          <View
            style={{
              gap: 12,
            }}
          >
            <View
              style={{
                paddingHorizontal: 12,
                paddingVertical: 10,
                backgroundColor: theme.backgroundSelected,
                borderRadius: 10,
              }}
            >
              <ThemedText
                style={{ fontSize: 12, fontWeight: "600", marginBottom: 4 }}
              >
                Can I cancel anytime?
              </ThemedText>
              <ThemedText themeColor="textSecondary" style={{ fontSize: 11 }}>
                Yes, you can cancel your subscription anytime from your account
                settings.
              </ThemedText>
            </View>

            <View
              style={{
                paddingHorizontal: 12,
                paddingVertical: 10,
                backgroundColor: theme.backgroundSelected,
                borderRadius: 10,
              }}
            >
              <ThemedText
                style={{ fontSize: 12, fontWeight: "600", marginBottom: 4 }}
              >
                What payment methods do you accept?
              </ThemedText>
              <ThemedText themeColor="textSecondary" style={{ fontSize: 11 }}>
                We accept all major credit/debit cards and mobile wallets
                through SafePay.
              </ThemedText>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Error Message */}
      {error && (
        <View
          style={{
            marginHorizontal: 16,
            marginBottom: 16,
            padding: 12,
            backgroundColor: theme.errorBackground,
            borderRadius: 10,
            borderLeftWidth: 4,
            borderLeftColor: theme.error,
          }}
        >
          <ThemedText
            style={{
              fontSize: 12,
              color: theme.error,
            }}
          >
            {error}
          </ThemedText>
        </View>
      )}
    </ThemedView>
  );
}
