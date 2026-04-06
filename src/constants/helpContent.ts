export type HelpTopic = {
  id: string;
  title: string;
  problem: string;
  description: string;
  steps: string[];
};

export const HELP_TOPICS: HelpTopic[] = [
  {
    id: "login-issues",
    title: "Login Or Signup Problems",
    problem:
      "You cannot sign in, sign up, or keep getting sent back to auth screens.",
    description:
      "Most login issues come from invalid credentials, unstable internet, or expired sessions.",
    steps: [
      "Check internet connection and try again.",
      "Confirm email and password are correct.",
      "Close app and open again, then login once more.",
      "If Google sign-in fails, sign out of Google on device and retry.",
      "If still blocked, share details from Feedback screen so support can verify your account.",
    ],
  },
  {
    id: "post-ad",
    title: "Cannot Post An Ad",
    problem: "Your ad is not posting or fields keep failing.",
    description:
      "Posting requires all required fields, images, and an active internet connection.",
    steps: [
      "Select the correct category and subcategory first.",
      "Fill required fields such as title, price, location, and contact details.",
      "Add at least one valid image and wait for upload completion.",
      "Tap Post once and wait for success toast.",
      "If it fails, reopen Sell tab and submit again.",
    ],
  },
  {
    id: "manage-my-ads",
    title: "My Ads Status And Editing",
    problem: "You want to edit, deactivate, mark sold, or delete your ad.",
    description:
      "Use My Ads detail actions to control listing visibility and lifecycle.",
    steps: [
      "Open My Ads tab and select your ad.",
      "Use pencil icon to edit details and save.",
      "Use status actions to set Active, Deactivate, or Sold.",
      "Use trash icon only when you want permanent delete.",
      "Open public view to verify how buyers see your ad.",
    ],
  },
  {
    id: "cart-help",
    title: "Cart Not Updating",
    problem:
      "Added items do not appear in cart or remove action seems delayed.",
    description:
      "Cart is synced in real-time from your account. Network delay can slow updates.",
    steps: [
      "Add from listing detail using cart action.",
      "Open Cart from home or profile and wait a second for sync.",
      "If item status changed to sold/deactivated, it may be unavailable.",
      "Use remove icon to delete single item.",
      "Use top trash icon to clear full cart when needed.",
    ],
  },
  {
    id: "favourites-help",
    title: "Favourites Not Showing",
    problem: "Heart was tapped but item is not visible in favourites.",
    description:
      "Favourites are tied to current logged-in user and update in real-time.",
    steps: [
      "Tap heart on listing card or listing detail to save.",
      "Open Profile -> Favourites and check saved list.",
      "Make sure you are still logged into same account.",
      "Tap heart again to remove from favourites.",
      "If list is empty unexpectedly, restart app and refresh data.",
    ],
  },
  {
    id: "profile-avatar",
    title: "Profile And Avatar Help",
    problem: "Avatar upload or profile edits are not reflecting immediately.",
    description:
      "Profile updates can take a moment depending on image upload and connectivity.",
    steps: [
      "Open My Profile and tap camera icon on avatar to upload.",
      "Wait until upload spinner stops.",
      "Tap avatar image to preview full-screen.",
      "Edit profile fields and tap Save.",
      "If data seems old, reopen profile screen once.",
    ],
  },
  {
    id: "report-issue",
    title: "Report A Bug Or App Issue",
    problem: "You found a bug or unexpected app behavior.",
    description:
      "The fastest support path is submitting complete details through feedback.",
    steps: [
      "Open Feedback from Account menu.",
      "Select relevant category such as Bug or Complaint.",
      "Write clear steps to reproduce issue.",
      "Mention device type and where it happened in app.",
      "Submit feedback and keep app version updated.",
    ],
  },
];
