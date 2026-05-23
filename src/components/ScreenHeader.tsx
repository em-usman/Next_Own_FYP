import { Stack, router } from "expo-router";
import { TouchableOpacity, View } from "react-native";

import { AppIcon } from "@/components/Icons/AppIcon";
import { ThemedText } from "@/components/themed-text";
import { useTheme } from "@/hooks/use-theme";

type Props = {
  title: string;
  titleAccent?: string;
  closeIcon?: boolean;
  onBack?: () => void;
};

export function ScreenHeader({ title, titleAccent, closeIcon = false, onBack }: Props) {
  const theme = useTheme();

  return (
    <Stack.Screen
      options={{
        headerShown: true,
        headerBackVisible: false,
        headerStyle: { backgroundColor: theme.background },
        headerShadowVisible: false,
        headerTitle: () => (
          <View style={{ flexDirection: "row", alignItems: "center", flexShrink: 1 }}>
            <ThemedText
              style={{ fontSize: 18, fontWeight: "700", color: theme.text }}
              numberOfLines={1}
            >
              {title}
              {titleAccent ? (
                <ThemedText style={{ fontSize: 18, fontWeight: "700", color: theme.primary }}>
                  {" "}{titleAccent}
                </ThemedText>
              ) : null}
            </ThemedText>
          </View>
        ),
        headerLeft: () => (
          <TouchableOpacity
            onPress={onBack ?? (() => router.back())}
            style={{ paddingRight: 8, paddingVertical: 4 }}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <AppIcon
              family="ion"
              name={closeIcon ? "close-circle" : "chevron-back-circle"}
              color={theme.primary}
              size={30}
            />
          </TouchableOpacity>
        ),
      }}
    />
  );
}
