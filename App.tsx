/**
 * Simple Firebase POC App with Multi-Country Support
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
import { firebaseService, firebaseConfig, Country } from './src/utils/firebase';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [eventCount, setEventCount] = useState(0);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);
  const [currentCountry, setCurrentCountry] = useState<Country | null>(null);
  const [availableCountries, setAvailableCountries] = useState<Country[]>([]);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#000000' : '#FFFFFF',
  };

  const textStyle = {
    color: isDarkMode ? '#FFFFFF' : '#000000',
  };

  useEffect(() => {
    loadCountries();
  }, []);

  const loadCountries = () => {
    const countries = firebaseConfig.getAvailableCountries();
    setAvailableCountries(countries);
  };

  const handleCountryChange = async (country: Country) => {
    try {
      // Initialize Firebase with selected country
      await firebaseService.initialize(country);
      setCurrentCountry(country);
      setAnalyticsEnabled(true);
      
      // Log country change event
      await firebaseService.logEvent({
        name: 'country_changed',
        parameters: {
          new_country: country,
          timestamp: new Date().toISOString(),
        }
      });
      
      Alert.alert('Success!', `Firebase initialized for ${country}`);
    } catch (error) {
      console.error('Error changing country:', error);
      Alert.alert('Error', 'Failed to initialize Firebase for selected country. Check console for details.');
    }
  };

  const testFirebaseEvent = async () => {
    try {
      if (!currentCountry) {
        Alert.alert('Error', 'Please select a country first');
        return;
      }

      await firebaseService.logEvent({
        name: 'test_button_click',
        parameters: {
          button_id: 'main_test_button',
          click_count: eventCount + 1,
          timestamp: new Date().toISOString(),
          country: currentCountry,
        }
      });
      
      setEventCount(prev => prev + 1);
      Alert.alert('Success!', `Firebase event logged successfully!\nTotal events: ${eventCount + 1}\nCountry: ${currentCountry}`);
    } catch (error) {
      console.error('Error logging Firebase event:', error);
      Alert.alert('Error', 'Failed to log Firebase event. Check console for details.');
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, backgroundStyle]}>
      <View style={styles.container}>
        <Text style={[styles.title, textStyle]}>
          Firebase Test App
        </Text>
        <Text style={[styles.subtitle, textStyle]}>
          Multi-Country Firebase Analytics Test
        </Text>
        
        <View style={styles.statusContainer}>
          <View style={[styles.statusIndicator, { backgroundColor: analyticsEnabled ? '#4CAF50' : '#F44336' }]}>
            <Text style={styles.statusText}>
              {analyticsEnabled ? '✓ Analytics ON' : '✗ Analytics OFF'}
            </Text>
          </View>
        </View>

        <View style={styles.countryContainer}>
          <Text style={[styles.countryLabel, textStyle]}>Select Country to Initialize Firebase:</Text>
          <View style={styles.countryButtons}>
            {availableCountries.map(country => (
              <TouchableOpacity
                key={country}
                style={[
                  styles.countryButton,
                  currentCountry === country && styles.countryButtonActive
                ]}
                onPress={() => handleCountryChange(country)}
              >
                <Text style={[
                  styles.countryButtonText,
                  currentCountry === country && styles.countryButtonTextActive
                ]}>
                  {country}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={[styles.currentCountry, textStyle]}>
            {currentCountry ? `Current: ${currentCountry}` : 'No country selected'}
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.testButton,
              !currentCountry && styles.testButtonDisabled
            ]}
            onPress={testFirebaseEvent}
            disabled={!currentCountry}>
            <Text style={[
              styles.buttonText,
              !currentCountry && styles.buttonTextDisabled
            ]}>
              Test Firebase Event
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsContainer}>
          <Text style={[styles.statsText, textStyle]}>
            Events Sent: {eventCount}
          </Text>
          <Text style={[styles.statsText, textStyle]}>
            Country: {currentCountry || 'None'}
          </Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={[styles.infoText, textStyle]}>
            {currentCountry 
              ? `Firebase is active for ${currentCountry}`
              : 'Select a country to start using Firebase'
            }
          </Text>
          <Text style={[styles.infoText, textStyle]}>
            Event Name: test_button_click
          </Text>
          <Text style={[styles.infoText, textStyle]}>
            Platform: {Platform.OS}
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
    marginBottom: 20,
    textAlign: 'center',
    opacity: 0.8,
  },
  countryContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  countryLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  countryButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 12,
  },
  countryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 4,
    marginVertical: 2,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#007AFF',
    backgroundColor: 'transparent',
  },
  countryButtonActive: {
    backgroundColor: '#007AFF',
  },
  countryButtonText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '500',
  },
  countryButtonTextActive: {
    color: 'white',
  },
  currentCountry: {
    fontSize: 14,
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
  testButtonDisabled: {
    backgroundColor: '#CCCCCC',
    elevation: 0,
    shadowOpacity: 0,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  buttonTextDisabled: {
    color: '#999999',
  },
  statsContainer: {
    marginBottom: 40,
    padding: 20,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#007AFF',
    alignItems: 'center',
  },
  statsText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
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
