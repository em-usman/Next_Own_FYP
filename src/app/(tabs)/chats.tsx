import { router, Stack } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { AppIcon } from "@/components/Icons/AppIcon";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useTheme } from "@/hooks/use-theme";
import { type ChatPreview, useChats } from "@/hooks/useChats";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { auth } from "../../../firebaseConfig";
const placeholderImage =
  require("../../../assets/categories/mobile.png") as number;

function formatChatTime(isoString: string | null): string {
  if (!isoString) return "";
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return "";

  const now = new Date();
  const todayStart = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
  ).getTime();
  const msgStart = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  ).getTime();
  const diffDays = Math.round((todayStart - msgStart) / (24 * 60 * 60 * 1000));

  if (diffDays === 0) {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  }
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) {
    return date.toLocaleDateString("en-US", { weekday: "short" });
  }
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function ChatItem({ chat }: { chat: ChatPreview }) {
  const theme = useTheme();
  const uid = auth.currentUser?.uid || "";
  const otherName = uid === chat.buyerId ? chat.sellerName : chat.buyerName;
  const otherImageUri =
    uid === chat.buyerId ? chat.sellerImageUri : chat.buyerImageUri;
  const hasUnread = chat.unreadCount > 0;

  function handlePress() {
    const chatInfo = {
      postId: chat.postId,
      postTitle: "",
      postImageUri: "",
      buyerId: chat.buyerId,
      buyerName: chat.buyerName,
      buyerImageUri: chat.buyerImageUri,
      sellerId: chat.sellerId,
      sellerName: chat.sellerName,
      sellerImageUri: chat.sellerImageUri,
    };

    router.push({
      pathname: "/chat/[id]" as never,
      params: {
        id: chat.id,
        info: encodeURIComponent(JSON.stringify(chatInfo)),
      },
    });
  }

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.75}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 16,
          paddingVertical: 12,
          gap: 12,
        }}
      >
        {/* User Avatar */}
        <View style={{ position: "relative" }}>
          <Image
            source={otherImageUri ? { uri: otherImageUri } : placeholderImage}
            style={{ width: 52, height: 52, borderRadius: 26 }}
            resizeMode="cover"
          />
          {hasUnread && (
            <View
              style={{
                position: "absolute",
                top: -3,
                right: -3,
                width: 18,
                height: 18,
                borderRadius: 9,
                backgroundColor: theme.primary,
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 2,
                borderColor: theme.background,
              }}
            >
              <ThemedText
                type="small"
                style={{
                  color: "#FFFFFF",
                  fontSize: 10,
                  fontWeight: "700",
                  textAlign: "center",
                  lineHeight: 13, 
                }}
              >
                {chat.unreadCount > 9 ? "9+" : String(chat.unreadCount)}
              </ThemedText>
            </View>
          )}
        </View>

        {/* Content */}
        <View style={{ flex: 1, gap: 3 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <ThemedText
              type="smallBold"
              style={{ fontWeight: hasUnread ? "700" : "600" }}
              numberOfLines={1}
            >
              {otherName || "User"}
            </ThemedText>
            <ThemedText
              type="small"
              style={{
                color: hasUnread ? theme.primary : theme.textSecondary,
                fontSize: 11,
              }}
            >
              {formatChatTime(chat.lastMessageAt)}
            </ThemedText>
          </View>

          <ThemedText
            type="small"
            numberOfLines={1}
            style={{
              color: hasUnread ? theme.text : theme.textSecondary,
              fontWeight: hasUnread ? "500" : "400",
            }}
          >
            {chat.lastMessage || "No messages yet"}
          </ThemedText>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function ChatsScreen() {
  const theme = useTheme();
  const uid = auth.currentUser?.uid;
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"all" | "read" | "unread">(
    "all",
  );
  const { chats, isLoading } = useChats(searchQuery, filterType);
  const insets = useSafeAreaInsets();

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Chats",
          headerStyle: { backgroundColor: theme.background },
          headerTintColor: theme.text,
          headerShadowVisible: false,
          headerTitleStyle: { fontSize: 18, fontWeight: "700" },
        }}
      />

      <ThemedView
        className="flex-1"
        style={{ backgroundColor: theme.background }}
      >
        {!uid ? (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              paddingHorizontal: 32,
              gap: 10,
            }}
          >
            <AppIcon
              family="ion"
              name="chatbubbles-outline"
              size={44}
              color={theme.textMuted}
            />
            <ThemedText type="subtitle" style={{ fontSize: 18 }}>
              Sign in to see chats
            </ThemedText>
            <ThemedText
              type="small"
              themeColor="textSecondary"
              style={{ textAlign: "center" }}
            >
              Your conversations with sellers will appear here.
            </ThemedText>
          </View>
        ) : (
          <>
            {/* Search Bar */}
            <View
              style={{
                paddingHorizontal: 16,
                paddingVertical: 12,
                paddingTop: insets.top + 20,
                backgroundColor: theme.background,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  paddingHorizontal: 12,
                  borderRadius: 20,
                  backgroundColor: theme.backgroundElement,
                  borderWidth: 1,
                  borderColor: theme.border,
                }}
              >
                <AppIcon name="search" size={18} color={theme.textSecondary} />
                <TextInput
                  placeholder="Search chats..."
                  placeholderTextColor={theme.textSecondary}
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  style={{
                    flex: 1,
                    paddingVertical: 10,
                    color: theme.text,
                    fontSize: 14,
                  }}
                />
                {searchQuery ? (
                  <TouchableOpacity onPress={() => setSearchQuery("")}>
                    <AppIcon
                      name="close"
                      size={18}
                      color={theme.textSecondary}
                    />
                  </TouchableOpacity>
                ) : null}
              </View>
            </View>

            {/* Filter Buttons */}
            <View
              style={{
                flexDirection: "row",
                paddingHorizontal: 16,
                paddingVertical: 12,
                gap: 10,
                backgroundColor: theme.background,
              }}
            >
              {["all", "read", "unread"].map((filter) => {
                const unreadCount = chats.filter(
                  (c) => c.unreadCount > 0,
                ).length;
                return (
                  <TouchableOpacity
                    key={filter}
                    onPress={() =>
                      setFilterType(filter as "all" | "read" | "unread")
                    }
                    style={{
                      paddingHorizontal: 16,
                      paddingVertical: 8,
                      borderRadius: 20,
                      backgroundColor:
                        filterType === filter
                          ? theme.primary
                          : theme.backgroundElement,
                      borderWidth: filterType === filter ? 0 : 1,
                      borderColor: theme.border,
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <ThemedText
                      type="small"
                      style={{
                        color:
                          filterType === filter
                            ? "#FFFFFF"
                            : theme.textSecondary,
                        fontWeight: filterType === filter ? "700" : "600",
                        textTransform: "capitalize",
                      }}
                    >
                      {filter === "unread"
                        ? "Unread"
                        : filter === "read"
                          ? "Read"
                          : "All"}
                    </ThemedText>
                    {filter === "unread" && unreadCount > 0 && (
                      <View
                        style={{
                          backgroundColor:
                            filterType === filter
                              ? "rgba(255,255,255,0.3)"
                              : theme.primary,
                          borderRadius: 12,
                          width: 24,
                          height: 24,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <ThemedText
                          type="small"
                          style={{
                            color: "#FFFFFF",
                            fontSize: 11,
                            fontWeight: "700",
                          }}
                        >
                          {unreadCount}
                        </ThemedText>
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Chat List */}
            {isLoading ? (
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ActivityIndicator size="large" color={theme.primary} />
              </View>
            ) : chats.length === 0 ? (
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  paddingHorizontal: 32,
                  gap: 10,
                }}
              >
                <AppIcon
                  family="ion"
                  name="chatbubbles-outline"
                  size={44}
                  color={theme.textMuted}
                />
                <ThemedText type="subtitle" style={{ fontSize: 18 }}>
                  {searchQuery ? "No chats found" : "No chats yet"}
                </ThemedText>
                <ThemedText
                  type="small"
                  themeColor="textSecondary"
                  style={{ textAlign: "center" }}
                >
                  {searchQuery
                    ? "Try a different search term."
                    : "Open a listing and tap Chat to start a conversation with the seller."}
                </ThemedText>
              </View>
            ) : (
              <FlatList
                data={chats}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => <ChatItem chat={item} />}
                contentContainerStyle={{ paddingHorizontal: 16 }}
                ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
              />
            )}
          </>
        )}
      </ThemedView>
    </>
  );
}
