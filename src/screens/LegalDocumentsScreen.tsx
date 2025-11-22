import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';

interface LegalDocumentsScreenProps {
  navigation?: any;
}

const LegalDocumentsScreen: React.FC<LegalDocumentsScreenProps> = ({navigation}) => {
  const documents = [
    {
      title: 'Terms and Conditions',
      description: 'Our terms of service and usage',
      route: 'TermsAndConditions',
    },
    {
      title: 'Privacy Policy',
      description: 'How we collect and use your data',
      route: 'Privacy',
    },
    {
      title: 'Cookie Policy',
      description: 'Information about our use of cookies',
      route: 'CookiePolicy',
    },
    {
      title: 'User Agreement',
      description: 'Agreement between you and QuickBank',
      route: 'UserAgreement',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Legal Documents</Text>
          <Text style={styles.subtitle}>Review our legal policies and agreements</Text>
        </View>

        {/* Documents List */}
        <View style={styles.documentsList}>
          {documents.map((doc, index) => (
            <TouchableOpacity
              key={index}
              style={styles.documentItem}
              onPress={() => {
                if (doc.route === 'Privacy') {
                  navigation?.navigate('Privacy');
                } else if (doc.route === 'TermsAndConditions') {
                  navigation?.navigate('TermsAndConditions');
                }
              }}>
              <View style={styles.documentIcon}>
                <Text style={styles.documentIconText}>📄</Text>
              </View>
              <View style={styles.documentContent}>
                <Text style={styles.documentTitle}>{doc.title}</Text>
                <Text style={styles.documentDescription}>{doc.description}</Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Last Updated */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Last updated: December 2024</Text>
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
  documentsList: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  documentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 12,
  },
  documentIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  documentIconText: {
    fontSize: 24,
  },
  documentContent: {
    flex: 1,
  },
  documentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  documentDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  chevron: {
    fontSize: 20,
    color: '#D1D5DB',
    marginLeft: 16,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
});

export default LegalDocumentsScreen;

