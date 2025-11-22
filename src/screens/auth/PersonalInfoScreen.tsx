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

interface PersonalInfoScreenProps {
  navigation?: any;
  route?: any;
}

const PersonalInfoScreen: React.FC<PersonalInfoScreenProps> = ({
  navigation,
  route,
}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');

  // Listen for date selection from DatePicker
  React.useEffect(() => {
    if (route?.params?.selectedDate) {
      setDateOfBirth(route.params.selectedDate);
    }
  }, [route?.params?.selectedDate]);

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
        <Text style={styles.title}>Now, tell us a little about yourself</Text>

        {/* Description */}
        <Text style={styles.description}>
          Lorem ipsum dolor sit amet consectetur. Tellus lorem arcu arcu at. In
          non ultricies ultricies non
        </Text>

        {/* First Name Input */}
        <TextInput
          style={styles.input}
          placeholder="First name"
          placeholderTextColor="#9CA3AF"
          value={firstName}
          onChangeText={setFirstName}
          color="#1F2937"
        />

        {/* Last Name Input */}
        <TextInput
          style={styles.input}
          placeholder="Last name"
          placeholderTextColor="#9CA3AF"
          value={lastName}
          onChangeText={setLastName}
          color="#1F2937"
        />

        {/* Date of Birth Input */}
        <TouchableOpacity
          style={styles.dateInput}
          onPress={() =>
            navigation?.navigate('DatePicker', {
              onDateSelect: (date: string) => {
                setDateOfBirth(date);
              },
            })
          }>
          <Text style={dateOfBirth ? styles.inputText : styles.placeholderText}>
            {dateOfBirth || 'Date of birth'}
          </Text>
          <Text style={styles.chevron}>⌄</Text>
        </TouchableOpacity>

        {/* Continue Button */}
        <TouchableOpacity
          style={[
            styles.continueButton,
            (!firstName || !lastName || !dateOfBirth) &&
              styles.continueButtonDisabled,
          ]}
          activeOpacity={0.8}
          disabled={!firstName || !lastName || !dateOfBirth}
          onPress={() => navigation?.navigate('CountryCitizenship')}>
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
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 16,
    fontSize: 16,
    color: '#1F2937',
  },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 16,
  },
  inputText: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
  },
  placeholderText: {
    flex: 1,
    fontSize: 16,
    color: '#9CA3AF',
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
  continueButtonDisabled: {
    backgroundColor: '#D1D5DB',
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

export default PersonalInfoScreen;

