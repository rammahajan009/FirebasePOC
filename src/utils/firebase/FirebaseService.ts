import firebase from '@react-native-firebase/app';
import { getAnalytics, logEvent, setUserProperty, setUserId } from '@react-native-firebase/analytics';
import { AnalyticsEvent, Country } from './types';
import { firebaseConfig } from './ConfigManager';

class FirebaseService {
  private static instance: FirebaseService;
  private isInitializedFlag: boolean = false;
  private analytics: any = null;
  private currentCountry: Country | null = null;

  private constructor() {}

  public static getInstance(): FirebaseService {
    if (!FirebaseService.instance) {
      FirebaseService.instance = new FirebaseService();
    }
    return FirebaseService.instance;
  }

  /**
   * Initialize Firebase with specific country
   */
  public async initialize(country: Country): Promise<void> {
    try {
      // Check if Firebase is already initialized
      if (this.isInitializedFlag) {
        if (this.currentCountry === country) {
          console.log(`Firebase already initialized for ${country}`);
          return;
        } else {
          throw new Error(`Firebase already initialized for ${this.currentCountry}. Cannot change to ${country}. Please restart the app to use a different country.`);
        }
      }

      // Set the country first
      firebaseConfig.setCountry(country);
      
      // Get configuration for current platform and country
      const config = firebaseConfig.getCurrentPlatformConfig();
      
      // Initialize Firebase
      await firebase.initializeApp(config);
      this.analytics = getAnalytics();
      this.isInitializedFlag = true;
      this.currentCountry = country;
      
      console.log(`Firebase initialized successfully for ${country}`);
      
    } catch (error) {
      console.error('Error initializing Firebase:', error);
      throw error;
    }
  }

  /**
   * Check if Firebase is initialized
   */
  public isInitialized(): boolean {
    return this.isInitializedFlag;
  }

  /**
   * Get current country
   */
  public getCurrentCountry(): Country | null {
    return this.currentCountry;
  }

  /**
   * Log analytics event
   */
  public async logEvent(event: AnalyticsEvent): Promise<void> {
    try {
      if (!this.analytics) {
        throw new Error('Firebase not initialized. Please select a country first.');
      }

      await logEvent(this.analytics, event.name, event.parameters);
      console.log(`Event logged: ${event.name} for country: ${this.currentCountry}`);
    } catch (error) {
      console.error('Error logging event:', error);
      throw error;
    }
  }

  /**
   * Set user property
   */
  public async setUserProperty(key: string, value: string): Promise<void> {
    try {
      if (!this.analytics) {
        throw new Error('Firebase not initialized. Please select a country first.');
      }

      await setUserProperty(this.analytics, key, value);
    } catch (error) {
      console.error('Error setting user property:', error);
      throw error;
    }
  }

  /**
   * Set user ID
   */
  public async setUserId(userId: string): Promise<void> {
    try {
      if (!this.analytics) {
        throw new Error('Firebase not initialized. Please select a country first.');
      }

      await setUserId(this.analytics, userId);
    } catch (error) {
      console.error('Error setting user ID:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const firebaseService = FirebaseService.getInstance();
