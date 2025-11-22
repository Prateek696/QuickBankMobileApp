import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';

interface TermsAndConditionsScreenProps {
  navigation?: any;
}

const TermsAndConditionsScreen: React.FC<TermsAndConditionsScreenProps> = ({
  navigation,
}) => {
  const [accepted, setAccepted] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation?.goBack()}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>

        {/* Title */}
        <Text style={styles.title}>What's your email address ?</Text>

        {/* Description */}
        <Text style={styles.description}>
          Lorem ipsum dolor sit amet consectetur. Tellus lorem arcu arcu at. In
          non ultricies ultricies non neque duis eu cursus dictum. Convallis
        </Text>

        {/* Terms & Conditions Section */}
        <View style={styles.termsContainer}>
          <Text style={styles.termsTitle}>Terms & Conditions</Text>
          <ScrollView style={styles.termsScroll}>
            <Text style={styles.termsText}>
              Lorem ipsum dolor sit amet consectetur. Lobortis sed eu congue
              suspendisse nulla nisl etiam. Nibh sagittis odio vulputate
              quisque bibendum congue in. Tristique malesuada volutpat et nisi
              massa. Sodales enim euismod nam sit. Amet convallis vestibulum
              vitae nunc fusce elementum urna tempus at. Convallis id libero
              nunc ornare eu nisl. Habitant suspendisse non egestas nam sed
              imperdiet. Sit pharetra et at porttitor tincidunt amet aliquam ut
              in. Pellentesque vitae eget suspendisse urna diam quis in.
              Adipiscing pulvinar tincidunt fringilla aliquet nisl. Lectus nunc
              scelerisque cras neque. Nibh pellentesque consequat velit
              ultricies augue iaculis viverra. Enim varius in et dui quam
              vestibulum. Justo turpis massa mattis adipiscing sollicitudin enim.
            </Text>
          </ScrollView>
        </View>

        {/* No Thanks Link */}
        <TouchableOpacity style={styles.noThanksButton}>
          <Text style={styles.noThanksText}>No, thanks</Text>
        </TouchableOpacity>

        {/* Accept Button */}
        <TouchableOpacity
          style={[styles.acceptButton, !accepted && styles.acceptButtonDisabled]}
          activeOpacity={0.8}
          onPress={() => {
            setAccepted(true);
            navigation?.navigate('EmailSignup');
          }}>
          <Text style={styles.acceptButtonText}>Accept</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
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
  termsContainer: {
    flex: 1,
    marginBottom: 24,
  },
  termsTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E3A8A',
    textAlign: 'center',
    marginBottom: 16,
  },
  termsScroll: {
    flex: 1,
  },
  termsText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  noThanksButton: {
    alignItems: 'center',
    marginBottom: 16,
  },
  noThanksText: {
    fontSize: 16,
    color: '#1E3A8A',
    fontWeight: '600',
  },
  acceptButton: {
    backgroundColor: '#4A69BD',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  acceptButtonDisabled: {
    backgroundColor: '#D1D5DB',
  },
  acceptButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

export default TermsAndConditionsScreen;

