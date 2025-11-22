import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

const PrivacyScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>We Care About Your Privacy</Text>

        <Text style={styles.paragraph}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
          ea commodo consequat.
        </Text>

        <Text style={styles.paragraph}>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
          non proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum.
        </Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.acceptButton} activeOpacity={0.8}>
            <Text style={styles.buttonText}>Accept All</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.rejectButton} activeOpacity={0.8}>
            <Text style={styles.buttonText}>Reject All</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.preferenceLink}>
          <Text style={styles.preferenceText}>Preference</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1E3A8A',
    textAlign: 'center',
    marginBottom: 32,
  },
  paragraph: {
    fontSize: 16,
    color: '#1F2937',
    lineHeight: 24,
    marginBottom: 20,
    textAlign: 'left',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 32,
    marginBottom: 16,
    gap: 12,
  },
  acceptButton: {
    flex: 1,
    backgroundColor: '#4A69BD',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  rejectButton: {
    flex: 1,
    backgroundColor: '#4A69BD',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
  preferenceLink: {
    alignItems: 'center',
    marginTop: 8,
  },
  preferenceText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
});

export default PrivacyScreen;

