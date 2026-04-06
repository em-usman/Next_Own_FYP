import { AppIcon } from "@/components/Icons/AppIcon";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import type { BrandModelsMap } from "@/config/brandModels";
import { useTheme } from "@/hooks/use-theme";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Modal,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {
  brand: string;
  model: string;
  brands: string[];
  brandModels: BrandModelsMap;
  onBrandChange: (brand: string) => void;
  onModelChange: (model: string) => void;
  error?: string;
  required?: boolean;
};

export default function BrandModelPicker({
  brand,
  model,
  brands,
  brandModels,
  onBrandChange,
  onModelChange,
  error,
  required,
}: Props) {
  const theme = useTheme();
  const [modalType, setModalType] = useState<"brand" | "model" | null>(null);
  const [search, setSearch] = useState("");
  // ✅ pendingOpenModel — brand select hone ke baad model modal open karne ka flag
  const [pendingOpenModel, setPendingOpenModel] = useState(false);

  const models = brand ? brandModels[brand] || [] : [];

  const filteredBrands = brands.filter((b) =>
    b.toLowerCase().includes(search.toLowerCase()),
  );
  const filteredModels = models.filter((m) =>
    m.toLowerCase().includes(search.toLowerCase()),
  );

  // ✅ brand prop update hone ke baad model modal open karo
  useEffect(() => {
    if (pendingOpenModel && brand) {
      setSearch("");
      setModalType("model");
      setPendingOpenModel(false);
    }
  }, [brand, pendingOpenModel]);

  function handleBrandSelect(b: string) {
    onBrandChange(b);
    setSearch("");
    setModalType(null);
    setPendingOpenModel(true);
  }

  function handleModelSelect(m: string) {
    onModelChange(m);
    setSearch("");
    setModalType(null);
  }

  function openBrand() {
    setSearch("");
    setModalType("brand");
  }

  function openModel() {
    if (!brand) return;
    setSearch("");
    setModalType("model");
  }

  const hasError = !!error;

  return (
    <View className="mb-4">
      <ThemedText className="text-sm font-semibold mb-1.5">
        Brand & Model
        {required && <ThemedText style={{ color: theme.error }}> *</ThemedText>}
      </ThemedText>

      {/* Brand + Model row */}
      <View className="flex-row gap-2">
        {/* Brand Button */}
        <TouchableOpacity
          onPress={openBrand}
          activeOpacity={0.7}
          className="flex-1"
        >
          <ThemedView
            type="backgroundElement"
            className="rounded-xl px-3 py-3 flex-row items-center justify-between"
            style={{
              borderWidth: 1,
              borderColor:
                hasError && !brand ? theme.borderError : theme.border,
              minHeight: 50,
            }}
          >
            <ThemedText
              style={{
                fontSize: 15,
                color: brand ? theme.text : theme.textMuted,
                flex: 1,
              }}
              numberOfLines={1}
            >
              {brand || "Brand"}
            </ThemedText>
            <AppIcon
              family="ion"
              name="chevron-down"
              size={14}
              color={theme.textMuted}
            />
          </ThemedView>
        </TouchableOpacity>

        {/* Model Button */}
        <TouchableOpacity
          onPress={openModel}
          activeOpacity={brand ? 0.7 : 1}
          className="flex-1"
        >
          <ThemedView
            type="backgroundElement"
            className="rounded-xl px-3 py-3 flex-row items-center justify-between"
            style={{
              borderWidth: 1,
              borderColor:
                hasError && !model ? theme.borderError : theme.border,
              minHeight: 50,
              opacity: brand ? 1 : 0.5,
            }}
          >
            <ThemedText
              style={{
                fontSize: 15,
                color: model ? theme.text : theme.textMuted,
                flex: 1,
              }}
              numberOfLines={1}
            >
              {model || "Model"}
            </ThemedText>
            <AppIcon
              family="ion"
              name="chevron-down"
              size={14}
              color={theme.textMuted}
            />
          </ThemedView>
        </TouchableOpacity>
      </View>

      {hasError && (
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

      {/* Modal */}
      <Modal
        visible={modalType !== null}
        transparent
        animationType="slide"
        onRequestClose={() => setModalType(null)}
      >
        <TouchableOpacity
          className="flex-1"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
          activeOpacity={1}
          onPress={() => setModalType(null)}
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
            maxHeight: "70%",
            paddingBottom: 30,
          }}
        >
          {/* Header */}
          <View
            className="flex-row items-center justify-between px-5 py-4"
            style={{ borderBottomWidth: 1, borderBottomColor: theme.border }}
          >
            <ThemedText style={{ fontSize: 16, fontWeight: "700" }}>
              {modalType === "brand" ? "Select Brand" : "Select Model"}
            </ThemedText>
            <TouchableOpacity onPress={() => setModalType(null)}>
              <AppIcon family="ion" name="close" size={22} color={theme.text} />
            </TouchableOpacity>
          </View>

          {/* Search */}
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
                placeholder={
                  modalType === "brand" ? "Search brand..." : "Search model..."
                }
                placeholderTextColor={theme.textMuted}
                style={{
                  flex: 1,
                  fontSize: 14,
                  color: theme.text,
                  paddingVertical: 0,
                }}
                autoFocus
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

          {/* List */}
          <FlatList
            data={modalType === "brand" ? filteredBrands : filteredModels}
            keyExtractor={(item) => item}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            renderItem={({ item }) => {
              const isSelected =
                modalType === "brand" ? brand === item : model === item;
              return (
                <TouchableOpacity
                  onPress={() =>
                    modalType === "brand"
                      ? handleBrandSelect(item)
                      : handleModelSelect(item)
                  }
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
                  {isSelected && (
                    <AppIcon
                      family="ion"
                      name="checkmark"
                      size={18}
                      color={theme.primary}
                    />
                  )}
                </TouchableOpacity>
              );
            }}
          />
        </ThemedView>
      </Modal>
    </View>
  );
}
