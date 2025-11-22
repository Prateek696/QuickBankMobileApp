import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';

interface ReceiveDeliveryMethodScreenProps {
  navigation?: any;
}

const ReceiveDeliveryMethodScreen: React.FC<ReceiveDeliveryMethodScreenProps> = ({
  navigation,
}) => {
  const deliveryMethods = [
    {id: '1', name: 'Bank Deposit'},
    {id: '2', name: 'Cash Pickup'},
    {id: '3', name: 'Mobile Money'},
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation?.goBack()}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => navigation?.goBack()}>
            <Text style={styles.closeIcon}>×</Text>
          </TouchableOpacity>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressBar}>
          <View style={styles.progressFill} />
        </View>

        {/* Title */}
        <Text style={styles.title}>Delivery Method</Text>
        <Text style={styles.subtitle}>How would you like to receive the money?</Text>

        {/* Info Banner */}
        <View style={styles.infoBanner}>
          <Text style={styles.infoBannerText}>Zero fees for recipients</Text>
        </View>

        {/* Delivery Options */}
        {deliveryMethods.map((method, index) => (
          <TouchableOpacity
            key={method.id}
            style={styles.deliveryOption}
            onPress={() => navigation?.navigate('TransactionConfirmation')}>
            <Text style={styles.deliveryOptionText}>{method.name}</Text>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        ))}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  backButton: {
    padding: 8,
  },
  backArrow: {
    fontSize: 24,
    color: '#1F2937',
  },
  closeButton: {
    padding: 8,
  },
  closeIcon: {
    fontSize: 24,
    color: '#1F2937',
  },
  progressBar: {
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    marginBottom: 24,
  },
  progressFill: {
    height: '100%',
    width: '40%',
    backgroundColor: '#1E3A8A',
    borderRadius: 2,
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
    marginBottom: 16,
  },
  infoBanner: {
    backgroundColor: '#E0E7FF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
  },
  infoBannerText: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '600',
  },
  deliveryOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  deliveryOptionText: {
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '500',
  },
  chevron: {
    fontSize: 20,
    color: '#9CA3AF',
  },
});

export default ReceiveDeliveryMethodScreen;

