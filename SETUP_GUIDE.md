# Next Own - Project Setup & Installation Guide

A React Native/Expo marketplace mobile app for buying and selling items locally with authentication, real-time chat, and push notifications.

---

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Database Configuration](#database-configuration)
- [API Keys & External Services](#api-keys--external-services)
- [Running the Project](#running-the-project)
- [Project Structure](#project-structure)
- [Development](#development)
- [Troubleshooting](#troubleshooting)

---

## 📱 Project Overview

**Next Own** is a full-stack marketplace application built with:

- **Frontend**: React Native with Expo Router
- **Backend/Database**: Firebase (Firestore, Authentication, Storage, Cloud Messaging)
- **Styling**: Nativewind (Tailwind CSS for React Native)
- **Image Hosting**: Cloudinary
- **Email Service**: EmailJS
- **Real-time Features**: Firebase Realtime Database & Cloud Messaging

### Key Features:

- User authentication (Email/Google Sign-In)
- Listing creation and management
- Real-time chat system
- Push notifications
- Image upload and management
- User profiles and favorites
- Search and category filters

---

## 📦 Prerequisites

Before starting, ensure you have:

1. **Node.js** (v16 or higher) - [Download](https://nodejs.org/)

   ```bash
   node --version  # Verify installation
   npm --version
   ```

2. **Expo CLI** (v55.x)

   ```bash
   npm install -g expo-cli
   expo --version
   ```

3. **Git** - [Download](https://git-scm.com/)

4. **Mobile Device or Emulator** (for testing)
   - Android Studio with Android Emulator
   - Xcode with iOS Simulator (macOS only)
   - Or use Expo Go app on physical device

---

## 🚀 Installation

### Step 1: Clone the Repository

```bash
cd D:/FYP
git clone <repository-url>
cd Next_Own_FYP
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all dependencies listed in `package.json`, including:

- Expo framework and tools
- React Navigation
- Firebase SDK
- Nativewind & Tailwind CSS
- Google Sign-In
- Cloudinary
- EmailJS
- And more...

### Step 3: Install Native Dependencies (Optional)

For development builds, you may need to set up native development tools:

**For Android:**

```bash
npm install expo-dev-client  # Already in package.json
# Requires Android Studio installed
```

**For iOS (macOS only):**

```bash
npm install expo-dev-client
# Requires Xcode Command Line Tools
xcode-select --install
```

---

## 🔐 Environment Setup

### Create `.env.local` File

A template `.env.local` file is provided. Follow these steps:

1. **Copy or create `.env.local`** in the project root:

   ```bash
   cp .env.local .env.local  # If template exists
   # OR create manually with the template below
   ```

2. **Add your API keys** (see [API Keys & External Services](#api-keys--external-services) section for how to obtain each)

3. **Example `.env.local`:**

   ```env
   # Firebase Configuration API Keys
   EXPO_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   EXPO_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
   EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
   EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id

   # Google Web Client ID
   EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=your_google_client_id

   # Cloudinary
   EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
   EXPO_PUBLIC_CLOUDINARY_AVATAR_UPLOAD_PRESET=your_avatar_preset
   EXPO_PUBLIC_CLOUDINARY_ADDS_IMAGE_UPLOAD_PRESET=your_adds_preset

   # Firebase Cloud Messaging
   EXPO_PUBLIC_FCM_SERVER_KEY=your_fcm_server_key

   # EmailJS
   EXPO_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
   EXPO_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
   EXPO_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
   EXPO_PUBLIC_EMAILJS_RECEIVER_EMAIL=your_email@example.com
   ```

### Important Notes:

⚠️ **Never commit `.env.local` to version control!**

- `.env.local` is already in `.gitignore`
- Only `.env` template should be version-controlled (with dummy values)

✅ **Expo Environment Variables Convention:**

- All public environment variables must start with `EXPO_PUBLIC_`
- Private variables are not accessible in the app

---

## 🔧 Database Configuration

### Firebase Setup

This project uses **Firebase** for the backend. Follow these steps:

#### 1. **Create a Firebase Project**

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add Project"
3. Enter project name: `next-own` (or your preferred name)
4. Enable Google Analytics (optional)
5. Create the project

#### 2. **Set Up Firebase Services**

**Authentication:**

- Navigate to "Build" → "Authentication"
- Click "Get Started"
- Enable the following sign-in providers:
  - ✅ Email/Password
  - ✅ Google

**Firestore Database:**

- Navigate to "Build" → "Firestore Database"
- Click "Create Database"
- Start in **Production Mode** (configure security rules below)
- Choose location (closest to your users)

**Storage:**

- Navigate to "Build" → "Storage"
- Click "Get Started"
- Use default settings

**Cloud Messaging:**

- Navigate to "Engage" → "Cloud Messaging"
- Download the service account key (JSON file)

#### 3. **Configure Firestore Security Rules**

Replace default rules with:

```firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Public collections
    match /listings/{document=**} {
      allow read: if true;
      allow create: if request.auth.uid != null;
      allow update, delete: if request.auth.uid == resource.data.userId;
    }

    match /users/{userId} {
      allow read: if true;
      allow write: if request.auth.uid == userId;
    }

    match /chats/{document=**} {
      allow read, write: if request.auth.uid in resource.data.participants;
    }

    match /messages/{document=**} {
      allow read: if true;
      allow create: if request.auth.uid != null;
      allow delete: if request.auth.uid == resource.data.senderId;
    }

    // Default deny all other access
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

#### 4. **Get Firebase Configuration**

1. Go to Project Settings (⚙️ icon)
2. Under "Your apps", click the Web app icon
3. Copy the Firebase config object
4. Extract values for your `.env.local`:
   - `apiKey` → `EXPO_PUBLIC_FIREBASE_API_KEY`
   - `authDomain` → `EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `projectId` → `EXPO_PUBLIC_FIREBASE_PROJECT_ID`
   - `storageBucket` → `EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET`
   - `messagingSenderId` → `EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   - `appId` → `EXPO_PUBLIC_FIREBASE_APP_ID`
   - `measurementId` → `EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID`

---

## 🔑 API Keys & External Services

### 1. **Google Cloud - Google Sign-In**

#### Setup Steps:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable "Google+ API":
   - Search for "Google+ API"
   - Click Enable
4. Create OAuth 2.0 credentials:
   - Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
   - Select "Web application"
   - Add authorized domains
   - Copy the **Client ID**
5. Add to `.env.local`:
   ```env
   EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=your_client_id.apps.googleusercontent.com
   ```

---

### 2. **Cloudinary - Image Upload Service**

Cloudinary handles user avatar uploads and listing images.

#### Setup Steps:

1. Go to [Cloudinary](https://cloudinary.com/) and sign up
2. Navigate to Dashboard
3. Note your **Cloud Name** (from dashboard URL or settings)
4. Create Upload Presets:
   - Go to "Settings" → "Upload"
   - Click "Add upload preset"
   - **Preset 1: Avatar Upload**
     - Name: `next_Own_avatars`
     - Folder: `avatars`
     - Unsigned: ✅ (Allow unsigned uploads)
   - **Preset 2: Listing Images**
     - Name: `next_Own_adds_images`
     - Folder: `listings`
     - Unsigned: ✅

5. Add to `.env.local`:
   ```env
   EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
   EXPO_PUBLIC_CLOUDINARY_AVATAR_UPLOAD_PRESET=next_Own_avatars
   EXPO_PUBLIC_CLOUDINARY_ADDS_IMAGE_UPLOAD_PRESET=next_Own_adds_images
   ```

---

### 3. **Firebase Cloud Messaging (FCM) - Push Notifications**

FCM sends push notifications to users.

#### Setup Steps:

1. Go to Firebase Console → Project Settings
2. Go to "Service Accounts" tab
3. Click "Generate new private key"
4. This downloads a JSON file containing your `private_key`
5. Copy the entire `private_key` value (it's a long string starting with `-----BEGIN PRIVATE KEY-----`)
6. Add to `.env.local`:
   ```env
   EXPO_PUBLIC_FCM_SERVER_KEY=your_private_key_from_json
   ```

#### For Expo Push Notifications:

1. In project root, run:

   ```bash
   expo login  # Use your Expo account
   expo publish  # Publishes to Expo servers
   ```

2. Your app will receive a push notification token automatically

---

### 4. **EmailJS - Email Service**

EmailJS sends emails for account deactivation and notifications.

#### Setup Steps:

1. Go to [EmailJS](https://www.emailjs.com/) and sign up
2. Go to Dashboard
3. **Get Service ID:**
   - Navigate to "Email Services"
   - Copy your Service ID (e.g., `service_xxxxx`)

4. **Create Email Template:**
   - Go to "Email Templates"
   - Create a new template (e.g., "Account Deactivation")
   - Note the **Template ID**

5. **Get Public Key:**
   - Go to "Account" → "API Keys"
   - Copy your **Public Key**

6. Add to `.env.local`:
   ```env
   EXPO_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxx
   EXPO_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxxxx
   EXPO_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
   EXPO_PUBLIC_EMAILJS_RECEIVER_EMAIL=your-email@example.com
   ```

---

## � Firebase Hosting - Deploy Listing Website

The `firebase-hosting/` directory contains the listing website that can be deployed to Firebase Hosting.

### Prerequisites for Firebase Hosting:

1. **Install Firebase CLI:**

   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase:**
   ```bash
   firebase login
   ```
   This will open a browser to authenticate with your Firebase account.

### Deployment Steps:

#### Step 1: Build the Web App (if needed)

```bash
npm run web
# Or for production build
expo export --platform web
```

#### Step 2: Initialize Firebase in Your Project

If not already initialized, run:

```bash
firebase init
```

Select:

- ✅ Hosting
- ✅ Use existing project: `next-own`
- Public directory: `firebase-hosting/`
- Single-page app: `Yes`
- Don't overwrite existing files: `No`

#### Step 3: Deploy to Firebase Hosting

**Deploy All Files:**

```bash
firebase deploy
```

**Deploy Only Hosting (Skip other services):**

```bash
firebase deploy --only hosting
```

**Deploy with Custom Message:**

```bash
firebase deploy --message "Deployed listing website v1.0"
```

#### Step 4: View Deployment

After deployment, Firebase will show your hosting URL:

```
Hosting URL: https://next-own.web.app
```

Or with Firebase project ID:

```
https://next-own.firebaseapp.com
```

### Firebase Hosting Structure

```
firebase-hosting/
├── listing/
│   ├── index.html        # Main listing page
│   └── ...listing assets
├── .well-known/
│   └── assetlinks.json   # Android app verification
└── public/               # Static files (optional)
```

### Firebase Hosting Configuration

The deployment is configured in `firebase.json`:

```json
{
  "hosting": {
    "public": "firebase-hosting",
    "ignore": ["firebase.json", "**/.*"],
    "rewrites": [
      {
        "source": "/listing/**",
        "destination": "/listing/index.html"
      }
    ]
  }
}
```

### Update Firebase Hosting Cache

The `.firebase/hosting.ZmlyZWJhc2UtaG9zdGluZw.cache` file tracks deployed files with fingerprints. It updates automatically on each deployment:

```
.well-known/assetlinks.json,1779193705357,1bf7e50ef943aeba0d37920460099d82db69876abad9bb2486973079a58ac679
listing/index.html,1779193705357,48606bdfcb34e893db373cf899100cdfa9656bd327a177929a7caf281f43632a
favicon.png,1779193705000,5dcef5d3e49c439f18eb1c6c1f3c8a3f2d1e4f5a6b7c8d9e0f1a2b3c4d5e6f7
```

Format: `filepath,timestamp,fingerprint`

### Useful Firebase Hosting Commands

```bash
# List all deployments
firebase hosting:list

# View current deployments
firebase hosting:channel:list

# Deploy to preview channel (doesn't affect live site)
firebase hosting:channel:deploy preview-v1

# Rollback to previous deployment
firebase hosting:rollback

# Delete all hosting content
firebase hosting:disable
```

### Custom Domain Setup

1. Go to Firebase Console → Hosting
2. Click "Connect domain"
3. Follow DNS setup instructions
4. Firebase will issue free SSL certificate automatically

---

## �🏃 Running the Project

### 1. **Start the Development Server**

```bash
npm start
# Or
expo start
```

This will show options:

```
› Press a    Open Android
› Press i    Open iOS
› Press w    Open web
› Press r    Reload app
› Press m    Toggle menu
› Press q    Quit
```

### 2. **Run on Android**

**Using Android Emulator:**

```bash
npm run android
# Or
expo start --android
```

**On Physical Device:**

- Install [Expo Go](https://expo.dev/go) app from Google Play
- Scan QR code from `npm start` output

### 3. **Run on iOS** (macOS only)

**Using iOS Simulator:**

```bash
npm run ios
# Or
expo start --ios
```

**On Physical Device:**

- Install [Expo Go](https://expo.dev/go) from App Store
- Scan QR code from `npm start` output

### 4. **Run on Web**

```bash
npm run web
# Or
expo start --web
```

Opens at `http://localhost:19006`

---

## 📁 Project Structure

```
Next_Own_FYP/
├── app/                           # Main app screens (Expo Router)
│   ├── _layout.tsx               # Root layout
│   ├── WelcomeScreen.tsx         # Welcome/splash screen
│   ├── (auth)/                   # Authentication routes
│   │   ├── _layout.tsx
│   │   ├── index.tsx             # Login
│   │   └── signup.tsx            # Signup
│   ├── (tabs)/                   # Tab navigation
│   │   ├── _layout.tsx
│   │   ├── index.tsx             # Home
│   │   ├── chats.tsx             # Chat list
│   │   ├── my-ads.tsx            # User's listings
│   │   ├── sell.tsx              # Create listing
│   │   └── account.tsx           # Profile
│   ├── listing/[id].tsx          # Listing detail
│   ├── chat/[id].tsx             # Chat room
│   ├── profile/                  # Profile screens
│   ├── search/                   # Search screens
│   └── ...other routes
├── src/
│   ├── components/               # Reusable components
│   │   ├── home/                 # Home page components
│   │   ├── account/              # Account components
│   │   ├── post/                 # Post creation components
│   │   ├── ui/                   # UI components
│   │   └── Icons/                # Icon components
│   ├── config/                   # Configuration files
│   │   ├── categoryConfig.ts     # Category definitions
│   │   ├── emailConfig.ts        # Email setup
│   │   └── postFields/           # Listing form fields
│   ├── constants/                # Constants & theme
│   │   ├── theme.ts              # Theme colors
│   │   ├── tabs.ts               # Tab definitions
│   │   └── helpContent.ts        # Help content
│   ├── data/                     # Static data
│   │   └── pakistanLocations.ts  # Location data
│   ├── hooks/                    # Custom React hooks
│   │   ├── useUserData.ts
│   │   ├── useMyAds.ts
│   │   ├── useChatMessages.ts
│   │   ├── useCloudnary.ts       # Cloudinary upload
│   │   └── ...other hooks
│   ├── types/                    # TypeScript types
│   │   └── listing.ts
│   ├── utils/                    # Utility functions
│   │   ├── pushNotifications.ts
│   │   └── safePayPayment.ts
│   └── global.css                # Global styles
├── assets/                        # Static assets
│   ├── images/                   # App images
│   ├── categories/               # Category icons
│   └── expo.icon/                # App icon
├── firebase-hosting/             # Firebase hosting config
├── firebaseConfig.ts             # Firebase initialization
├── .env.local                    # ⭐ Environment variables (CREATE THIS)
├── .gitignore                    # Git ignore rules
├── package.json                  # Dependencies
├── tsconfig.json                 # TypeScript config
├── tailwind.config.js            # Tailwind CSS config
├── app.json                      # Expo app config
└── README.md                     # Original README
```

---

## 🛠️ Development

### Linting

```bash
npm run lint
# Runs ESLint to check code quality
```

### Reset Project

If you need to reset to a fresh state:

```bash
npm run reset-project
# Moves starter code and creates blank slate
```

### Adding New Screens

1. Create new file in `app/` directory with `.tsx` extension
2. Use Expo Router for automatic routing
3. Example: `app/about.tsx` → route: `/about`

### Adding New Components

1. Create component in `src/components/` with `.tsx` extension
2. Import and use in screens

### Styling

- Uses **Nativewind** (Tailwind CSS for React Native)
- See [Nativewind Docs](https://www.nativewind.dev/)
- Example:
  ```tsx
  <View className="flex-1 items-center justify-center bg-white">
    <Text className="text-lg font-bold text-gray-800">Hello</Text>
  </View>
  ```

### Building for Production

**Android APK:**

```bash
eas build --platform android --profile production
```

**iOS Archive:**

```bash
eas build --platform ios --profile production
```

(Requires EAS account setup via `eas init`)

---

## 🐛 Troubleshooting

### Issue: "Firebase API Key is missing"

**Solution:** Ensure all environment variables in `.env.local` are filled. Restart the dev server:

```bash
npm start
# Press 'r' to reload
```

### Issue: "Module not found" errors

**Solution:**

```bash
rm -rf node_modules
npm install
npm start
```

### Issue: Android emulator crashes

**Solution:**

- Ensure Android SDK is properly installed
- Clear emulator data: `emulator -avd [device_name] -wipe-data`
- Restart Android Studio

### Issue: Push notifications not working

**Solution:**

1. Verify FCM server key is correct in `.env.local`
2. Ensure app has push notification permission
3. Check device has internet connection

### Issue: Image upload fails

**Solution:**

1. Verify Cloudinary presets are created correctly
2. Check internet connection
3. Ensure image size is within limits (typically <10MB)

### Issue: Google Sign-In not working

**Solution:**

1. Verify Google Client ID is correct
2. Check app package name matches Firebase config (for Android)
3. For iOS, verify app bundle ID matches Firebase config

### Issue: "Port 19000 already in use"

**Solution:**

```bash
# Kill process using port 19000
# On Windows:
netstat -ano | findstr :19000
taskkill /PID [PID] /F

# On macOS/Linux:
lsof -i :19000
kill -9 [PID]
```

---

## 📚 Useful Resources

- [Expo Documentation](https://docs.expo.dev/)
- [Firebase Documentation](https://firebase.google.com/docs)
- [React Native Docs](https://reactnative.dev/)
- [Nativewind](https://www.nativewind.dev/)
- [Expo Router](https://expo.dev/router)
- [Firebase Authentication](https://firebase.google.com/docs/auth)
- [Firestore Database](https://firebase.google.com/docs/firestore)

---

## 📞 Support

For issues or questions:

1. Check the Troubleshooting section above
2. Review Firebase console for errors
3. Check browser console/device logs
4. Visit relevant documentation links

---

## 📝 License

This project is part of a Final Year Project (FYP).

---

**Last Updated:** June 2026
