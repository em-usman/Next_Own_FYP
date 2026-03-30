import { AppIcon } from "@/components/Icons/AppIcon";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { HELP_TOPICS } from "@/constants/helpContent";
import { useTheme } from "@/hooks/use-theme";
import { Stack, router } from "expo-router";
import { useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";

export default function HelpScreen() {
  const theme = useTheme();
  const [openTopicId, setOpenTopicId] = useState<string>(
    HELP_TOPICS[0]?.id || "",
  );

  function toggleTopic(id: string) {
    setOpenTopicId((prev) => (prev === id ? "" : id));
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: () => (
            <ThemedText
              type="smallBold"
              style={{ fontSize: 20, fontWeight: "700" }}
            >
              Help Center
            </ThemedText>
          ),
          headerShown: true,
          headerBackVisible: false,
          headerStyle: { backgroundColor: theme.background },
          headerShadowVisible: false,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} className="ml-1">
              <AppIcon
                family="ion"
                name="chevron-back-circle"
                color={theme.text}
                size={28}
              />
            </TouchableOpacity>
          ),
        }}
      />

      <ThemedView className="flex-1">
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 16, paddingBottom: 44, gap: 12 }}
        >
          <ThemedView
            type="backgroundElement"
            style={{
              borderRadius: 16,
              borderWidth: 1,
              borderColor: theme.border,
              padding: 14,
            }}
          >
            <ThemedText type="smallBold" style={{ fontSize: 16 }}>
              Common Problems And Solutions
            </ThemedText>
            <ThemedText
              type="small"
              themeColor="textSecondary"
              style={{ marginTop: 4, fontSize: 13 }}
            >
              Open any topic below and follow the steps to resolve your issue.
            </ThemedText>
          </ThemedView>

          {HELP_TOPICS.map((topic) => {
            const isOpen = openTopicId === topic.id;

            return (
              <ThemedView
                key={topic.id}
                type="backgroundElement"
                style={{
                  borderRadius: 16,
                  borderWidth: 1,
                  borderColor: isOpen ? theme.primary : theme.border,
                  overflow: "hidden",
                }}
              >
                <TouchableOpacity
                  onPress={() => toggleTopic(topic.id)}
                  activeOpacity={0.8}
                  style={{
                    paddingHorizontal: 14,
                    paddingVertical: 12,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <View
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 14,
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: `${theme.primary}15`,
                    }}
                  >
                    <AppIcon
                      family="ion"
                      name={isOpen ? "chevron-up" : "chevron-down"}
                      size={16}
                      color={theme.primary}
                    />
                  </View>

                  <ThemedText
                    type="smallBold"
                    style={{ flex: 1, fontSize: 14 }}
                  >
                    {topic.title}
                  </ThemedText>
                </TouchableOpacity>

                {isOpen && (
                  <View
                    style={{
                      borderTopWidth: 1,
                      borderTopColor: theme.border,
                      paddingHorizontal: 14,
                      paddingVertical: 12,
                      gap: 10,
                    }}
                  >
                    <View>
                      <ThemedText
                        type="smallBold"
                        style={{ fontSize: 13, color: theme.error }}
                      >
                        Problem
                      </ThemedText>
                      <ThemedText
                        type="small"
                        themeColor="textSecondary"
                        style={{ marginTop: 2 }}
                      >
                        {topic.problem}
                      </ThemedText>
                    </View>

                    <View>
                      <ThemedText type="smallBold" style={{ fontSize: 13 }}>
                        Description
                      </ThemedText>
                      <ThemedText
                        type="small"
                        themeColor="textSecondary"
                        style={{ marginTop: 2 }}
                      >
                        {topic.description}
                      </ThemedText>
                    </View>

                    <View>
                      <ThemedText type="smallBold" style={{ fontSize: 13 }}>
                        Steps To Solve
                      </ThemedText>
                      <View style={{ marginTop: 4, gap: 6 }}>
                        {topic.steps.map((step, idx) => (
                          <View
                            key={`${topic.id}-${idx}`}
                            style={{ flexDirection: "row", gap: 8 }}
                          >
                            <ThemedText
                              type="smallBold"
                              style={{ color: theme.primary }}
                            >
                              {idx + 1}.
                            </ThemedText>
                            <ThemedText
                              type="small"
                              themeColor="textSecondary"
                              style={{ flex: 1 }}
                            >
                              {step}
                            </ThemedText>
                          </View>
                        ))}
                      </View>
                    </View>
                  </View>
                )}
              </ThemedView>
            );
          })}

          <ThemedView
            type="backgroundElement"
            style={{
              borderRadius: 16,
              borderWidth: 1,
              borderColor: theme.border,
              padding: 14,
              marginTop: 4,
            }}
          >
            <ThemedText type="smallBold" style={{ fontSize: 14 }}>
              Still Need Help?
            </ThemedText>
            <ThemedText
              type="small"
              themeColor="textSecondary"
              style={{ marginTop: 4, fontSize: 13 }}
            >
              If your issue is still unresolved, open Feedback and share exact
              steps so we can fix it quickly.
            </ThemedText>
            <TouchableOpacity
              onPress={() => router.push("/feedback" as any)}
              style={{
                marginTop: 10,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 12,
                borderWidth: 1,
                borderColor: theme.primary,
                paddingVertical: 10,
                gap: 6,
              }}
            >
              <AppIcon
                family="ion"
                name="chatbox-ellipses-outline"
                size={16}
                color={theme.primary}
              />
              <ThemedText type="smallBold" style={{ color: theme.primary }}>
                Open Feedback
              </ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </ScrollView>
      </ThemedView>
    </>
  );
}
