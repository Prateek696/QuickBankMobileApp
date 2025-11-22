import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';

interface TransactionConfirmationScreenProps {
  navigation?: any;
}

const TransactionConfirmationScreen: React.FC<
  TransactionConfirmationScreenProps
> = ({navigation}) => {
  const timelineSteps = [
    {id: '1', name: "Your debit card", completed: true},
    {id: '2', name: 'Remitly', completed: true},
    {id: '3', name: "Recipient's bank", completed: true},
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Close Button */}
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation?.goBack()}>
          <Text style={styles.closeIcon}>✕</Text>
        </TouchableOpacity>

        {/* Title and Amount */}
        <View style={styles.headerSection}>
          <Text style={styles.transactionTitle}>
            Lorem ipsum dolor sit amet
          </Text>
          <View style={styles.amountContainer}>
            <Text style={styles.primaryAmount}>1,000,00 EUR</Text>
            <Text style={styles.secondaryAmount}>301,480,00 PKR</Text>
          </View>
        </View>

        {/* Reference Number */}
        <View style={styles.referenceSection}>
          <Text style={styles.referenceLabel}>Reference number</Text>
          <Text style={styles.referenceValue}>R1198877xxxx</Text>
        </View>

        {/* Status */}
        <View style={styles.statusSection}>
          <Text style={styles.statusIcon}>✓</Text>
          <Text style={styles.statusText}>Delivered</Text>
        </View>

        {/* Description */}
        <Text style={styles.description}>
          Lorem ipsum dolor sit amet consectetur. Tellus lorem arcu arcu at. In
          non ultricies ultricies. Non neque duis eu cursus dictum. Convallis
        </Text>

        {/* Timeline */}
        <View style={styles.timeline}>
          {timelineSteps.map((step, index) => (
            <View key={step.id} style={styles.timelineStep}>
              <View
                style={[
                  styles.timelineDot,
                  step.completed && styles.timelineDotCompleted,
                ]}>
                {step.completed && <Text style={styles.checkmark}>✓</Text>}
              </View>
              {index < timelineSteps.length - 1 && (
                <View
                  style={[
                    styles.timelineLine,
                    step.completed && styles.timelineLineCompleted,
                  ]}
                />
              )}
              <Text style={styles.timelineStepName}>{step.name}</Text>
            </View>
          ))}
          <Text style={styles.successMessage}>
            Success! Your deposit has been confirmed
          </Text>
          <Text style={styles.successDate}>28 Oct, 15:49 WET</Text>
        </View>

        {/* Keep in Mind Card */}
        <View style={styles.keepInMindCard}>
          <Text style={styles.keepInMindTitle}>Keep in mind</Text>
          <Text style={styles.keepInMindText}>
            Lorem ipsum dolor sit amet consectetur. Tellus lorem arcu arcu at.
            In non ultricies ultricies non
          </Text>
        </View>

        {/* Who are you sending to? Section */}
        <View style={styles.recipientSection}>
          <View style={styles.recipientHeader}>
            <Text style={styles.recipientTitle}>Who are you sending to?</Text>
            <TouchableOpacity>
              <Text style={styles.closeIcon}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* New Recipient Option */}
          <TouchableOpacity style={styles.newRecipientButton}>
            <View style={styles.newRecipientIcon}>
              <Text style={styles.plusIcon}>+</Text>
            </View>
            <Text style={styles.newRecipientText}>Sending to new recipient</Text>
          </TouchableOpacity>

          {/* Recent Recipients */}
          <Text style={styles.recentRecipientsTitle}>Recent Recipients</Text>
          <TouchableOpacity style={styles.recipientItem}>
            <View style={styles.recipientAvatar}>
              <Text style={styles.recipientInitials}>UN</Text>
            </View>
            <View style={styles.recipientDetails}>
              <Text style={styles.recipientName}>Username</Text>
              <Text style={styles.recipientBank}>
                United Bank (UBL) Account ending in 5861
              </Text>
            </View>
          </TouchableOpacity>
        </View>
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
  closeButton: {
    alignSelf: 'flex-end',
    padding: 8,
    marginBottom: 8,
  },
  closeIcon: {
    fontSize: 24,
    color: '#1F2937',
    fontWeight: '600',
  },
  headerSection: {
    marginBottom: 16,
  },
  transactionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E3A8A',
    marginBottom: 8,
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  primaryAmount: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E3A8A',
    marginBottom: 4,
  },
  secondaryAmount: {
    fontSize: 16,
    color: '#6B7280',
  },
  referenceSection: {
    marginBottom: 12,
  },
  referenceLabel: {
    fontSize: 14,
    color: '#1F2937',
    marginBottom: 4,
  },
  referenceValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  statusSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusIcon: {
    fontSize: 20,
    color: '#22C55E',
    marginRight: 8,
  },
  statusText: {
    fontSize: 16,
    color: '#22C55E',
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 32,
  },
  timeline: {
    marginBottom: 32,
  },
  timelineStep: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  timelineDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  timelineDotCompleted: {
    backgroundColor: '#22C55E',
    borderColor: '#22C55E',
  },
  checkmark: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  timelineLine: {
    position: 'absolute',
    left: 11,
    top: 24,
    width: 2,
    height: 32,
    backgroundColor: '#D1D5DB',
  },
  timelineLineCompleted: {
    backgroundColor: '#22C55E',
  },
  timelineStepName: {
    fontSize: 16,
    color: '#1F2937',
    marginLeft: 36,
  },
  successMessage: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 8,
    marginLeft: 36,
  },
  successDate: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 4,
    marginLeft: 36,
  },
  keepInMindCard: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
  },
  keepInMindTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
  keepInMindText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  recipientSection: {
    marginTop: 32,
    marginBottom: 24,
  },
  recipientHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  recipientTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E3A8A',
  },
  newRecipientButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
  },
  newRecipientIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#1E3A8A',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  plusIcon: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  newRecipientText: {
    fontSize: 16,
    color: '#1E3A8A',
    fontWeight: '500',
  },
  recentRecipientsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  recipientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  recipientAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#1E3A8A',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  recipientInitials: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  recipientDetails: {
    flex: 1,
  },
  recipientName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  recipientBank: {
    fontSize: 14,
    color: '#6B7280',
  },
});

export default TransactionConfirmationScreen;

