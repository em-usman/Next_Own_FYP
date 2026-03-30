import { router } from "expo-router";
import React, { useMemo, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Image,
    ScrollView,
    TouchableOpacity,
    View,
} from "react-native";

import { AppIcon } from "@/components/Icons/AppIcon";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useTheme } from "@/hooks/use-theme";
import { useMyAds, type MyAd, type MyAdStatus } from "@/hooks/useMyAds";
import { usePost, type ManagedPostStatus } from "@/hooks/usePost";

const FALLBACK_IMAGE = require("@/assets/categories/mobile.png");

type StatusFilter = "all" | ManagedPostStatus;

function formatPrice(price: number): string {
  if (!Number.isFinite(price)) return "Price not set";
  return `Rs ${price.toLocaleString("en-PK")}`;
}

function toTimeAgo(createdAt?: string): string {
  if (!createdAt) return "Just now";

  const created = new Date(createdAt);
  if (Number.isNaN(created.getTime())) return "Just now";

  const diffMs = Date.now() - created.getTime();
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (diffMs < minute) return "Just now";
  if (diffMs < hour)
    return `${Math.max(1, Math.floor(diffMs / minute))} min ago`;
  if (diffMs < day) return `${Math.max(1, Math.floor(diffMs / hour))} hr ago`;

  const days = Math.max(1, Math.floor(diffMs / day));
  return `${days} day${days > 1 ? "s" : ""} ago`;
}

function statusMeta(status: MyAdStatus, theme: ReturnType<typeof useTheme>) {
  if (status === "sold") {
    return {
      label: "Sold",
      bg: "#7BF7CF44",
      text: "#03BABB",
    };
  }

  if (status === "deactivated") {
    return {
      label: "Deactivated",
      bg: `${theme.textMuted}22`,
      text: theme.textMuted,
    };
  }

  return {
    label: "Active",
    bg: `${theme.primary}22`,
    text: theme.primary,
  };
}

function StatusActionButton({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  const theme = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      className="px-3 py-1.5 rounded-full"
      style={{
        borderWidth: 1,
        borderColor: selected ? theme.primary : theme.border,
        backgroundColor: selected ? `${theme.primary}1A` : "transparent",
      }}
    >
      <ThemedText
        type="small"
        style={{ color: selected ? theme.primary : theme.textSecondary }}
      >
        {label}
      </ThemedText>
    </TouchableOpacity>
  );
}

function AdCard({
  ad,
  onChangeStatus,
  onDelete,
  pending,
}: {
  ad: MyAd;
  onChangeStatus: (status: ManagedPostStatus) => void;
  onDelete: () => void;
  pending: boolean;
}) {
  const theme = useTheme();
  const meta = statusMeta(ad.status, theme);
  const imageUri = ad.coverImage || ad.images?.[0] || "";

  return (
    <ThemedView
      type="backgroundElement"
      className="rounded-2xl border p-3 gap-3"
      style={{ borderColor: theme.border }}
    >
      <View className="flex-row gap-3">
        <Image
          source={imageUri ? { uri: imageUri } : FALLBACK_IMAGE}
          style={{ width: 92, height: 92, borderRadius: 12 }}
          resizeMode="cover"
        />

        <View className="flex-1 gap-1">
          <View className="flex-row items-center justify-between">
            <ThemedText
              type="smallBold"
              style={{ fontSize: 15, flex: 1 }}
              numberOfLines={1}
            >
              {ad.title}
            </ThemedText>
            <View
              className="px-2 py-1 rounded-full"
              style={{ backgroundColor: meta.bg }}
            >
              <ThemedText
                type="smallBold"
                style={{ color: meta.text, fontSize: 11 }}
              >
                {meta.label}
              </ThemedText>
            </View>
          </View>

          <ThemedText type="smallBold">{formatPrice(ad.price)}</ThemedText>
          <ThemedText type="small" themeColor="textSecondary" numberOfLines={1}>
            {ad.location || "Location not set"}
          </ThemedText>
          <ThemedText type="small" themeColor="textMuted">
            {toTimeAgo(ad.createdAt)}
          </ThemedText>
        </View>
      </View>

      <View className="flex-row gap-2">
        <TouchableOpacity
          className="rounded-xl py-2.5 items-center border"
          style={{ borderColor: theme.border, flex: 1 }}
          onPress={() =>
            router.push({ pathname: "/my-ads/[id]", params: { id: ad.id } })
          }
        >
          <AppIcon
            family="ion"
            name="eye-outline"
            size={18}
            color={theme.text}
          />
        </TouchableOpacity>

        <TouchableOpacity
          className="rounded-xl py-2.5 items-center border"
          style={{ borderColor: theme.border, flex: 1 }}
          onPress={() =>
            router.push({
              pathname: "/my-ads/edit/[id]",
              params: { id: ad.id },
            })
          }
        >
          <AppIcon
            family="material-community"
            name="pencil-outline"
            size={18}
            color={theme.text}
          />
        </TouchableOpacity>

        <TouchableOpacity
          className="rounded-xl py-2.5 items-center border"
          style={{ borderColor: theme.error, flex: 1 }}
          onPress={onDelete}
        >
          <AppIcon
            family="material-community"
            name="trash-can-outline"
            size={18}
            color={theme.error}
          />
        </TouchableOpacity>
      </View>

      <View className="flex-row gap-2">
        <StatusActionButton
          label="Active"
          selected={ad.status === "active"}
          onPress={() => onChangeStatus("active")}
        />
        <StatusActionButton
          label="Deactivate"
          selected={ad.status === "deactivated"}
          onPress={() => onChangeStatus("deactivated")}
        />
        <StatusActionButton
          label="Sold"
          selected={ad.status === "sold"}
          onPress={() => onChangeStatus("sold")}
        />
        {pending && <ActivityIndicator size="small" color={theme.primary} />}
      </View>
    </ThemedView>
  );
}

