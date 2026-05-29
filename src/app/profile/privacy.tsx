import { AppIcon } from "@/components/Icons/AppIcon";
import { ScreenHeader } from "@/components/ScreenHeader";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useTheme } from "@/hooks/use-theme";
import { useState } from "react";
import { Alert, ScrollView, Switch, View } from "react-native";

export default function PrivacyScreen() {
  const theme = useTheme();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [dataSharing, setDataSharing] = useState(false);
  const [profilePrivate, setProfilePrivate] = useState(false);
  const [showOnlineStatus, setShowOnlineStatus] = useState(true);

  const handleToggle = (setting: string, value: boolean) => {
    switch (setting) {
      case "email":
        setEmailNotifications(value);
        Alert.alert(
          "Updated",
          "Email notifications " + (value ? "enabled" : "disabled"),
        );
        break;
      case "push":
        setPushNotifications(value);
        Alert.alert(
          "Updated",
          "Push notifications " + (value ? "enabled" : "disabled"),
        );
        break;
      case "sharing":
        setDataSharing(value);
        Alert.alert(
          "Updated",
          "Data sharing " + (value ? "enabled" : "disabled"),
        );
        break;
      case "profile":
        setProfilePrivate(value);
        Alert.alert(
          "Updated",
          "Profile privacy " + (value ? "private" : "public"),
        );
        break;
      case "online":
        setShowOnlineStatus(value);
        Alert.alert(
          "Updated",
          "Online status " + (value ? "visible" : "hidden"),
        );
        break;
    }
  };

  const SettingItem = ({
    title,
    description,
    value,
    onToggle,
  }: {
    title: string;
    description: string;
    value: boolean;
    onToggle: (val: boolean) => void;
  }) => (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 16,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: theme.divider,
      }}
    >
      <View style={{ flex: 1, marginRight: 12 }}>
        <ThemedText type="smallBold" style={{ fontSize: 15 }}>
          {title}
        </ThemedText>
        <ThemedText
          type="small"
          themeColor="textSecondary"
          style={{ fontSize: 13, marginTop: 4 }}
        >
          {description}
        </ThemedText>
      </View>
      <Switch value={value} onValueChange={onToggle} />
    </View>
  );

  return (
    <>
      <ScreenHeader title="Data & Privacy" />
      <ThemedView className="flex-1">
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 44 }}
        >
          {/* Notifications Section */}
          <View style={{ marginTop: 16 }}>
            <View style={{ paddingHorizontal: 16, marginBottom: 12 }}>
              <ThemedText
                type="smallBold"
                style={{
                  fontSize: 14,
                  color: theme.textSecondary,
                  textTransform: "uppercase",
                }}
              >
                Notifications
              </ThemedText>
            </View>

            <ThemedView
              type="backgroundElement"
              style={{
                borderRadius: 16,
                borderWidth: 1,
                borderColor: theme.border,
                marginHorizontal: 16,
                overflow: "hidden",
              }}
            >
              <SettingItem
                title="Email Notifications"
                description="Receive email alerts about messages and activity"
                value={emailNotifications}
                onToggle={(val) => handleToggle("email", val)}
              />
              <SettingItem
                title="Push Notifications"
                description="Get instant alerts on your device"
                value={pushNotifications}
                onToggle={(val) => handleToggle("push", val)}
              />
            </ThemedView>
          </View>

          {/* Privacy Section */}
          <View style={{ marginTop: 20 }}>
            <View style={{ paddingHorizontal: 16, marginBottom: 12 }}>
              <ThemedText
                type="smallBold"
                style={{
                  fontSize: 14,
                  color: theme.textSecondary,
                  textTransform: "uppercase",
                }}
              >
                Privacy Settings
              </ThemedText>
            </View>

            <ThemedView
              type="backgroundElement"
              style={{
                borderRadius: 16,
                borderWidth: 1,
                borderColor: theme.border,
                marginHorizontal: 16,
                overflow: "hidden",
              }}
            >
              <SettingItem
                title="Private Profile"
                description="Hide your profile from other users"
                value={profilePrivate}
                onToggle={(val) => handleToggle("profile", val)}
              />
              <SettingItem
                title="Online Status"
                description="Let others see when you are online"
                value={showOnlineStatus}
                onToggle={(val) => handleToggle("online", val)}
              />
            </ThemedView>
          </View>

          {/* Data & Analytics Section */}
          <View style={{ marginTop: 20 }}>
            <View style={{ paddingHorizontal: 16, marginBottom: 12 }}>
              <ThemedText
                type="smallBold"
                style={{
                  fontSize: 14,
                  color: theme.textSecondary,
                  textTransform: "uppercase",
                }}
              >
                Data & Analytics
              </ThemedText>
            </View>

            <ThemedView
              type="backgroundElement"
              style={{
                borderRadius: 16,
                borderWidth: 1,
                borderColor: theme.border,
                marginHorizontal: 16,
                overflow: "hidden",
              }}
            >
              <SettingItem
                title="Analytics & Performance"
                description="Help us improve by sharing usage data"
                value={dataSharing}
                onToggle={(val) => handleToggle("sharing", val)}
              />
            </ThemedView>
          </View>

          {/* Info Section */}
          <View
            style={{
              marginTop: 20,
              marginHorizontal: 16,
              marginBottom: 20,
              padding: 14,
              borderRadius: 12,
              backgroundColor: `${theme.primary}15`,
              borderWidth: 1,
              borderColor: `${theme.primary}30`,
            }}
          >
            <View style={{ flexDirection: "row", gap: 10 }}>
              <AppIcon
                family="ion"
                name="information-circle-outline"
                size={20}
                color={theme.primary}
              />
              <View style={{ flex: 1 }}>
                <ThemedText type="smallBold" style={{ fontSize: 13 }}>
                  Your Privacy Matters
                </ThemedText>
                <ThemedText
                  type="small"
                  themeColor="textSecondary"
                  style={{ fontSize: 12, marginTop: 4 }}
                >
                  We respect your privacy and protect your data. Review our
                  Privacy Policy for complete details on how we handle your
                  information.
                </ThemedText>
              </View>
            </View>
          </View>

          {/* Data Rights Section */}
          <View style={{ marginTop: 12 }}>
            <View style={{ paddingHorizontal: 16, marginBottom: 12 }}>
              <ThemedText
                type="smallBold"
                style={{
                  fontSize: 14,
                  color: theme.textSecondary,
                  textTransform: "uppercase",
                }}
              >
                Your Data Rights
              </ThemedText>
            </View>

            <ThemedView
              type="backgroundElement"
              style={{
                borderRadius: 16,
                borderWidth: 1,
                borderColor: theme.border,
                marginHorizontal: 16,
                overflow: "hidden",
                paddingVertical: 12,
                paddingHorizontal: 16,
              }}
            >
              <View style={{ gap: 12 }}>
                <View style={{ flexDirection: "row", gap: 10 }}>
                  <AppIcon
                    family="material-community"
                    name="download-outline"
                    size={18}
                    color={theme.primary}
                  />
                  <View style={{ flex: 1 }}>
                    <ThemedText type="smallBold" style={{ fontSize: 13 }}>
                      Download Your Data
                    </ThemedText>
                    <ThemedText
                      type="small"
                      themeColor="textSecondary"
                      style={{ fontSize: 12, marginTop: 2 }}
                    >
                      Get a copy of your personal data in a portable format
                    </ThemedText>
                  </View>
                </View>

                <View style={{ height: 1, backgroundColor: theme.divider }} />

                <View style={{ flexDirection: "row", gap: 10 }}>
                  <AppIcon
                    family="material-community"
                    name="delete-outline"
                    size={18}
                    color={theme.error}
                  />
                  <View style={{ flex: 1 }}>
                    <ThemedText
                      type="smallBold"
                      style={{ fontSize: 13, color: theme.error }}
                    >
                      Delete Your Account Data
                    </ThemedText>
                    <ThemedText
                      type="small"
                      themeColor="textSecondary"
                      style={{ fontSize: 12, marginTop: 2 }}
                    >
                      Permanently delete all your personal information
                    </ThemedText>
                  </View>
                </View>

                <View style={{ height: 1, backgroundColor: theme.divider }} />

                <View style={{ flexDirection: "row", gap: 10 }}>
                  <AppIcon
                    family="material-community"
                    name="shield-check-outline"
                    size={18}
                    color={theme.primary}
                  />
                  <View style={{ flex: 1 }}>
                    <ThemedText type="smallBold" style={{ fontSize: 13 }}>
                      Privacy Policy
                    </ThemedText>
                    <ThemedText
                      type="small"
                      themeColor="textSecondary"
                      style={{ fontSize: 12, marginTop: 2 }}
                    >
                      Learn how we collect and use your information
                    </ThemedText>
                  </View>
                </View>
              </View>
            </ThemedView>
          </View>

          {/* Contact Section */}
          <View
            style={{
              marginTop: 20,
              marginHorizontal: 16,
              marginBottom: 20,
              padding: 14,
              borderRadius: 12,
              backgroundColor: theme.backgroundElement,
              borderWidth: 1,
              borderColor: theme.border,
            }}
          >
            <ThemedText type="smallBold" style={{ fontSize: 13 }}>
              Questions About Privacy?
            </ThemedText>
            <ThemedText
              type="small"
              themeColor="textSecondary"
              style={{ fontSize: 12, marginTop: 6 }}
            >
              If you have concerns about how we handle your data, reach out
              through our Feedback section with "Privacy" in the subject.
            </ThemedText>
          </View>
        </ScrollView>
      </ThemedView>
    </>
  );
}
