import { Platform } from 'react-native';
import { FirebaseConfig, CountryConfig, Country } from './types';
import { firebaseConfigs } from './config';

class ConfigManager {
  private static instance: ConfigManager;
  private countryConfigs: Record<Country, CountryConfig>;
  private currentCountry: Country = 'INDIA'; // Default country

  private constructor() {
    // Import country-specific Firebase configurations
    this.countryConfigs = firebaseConfigs;
  }

  public static getInstance(): ConfigManager {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager();
    }
    return ConfigManager.instance;
  }

  /**
   * Set current country for Firebase configuration
   */
  public setCountry(country: Country): void {
    this.currentCountry = country;
    console.log(`Firebase country set to: ${country}`);
  }

  /**
   * Get current country
   */
  public getCurrentCountry(): Country {
    return this.currentCountry;
  }

  /**
   * Get configuration for current platform and country
   */
  public getCurrentPlatformConfig(): FirebaseConfig {
    const platform = Platform.OS as 'ios' | 'android';
    return this.countryConfigs[this.currentCountry][platform];
  }

  /**
   * Get configuration for specific platform and country
   */
  public getPlatformConfig(country: Country, platform: 'ios' | 'android'): FirebaseConfig {
    return this.countryConfigs[country][platform];
  }

  /**
   * Get all configurations for a specific country
   */
  public getCountryConfig(country: Country): CountryConfig {
    return { ...this.countryConfigs[country] };
  }

  /**
   * Get all country configurations
   */
  public getAllCountryConfigs(): Record<Country, CountryConfig> {
    return { ...this.countryConfigs };
  }

  /**
   * Get available countries
   */
  public getAvailableCountries(): Country[] {
    return Object.keys(this.countryConfigs) as Country[];
  }

  /**
   * Add or update country configuration
   */
  public setCountryConfig(country: Country, config: CountryConfig): void {
    this.countryConfigs[country] = config;
    console.log(`Configuration updated for country: ${country}`);
  }
}

// Export singleton instance
export const firebaseConfig = ConfigManager.getInstance();
