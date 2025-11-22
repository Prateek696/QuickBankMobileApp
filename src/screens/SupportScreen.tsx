import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';

interface SupportScreenProps {
  navigation?: any;
}

const SupportScreen: React.FC<SupportScreenProps> = ({navigation}) => {
  const faqItems = [
    {
      question: 'How do I send money?',
      answer: 'Go to the Home tab and tap "Send Money". Follow the steps to complete your transfer.',
    },
    {
      question: 'How long does a transfer take?',
      answer: 'Most transfers are completed within minutes, but some may take up to 24 hours.',
    },
    {
      question: 'What are the fees?',
      answer: 'Fees vary depending on the amount and destination. Check the fee calculator before sending.',
    },
    {
      question: 'How do I add a card?',
      answer: 'Go to Profile > Add Card and enter your card details securely.',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Support</Text>
          <Text style={styles.subtitle}>Find answers to your questions</Text>
        </View>

        {/* Contact Options */}
        <View style={styles.contactSection}>
          <TouchableOpacity style={styles.contactButton}>
            <Text style={styles.contactIcon}>💬</Text>
            <Text style={styles.contactText}>Live Chat</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.contactButton}>
            <Text style={styles.contactIcon}>📧</Text>
            <Text style={styles.contactText}>Email Support</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.contactButton}>
            <Text style={styles.contactIcon}>📞</Text>
            <Text style={styles.contactText}>Call Us</Text>
          </TouchableOpacity>
        </View>

        {/* FAQ Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          {faqItems.map((item, index) => (
            <View key={index} style={styles.faqItem}>
              <Text style={styles.faqQuestion}>{item.question}</Text>
              <Text style={styles.faqAnswer}>{item.answer}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1E3A8A',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  contactSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  contactButton: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    minWidth: 100,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contactIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  contactText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 20,
  },
  faqItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  faqAnswer: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
});

export default SupportScreen;

