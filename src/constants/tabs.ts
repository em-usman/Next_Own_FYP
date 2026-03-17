export const APP_TABS = [
  {
    name: "index",
    href: "/",
    label: "Home",
    icon: { default: "home-outline", selected: "home" },
  },
  {
    name: "chats",
    href: "/chats",
    label: "Chats",
    icon: { default: "chatbubble-outline", selected: "chatbubble" },
  },
  {
    name: "sell",
    href: "/sell",
    label: "Sell",
    icon: { default: "add", selected: "add" },
  },
  {
    name: "my-ads",
    href: "/my-ads",
    label: "My Ads",
    icon: { default: "albums-outline", selected: "albums" },
  },
  {
    name: "account",
    href: "/account",
    label: "Account",
    icon: { default: "person-outline", selected: "person" },
  },
] as const;
