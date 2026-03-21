import { AppIcon } from "@/components/Icons/AppIcon";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Field } from "@/config/categoryConfig";
import { useTheme } from "@/hooks/use-theme";
import React from "react";
import { Switch, TextInput, TouchableOpacity, View } from "react-native";

// ── Types ────────────────────────────────────────────────────────
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
  onSelectOption: (fieldKey: string, options: string[], label: string) => void;
};

// ── Section Header ───────────────────────────────────────────────
function SectionHeader({ title }: { title: string }) {
  const theme = useTheme();
  return (
    <ThemedText
      type="smallBold"
      style={{
        fontSize: 16,
        marginBottom: 12,
        marginTop: 20,
        paddingBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: theme.border,
      }}
    >
      {title}
    </ThemedText>
  );
}

// ── Text Input Field ─────────────────────────────────────────────
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
    <View style={{ marginBottom: 14 }}>
      <ThemedText type="smallBold" style={{ fontSize: 14, marginBottom: 6 }}>
        {label}
        {required && <ThemedText style={{ color: theme.error }}> *</ThemedText>}
      </ThemedText>
      <ThemedView
        type="backgroundElement"
        style={{
          borderRadius: 12,
          borderWidth: 1,
          borderColor: error ? theme.borderError : theme.border,
          paddingHorizontal: 14,
          paddingVertical: multiline ? 10 : 0,
          flexDirection: "row",
          alignItems: multiline ? "flex-start" : "center",
          minHeight: multiline ? 110 : 50,
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
      {error ? (
        <ThemedText
          themeColor="error"
          style={{ fontSize: 12, marginTop: 4, marginLeft: 4 }}
        >
          {error}
        </ThemedText>
      ) : null}
    </View>
  );
}

// ── Select Field ─────────────────────────────────────────────────
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
    <View style={{ marginBottom: 14 }}>
      <ThemedText type="smallBold" style={{ fontSize: 14, marginBottom: 6 }}>
        {label}
        {required && <ThemedText style={{ color: theme.error }}> *</ThemedText>}
      </ThemedText>
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        <ThemedView
          type="backgroundElement"
          style={{
            borderRadius: 12,
            borderWidth: 1,
            borderColor: error ? theme.borderError : theme.border,
            paddingHorizontal: 14,
            paddingVertical: 14,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
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
      {error ? (
        <ThemedText
          themeColor="error"
          style={{ fontSize: 12, marginTop: 4, marginLeft: 4 }}
        >
          {error}
        </ThemedText>
      ) : null}
    </View>
  );
}

// ── Main Component ───────────────────────────────────────────────
export default function CommonListingForm({
  form,
  dynamicFields,
  errors,
  categoryLabel,
  onChange,
  onSelectOption,
}: Props) {
  const theme = useTheme();

  return (
    <>
      {/* ── Ad Details ── */}
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
        onPress={() =>
          onSelectOption(
            "location",
            [
              "Karachi",
              "Lahore",
              "Islamabad",
              "Rawalpindi",
              "Faisalabad",
              "Multan",
              "Peshawar",
              "Quetta",
              "Sialkot",
              "Gujranwala",
              "Hyderabad",
              "Other",
            ],
            "Location",
          )
        }
        error={errors.location}
      />

      {/* ── Category Specific Fields ── */}
      {dynamicFields.length > 0 && (
        <>
          <SectionHeader title={categoryLabel} />
          {dynamicFields.map((field) => {
            const value = form.details[field.key] || "";
            const error = errors[`details_${field.key}`];

            if (field.type === "select") {
              return (
                <FormSelect
                  key={field.key}
                  label={field.label}
                  value={value}
                  required={field.required}
                  onPress={() =>
                    onSelectOption(field.key, field.options || [], field.label)
                  }
                  error={error}
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
                onChangeText={(text) =>
                  onChange({
                    details: { ...form.details, [field.key]: text },
                  })
                }
                error={error}
              />
            );
          })}
        </>
      )}

      {/* ── Contact Info ── */}
      <SectionHeader title="Contact Info" />

      <FormInput
        label="Name"
        value={form.contactName}
        placeholder="Your name"
        required
        onChangeText={(text) => onChange({ contactName: text })}
        error={errors.contactName}
      />

      {/* Phone with +92 */}
      <View style={{ marginBottom: 14 }}>
        <ThemedText type="smallBold" style={{ fontSize: 14, marginBottom: 6 }}>
          Phone Number <ThemedText style={{ color: theme.error }}>*</ThemedText>
        </ThemedText>
        <ThemedView
          type="backgroundElement"
          style={{
            borderRadius: 12,
            borderWidth: 1,
            borderColor: errors.contactPhone ? theme.borderError : theme.border,
            paddingHorizontal: 14,
            flexDirection: "row",
            alignItems: "center",
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
            themeColor="error"
            style={{ fontSize: 12, marginTop: 4, marginLeft: 4 }}
          >
            {errors.contactPhone}
          </ThemedText>
        )}
      </View>

      {/* Hide Phone Toggle */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingVertical: 14,
          borderTopWidth: 1,
          borderTopColor: theme.border,
        }}
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
