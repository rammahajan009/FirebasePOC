# Firebase POC - React Native Android App

A React Native proof-of-concept application demonstrating Firebase Analytics integration with manual initialization on Android.

## 🚀 Features

- **Firebase Analytics Integration** - Manual initialization without dependency on `google-services.json`
- **Real-time Analytics Status** - Visual indicator showing analytics collection state
- **Custom Event Logging** - Test button to log custom Firebase events
- **Event Counter** - Track total events sent to Firebase
- **Cross-platform Ready** - Built with React Native (Android support implemented, iOS ready for future)

## 📱 Screenshots

The app displays:
- Firebase Analytics status (ON/OFF indicator)
- Test button to trigger custom events
- Event counter showing total events sent
- Real-time feedback on Firebase operations

## 🛠️ Tech Stack

- **React Native** - Cross-platform mobile development
- **TypeScript** - Type-safe JavaScript
- **Firebase Analytics** - User behavior tracking and analytics
- **Android Native** - Manual Firebase initialization in Kotlin
- **Gradle** - Build system for Android

## 📋 Prerequisites

- Node.js (v16 or higher)
- React Native CLI
- Android Studio with Android SDK
- Java Development Kit (JDK)
- Firebase project with Analytics enabled

## 🔧 Installation

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd FirebasePOC
```

### 2. Install dependencies
```bash
npm install
# or
yarn install
```

### 3. Firebase Configuration

Since this project uses manual Firebase initialization, you need to:

1. **Create a Firebase project** at [Firebase Console](https://console.firebase.google.com/)
2. **Enable Analytics** in your Firebase project
3. **Update Firebase configuration** in `android/app/src/main/java/com/countryfirebasepoc/MainApplication.kt`:

```kotlin
val firebaseOptions = FirebaseOptions.Builder()
    .setProjectId("your-project-id")
    .setApplicationId("your-application-id")
    .setApiKey("your-api-key")
    .setDatabaseUrl("your-database-url")
    .setStorageBucket("your-storage-bucket")
    .build()
```

### 4. Run the app

#### Android
```bash
# Start Metro bundler
npx react-native start

# In another terminal, run the app
npx react-native run-android
```

## 🏗️ Project Structure

```
FirebasePOC/
├── android/                          # Android native code
│   ├── app/
│   │   └── src/main/java/
│   │       └── com/countryfirebasepoc/
│   │           └── MainApplication.kt  # Firebase initialization
│   └── build.gradle                   # Android build configuration
├── App.tsx                           # Main React Native component
├── package.json                      # Node.js dependencies
└── README.md                         # This file
```

## 🔥 Firebase Implementation

### Manual Initialization
This project demonstrates manual Firebase initialization in Android, avoiding dependency on `google-services.json`:

```kotlin
// In MainApplication.kt
val firebaseOptions = FirebaseOptions.Builder()
    .setProjectId("your-project-id")
    .setApplicationId("your-application-id")
    .setApiKey("your-api-key")
    .setDatabaseUrl("your-database-url")
    .setStorageBucket("your-storage-bucket")
    .build()

FirebaseApp.initializeApp(this, firebaseOptions)
```

### React Native Integration
Firebase Analytics is integrated in React Native using `@react-native-firebase/analytics`:

```typescript
import { getAnalytics, logEvent } from '@react-native-firebase/analytics';

const analytics = getAnalytics();
analytics.setAnalyticsCollectionEnabled(true);

// Log custom events
logEvent(analytics, 'test_button_click', {
  button_id: 'main_test_button',
  click_count: eventCount,
  timestamp: new Date().toISOString(),
});
```

## 📊 Analytics Events

The app logs the following events:

- **`app_open`** - Automatically logged when app starts
- **`test_button_click`** - Custom event with parameters:
  - `button_id`: Button identifier
  - `click_count`: Sequential click counter
  - `timestamp`: Event timestamp

## 🔍 Monitoring

1. **Firebase Console** - View analytics data at [Firebase Console](https://console.firebase.google.com/)
2. **Real-time Dashboard** - Monitor events as they occur
3. **Analytics Reports** - Generate insights from collected data

## 🚨 Troubleshooting

### Build Issues
- Ensure Android SDK and build tools are properly installed
- Check that all dependencies are resolved
- Verify Firebase configuration values are correct

### Analytics Not Showing
- Confirm Firebase project is properly configured
- Check that Analytics is enabled in Firebase Console
- Verify network connectivity
- Wait a few minutes for data to appear in console

### Common Errors
- **Kotlin version conflicts**: Ensure Kotlin version compatibility
- **Missing dependencies**: Run `./gradlew clean` and rebuild
- **Firebase initialization failed**: Verify configuration values

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React Native community for the excellent framework
- Firebase team for comprehensive mobile analytics
- Contributors and maintainers

## 📞 Support

If you encounter any issues or have questions:

1. Check the [troubleshooting section](#-troubleshooting)
2. Search existing [issues](../../issues)
3. Create a new issue with detailed information

---

**Note**: This is a proof-of-concept project. For production use, ensure proper security measures, error handling, and testing are implemented.
