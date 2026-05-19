import { router, Stack } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
  View,
} from "react-native";

import { AppIcon } from "@/components/Icons/AppIcon";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useTheme } from "@/hooks/use-theme";
import { auth } from "../../../firebaseConfig";
import { type ChatPreview, useChats } from "@/hooks/useChats";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const placeholderImage = require("../../../assets/categories/mobile.png") as number;

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
  const otherName =
    uid === chat.buyerId ? chat.sellerName : chat.buyerName;
  const hasUnread = chat.unreadCount > 0;

  function handlePress() {
    const chatInfo = {
      postId: chat.postId,
      postTitle: chat.postTitle,
      postImageUri: chat.postImageUri,
      buyerId: chat.buyerId,
      buyerName: chat.buyerName,
      sellerId: chat.sellerId,
      sellerName: chat.sellerName,
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
      <ThemedView
        type="backgroundElement"
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 16,
          paddingVertical: 14,
          gap: 12,
          borderBottomWidth: 1,
          borderBottomColor: theme.border,
        }}
      >
        {/* Post thumbnail */}
        <View style={{ position: "relative" }}>
          <Image
            source={
              chat.postImageUri
                ? { uri: chat.postImageUri }
                : placeholderImage
            }
            style={{ width: 52, height: 52, borderRadius: 12 }}
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
                style={{ color: "#FFFFFF", fontSize: 10, fontWeight: "700" }}
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
            themeColor="textSecondary"
            numberOfLines={1}
            style={{ fontWeight: hasUnread ? "600" : "400" }}
          >
            {chat.postTitle}
          </ThemedText>

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

        <AppIcon
          name="chevron-forward"
          size={16}
          color={theme.textSecondary}
        />
      </ThemedView>
    </TouchableOpacity>
  );
}

export default function ChatsScreen() {
  const theme = useTheme();
  const uid = auth.currentUser?.uid;
  const { chats, isLoading } = useChats();

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

      <ThemedView className="flex-1" style={{ backgroundColor: theme.background }}>
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
        ) : isLoading ? (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
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
              No chats yet
            </ThemedText>
            <ThemedText
              type="small"
              themeColor="textSecondary"
              style={{ textAlign: "center" }}
            >
              Open a listing and tap Chat to start a conversation with the
              seller.
            </ThemedText>
          </View>
        ) : (
          <FlatList
            data={chats}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => <ChatItem chat={item} />}
          />
        )}
      </ThemedView>
    </>
  );
}
