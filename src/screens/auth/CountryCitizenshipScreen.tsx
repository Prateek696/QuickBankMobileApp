import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';

interface CountryCitizenshipScreenProps {
  navigation?: any;
}

const CountryCitizenshipScreen: React.FC<CountryCitizenshipScreenProps> = ({
  navigation,
}) => {
  const [selectedCountry, setSelectedCountry] = useState('Russia');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation?.goBack()}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>

        {/* Title */}
        <Text style={styles.title}>Which country are you a citizen of ?</Text>

        {/* Description */}
        <Text style={styles.description}>
          Lorem ipsum dolor sit amet consectetur. Tellus lorem arcu arcu at. In
          non ultricies ultricies non
        </Text>

        {/* Country Selection Input */}
        <TouchableOpacity style={styles.countryInput}>
          <Text style={styles.flag}>🇷🇺</Text>
          <View style={styles.countryTextContainer}>
            <Text style={styles.countryLabel}>Country of citizenship</Text>
            <Text style={styles.countryName}>{selectedCountry}</Text>
          </View>
          <Text style={styles.clearIcon}>×</Text>
        </TouchableOpacity>

        {/* Add Country Button */}
        <TouchableOpacity style={styles.addCountryButton}>
          <Text style={styles.addCountryText}>+ Add country</Text>
        </TouchableOpacity>

        {/* Continue Button */}
        <TouchableOpacity
          style={styles.continueButton}
          activeOpacity={0.8}
          onPress={() => navigation?.navigate('BirthPlace')}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 24,
  },
  backArrow: {
    fontSize: 24,
    color: '#1E3A8A',
    fontWeight: '600',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1E3A8A',
    marginBottom: 16,
  },
  description: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 24,
  },
  countryInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 16,
  },
  flag: {
    fontSize: 24,
    marginRight: 12,
  },
  countryTextContainer: {
    flex: 1,
  },
  countryLabel: {
    fontSize: 12,
    color: '#4A5568',
    marginBottom: 4,
  },
  countryName: {
    fontSize: 16,
    color: '#2D3748',
    fontWeight: '500',
  },
  clearIcon: {
    fontSize: 24,
    color: '#6B7280',
  },
  addCountryButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 32,
  },
  addCountryText: {
    fontSize: 16,
    color: '#1E3A8A',
    fontWeight: '600',
  },
  continueButton: {
    backgroundColor: '#4A69BD',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

export default CountryCitizenshipScreen;

