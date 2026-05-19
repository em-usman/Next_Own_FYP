import React from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

import MenuList from "@/components/account/menuList";
import ProfileBoxes from "@/components/account/profileBoxes";
import UserHeader from "@/components/account/userHeader";
import { useTheme } from "@/hooks/use-theme";

export default function Account() {
  const theme = useTheme();

  return (
    <ThemedView className="flex-1">
      <SafeAreaView className="flex-1">
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120 }}
        >
          {/* Header */}
          <View style={{ paddingHorizontal: 16, paddingTop: 8, paddingBottom: 4 }}>
            <ThemedText type="subtitle">My Account</ThemedText>
          </View>

          {/* User card */}
          <UserHeader />

          {/* Quick actions */}
          <ProfileBoxes />

          {/* Divider */}
          <View
            style={{
              height: 1,
              backgroundColor: theme.divider,
              marginHorizontal: 16,
              marginVertical: 20,
            }}
          />

          {/* Menu */}
          <MenuList />
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}
