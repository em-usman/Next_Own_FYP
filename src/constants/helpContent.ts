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
      "Clear app cache: Settings > Apps > App Name > Storage > Clear Cache.",
      "If still blocked, use Feedback to share details so support can verify your account.",
    ],
  },
  {
    id: "browsing-categories",
    title: "Browse Categories And Search Listings",
    problem: "Cannot find specific items or unsure how to browse categories.",
    description:
      "The home screen shows featured listings and category sections for quick browsing. Use search or category filters to find what you need.",
    steps: [
      "Open the Home tab to see featured listings and categories.",
      "Tap any category card (Mobile, Furniture, Books, etc.) to view all items in that category.",
      "Use the search bar to find specific items by name or keyword.",
      "Apply filters to narrow results by price, location, condition, or date.",
      "Tap any listing to see full details, images, seller info, and contact options.",
      "Use the heart icon to save listings to your favorites for later.",
    ],
  },
  {
    id: "post-ad",
    title: "How To Post An Ad",
    problem: "Unsure how to create and post a new listing.",
    description:
      "Posting is simple: select category, fill details, add images, and submit. Ensure all required fields are complete.",
    steps: [
      "Open the Sell tab and tap 'Create New Listing'.",
      "Select the appropriate category (Mobile, Furniture, Books, etc.).",
      "Choose the subcategory to narrow down your item type.",
      "Fill required fields: Title, Price, Location, Contact Details.",
      "Add at least 1-3 clear photos of the item. Wait for upload to complete.",
      "Add optional details like condition, brand, model, or description.",
      "Review all information and tap 'Post Ad'.",
      "If posting fails, check internet connection and try again.",
      "If issue persists, use Feedback to report and we'll assist.",
    ],
  },
  {
    id: "edit-ad",
    title: "Edit, Update Or Delete Your Ad",
    problem: "Need to modify or remove a listing you posted.",
    description:
      "You can edit, deactivate, mark as sold, or delete your ads anytime from the My Ads section.",
    steps: [
      "Open the My Ads tab to view all your active listings.",
      "Tap on the ad you want to modify.",
      "Use the pencil icon to edit title, price, description, or images.",
      "After editing, tap 'Save Changes' to update.",
      "Use status options: Active (show listing), Deactivate (hide temporarily), or Sold (mark as unavailable).",
      "Use the trash icon only when you want to permanently delete the listing.",
      "Tap 'View Public' to see how your ad appears to buyers.",
    ],
  },
  {
    id: "manage-my-ads",
    title: "My Ads Status And Visibility",
    problem: "Want to control when your listings are visible to buyers.",
    description:
      "Use My Ads detail actions to manage listing visibility and lifecycle. Control when buyers can see and contact you.",
    steps: [
      "Open My Ads tab and select your ad.",
      "Status 'Active': Listing is visible to all buyers. They can contact you.",
      "Status 'Deactivate': Listing is hidden but not deleted. Reactivate anytime.",
      "Status 'Sold': Marks item as unavailable. Buyers see it but cannot purchase.",
      "Use trash icon only for permanent deletion.",
      "Open 'View Public' to preview exactly how buyers see your ad.",
      "Monitor 'Views' and 'Saves' counters to track interest.",
    ],
  },
  {
    id: "cart-help",
    title: "Cart Not Updating Or Items Missing",
    problem:
      "Added items do not appear in cart or remove action seems delayed.",
    description:
      "Cart is synced in real-time from your account. Network delay can slow updates. Items may be unavailable if seller deactivated or marked as sold.",
    steps: [
      "Add from listing detail using the cart action button.",
      "Open Cart from home or profile and wait 1-2 seconds for sync.",
      "If item doesn't appear, check your internet connection.",
      "If item is unavailable, seller may have deactivated or sold it.",
      "Use the remove icon next to item to delete single item.",
      "Use the top trash icon to clear your entire cart at once.",
      "Cart is stored per account—logout and login to see only your items.",
    ],
  },
  {
    id: "favourites-help",
    title: "Save And Manage Favorites",
    problem: "Heart was tapped but item is not visible in favorites.",
    description:
      "Favorites are tied to your current logged-in account and update in real-time. Tap heart to save/unsave items.",
    steps: [
      "Tap the heart icon on any listing card or listing detail to save.",
      "Open Profile > Favorites to view your saved items list.",
      "Make sure you're logged into the same account you used to save.",
      "Tap the filled heart again to remove item from favorites.",
      "Use search bar in Favorites to find specific saved items.",
      "If favorites list appears empty unexpectedly, restart app and refresh.",
      "Favorites are private and not visible to other users.",
    ],
  },
  {
    id: "chat-help",
    title: "How To Use Chat With Sellers/Buyers",
    problem: "Having issues sending or receiving messages.",
    description:
      "Chat lets you communicate directly with buyers or sellers about listings. Messages are synced in real-time.",
    steps: [
      "Tap 'Message' or 'Ask Seller' button on any listing to start chat.",
      "Or go to Chats tab to see all your conversations.",
      "Type message in the text box and tap send (arrow icon).",
      "Messages appear instantly in conversation. Red badge shows unread count.",
      "Long-press any message to view options: copy, edit, or delete.",
      "Delete 'For Me' removes only from your view. Delete 'For Everyone' removes for both.",
      "Enable notifications in settings to get alerts for new messages.",
    ],
  },
  {
    id: "profile-avatar",
    title: "Profile And Avatar Update Issues",
    problem: "Avatar upload or profile edits are not reflecting immediately.",
    description:
      "Profile updates can take a moment depending on image upload speed and connectivity. Upload completes when spinner stops.",
    steps: [
      "Open My Profile and tap camera icon on avatar to upload.",
      "Select photo from gallery and wait until upload spinner stops.",
      "Tap avatar image to preview full-screen and verify upload.",
      "Edit profile fields: Name, Email, Phone, Address, Date of Birth.",
      "Tap 'Save' to update all changes.",
      "If data seems old, close and reopen profile screen.",
      "Check internet connection if upload keeps failing.",
      "Use 'Help' if image won't upload after multiple attempts.",
    ],
  },
  {
    id: "search-filters",
    title: "Using Search Filters And Sorting",
    problem: "Cannot find items or filters not working properly.",
    description:
      "Search and filters help narrow down results quickly. Use price range, location, condition, and date filters.",
    steps: [
      "Open Search tab or use search bar to enter keywords.",
      "Results appear as you type. Tap any result to view details.",
      "Use 'Filter' button to open advanced filters panel.",
      "Filter by Price Range: Set minimum and maximum price.",
      "Filter by Location: Select your city or nearby areas.",
      "Filter by Condition: New, Like New, Good, Fair, Needs Repair.",
      "Filter by Date: Recently Posted, Last 7 Days, Last 30 Days.",
      "Apply multiple filters together for more specific results.",
      "Clear all filters to reset and start over.",
    ],
  },
  {
    id: "payment-help",
    title: "Payment And Transaction Issues",
    problem: "Payment failed, transaction pending, or payment not processed.",
    description:
      "Payments are processed securely through our payment partner. Check connection and ensure details are correct.",
    steps: [
      "Ensure a secure internet connection (WiFi or strong mobile data).",
      "Verify your payment method details are entered correctly.",
      "Try using a different payment method if available.",
      "Check your bank account for duplicate charges or pending transactions.",
      "Wait 24 hours for pending transactions to complete.",
      "Contact your bank if amount was deducted but not confirmed in app.",
      "For unresolved payment issues, submit detailed info through Feedback.",
    ],
  },
  {
    id: "report-issue",
    title: "Report A Bug Or App Issue",
    problem: "You found a bug, crash, or unexpected app behavior.",
    description:
      "The fastest support path is submitting complete details through Feedback with clear steps to reproduce.",
    steps: [
      "Open Feedback from Account menu.",
      "Select 'Bug' or 'Complaint' category.",
      "Describe the issue clearly in 2-3 sentences.",
      "Provide exact steps to reproduce the bug.",
      "Mention your device type (iPhone/Android), OS version.",
      "Include screenshot if possible.",
      "Submit and keep app version updated.",
      "Support team will respond with solution or next steps.",
    ],
  },
  {
    id: "account-issues",
    title: "Account, Password And Security",
    problem: "Forgot password, account locked, or security concerns.",
    description:
      "Protect your account with strong password. If locked, use forgot password to regain access.",
    steps: [
      "Go to login screen and tap 'Forgot Password' link.",
      "Enter your email address.",
      "Check email for password reset link (check spam folder too).",
      "Click link and set a new strong password.",
      "Use combination of uppercase, lowercase, numbers, and symbols.",
      "Never share your password with anyone.",
      "If password reset fails, submit issue through Feedback.",
      "Enable two-factor authentication in settings for extra security.",
    ],
  },
  {
    id: "contact-seller",
    title: "How To Contact Seller For Inquiries",
    problem: "Want to ask seller questions before buying.",
    description:
      "Use chat feature to ask questions directly. Seller response time varies, usually replies within hours.",
    steps: [
      "Open any listing and tap 'Message Seller' or 'Ask' button.",
      "Type your question clearly (e.g., 'Is this still available?').",
      "Tap send and wait for seller response.",
      "Check Chats tab to see seller's reply.",
      "Use emojis and be polite—sellers respond better to friendly messages.",
      "Share photos or details if asking specific questions.",
      "If seller doesn't respond in 24 hours, post in public comments.",
      "If seller is unresponsive, report listing through Feedback.",
    ],
  },
];
