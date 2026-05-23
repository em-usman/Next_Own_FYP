import * as Clipboard from "expo-clipboard";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  BackHandler,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Linking,
  Modal,
  Platform,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

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

// eslint-disable-next-line @typescript-eslint/no-require-imports
const placeholderImage = require("@/assets/categories/mobile.png");

const EMPTY_INFO: ChatInfo = {
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
    year: "numeric",
  });
}

function getMessageDateKey(isoString: string): string {
  const date = new Date(isoString);
  return date.toISOString().split("T")[0];
}

// --- Status tick icon for own messages ---
function StatusTick({
  status,
}: {
  status: ChatMessage["status"];
}) {
  if (status === "sending") {
    return (
      <AppIcon
        family="ion"
        name="time-outline"
        size={12}
        color="rgba(255,255,255,0.45)"
      />
    );
  }
  if (status === "sent") {
    return (
      <AppIcon
        family="ion"
        name="checkmark"
        size={12}
        color="rgba(255,255,255,0.65)"
      />
    );
  }
  // seen — bright white double-check to distinguish from sent
  return (
    <AppIcon
      family="ion"
      name="checkmark-done"
      size={12}
      color="#FFFFFF"
    />
  );
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

  // Deleted-for-everyone placeholder
  if (message.deletedForEveryone) {
    return (
      <TouchableOpacity
        onPress={isSelectionMode ? onPress : undefined}
        onLongPress={onLongPress}
        delayLongPress={300}
        activeOpacity={0.7}
      >
        <View
          style={{
            backgroundColor: isSelected ? theme.backgroundSelected : "transparent",
            paddingVertical: 2,
          }}
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
            <View
              style={{
                backgroundColor: theme.backgroundElement,
                borderRadius: 18,
                borderBottomRightRadius: isOwn ? 4 : 18,
                borderBottomLeftRadius: isOwn ? 18 : 4,
                paddingVertical: 8,
                paddingHorizontal: 14,
                borderWidth: 1,
                borderColor: theme.border,
                flexDirection: "row",
                alignItems: "center",
                gap: 6,
                opacity: 0.75,
              }}
            >
              <AppIcon
                family="ion"
                name="ban-outline"
                size={14}
                color={theme.textMuted}
              />
              <ThemedText
                type="small"
                style={{ color: theme.textMuted, fontStyle: "italic" }}
              >
                {isOwn ? "You deleted this message" : "This message was deleted"}
              </ThemedText>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onLongPress={onLongPress}
      onPress={isSelectionMode ? onPress : undefined}
      activeOpacity={0.7}
      delayLongPress={300}
    >
      {/* Full-width selection tint — bubble colour itself never changes */}
      <View
        style={{
          backgroundColor: isSelected ? theme.backgroundSelected : "transparent",
          paddingVertical: 2,
        }}
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
            {(() => {
              const parts = message.text.split(/(https?:\/\/[^\s]+)/g);
              const textColor = isOwn ? "#FFFFFF" : theme.text;
              const linkColor = isOwn ? "rgba(255,255,255,0.9)" : theme.primary;
              return (
                <Text style={{ color: textColor, fontSize: 13, lineHeight: 20 }}>
                  {parts.map((part, i) =>
                    i % 2 === 1 ? (
                      <Text
                        key={i}
                        style={{ color: linkColor, textDecorationLine: "underline" }}
                        onPress={() => Linking.openURL(part).catch(console.error)}
                      >
                        {part}
                      </Text>
                    ) : (
                      <Text key={i}>{part}</Text>
                    ),
                  )}
                </Text>
              );
            })()}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 4,
                marginTop: 4,
                justifyContent: isOwn ? "flex-end" : "flex-start",
              }}
            >
              {message.edited ? (
                <ThemedText
                  type="small"
                  style={{
                    color: isOwn ? "rgba(255,255,255,0.6)" : theme.textMuted,
                    fontSize: 10,
                    fontStyle: "italic",
                  }}
                >
                  edited
                </ThemedText>
              ) : null}
              <ThemedText
                type="small"
                style={{
                  color: isOwn ? "rgba(255,255,255,0.65)" : theme.textMuted,
                  fontSize: 10,
                }}
              >
                {formatMessageTime(message.createdAt)}
              </ThemedText>
              {isOwn ? <StatusTick status={message.status} /> : null}
            </View>
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
  const insets = useSafeAreaInsets();
  const { id, info, defaultMessage } = useLocalSearchParams<{
    id?: string | string[];
    info?: string | string[];
    defaultMessage?: string | string[];
  }>();

  const chatId = Array.isArray(id) ? id[0] : id || "";
  const rawInfo = Array.isArray(info) ? info[0] : info || "";
  const rawDefault = Array.isArray(defaultMessage) ? defaultMessage[0] : defaultMessage || "";

  const chatInfo = useMemo<ChatInfo>(() => {
    try {
      return rawInfo
        ? (JSON.parse(decodeURIComponent(rawInfo)) as ChatInfo)
        : EMPTY_INFO;
    } catch {
      return EMPTY_INFO;
    }
  }, [rawInfo]);

  const uid = auth.currentUser?.uid || "";
  const {
    messages,
    isLoading,
    sendMessage,
    markMessagesAsSeen,
    deleteMessage,
    editMessage,
  } = useChatMessages(chatId, chatInfo);

  const [inputText, setInputText] = useState(
    rawDefault ? decodeURIComponent(rawDefault) : "",
  );
  const [selectedMessages, setSelectedMessages] = useState<string[]>([]);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [editingMessage, setEditingMessage] = useState<ChatMessage | null>(null);
  const inputRef = useRef<TextInput>(null);

  // Mark other's messages as seen when chat opens
  useEffect(() => {
    if (!chatId) return;
    markMessagesAsSeen().catch(console.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatId]);

  // Android hardware back: cancel edit mode instead of navigating away
  useEffect(() => {
    const sub = BackHandler.addEventListener("hardwareBackPress", () => {
      if (editingMessage) {
        cancelEdit();
        return true;
      }
      return false;
    });
    return () => sub.remove();
  }, [editingMessage]);

  const otherName =
    uid === chatInfo.buyerId ? chatInfo.sellerName : chatInfo.buyerName;
  const otherImageUri =
    uid === chatInfo.buyerId
      ? chatInfo.sellerImageUri
      : chatInfo.buyerImageUri;

  // Derived selection info
  const selectedMessageObjs = messages.filter((m) =>
    selectedMessages.includes(m.id),
  );
  const singleSelected =
    selectedMessages.length === 1 ? selectedMessageObjs[0] : null;
  const allSelectedOwn =
    selectedMessageObjs.length > 0 &&
    selectedMessageObjs.every((m) => m.senderId === uid && !m.deletedForEveryone);
  const canEdit =
    !!singleSelected &&
    singleSelected.senderId === uid &&
    !singleSelected.deletedForEveryone;

  // Dropdown position — just below the header
  const menuTop = insets.top + 56;

  function cancelSelection() {
    setSelectedMessages([]);
    setIsSelectionMode(false);
    setMenuVisible(false);
  }

  function handleMessageLongPress(messageId: string, _msg: ChatMessage) {
    setIsSelectionMode(true);
    setSelectedMessages([messageId]);
  }

  function handleMessagePress(messageId: string, _msg: ChatMessage) {
    if (!isSelectionMode) return;
    setSelectedMessages((prev) => {
      const updated = prev.includes(messageId)
        ? prev.filter((mid) => mid !== messageId)
        : [...prev, messageId];
      if (updated.length === 0) setIsSelectionMode(false);
      return updated;
    });
  }

  async function handleSend() {
    const text = inputText.trim();
    if (!text) return;

    if (editingMessage) {
      const msg = editingMessage;
      setInputText("");
      setEditingMessage(null);
      await editMessage(msg.id, text);
    } else {
      setInputText("");
      await sendMessage(text);
    }
  }

  function cancelEdit() {
    setEditingMessage(null);
    setInputText("");
  }

  // ─── Menu actions ────────────────────────────────────────────────────────────

  async function handleCopy() {
    const text = selectedMessageObjs
      .filter((m) => !m.deletedForEveryone)
      .map((m) => m.text)
      .join("\n");
    await Clipboard.setStringAsync(text);
    cancelSelection();
  }

  function handleEdit() {
    if (!canEdit || !singleSelected) return;
    setEditingMessage(singleSelected);
    setInputText(singleSelected.text);
    setMenuVisible(false);
    setSelectedMessages([]);
    setIsSelectionMode(false);
    setTimeout(() => inputRef.current?.focus(), 50);
  }

  function handleForward() {
    Toast.show({ type: "info", text1: "Forward coming soon", visibilityTime: 1500 });
    cancelSelection();
  }

  async function handleDelete(forEveryone: boolean) {
    setDeleteModalVisible(false);
    for (const msgId of selectedMessages) {
      await deleteMessage(msgId, forEveryone);
    }
    cancelSelection();
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
                // In edit mode back cancels the edit; otherwise navigate away
                <TouchableOpacity
                  onPress={editingMessage ? cancelEdit : () => router.back()}
                >
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
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 4,
                  paddingRight: 12,
                }}
              >
                <TouchableOpacity
                  onPress={() => setDeleteModalVisible(true)}
                  style={{ padding: 6 }}
                >
                  <AppIcon
                    family="ion"
                    name="trash-outline"
                    size={22}
                    color={theme.error}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setMenuVisible(true)}
                  style={{ padding: 6 }}
                >
                  <AppIcon
                    family="ion"
                    name="ellipsis-vertical"
                    size={22}
                    color={theme.text}
                  />
                </TouchableOpacity>
              </View>
            ) : null,
        }}
      />

      <ThemedView
        className="flex-1"
        style={{ backgroundColor: theme.background }}
      >
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 90}
        >
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
                    {showDateSeparator ? (
                      <DateSeparator
                        date={formatMessageDate(item.createdAt)}
                      />
                    ) : null}
                    <MessageBubble
                      message={item}
                      isOwn={item.senderId === uid}
                      isSelected={selectedMessages.includes(item.id)}
                      isSelectionMode={isSelectionMode}
                      onLongPress={() => handleMessageLongPress(item.id, item)}
                      onPress={() => handleMessagePress(item.id, item)}
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
                ref={inputRef}
                value={inputText}
                onChangeText={setInputText}
                placeholder={
                  editingMessage ? "Edit message..." : "Type a message..."
                }
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
              <AppIcon
                family="ion"
                name={editingMessage ? "checkmark" : "send"}
                size={18}
                color="#FFFFFF"
              />
            </TouchableOpacity>
          </ThemedView>
        </KeyboardAvoidingView>
      </ThemedView>

      {/* Centered WhatsApp-style delete dialog */}
      <Modal
        visible={deleteModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setDeleteModalVisible(false)}
      >
        <Pressable
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.45)",
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 40,
          }}
          onPress={() => setDeleteModalVisible(false)}
        >
          {/* Stop tap-through so tapping the card doesn't dismiss */}
          <Pressable
            style={{
              width: "100%",
              backgroundColor: theme.backgroundElement,
              borderRadius: 16,
              overflow: "hidden",
              borderWidth: 1,
              borderColor: theme.border,
            }}
          >
            {/* Title */}
            <View
              style={{
                paddingVertical: 16,
                paddingHorizontal: 20,
                borderBottomWidth: 1,
                borderBottomColor: theme.border,
              }}
            >
              <ThemedText
                type="subtitle"
                style={{ textAlign: "center", fontSize: 16 }}
              >
                {selectedMessages.length > 1
                  ? `Delete ${selectedMessages.length} messages?`
                  : "Delete message?"}
              </ThemedText>
            </View>

            {/* Delete for everyone — only when all selected are own messages */}
            {allSelectedOwn ? (
              <TouchableOpacity
                onPress={() => handleDelete(true)}
                style={{
                  paddingVertical: 17,
                  paddingHorizontal: 20,
                  borderBottomWidth: 1,
                  borderBottomColor: theme.border,
                }}
              >
                <ThemedText
                  type="default"
                  style={{ color: theme.error, textAlign: "center" }}
                >
                  Delete for everyone
                </ThemedText>
              </TouchableOpacity>
            ) : null}

            {/* Delete for me — always available */}
            <TouchableOpacity
              onPress={() => handleDelete(false)}
              style={{
                paddingVertical: 17,
                paddingHorizontal: 20,
                borderBottomWidth: 1,
                borderBottomColor: theme.border,
              }}
            >
              <ThemedText
                type="default"
                style={{ color: theme.error, textAlign: "center" }}
              >
                Delete for me
              </ThemedText>
            </TouchableOpacity>

            {/* Cancel */}
            <TouchableOpacity
              onPress={() => setDeleteModalVisible(false)}
              style={{ paddingVertical: 17, paddingHorizontal: 20 }}
            >
              <ThemedText
                type="default"
                style={{
                  textAlign: "center",
                  fontWeight: "600",
                  color: theme.textSecondary,
                }}
              >
                Cancel
              </ThemedText>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>

      {/* Three-dots context menu — slides in from top-right */}
      <Modal
        visible={menuVisible}
        transparent
        animationType="fade"
        statusBarTranslucent
        onRequestClose={() => setMenuVisible(false)}
      >
        <Pressable
          style={{ flex: 1 }}
          onPress={() => setMenuVisible(false)}
        >
          <View
            style={{
              position: "absolute",
              top: menuTop,
              right: 8,
              backgroundColor: theme.backgroundElement,
              borderRadius: 14,
              paddingVertical: 4,
              minWidth: 210,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: 0.18,
              shadowRadius: 16,
              elevation: 12,
              borderWidth: 1,
              borderColor: theme.border,
            }}
          >
            {/* Copy */}
            <TouchableOpacity
              onPress={handleCopy}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 14,
                paddingHorizontal: 18,
                paddingVertical: 14,
              }}
            >
              <AppIcon
                family="ion"
                name="copy-outline"
                size={20}
                color={theme.text}
              />
              <ThemedText type="default">Copy</ThemedText>
            </TouchableOpacity>

            {/* Edit — own single non-deleted message only */}
            {canEdit ? (
              <TouchableOpacity
                onPress={handleEdit}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 14,
                  paddingHorizontal: 18,
                  paddingVertical: 14,
                }}
              >
                <AppIcon
                  family="ion"
                  name="pencil-outline"
                  size={20}
                  color={theme.text}
                />
                <ThemedText type="default">Edit</ThemedText>
              </TouchableOpacity>
            ) : null}

            {/* Forward */}
            <TouchableOpacity
              onPress={handleForward}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 14,
                paddingHorizontal: 18,
                paddingVertical: 14,
              }}
            >
              <AppIcon
                family="ion"
                name="arrow-redo-outline"
                size={20}
                color={theme.text}
              />
              <ThemedText type="default">Forward</ThemedText>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </>
  );
}
