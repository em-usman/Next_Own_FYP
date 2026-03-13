export const APP_TABS = [
  {
    name: "index",
    href: "/",
    label: "Home",
    icon: { default: "home-outline", selected: "home" },
  },
  {
    name: "explore",
    href: "/explore",
    label: "Explore",
    icon: { default: "search-outline", selected: "search" },
  },
  {
    name: "activity",
    href: "./activity",
    label: "Activity",
    icon: { default: "time-outline", selected: "time" },
  },
  {
    name: "profile",
    href: "./profile",
    label: "Profile",
    icon: { default: "person-outline", selected: "person" },
  },
] as const;
