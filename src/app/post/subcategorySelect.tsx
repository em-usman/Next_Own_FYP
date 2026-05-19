import { AppIcon } from "@/components/Icons/AppIcon";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { CATEGORIES, SubCategory } from "@/config/categoryConfig";
import { useTheme } from "@/hooks/use-theme";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ScreenHeader } from "@/components/ScreenHeader";
import React from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";

// ── Recursively find subcategory by id ───────────────────────────
function findSubCategory(items: SubCategory[], id: string): SubCategory | null {
  for (const item of items) {
    if (item.id === id) return item;
    if (item.children) {
      const found = findSubCategory(item.children, id);
      if (found) return found;
    }
  }
  return null;
}

// ── Build breadcrumb ─────────────────────────────────────────────
function buildBreadcrumb(
  subCategories: SubCategory[],
  targetId: string,
  path: string[] = [],
): string[] | null {
  for (const item of subCategories) {
    if (item.id === targetId) return [...path, item.label];
    if (item.children) {
      const result = buildBreadcrumb(item.children, targetId, [
        ...path,
        item.label,
      ]);
      if (result) return result;
    }
  }
  return null;
}

export default function SubCategoryScreen() {
  const theme = useTheme();
  const router = useRouter();

  const params = useLocalSearchParams();

  // ✅ Expo Router params kabhi kabhi array hote hain — string mein convert karo
  const categoryId = Array.isArray(params.categoryId)
    ? params.categoryId[0]
    : (params.categoryId as string) || "";

  const subCategoryId = Array.isArray(params.subCategoryId)
    ? params.subCategoryId[0]
    : (params.subCategoryId as string) || "";

  const category = CATEGORIES.find((c) => c.id === categoryId);

  if (!category) {
    return (
      <ThemedView className="flex-1 justify-center items-center">
        <ThemedText>Category not found.</ThemedText>
      </ThemedView>
    );
  }

  // ── Items & title ─────────────────────────────────────────────
  let items: SubCategory[] = [];
  let screenTitle = category.label;
  let breadcrumb: string[] = [category.label];

  if (subCategoryId) {
    const parent = findSubCategory(category.subCategories, subCategoryId);
    items = parent?.children || [];
    screenTitle = parent?.label || category.label;
    const path = buildBreadcrumb(category.subCategories, subCategoryId);
    if (path) breadcrumb = [category.label, ...path];
  } else {
    items = category.subCategories;
  }

  // ── Press handler ─────────────────────────────────────────────
  function handlePress(item: SubCategory) {
    if (item.children && item.children.length > 0) {
      router.push({
        pathname: "/post/subcategorySelect" as any,
        params: { categoryId, subCategoryId: item.id },
      });
    } else {
      const baseSubCategoryId = subCategoryId || item.id;
      const selectedSubSubCategoryId = subCategoryId ? item.id : "";
      router.push({
        pathname: "/post/form" as any,
        params: {
          categoryId,
          subCategoryId: baseSubCategoryId,
          ...(selectedSubSubCategoryId
            ? { subSubCategoryId: selectedSubSubCategoryId }
            : {}),
        },
      });
    }
  }

  return (
    <>
      <ScreenHeader title={screenTitle} />

      <ThemedView className="flex-1">
        <ScrollView
          contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        >
          {/* ── Breadcrumb ── */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 4,
              marginBottom: 16,
            }}
          >
            {breadcrumb.map((crumb, index) => (
              <View
                key={index}
                style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
              >
                {index > 0 && (
                  <AppIcon
                    family="ion"
                    name="chevron-forward"
                    size={11}
                    color={theme.textMuted}
                  />
                )}
                <ThemedText
                  type="small"
                  style={{
                    fontSize: 12,
                    color:
                      index === breadcrumb.length - 1
                        ? theme.primary
                        : theme.textMuted,
                    fontWeight: index === breadcrumb.length - 1 ? "600" : "400",
                  }}
                >
                  {crumb}
                </ThemedText>
              </View>
            ))}
          </View>

          {/* ── List ── */}
          <View>
            {items.map((item, index) => {
              const hasChildren = item.children && item.children.length > 0;
              const isLast = index === items.length - 1;

              return (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => handlePress(item)}
                  activeOpacity={0.6}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingHorizontal: 4,
                    paddingVertical: 16,
                    borderBottomWidth: isLast ? 0 : 1,
                    borderBottomColor: theme.border,
                    gap: 12,
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <ThemedText style={{ fontSize: 15 }}>
                      {item.label}
                    </ThemedText>
                  </View>

                  {hasChildren && (
                    <AppIcon
                      family="ion"
                      name="chevron-forward"
                      size={16}
                      color={theme.textMuted}
                    />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>

          {/* ── Empty state ── */}
          {items.length === 0 && (
            <View style={{ alignItems: "center", marginTop: 60 }}>
              <AppIcon
                family="ion"
                name="folder-open-outline"
                size={48}
                color={theme.textMuted}
              />
              <ThemedText
                themeColor="textMuted"
                style={{ fontSize: 14, marginTop: 12 }}
              >
                No subcategories found
              </ThemedText>
            </View>
          )}
        </ScrollView>
      </ThemedView>
    </>
  );
}
