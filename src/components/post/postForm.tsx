import { AppIcon } from "@/components/Icons/AppIcon";
import BrandModelPicker from "@/components/post/brandModelPicker";
import ChipsField from "@/components/post/chipsField";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Field } from "@/config/categoryConfig";
import { useTheme } from "@/hooks/use-theme";
import React from "react";
import { Switch, TextInput, TouchableOpacity, View } from "react-native";

export type CommonFormData = {
  title: string;
  description: string;
  price: string;
  location: string;
  contactName: string;
  contactPhone: string;
  hidePhone: boolean;
  details: Record<string, string>;
};

type Props = {
  form: CommonFormData;
  dynamicFields: Field[];
  errors: Record<string, string>;
  categoryLabel: string;
  onChange: (updated: Partial<CommonFormData>) => void;
  onSelectLocation: () => void;
};

function SectionHeader({ title }: { title: string }) {
  const theme = useTheme();
  return (
    <ThemedText
      className="text-base font-bold mb-3 mt-5 pb-2"
      style={{ borderBottomWidth: 1, borderBottomColor: theme.border }}
    >
      {title}
    </ThemedText>
  );
}

export function FormInput({
  label,
  value,
  placeholder,
  onChangeText,
  error,
  keyboardType = "default",
  multiline = false,
  editable = true,
  rightText,
  required,
}: {
  label: string;
  value: string;
  placeholder?: string;
  onChangeText: (text: string) => void;
  error?: string;
  keyboardType?: "default" | "number-pad" | "numeric";
  multiline?: boolean;
  editable?: boolean;
  rightText?: string;
  required?: boolean;
}) {
  const theme = useTheme();
  return (
    <View className="mb-4">
      <ThemedText className="text-sm font-semibold mb-1.5">
        {label}
        {required && <ThemedText style={{ color: theme.error }}> *</ThemedText>}
      </ThemedText>
      <ThemedView
        type="backgroundElement"
        className="rounded-xl px-3 flex-row"
        style={{
          borderWidth: 1,
          borderColor: error ? theme.borderError : theme.border,
          paddingVertical: multiline ? 10 : 0,
          minHeight: multiline ? 110 : 50,
          alignItems: multiline ? "flex-start" : "center",
        }}
      >
        <TextInput
          value={value}
          editable={editable}
          placeholder={placeholder}
          placeholderTextColor={theme.textMuted}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          multiline={multiline}
          numberOfLines={multiline ? 4 : 1}
          style={{
            flex: 1,
            fontSize: 15,
            color: editable ? theme.text : theme.textMuted,
            textAlignVertical: multiline ? "top" : "center",
            paddingVertical: multiline ? 0 : 14,
          }}
        />
        {rightText && (
          <ThemedText themeColor="textMuted" style={{ fontSize: 14 }}>
            {rightText}
          </ThemedText>
        )}
      </ThemedView>
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

export function FormSelect({
  label,
  value,
  placeholder,
  onPress,
  error,
  required,
}: {
  label: string;
  value: string;
  placeholder?: string;
  onPress: () => void;
  error?: string;
  required?: boolean;
}) {
  const theme = useTheme();
  return (
    <View className="mb-4">
      <ThemedText className="text-sm font-semibold mb-1.5">
        {label}
        {required && <ThemedText style={{ color: theme.error }}> *</ThemedText>}
      </ThemedText>
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        <ThemedView
          type="backgroundElement"
          className="rounded-xl px-3 py-3 flex-row items-center justify-between"
          style={{
            borderWidth: 1,
            borderColor: error ? theme.borderError : theme.border,
            minHeight: 50,
          }}
        >
          <ThemedText
            style={{
              fontSize: 15,
              color: value ? theme.text : theme.textMuted,
              flex: 1,
            }}
          >
            {value || placeholder || `Select ${label}`}
          </ThemedText>
          <AppIcon
            family="ion"
            name="chevron-forward"
            size={16}
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
    </View>
  );
}

export default function CommonListingForm({
  form,
  dynamicFields,
  errors,
  categoryLabel,
  onChange,
  onSelectLocation,
}: Props) {
  const theme = useTheme();

  function updateDetail(key: string, value: string) {
    onChange({ details: { ...form.details, [key]: value } });
  }

  return (
    <>
      {dynamicFields.length > 0 && (
        <>
          <SectionHeader title={categoryLabel} />
          {dynamicFields.map((field) => {
            const value = form.details[field.key] || "";
            const error = errors[`details_${field.key}`];

            if (field.type === "brand-model") {
              const brand = form.details["brand"] || "";
              const model = form.details["model"] || "";
              return (
                <BrandModelPicker
                  key={field.key}
                  brand={brand}
                  model={model}
                  onBrandChange={(b) => {
                    onChange({
                      details: { ...form.details, brand: b, model: "" },
                    });
                  }}
                  onModelChange={(m) => updateDetail("model", m)}
                  error={errors["details_brand_model"]}
                  required={field.required}
                />
              );
            }

            if (field.type === "chips") {
              return (
                <ChipsField
                  key={field.key}
                  label={field.label}
                  options={field.options || []}
                  selected={value}
                  onSelect={(val) => updateDetail(field.key, val)}
                  error={error}
                  required={field.required}
                />
              );
            }

            return (
              <FormInput
                key={field.key}
                label={field.label}
                value={value}
                placeholder={field.placeholder}
                required={field.required}
                keyboardType={field.type === "number" ? "numeric" : "default"}
                onChangeText={(text) => updateDetail(field.key, text)}
                error={error}
              />
            );
          })}
        </>
      )}

      <SectionHeader title="Ad Details" />

      <FormInput
        label="Title"
        value={form.title}
        placeholder="Enter Ad Title"
        required
        onChangeText={(text) => onChange({ title: text })}
        error={errors.title}
      />
      <FormInput
        label="Description"
        value={form.description}
        placeholder="Describe the item you are selling"
        onChangeText={(text) => onChange({ description: text })}
        error={errors.description}
        multiline
      />
      <FormInput
        label="Price"
        value={form.price}
        placeholder="Enter price"
        required
        onChangeText={(text) => onChange({ price: text })}
        error={errors.price}
        keyboardType="numeric"
        rightText="Rs"
      />
      <FormSelect
        label="Location"
        value={form.location}
        placeholder="Choose location"
        required
        onPress={onSelectLocation}
        error={errors.location}
      />

      <SectionHeader title="Contact Info" />

      <FormInput
        label="Name"
        value={form.contactName}
        placeholder="Your name"
        required
        onChangeText={(text) => onChange({ contactName: text })}
        error={errors.contactName}
      />

      <View className="mb-4">
        <ThemedText className="text-sm font-semibold mb-1.5">
          Phone Number <ThemedText style={{ color: theme.error }}>*</ThemedText>
        </ThemedText>
        <ThemedView
          type="backgroundElement"
          className="rounded-xl px-3 flex-row items-center"
          style={{
            borderWidth: 1,
            borderColor: errors.contactPhone ? theme.borderError : theme.border,
            height: 50,
          }}
        >
          <ThemedText style={{ fontSize: 15, marginRight: 8 }}>+92</ThemedText>
          <View
            style={{
              width: 1,
              height: 20,
              backgroundColor: theme.border,
              marginRight: 8,
            }}
          />
          <TextInput
            value={form.contactPhone}
            placeholder="3001234567"
            placeholderTextColor={theme.textMuted}
            keyboardType="number-pad"
            maxLength={10}
            onChangeText={(text) =>
              onChange({ contactPhone: text.replace(/[^0-9]/g, "") })
            }
            style={{
              flex: 1,
              fontSize: 15,
              color: theme.text,
              paddingVertical: 0,
            }}
          />
        </ThemedView>
        {errors.contactPhone && (
          <ThemedText
            style={{
              fontSize: 12,
              color: theme.error,
              marginTop: 4,
              marginLeft: 4,
            }}
          >
            {errors.contactPhone}
          </ThemedText>
        )}
      </View>

      <View
        className="flex-row items-center justify-between py-3"
        style={{ borderTopWidth: 1, borderTopColor: theme.border }}
      >
        <ThemedText style={{ fontSize: 15 }}>Hide my phone number</ThemedText>
        <Switch
          value={form.hidePhone}
          onValueChange={(val) => onChange({ hidePhone: val })}
          trackColor={{ true: theme.primary, false: theme.border }}
          thumbColor="#fff"
        />
      </View>
    </>
  );
}
