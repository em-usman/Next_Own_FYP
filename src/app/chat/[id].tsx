import { router, Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { AppIcon } from "@/components/Icons/AppIcon";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useTheme } from "@/hooks/use-theme";
import {
  type ChatInfo,
  type ChatMessage,
  useChatMessages,
} from "@/hooks/useChatMessages";
import { auth } from "../../../firebaseConfig";

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

function formatMessageDate(isoString: string): string {
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return "";

  const now = new Date();
  const today = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
  ).getTime();
  const messageDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  ).getTime();
  const diffDays = Math.round((today - messageDate) / (24 * 60 * 60 * 1000));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
  });
}

function getMessageDateKey(isoString: string): string {
  const date = new Date(isoString);
  return date.toISOString().split("T")[0];
}

function MessageBubble({
  message,
  isOwn,
  isSelected,
  isSelectionMode,
  onLongPress,
  onPress,
}: {
  message: ChatMessage;
  isOwn: boolean;
  isSelected: boolean;
  isSelectionMode: boolean;
  onLongPress: () => void;
  onPress: () => void;
}) {
  const theme = useTheme();

  return (
    <TouchableOpacity
      onLongPress={onLongPress}
      onPress={isSelectionMode ? onPress : undefined}
      activeOpacity={0.7}
    >
      <View
        style={{
          alignSelf: isOwn ? "flex-end" : "flex-start",
          maxWidth: "75%",
          marginVertical: 3,
          marginHorizontal: 16,
          flexDirection: "row",
          alignItems: "flex-end",
          gap: 8,
        }}
      >
        {isSelectionMode && (
          <View
            style={{
              width: 24,
              height: 24,
              borderRadius: 12,
              backgroundColor: isSelected ? theme.primary : theme.border,
              borderWidth: isSelected ? 0 : 2,
              borderColor: theme.border,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {isSelected && (
              <ThemedText
                type="small"
                style={{
                  color: "#FFFFFF",
                  fontSize: 14,
                  fontWeight: "700",
                }}
              >
                ✓
              </ThemedText>
            )}
          </View>
        )}
        <View
          style={{
            backgroundColor: isSelected
              ? theme.primary + "40"
              : isOwn
                ? theme.primary
                : theme.backgroundElement,
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
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 4,
              marginTop: 4,
              justifyContent: isOwn ? "flex-end" : "flex-start",
            }}
          >
            <ThemedText
              type="small"
              style={{
                color: isOwn ? "rgba(255,255,255,0.65)" : theme.textMuted,
                fontSize: 10,
              }}
            >
              {formatMessageTime(message.createdAt)}
            </ThemedText>
            {isOwn && (
              <View style={{ marginLeft: 4 }}>
                {message.status === "sending" && (
                  <AppIcon
                    family="ion"
                    name="time"
                    size={10}
                    color="rgba(255,255,255,0.65)"
                  />
                )}
                {message.status === "sent" && (
                  <ThemedText
                    style={{ color: "rgba(255,255,255,0.65)", fontSize: 9 }}
                  >
                    ✓✓
                  </ThemedText>
                )}
                {message.status === "seen" && (
                  <ThemedText
                    style={{
                      color: "#000000",
                      fontSize: 9,
                      fontWeight: "600",
                    }}
                  >
                    ✓✓
                  </ThemedText>
                )}
              </View>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function DateSeparator({ date }: { date: string }) {
  const theme = useTheme();
  return (
    <View
      style={{
        alignItems: "center",
        marginVertical: 12,
        marginHorizontal: 16,
      }}
    >
      <View
        style={{
          backgroundColor: theme.backgroundElement,
          borderRadius: 12,
          paddingHorizontal: 12,
          paddingVertical: 6,
          borderWidth: 1,
          borderColor: theme.border,
        }}
      >
        <ThemedText
          type="small"
          style={{
            fontSize: 12,
            color: theme.textSecondary,
            fontWeight: "500",
          }}
        >
          {date}
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
            buyerImageUri: "",
            sellerId: "",
            sellerName: "",
            sellerImageUri: "",
          };
    } catch {
      return {
        postId: "",
        postTitle: "",
        postImageUri: "",
        buyerId: "",
        buyerName: "",
        buyerImageUri: "",
        sellerId: "",
        sellerName: "",
        sellerImageUri: "",
      };
    }
  }, [rawInfo]);

  const uid = auth.currentUser?.uid || "";
  const {
    messages,
    isLoading,
    isSending,
    sendMessage,
    deleteMessages,
    markMessagesAsSeen,
  } = useChatMessages(chatId, chatInfo);

  const [inputText, setInputText] = useState("");
  const [selectedMessages, setSelectedMessages] = useState<string[]>([]);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  useEffect(() => {
    markMessagesAsSeen().catch((error) => {
      console.error("Failed to mark messages as seen:", error);
    });
  }, [chatId, markMessagesAsSeen]);

  const otherName =
    uid === chatInfo.buyerId ? chatInfo.sellerName : chatInfo.buyerName;
  const otherImageUri =
    uid === chatInfo.buyerId ? chatInfo.sellerImageUri : chatInfo.buyerImageUri;

  async function handleSend() {
    const text = inputText.trim();
    if (!text) return;
    setInputText("");
    await sendMessage(text);
  }

  function handleMessageLongPress(messageId: string) {
    setIsSelectionMode(true);
    setSelectedMessages([messageId]);
  }

  function handleMessagePress(messageId: string) {
    if (!isSelectionMode) return;
    setSelectedMessages((prev) => {
      if (prev.includes(messageId)) {
        const updated = prev.filter((id) => id !== messageId);
        if (updated.length === 0) {
          setIsSelectionMode(false);
        }
        return updated;
      } else {
        return [...prev, messageId];
      }
    });
  }

  async function handleDelete() {
    setIsDeleting(true);
    setDeleteError(null);
    try {
      await deleteMessages(selectedMessages);
      setSelectedMessages([]);
      setIsSelectionMode(false);
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Failed to delete messages:", error);
      setDeleteError(
        error instanceof Error ? error.message : "Failed to delete message",
      );
    } finally {
      setIsDeleting(false);
    }
  }

  function handleCloseDeleteModal() {
    setShowDeleteModal(false);
    setDeleteError(null);
  }

  function cancelSelection() {
    setSelectedMessages([]);
    setIsSelectionMode(false);
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: isSelectionMode
            ? `${selectedMessages.length} selected`
            : otherName || "Chat",
          headerStyle: { backgroundColor: theme.background },
          headerTintColor: theme.text,
          headerShadowVisible: false,
          headerTitleStyle: { fontSize: 18, fontWeight: "700" },
          headerLeft: () => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 12,
                paddingLeft: 16,
              }}
            >
              {isSelectionMode ? (
                <TouchableOpacity onPress={cancelSelection}>
                  <AppIcon
                    family="ion"
                    name="close"
                    size={24}
                    color={theme.text}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => router.back()}>
                  <AppIcon
                    family="ion"
                    name="chevron-back"
                    size={24}
                    color={theme.text}
                  />
                </TouchableOpacity>
              )}
              {!isSelectionMode && (
                <Image
                  source={
                    otherImageUri ? { uri: otherImageUri } : placeholderImage
                  }
                  style={{ width: 32, height: 32, borderRadius: 16 }}
                  resizeMode="cover"
                />
              )}
            </View>
          ),
          headerRight: () =>
            isSelectionMode ? (
              <TouchableOpacity
                onPress={() => setShowDeleteModal(true)}
                style={{ paddingRight: 16 }}
              >
                <AppIcon
                  family="ion"
                  name="trash"
                  size={24}
                  color={theme.primary}
                />
              </TouchableOpacity>
            ) : null,
        }}
      />

      {/* Delete confirmation modal */}
      <Modal
        visible={showDeleteModal}
        transparent
        animationType="fade"
        onRequestClose={handleCloseDeleteModal}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 20,
          }}
        >
          <View
            style={{
              backgroundColor: theme.background,
              borderRadius: 16,
              padding: 24,
              width: "100%",
              maxWidth: 320,
            }}
          >
            <ThemedText
              type="subtitle"
              style={{ fontSize: 18, marginBottom: 8, textAlign: "center" }}
            >
              Delete Message{selectedMessages.length > 1 ? "s" : ""}?
            </ThemedText>
            <ThemedText
              type="small"
              themeColor="textSecondary"
              style={{ textAlign: "center", marginBottom: 24 }}
            >
              This action cannot be undone.
            </ThemedText>

            {deleteError && (
              <View
                style={{
                  backgroundColor: "#FF3B30",
                  borderRadius: 10,
                  padding: 12,
                  marginBottom: 16,
                }}
              >
                <ThemedText
                  type="small"
                  style={{ color: "#FFFFFF", textAlign: "center" }}
                >
                  {deleteError}
                </ThemedText>
              </View>
            )}

            <View style={{ gap: 12, flexDirection: "row" }}>
              <TouchableOpacity
                onPress={handleCloseDeleteModal}
                disabled={isDeleting}
                style={{
                  flex: 1,
                  paddingVertical: 12,
                  borderRadius: 10,
                  backgroundColor: theme.backgroundElement,
                  borderWidth: 1,
                  borderColor: theme.border,
                  alignItems: "center",
                  opacity: isDeleting ? 0.5 : 1,
                }}
              >
                <ThemedText
                  type="small"
                  style={{ fontWeight: "600", color: theme.text }}
                >
                  Cancel
                </ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleDelete}
                disabled={isDeleting}
                style={{
                  flex: 1,
                  paddingVertical: 12,
                  borderRadius: 10,
                  backgroundColor: isDeleting ? "#FF3B30CC" : "#FF3B30",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {isDeleting ? (
                  <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                  <ThemedText
                    type="small"
                    style={{ fontWeight: "600", color: "#FFFFFF" }}
                  >
                    Delete
                  </ThemedText>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <ThemedView
        className="flex-1"
        style={{ backgroundColor: theme.background }}
      >
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 90}
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
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
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
              <ThemedText
                type="subtitle"
                style={{ fontSize: 18, textAlign: "center" }}
              >
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
              renderItem={({ item, index }) => {
                const nextMessage = messages[index + 1];
                const showDateSeparator =
                  index === messages.length - 1 ||
                  (nextMessage &&
                    getMessageDateKey(item.createdAt) !==
                      getMessageDateKey(nextMessage.createdAt));

                return (
                  <View>
                    {showDateSeparator && (
                      <DateSeparator date={formatMessageDate(item.createdAt)} />
                    )}
                    <MessageBubble
                      message={item}
                      isOwn={item.senderId === uid}
                      isSelected={selectedMessages.includes(item.id)}
                      isSelectionMode={isSelectionMode}
                      onLongPress={() => handleMessageLongPress(item.id)}
                      onPress={() => handleMessagePress(item.id)}
                    />
                  </View>
                );
              }}
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
                paddingVertical: 2,
                minHeight: 36,
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
              disabled={!inputText.trim()}
              style={{
                width: 44,
                height: 44,
                borderRadius: 22,
                backgroundColor: inputText.trim()
                  ? theme.primary
                  : theme.border,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AppIcon family="ion" name="send" size={18} color="#FFFFFF" />
            </TouchableOpacity>
          </ThemedView>
        </KeyboardAvoidingView>
      </ThemedView>
    </>
  );
}
