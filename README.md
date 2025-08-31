# Firebase Service - Simple & Reusable

A simple, reusable Firebase service package for React Native projects. Works automatically on both iOS and Android with zero configuration needed.

## Features

- 🚀 **Zero Setup**: Firebase is pre-configured for both iOS and Android
- 📱 **Automatic Platform Detection**: Automatically uses the right configuration for each platform
- 🛡️ **Type Safe**: Full TypeScript support
- 🔄 **Singleton Pattern**: Efficient resource management
- 📊 **Analytics Ready**: Built-in analytics event logging

## Installation

1. Install the required dependencies:
```bash
npm install @react-native-firebase/app @react-native-firebase/analytics
```

2. Copy the `src` folder to your project
3. Import and use the service

## Quick Start

### Basic Usage

```typescript
import { firebaseService } from './src';

// Firebase automatically detects platform and works on both iOS and Android!
// Just initialize and use
await firebaseService.initialize();

// Log an event
await firebaseService.logEvent({
  name: 'app_opened',
  parameters: {
    timestamp: new Date().toISOString()
  }
});
```

## API Reference

### FirebaseService

#### Methods

- `initialize()`: Initialize Firebase with automatic platform detection
- `isInitialized()`: Check if Firebase is initialized
- `logEvent(event)`: Log analytics event
- `setUserProperty(key, value)`: Set user property
- `setUserId(userId)`: Set user ID

#### Events

```typescript
interface AnalyticsEvent {
  name: string;
  parameters?: Record<string, any>;
}

// Example
await firebaseService.logEvent({
  name: 'purchase_completed',
  parameters: {
    item_id: 'product123',
    price: 29.99
  }
});
```

### FirebaseConfigManager

#### Methods

- `getCurrentPlatformConfig()`: Get configuration for current platform
- `getPlatformConfig(platform)`: Get configuration for specific platform
- `getAllConfigs()`: Get all platform configurations

## React Native Component Example

```typescript
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { firebaseService } from './src';

const FirebaseExampleComponent = () => {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    initializeFirebase();
  }, []);

  const initializeFirebase = async () => {
    try {
      // Firebase automatically works on both iOS and Android
      await firebaseService.initialize();
      setIsInitialized(true);
      
      // Set user property
      await firebaseService.setUserProperty('component', 'FirebaseExampleComponent');
    } catch (error) {
      console.error('Failed to initialize Firebase:', error);
    }
  };

  const handleButtonPress = async () => {
    try {
      await firebaseService.logEvent({
        name: 'button_pressed',
        parameters: {
          button_id: 'example_button'
        }
      });
    } catch (error) {
      console.error('Failed to log event:', error);
    }
  };

  return (
    <View>
      <Text>Firebase Status: {isInitialized ? 'Ready' : 'Initializing...'}</Text>
      <TouchableOpacity onPress={handleButtonPress}>
        <Text>Send Event</Text>
      </TouchableOpacity>
    </View>
  );
};
```

## Configuration

### Automatic Platform Detection

The service automatically detects the current platform and uses the appropriate configuration:

- **iOS**: Automatically uses iOS-specific Firebase configuration
- **Android**: Automatically uses Android-specific Firebase configuration

No manual configuration needed - it just works!

### Built-in Configurations

The package comes with pre-configured Firebase settings for both platforms that work immediately.

## Error Handling

```typescript
try {
  await firebaseService.initialize();
  
  if (!firebaseService.isInitialized()) {
    console.error('Firebase service not initialized');
    return;
  }
  
  await firebaseService.logEvent({
    name: 'safe_event',
    parameters: { safe: true }
  });
} catch (error) {
  console.error('Firebase operation failed:', error);
}
```

## Migration from Existing Code

### Before (Old Way)
```typescript
import { firebase } from '@react-native-firebase/app';
import { getAnalytics, logEvent } from '@react-native-firebase/analytics';

const config = { /* your config */ };
firebase.initializeApp(config);
const analytics = getAnalytics();
logEvent(analytics, 'event_name', { param: 'value' });
```

### After (New Way)
```typescript
import { firebaseService } from './src';

// No config setup needed - works automatically on both platforms!
await firebaseService.initialize();
await firebaseService.logEvent({
  name: 'event_name',
  parameters: { param: 'value' }
});
```

## File Structure
```
src/
├── types/firebase.types.ts      # TypeScript interfaces
├── config/FirebaseConfig.ts     # Automatic platform detection
├── services/FirebaseService.ts  # Main service class
├── examples/usage-example.ts    # Usage examples
└── index.ts                     # Main exports
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.
