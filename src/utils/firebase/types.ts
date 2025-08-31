export interface FirebaseConfig {
  apiKey: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  databaseURL?: string;
}

export interface CountryConfig {
  ios: FirebaseConfig;
  android: FirebaseConfig;
}

export interface AnalyticsEvent {
  name: string;
  parameters?: Record<string, any>;
}

// Country type derived from config keys
export type Country = keyof typeof import('./config').firebaseConfigs;
