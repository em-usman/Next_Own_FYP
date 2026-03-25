import { AppIcon } from "@/components/Icons/AppIcon";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useTheme } from "@/hooks/use-theme";
import React, { useMemo, useState } from "react";
import {
    FlatList,
    Keyboard,
    Modal,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

type Props = {
  label: string;
  options: string[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
};

export default function MultiSelectPicker({
  label,
  options,
  selectedValues,
  onChange,
  placeholder,
  error,
  required,
}: Props) {
  const theme = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState("");

  const filteredOptions = useMemo(
    () =>
      options.filter((option) =>
        option.toLowerCase().includes(search.toLowerCase()),
      ),
    [options, search],
  );

  function closeModal() {
    Keyboard.dismiss();
    setSearch("");
    setModalVisible(false);
  }

  function toggleValue(option: string) {
    if (selectedValues.includes(option)) {
      onChange(selectedValues.filter((value) => value !== option));
      return;
    }
    onChange([...selectedValues, option]);
  }

  const summary =
    selectedValues.length > 0
      ? selectedValues.slice(0, 2).join(", ") +
        (selectedValues.length > 2 ? ` +${selectedValues.length - 2}` : "")
      : placeholder || `Select ${label}`;

  return (
    <View className="mb-4">
      <ThemedText className="text-sm font-semibold mb-1.5">
        {label}
        {required && <ThemedText style={{ color: theme.error }}> *</ThemedText>}
      </ThemedText>

      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        activeOpacity={0.7}
      >
        <ThemedView
          type="backgroundElement"
          className="rounded-xl px-3 py-3 flex-row items-center justify-between"
          style={{
            borderWidth: 1,
            borderColor:
              error && selectedValues.length === 0
                ? theme.borderError
                : theme.border,
            minHeight: 50,
          }}
        >
          <ThemedText
            style={{
              fontSize: 15,
              color: selectedValues.length > 0 ? theme.text : theme.textMuted,
              flex: 1,
            }}
            numberOfLines={1}
          >
            {summary}
          </ThemedText>
          <AppIcon
            family="ion"
            name="chevron-down"
            size={14}
            color={theme.textMuted}
          />
        </ThemedView>
      </TouchableOpacity>

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

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={closeModal}
      >
        <TouchableOpacity
          className="flex-1"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
          activeOpacity={1}
          onPress={closeModal}
        />

        <ThemedView
          type="backgroundElement"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            maxHeight: "75%",
            paddingBottom: 16,
          }}
        >
          <View
            className="flex-row items-center justify-between px-5 py-4"
            style={{ borderBottomWidth: 1, borderBottomColor: theme.border }}
          >
            <ThemedText style={{ fontSize: 16, fontWeight: "700" }}>
              Select {label}
            </ThemedText>
            <TouchableOpacity onPress={closeModal}>
              <AppIcon family="ion" name="close" size={22} color={theme.text} />
            </TouchableOpacity>
          </View>

          <View className="px-4 py-3">
            <ThemedView
              type="backgroundElement"
              className="flex-row items-center rounded-xl px-3"
              style={{
                borderWidth: 1,
                borderColor: theme.border,
                height: 42,
                gap: 8,
              }}
            >
              <AppIcon
                family="ion"
                name="search-outline"
                size={16}
                color={theme.textMuted}
              />
              <TextInput
                value={search}
                onChangeText={setSearch}
                placeholder={`Search ${label.toLowerCase()}...`}
                placeholderTextColor={theme.textMuted}
                style={{
                  flex: 1,
                  fontSize: 14,
                  color: theme.text,
                  paddingVertical: 0,
                }}
              />
              {search.length > 0 && (
                <TouchableOpacity onPress={() => setSearch("")}>
                  <AppIcon
                    family="ion"
                    name="close-circle"
                    size={16}
                    color={theme.textMuted}
                  />
                </TouchableOpacity>
              )}
            </ThemedView>
          </View>

          <FlatList
            data={filteredOptions}
            keyExtractor={(item) => item}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            renderItem={({ item }) => {
              const isSelected = selectedValues.includes(item);
              return (
                <TouchableOpacity
                  onPress={() => toggleValue(item)}
                  className="flex-row items-center justify-between px-5 py-4"
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: theme.border,
                  }}
                >
                  <ThemedText
                    style={{
                      fontSize: 15,
                      color: isSelected ? theme.primary : theme.text,
                      fontWeight: isSelected ? "600" : "400",
                    }}
                  >
                    {item}
                  </ThemedText>
                  <AppIcon
                    family="ion"
                    name={isSelected ? "checkmark-circle" : "ellipse-outline"}
                    size={18}
                    color={isSelected ? theme.primary : theme.textMuted}
                  />
                </TouchableOpacity>
              );
            }}
          />

          <View className="px-4 pt-3">
            <TouchableOpacity
              onPress={closeModal}
              activeOpacity={0.8}
              className="rounded-xl py-3 items-center"
              style={{ backgroundColor: theme.primary }}
            >
              <ThemedText
                style={{ color: "#fff", fontSize: 15, fontWeight: "700" }}
              >
                Done
              </ThemedText>
            </TouchableOpacity>
          </View>
        </ThemedView>
      </Modal>
    </View>
  );
}
