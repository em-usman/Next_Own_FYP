import { router, useLocalSearchParams } from "expo-router";
import { ScreenHeader } from "@/components/ScreenHeader";
import { useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { AppIcon } from "@/components/Icons/AppIcon";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useTheme } from "@/hooks/use-theme";
import { auth } from "../../../firebaseConfig";
import {
  type ChatInfo,
  type ChatMessage,
  useChatMessages,
} from "@/hooks/useChatMessages";

const placeholderImage = require("@/assets/categories/mobile.png");

function formatMessageTime(isoString: string): string {
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

function MessageBubble({
  message,
  isOwn,
}: {
  message: ChatMessage;
  isOwn: boolean;
}) {
  const theme = useTheme();

  return (
    <View
      style={{
        alignSelf: isOwn ? "flex-end" : "flex-start",
        maxWidth: "75%",
        marginVertical: 3,
        marginHorizontal: 16,
      }}
    >
      {!isOwn && (
        <ThemedText
          type="small"
          style={{ color: theme.textSecondary, marginBottom: 2, marginLeft: 4 }}
        >
          {message.senderName}
        </ThemedText>
      )}
      <View
        style={{
          backgroundColor: isOwn ? theme.primary : theme.backgroundElement,
          borderRadius: 18,
          borderBottomRightRadius: isOwn ? 4 : 18,
          borderBottomLeftRadius: isOwn ? 18 : 4,
          paddingVertical: 10,
          paddingHorizontal: 14,
          borderWidth: isOwn ? 0 : 1,
          borderColor: theme.border,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.06,
          shadowRadius: 3,
          elevation: 1,
        }}
      >
        <ThemedText
          type="small"
          style={{ color: isOwn ? "#FFFFFF" : theme.text, lineHeight: 20 }}
        >
          {message.text}
        </ThemedText>
        <ThemedText
          type="small"
          style={{
            color: isOwn ? "rgba(255,255,255,0.65)" : theme.textMuted,
            fontSize: 10,
            marginTop: 4,
            textAlign: isOwn ? "right" : "left",
          }}
        >
          {formatMessageTime(message.createdAt)}
        </ThemedText>
      </View>
    </View>
  );
}

export default function ChatScreen() {
  const theme = useTheme();
  const { id, info } = useLocalSearchParams<{
    id?: string | string[];
    info?: string | string[];
  }>();

  const chatId = Array.isArray(id) ? id[0] : id || "";
  const rawInfo = Array.isArray(info) ? info[0] : info || "";

  const chatInfo = useMemo<ChatInfo>(() => {
    try {
      return rawInfo
        ? (JSON.parse(decodeURIComponent(rawInfo)) as ChatInfo)
        : {
            postId: "",
            postTitle: "",
            postImageUri: "",
            buyerId: "",
            buyerName: "",
            sellerId: "",
            sellerName: "",
          };
    } catch {
      return {
        postId: "",
        postTitle: "",
        postImageUri: "",
        buyerId: "",
        buyerName: "",
        sellerId: "",
        sellerName: "",
      };
    }
  }, [rawInfo]);

  const uid = auth.currentUser?.uid || "";
  const { messages, isLoading, isSending, sendMessage } = useChatMessages(
    chatId,
    chatInfo,
  );

  const [inputText, setInputText] = useState("");

  const otherName =
    uid === chatInfo.buyerId ? chatInfo.sellerName : chatInfo.buyerName;

  async function handleSend() {
    const text = inputText.trim();
    if (!text) return;
    setInputText("");
    await sendMessage(text);
  }

  return (
    <>
      <ScreenHeader title={otherName || "Chat"} />

      <ThemedView className="flex-1" style={{ backgroundColor: theme.background }}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 70}
        >
          {/* Post info card */}
          {chatInfo.postTitle ? (
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "/listing/[id]",
                  params: { id: chatInfo.postId },
                })
              }
              activeOpacity={0.8}
            >
              <ThemedView
                type="backgroundElement"
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 12,
                  paddingHorizontal: 16,
                  paddingVertical: 12,
                  borderBottomWidth: 1,
                  borderBottomColor: theme.border,
                }}
              >
                <Image
                  source={
                    chatInfo.postImageUri
                      ? { uri: chatInfo.postImageUri }
                      : placeholderImage
                  }
                  style={{ width: 48, height: 48, borderRadius: 10 }}
                  resizeMode="cover"
                />
                <View style={{ flex: 1 }}>
                  <ThemedText type="smallBold" numberOfLines={1}>
                    {chatInfo.postTitle}
                  </ThemedText>
                  <ThemedText type="small" themeColor="textSecondary">
                    Tap to view listing
                  </ThemedText>
                </View>
                <AppIcon
                  name="chevron-forward"
                  size={16}
                  color={theme.textSecondary}
                />
              </ThemedView>
            </TouchableOpacity>
          ) : null}

          {/* Messages */}
          {isLoading ? (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
              <ActivityIndicator size="large" color={theme.primary} />
            </View>
          ) : messages.length === 0 ? (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                paddingHorizontal: 32,
                gap: 8,
              }}
            >
              <AppIcon
                family="ion"
                name="chatbubbles-outline"
                size={44}
                color={theme.textMuted}
              />
              <ThemedText type="subtitle" style={{ fontSize: 18, textAlign: "center" }}>
                Start the conversation
              </ThemedText>
              <ThemedText
                type="small"
                themeColor="textSecondary"
                style={{ textAlign: "center" }}
              >
                Send a message to ask about this listing.
              </ThemedText>
            </View>
          ) : (
            <FlatList
              data={messages}
              keyExtractor={(item) => item.id}
              inverted
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingVertical: 12 }}
              renderItem={({ item }) => (
                <MessageBubble
                  message={item}
                  isOwn={item.senderId === uid}
                />
              )}
            />
          )}

          {/* Input bar */}
          <ThemedView
            style={{
              flexDirection: "row",
              alignItems: "flex-end",
              paddingHorizontal: 12,
              paddingVertical: 10,
              paddingBottom: Platform.OS === "ios" ? 10 : 14,
              borderTopWidth: 1,
              borderTopColor: theme.border,
              gap: 8,
            }}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: theme.backgroundElement,
                borderRadius: 22,
                borderWidth: 1,
                borderColor: theme.border,
                paddingHorizontal: 16,
                paddingVertical: 10,
                minHeight: 44,
                justifyContent: "center",
              }}
            >
              <TextInput
                value={inputText}
                onChangeText={setInputText}
                placeholder="Type a message..."
                placeholderTextColor={theme.textMuted}
                style={{ color: theme.text, fontSize: 15, maxHeight: 100 }}
                multiline
                returnKeyType="default"
              />
            </View>

            <TouchableOpacity
              onPress={handleSend}
              disabled={isSending || !inputText.trim()}
              style={{
                width: 44,
                height: 44,
                borderRadius: 22,
                backgroundColor:
                  inputText.trim() ? theme.primary : theme.border,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {isSending ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <AppIcon
                  family="ion"
                  name="send"
                  size={18}
                  color="#FFFFFF"
                />
              )}
            </TouchableOpacity>
          </ThemedView>
        </KeyboardAvoidingView>
      </ThemedView>
    </>
  );
}
