import {
  Entypo,
  Feather,
  FontAwesome5,
  FontAwesome6,
  Fontisto,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import React from "react";
import { TextStyle } from "react-native";

type IconFamily =
  | "ion"
  | "feather"
  | "material"
  | "ionicons"
  | "fa"
  | "fa5"
  | "entypo"
  | "material-community"
  | "fontisto";

interface AppIconProps {
  name: string;
  size?: number;
  color?: string;
  family?: IconFamily;
  style?: TextStyle;
}

export function AppIcon({
  name,
  size = 24,
  color = "#141414",
  family = "ion",
}: AppIconProps) {
  switch (family) {
    case "ion":
      return <Ionicons name={name as any} size={size} color={color} />;
    case "feather":
      return <Feather name={name as any} size={size} color={color} />;
    case "material":
      return <MaterialIcons name={name as any} size={size} color={color} />;
    case "fa":
      return <FontAwesome6 name={name as any} size={size} color={color} />;
    case "fa5":
      return <FontAwesome5 name={name as any} size={size} color={color} />;
    case "entypo":
      return <Entypo name={name as any} size={size} color={color} />;
    case "material-community":
      return (
        <MaterialCommunityIcons name={name as any} size={size} color={color} />
      );
    case "fontisto":
      return <Fontisto name={name as any} size={size} color={color} />;
    default:
      return <Feather name={name as any} size={size} color={color} />;
  }
}
