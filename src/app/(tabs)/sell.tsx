import { AppIcon } from "@/components/Icons/AppIcon";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { CATEGORIES } from "@/config/categoryConfig";
import { useTheme } from "@/hooks/use-theme";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// ✅ Local assets — assets/categories/ folder se
const CATEGORY_IMAGES: Record<string, any> = {
  mobiles: require("@/assets/categories/mobile.png"),
  bikes: require("@/assets/categories/mobile.png"),
  cars: require("@/assets/categories/mobile.png"),
  electronics: require("@/assets/categories/mobile.png"),
};

const POPULAR_IDS = ["mobiles", "cars", "electronics", "bikes"];

export default function Sell() {
  const theme = useTheme();
  const router = useRouter();
  const [search, setSearch] = useState("");

  const popularCategories = CATEGORIES.filter((c) =>
    POPULAR_IDS.includes(c.id),
  );
  const allCategories = CATEGORIES.filter((c) => !POPULAR_IDS.includes(c.id));

  const filteredPopular = popularCategories.filter((c) =>
    c.label.toLowerCase().includes(search.toLowerCase()),
  );
  const filteredAll = allCategories.filter((c) =>
    c.label.toLowerCase().includes(search.toLowerCase()),
  );

  function handleCategoryPress(categoryId: string) {
    router.push({
      pathname: "/post/subcategorySelect" as any,
      params: { categoryId },
    });
  }

  function CategoryRow({
    id,
    label,
    icon,
    isLast,
  }: {
    id: string;
    label: string;
    icon: string;
    isLast: boolean;
  }) {
    return (
      <TouchableOpacity
        onPress={() => handleCategoryPress(id)}
        activeOpacity={0.7}
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 16,
          paddingVertical: 14,
          borderBottomWidth: isLast ? 0 : 1,
          borderBottomColor: theme.border,
          gap: 14,
        }}
      >
        <View
          style={{
            width: 46,
            height: 46,
            borderRadius: 10,
            overflow: "hidden",
            backgroundColor: `${theme.primary}15`,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {CATEGORY_IMAGES[id] ? (
            <Image
              source={CATEGORY_IMAGES[id]}
              style={{ width: 46, height: 46 }}
              resizeMode="cover"
            />
          ) : (
            <AppIcon family="ion" name={icon} size={22} color={theme.primary} />
          )}
        </View>

        <ThemedText type="smallBold" style={{ flex: 1, fontSize: 15 }}>
          {label}
        </ThemedText>

        <AppIcon
          family="ion"
          name="chevron-forward"
          size={18}
          color={theme.textMuted}
        />
      </TouchableOpacity>
    );
  }

  const noResults =
    search.length > 0 &&
    filteredPopular.length === 0 &&
    filteredAll.length === 0;

  return (
    <ThemedView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        {/* ── Header ── */}
        <View
          style={{
            paddingHorizontal: 16,
            paddingTop: 8,
            paddingBottom: 4,
          }}
        >
          <ThemedText
            type="smallBold"
            style={{ fontSize: 22, fontWeight: "700", marginBottom: 12 }}
          >
            What are you selling?
          </ThemedText>

          {/* ── Search Bar ── */}
          <ThemedView
            type="backgroundElement"
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderRadius: 12,
              borderWidth: 1,
              borderColor: theme.border,
              paddingHorizontal: 12,
              height: 46,
              gap: 8,
            }}
          >
            <AppIcon
              family="ion"
              name="search-outline"
              size={18}
              color={theme.textMuted}
            />
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Search categories..."
              placeholderTextColor={theme.textMuted}
              style={{
                flex: 1,
                fontSize: 15,
                color: theme.text,
                paddingVertical: 0,
              }}
            />
            {search.length > 0 && (
              <TouchableOpacity onPress={() => setSearch("")}>
                <AppIcon
                  family="ion"
                  name="close-circle"
                  size={18}
                  color={theme.textMuted}
                />
              </TouchableOpacity>
            )}
          </ThemedView>
        </View>

        <ScrollView
          contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* ── Popular Categories ── */}
          {filteredPopular.length > 0 && (
            <View style={{ marginBottom: 24 }}>
              <ThemedText
                type="small"
                themeColor="textMuted"
                style={{ fontSize: 13, marginBottom: 8 }}
              >
                {search.length > 0 ? "Results" : "Popular Categories"}
              </ThemedText>

              <ThemedView
                type="backgroundElement"
                style={{
                  borderRadius: 16,
                  borderWidth: 1,
                  borderColor: theme.border,
                  overflow: "hidden",
                }}
              >
                {filteredPopular.map((cat, index) => (
                  <CategoryRow
                    key={cat.id}
                    id={cat.id}
                    label={cat.label}
                    icon={cat.icon}
                    isLast={index === filteredPopular.length - 1}
                  />
                ))}
              </ThemedView>
            </View>
          )}

          {/* ── All Categories ── */}
          {filteredAll.length > 0 && (
            <View>
              {search.length === 0 && (
                <ThemedText
                  type="small"
                  themeColor="textMuted"
                  style={{ fontSize: 13, marginBottom: 8 }}
                >
                  Categories
                </ThemedText>
              )}

              <ThemedView
                type="backgroundElement"
                style={{
                  borderRadius: 16,
                  borderWidth: 1,
                  borderColor: theme.border,
                  overflow: "hidden",
                }}
              >
                {filteredAll.map((cat, index) => (
                  <CategoryRow
                    key={cat.id}
                    id={cat.id}
                    label={cat.label}
                    icon={cat.icon}
                    isLast={index === filteredAll.length - 1}
                  />
                ))}
              </ThemedView>
            </View>
          )}

          {/* ── No Results ── */}
          {noResults && (
            <View
              style={{
                alignItems: "center",
                marginTop: 80,
                paddingHorizontal: 40,
              }}
            >
              <AppIcon
                family="ion"
                name="search-outline"
                size={48}
                color={theme.textMuted}
              />
              <ThemedText
                type="smallBold"
                style={{ fontSize: 16, marginTop: 12, textAlign: "center" }}
              >
                No categories found
              </ThemedText>
              <ThemedText
                themeColor="textMuted"
                style={{ fontSize: 14, marginTop: 6, textAlign: "center" }}
              >
                Try searching with different keywords
              </ThemedText>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}
