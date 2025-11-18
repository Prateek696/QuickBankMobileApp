import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import {useNavigation} from '@react-navigation/native';
import {Card} from '../components/ui/Card';
import {Button} from '../components/ui/Button';
import {colors} from '../constants/colors';
import LinearGradient from 'react-native-linear-gradient';

const ReceiveMoneyScreen: React.FC = () => {
  const navigation = useNavigation();
  const [copied, setCopied] = useState<string | null>(null);

  const accountDetails = {
    accountNumber: '1234567890',
    routingNumber: '021000021',
    bankName: 'QuickBank International',
    swiftCode: 'QBKAUS33',
    iban: 'US64QBKA0210000211234567890',
  };

  const handleCopy = async (text: string, label: string) => {
    try {
      await Clipboard.setString(text);
      setCopied(label);
      Alert.alert('Copied!', `${label} copied to clipboard`);
      setTimeout(() => setCopied(null), 2000);
    } catch (error) {
      Alert.alert('Error', 'Failed to copy to clipboard');
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <LinearGradient
        colors={[colors.primary, colors.blue[600]]}
        style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Receive Money</Text>
        <Text style={styles.headerSubtitle}>
          Share your account details to receive money
        </Text>
      </LinearGradient>

      {/* Welcome Card */}
      <Card style={styles.welcomeCard}>
        <Text style={styles.welcomeTitle}>Receive Money Anytime</Text>
        <Text style={styles.welcomeText}>
          Share your account details with anyone to receive money from anywhere in the world.
        </Text>
      </Card>

      {/* Account Details */}
      <Card style={styles.card}>
        <Text style={styles.sectionTitle}>Your Account Details</Text>

        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Account Holder Name</Text>
          <View style={styles.detailValueContainer}>
            <Text style={styles.detailValue}>John Doe</Text>
          </View>
        </View>

        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Account Number</Text>
          <View style={styles.detailValueContainer}>
            <Text style={styles.detailValue}>{accountDetails.accountNumber}</Text>
            <TouchableOpacity
              onPress={() => handleCopy(accountDetails.accountNumber, 'Account Number')}>
              <Text style={styles.copyIcon}>📋</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Routing Number</Text>
          <View style={styles.detailValueContainer}>
            <Text style={styles.detailValue}>{accountDetails.routingNumber}</Text>
            <TouchableOpacity
              onPress={() => handleCopy(accountDetails.routingNumber, 'Routing Number')}>
              <Text style={styles.copyIcon}>📋</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>SWIFT Code</Text>
          <View style={styles.detailValueContainer}>
            <Text style={styles.detailValue}>{accountDetails.swiftCode}</Text>
            <TouchableOpacity
              onPress={() => handleCopy(accountDetails.swiftCode, 'SWIFT Code')}>
              <Text style={styles.copyIcon}>📋</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>IBAN</Text>
          <View style={styles.detailValueContainer}>
            <Text style={[styles.detailValue, styles.ibanValue]}>
              {accountDetails.iban}
            </Text>
            <TouchableOpacity
              onPress={() => handleCopy(accountDetails.iban, 'IBAN')}>
              <Text style={styles.copyIcon}>📋</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Bank Name</Text>
          <View style={styles.detailValueContainer}>
            <Text style={styles.detailValue}>{accountDetails.bankName}</Text>
          </View>
        </View>

        <View style={styles.buttonRow}>
          <Button
            title="Save as PDF"
            onPress={() => {}}
            variant="secondary"
            style={styles.button}
          />
          <Button
            title="Share"
            onPress={() => {}}
            style={styles.button}
          />
        </View>
      </Card>

      {/* How to Receive */}
      <Card style={styles.card}>
        <Text style={styles.sectionTitle}>How to Receive Money</Text>
        {[
          {
            step: '1',
            title: 'Share Your Details',
            desc: 'Copy and share your account details with the sender',
          },
          {
            step: '2',
            title: 'Sender Initiates Transfer',
            desc: 'They send money to your account from their bank',
          },
          {
            step: '3',
            title: 'Funds Arrive',
            desc: 'Money lands in your QuickBank account within 1-3 business days',
          },
          {
            step: '4',
            title: 'Get Notified',
            desc: 'Receive instant notification when funds arrive',
          },
        ].map((item) => (
          <View key={item.step} style={styles.stepItem}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>{item.step}</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>{item.title}</Text>
              <Text style={styles.stepDesc}>{item.desc}</Text>
            </View>
          </View>
        ))}
      </Card>

      {/* Tips */}
      <Card style={[styles.card, styles.tipsCard]}>
        <Text style={styles.tipsTitle}>💡 Tips</Text>
        {[
          'Use your full legal name as on your ID',
          'Double-check account details before sharing',
          'Standard transfers take 1-3 business days',
          'International transfers may take longer',
        ].map((tip, index) => (
          <Text key={index} style={styles.tipText}>
            • {tip}
          </Text>
        ))}
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[50],
  },
  header: {
    padding: 20,
    paddingTop: 60,
    paddingBottom: 24,
  },
  backButton: {
    marginBottom: 16,
  },
  backIcon: {
    fontSize: 24,
    color: colors.white,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.white,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.blue[100],
  },
  welcomeCard: {
    margin: 20,
    marginTop: 0,
    backgroundColor: colors.primary,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.white,
    marginBottom: 8,
  },
  welcomeText: {
    fontSize: 14,
    color: colors.blue[100],
  },
  card: {
    margin: 20,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.dark,
    marginBottom: 24,
  },
  detailItem: {
    marginBottom: 20,
  },
  detailLabel: {
    fontSize: 12,
    color: colors.gray[600],
    marginBottom: 8,
  },
  detailValueContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.gray[50],
    padding: 12,
    borderRadius: 12,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.dark,
    fontFamily: 'monospace',
    flex: 1,
  },
  ibanValue: {
    fontSize: 12,
  },
  copyIcon: {
    fontSize: 20,
    marginLeft: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
  button: {
    flex: 1,
  },
  stepItem: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  stepNumberText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.white,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.dark,
    marginBottom: 4,
  },
  stepDesc: {
    fontSize: 14,
    color: colors.gray[600],
  },
  tipsCard: {
    backgroundColor: colors.blue[50],
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.dark,
    marginBottom: 12,
  },
  tipText: {
    fontSize: 14,
    color: colors.gray[700],
    marginBottom: 8,
  },
});

export default ReceiveMoneyScreen;