export default function MyAdsScreen() {
  const theme = useTheme();
  const { ads, isLoading, errorMessage } = useMyAds();
  const { updatePostStatus, deletePost } = usePost();
  const [filter, setFilter] = useState<StatusFilter>("all");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const filteredAds = useMemo(() => {
    if (filter === "all") return ads;
    return ads.filter((ad) => ad.status === filter);
  }, [ads, filter]);

  async function handleStatusChange(adId: string, status: ManagedPostStatus) {
    setUpdatingId(adId);
    await updatePostStatus(adId, status);
    setUpdatingId(null);
  }

  function handleDelete(adId: string) {
    Alert.alert("Delete Ad", "Are you sure you want to delete this ad?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          setUpdatingId(adId);
          await deletePost(adId);
          setUpdatingId(null);
        },
      },
    ]);
  }

  return (
    <ThemedView
      className="flex-1"
      style={{ backgroundColor: theme.background }}
    >
      <ScrollView
        contentContainerStyle={{ padding: 16, gap: 12, paddingBottom: 100 }}
      >
        <View className="gap-1">
          <ThemedText type="subtitle" style={{ fontSize: 24 }}>
            My Ads
          </ThemedText>
        </View>

        <View className="flex-row gap-2">
          <StatusActionButton
            label={`All (${ads.length})`}
            selected={filter === "all"}
            onPress={() => setFilter("all")}
          />
          <StatusActionButton
            label="Active"
            selected={filter === "active"}
            onPress={() => setFilter("active")}
          />
          <StatusActionButton
            label="Deactivated"
            selected={filter === "deactivated"}
            onPress={() => setFilter("deactivated")}
          />
          <StatusActionButton
            label="Sold"
            selected={filter === "sold"}
            onPress={() => setFilter("sold")}
          />
        </View>

        {isLoading && (
          <View className="py-16 items-center gap-3">
            <ActivityIndicator size="large" color={theme.primary} />
            <ThemedText type="small" themeColor="textSecondary">
              Loading your ads...
            </ThemedText>
          </View>
        )}

        {!isLoading && !!errorMessage && (
          <ThemedView
            type="backgroundElement"
            className="rounded-2xl p-4 border"
            style={{ borderColor: theme.border }}
          >
            <ThemedText type="small" themeColor="textSecondary">
              {errorMessage}
            </ThemedText>
          </ThemedView>
        )}

        {!isLoading && !errorMessage && filteredAds.length === 0 && (
          <ThemedView
            type="backgroundElement"
            className="rounded-2xl p-5 border items-center"
            style={{ borderColor: theme.border }}
          >
            <AppIcon name="albums-outline" size={24} color={theme.textMuted} />
            <ThemedText type="smallBold" className="mt-2">
              No ads found
            </ThemedText>
            <ThemedText
              type="small"
              themeColor="textSecondary"
              style={{ textAlign: "center" }}
            >
              Post your first ad or switch filter to see other statuses.
            </ThemedText>
          </ThemedView>
        )}

        {!isLoading &&
          !errorMessage &&
          filteredAds.map((ad) => (
            <AdCard
              key={ad.id}
              ad={ad}
              pending={updatingId === ad.id}
              onDelete={() => handleDelete(ad.id)}
              onChangeStatus={(status) => handleStatusChange(ad.id, status)}
            />
          ))}
      </ScrollView>
    </ThemedView>
  );
}
