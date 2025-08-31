// Firebase configuration data for different countries
export const firebaseConfigs = {
  INDIA: {
    ios: {
      apiKey: "AIzaSyDhSHCX9F0GceBFdsclshMWi4I9Qu6EGBA",
      projectId: "fir-india-e26e3",
      storageBucket: "fir-india-e26e3.firebasestorage.app",
      messagingSenderId: "541877482123",
      appId: "1:541877482123:ios:83d2d9a264df5b0fc35a8e",
      databaseURL: "https://fir-india-e26e3-default-rtdb.firebaseio.com"
    },
    android: {
      apiKey: "AIzaSyBgaGWfgkGXanYzVewOgpf-MXdcrd1Itck",
      projectId: "fir-india-e26e3",
      storageBucket: "fir-india-e26e3.firebasestorage.app",
      messagingSenderId: "541877482123",
      appId: "1:541877482123:android:235b8cd0c423c432c35a8e",
      databaseURL: "https://fir-india-e26e3-default-rtdb.firebaseio.com"
    }
  },
  US: {
    ios: {
      apiKey: "YOUR_US_IOS_API_KEY",
      projectId: "your-us-project-id",
      storageBucket: "your-us-project-id.appspot.com",
      messagingSenderId: "your-us-sender-id",
      appId: "your-us-ios-app-id",
      databaseURL: "https://your-us-project-id-default-rtdb.firebaseio.com"
    },
    android: {
      apiKey: "YOUR_US_ANDROID_API_KEY",
      projectId: "your-us-project-id",
      storageBucket: "your-us-project-id.appspot.com",
      messagingSenderId: "your-us-sender-id",
      appId: "your-us-android-app-id",
      databaseURL: "https://your-us-project-id-default-rtdb.firebaseio.com"
    }
  },
  UK: {
    ios: {
      apiKey: "YOUR_UK_IOS_API_KEY",
      projectId: "your-uk-project-id",
      storageBucket: "your-uk-project-id.appspot.com",
      messagingSenderId: "your-uk-sender-id",
      appId: "your-uk-ios-app-id",
      databaseURL: "https://your-uk-project-id-default-rtdb.firebaseio.com"
    },
    android: {
      apiKey: "YOUR_UK_ANDROID_API_KEY",
      projectId: "your-uk-project-id",
      storageBucket: "your-uk-project-id.appspot.com",
      messagingSenderId: "your-uk-sender-id",
      appId: "your-uk-android-app-id",
      databaseURL: "https://your-uk-project-id-default-rtdb.firebaseio.com"
    }
  }
} as const;
