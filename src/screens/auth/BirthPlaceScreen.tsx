import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';

interface BirthPlaceScreenProps {
  navigation?: any;
}

const BirthPlaceScreen: React.FC<BirthPlaceScreenProps> = ({navigation}) => {
  const [city, setCity] = useState('Chandigarh');
  const [country, setCountry] = useState('India');

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
        <Text style={styles.title}>Where were you born ?</Text>

        {/* Description */}
        <Text style={styles.description}>
          Lorem ipsum dolor sit amet consectetur. Tellus lorem arcu arcu at. In
          non ultricies ultricies non
        </Text>

        {/* City of Birth Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>City of birth</Text>
          <TextInput
            style={styles.input}
            placeholder="City of birth"
            placeholderTextColor="#9CA3AF"
            value={city}
            onChangeText={setCity}
          />
        </View>

        {/* Country of Birth Input */}
        <TouchableOpacity style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Country of birth</Text>
          <View style={styles.countryInput}>
            <Text style={styles.flag}>🇮🇳</Text>
            <Text style={styles.countryValue}>{country}</Text>
            <Text style={styles.chevron}>⌄</Text>
          </View>
        </TouchableOpacity>

        {/* Continue Button */}
        <TouchableOpacity
          style={styles.continueButton}
          activeOpacity={0.8}
          onPress={() => navigation?.navigate('Login')}>
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
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#374151',
  },
  countryInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  flag: {
    fontSize: 24,
    marginRight: 12,
  },
  countryValue: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
  },
  chevron: {
    fontSize: 20,
    color: '#6B7280',
  },
  continueButton: {
    backgroundColor: '#4A69BD',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

export default BirthPlaceScreen;

