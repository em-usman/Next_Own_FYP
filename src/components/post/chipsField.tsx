import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useTheme } from "@/hooks/use-theme";
import React from "react";
import { TouchableOpacity, View } from "react-native";

type Props = {
  label: string;
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
  error?: string;
  required?: boolean;
};

export default function ChipsField({
  label,
  options,
  selected,
  onSelect,
  error,
  required,
}: Props) {
  const theme = useTheme();

  return (
    <View className="mb-4">
      <ThemedText className="text-sm font-semibold mb-1.5">
        {label}
        {required && <ThemedText style={{ color: theme.error }}> *</ThemedText>}
      </ThemedText>

      <View className="flex-row flex-wrap gap-2">
        {options.map((option) => {
          const isActive = selected === option;

          return (
            <TouchableOpacity
              key={option}
              activeOpacity={0.75}
              onPress={() => onSelect(option)}
            >
              <ThemedView
                type="backgroundElement"
                className="px-3 py-2 rounded-full"
                style={{
                  borderWidth: 1,
                  borderColor: isActive ? theme.primary : theme.border,
                  backgroundColor: isActive
                    ? `${theme.primary}1a`
                    : theme.backgroundElement,
                }}
              >
                <ThemedText
                  style={{
                    fontSize: 13,
                    fontWeight: isActive ? "700" : "500",
                    color: isActive ? theme.primary : theme.text,
                  }}
                >
                  {option}
                </ThemedText>
              </ThemedView>
            </TouchableOpacity>
          );
        })}
      </View>

      {error && (
        <ThemedText
          style={{
            fontSize: 12,
            color: theme.error,
            marginTop: 4,
            marginLeft: 4,
          }}
        >
          {error}
        </ThemedText>
      )}
    </View>
  );
}
