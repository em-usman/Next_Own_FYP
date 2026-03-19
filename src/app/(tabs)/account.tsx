import React from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

import MenuList from "@/components/account/menuList";
import ProfileBoxes from "@/components/account/profileBoxes";
import UserHeader from "@/components/account/userHeader";

export default function Account() {
  return (
    <ThemedView className="flex-1">
      <SafeAreaView className="flex-1">
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120 }}
        >
          {/* Page Title */}
          <ThemedView className="px-4 pt-4 pb-2">
            <ThemedText type="subtitle" style={{ fontSize: 22 }}>
              My Account
            </ThemedText>
          </ThemedView>

          {/* 1. User Header — name + avatar */}
          <UserHeader />

          {/* 2. Quick Action Buttons — Help, Favourites, Cart */}
          <ProfileBoxes />

          {/* Divider */}
          <ThemedView
            className="mx-4 my-5"
            style={{ height: 1 }}
            type="backgroundSelected"
          />

          {/* 3. Menu Options */}
          <MenuList />
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}
