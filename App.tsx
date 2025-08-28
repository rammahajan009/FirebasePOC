/**
 * Simple Firebase POC App for Android
 */

import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import { firebase, getAnalytics, logEvent } from '@react-native-firebase/analytics';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [eventCount, setEventCount] = useState(0);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#000000' : '#FFFFFF',
  };

  const textStyle = {
    color: isDarkMode ? '#FFFFFF' : '#000000',
  };

  useEffect(() => {
    if (firebase.apps.length === 0) {
      initFirebase();
    }
    else {
      enableAnalytics();
    }
  }, []);

  const initFirebase = () => {
    const config = Platform.select({
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
      },
    });
    if (config) {
      firebase.initializeApp(config).then(() => {
        console.log('Firebase initialized');
        enableAnalytics();
      }).catch(error => {
        console.error('Error initializing Firebase:', error);
      });
    }
  };

  const enableAnalytics = () => {
    const analytics = getAnalytics();
    analytics.setAnalyticsCollectionEnabled(true).then(() => {
      console.log('Analytics collection enabled');
      setAnalyticsEnabled(true);
    }).catch(error => {
      console.error('Error enabling analytics collection:', error);
      setAnalyticsEnabled(false);
    });
  };

  const testFirebaseEvent = () => {
    const analytics = getAnalytics();
    logEvent(analytics, 'test_button_click', {
      button_id: 'main_test_button',
      click_count: eventCount + 1,
      timestamp: new Date().toISOString(),
    })
      .then(() => {
        setEventCount(prev => prev + 1);
        Alert.alert('Success!', `Firebase event logged successfully!\nTotal events: ${eventCount + 1}`);
      })
      .catch(error => {
        console.error('Error logging Firebase event:', error);
        Alert.alert('Error', 'Failed to log Firebase event. Check console for details.');
      });
  };

  return (
    <SafeAreaView style={[styles.safeArea, backgroundStyle]}>
      <View style={styles.container}>
        <Text style={[styles.title, textStyle]}>
          Firebase Test App
        </Text>
        <Text style={[styles.subtitle, textStyle]}>
          Simple Android Firebase Analytics Test
        </Text>
        <View style={styles.statusContainer}>
          <View style={[styles.statusIndicator, { backgroundColor: analyticsEnabled ? '#4CAF50' : '#F44336' }]}>
            <Text style={styles.statusText}>
              {analyticsEnabled ? '✓ Analytics ON' : '✗ Analytics OFF'}
            </Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.testButton}
            onPress={testFirebaseEvent}>
            <Text style={styles.buttonText}>
              Test Firebase Event
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsContainer}>
          <Text style={[styles.statsText, textStyle]}>
            Events Sent: {eventCount}
          </Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={[styles.infoText, textStyle]}>
            Check your Firebase Console to see these events!
          </Text>
          <Text style={[styles.infoText, textStyle]}>
            Event Name: test_button_click
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  statusContainer: {
    marginBottom: 16,
  },
  statusIndicator: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 40,
    textAlign: 'center',
    opacity: 0.8,
  },
  buttonContainer: {
    marginBottom: 40,
  },
  testButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  statsContainer: {
    marginBottom: 40,
    padding: 20,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  statsText: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  infoContainer: {
    alignItems: 'center',
  },
  infoText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 8,
    opacity: 0.7,
  },
});

export default App;
