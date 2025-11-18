import React, {useState, useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Card} from '../components/ui/Card';
import {Button} from '../components/ui/Button';
import {Input} from '../components/ui/Input';
import {colors} from '../constants/colors';
import {sendMoneyAPI, recipientsAPI} from '../services/api';
import type {Recipient} from '../services/api';
import LinearGradient from 'react-native-linear-gradient';

const SendMoneyScreen: React.FC = () => {
  const navigation = useNavigation();
  const [step, setStep] = useState(1);
  const [selectedRecipient, setSelectedRecipient] = useState<Recipient | null>(null);
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [amount, setAmount] = useState('250');
  const [purpose, setPurpose] = useState('');
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    loadRecipients();
  }, []);

  const loadRecipients = async () => {
    const data = await recipientsAPI.getRecipients();
    setRecipients(data);
  };

  const parsedAmount = useMemo(() => {
    const numeric = parseFloat(amount);
    return isFinite(numeric) ? Math.max(0, numeric) : 0;
  }, [amount]);

  const conversionRate = 82.9; // Example rate
  const convertedAmount = parsedAmount * conversionRate;
  const fee = parsedAmount === 0 ? 0 : Math.max(1.99, parsedAmount * 0.01);
  const convertedNet = Math.max(convertedAmount - fee * conversionRate, 0);

  const formatCurrency = (value: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      maximumFractionDigits: 2,
    }).format(value || 0);
  };

  const handleSend = async () => {
    if (!selectedRecipient || !parsedAmount || !purpose) return;

    setLoading(true);
    try {
      await sendMoneyAPI.sendMoney({
        recipientId: selectedRecipient.id,
        amount: parsedAmount,
        currency: 'USD',
        purpose,
      });
      // Navigate to success or dashboard
      navigation.goBack();
    } catch (error) {
      console.error('Send money error:', error);
    } finally {
      setLoading(false);
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
        <Text style={styles.headerTitle}>Send Money</Text>
        <Text style={styles.headerSubtitle}>Express and economy payouts</Text>
      </LinearGradient>

      {/* Step Indicator */}
      <View style={styles.stepIndicator}>
        {[1, 2, 3, 4].map((s) => (
          <View key={s} style={styles.stepContainer}>
            <View
              style={[
                styles.stepCircle,
                step >= s && styles.stepCircleActive,
              ]}>
              <Text
                style={[
                  styles.stepNumber,
                  step >= s && styles.stepNumberActive,
                ]}>
                {step > s ? '✓' : s}
              </Text>
            </View>
            {s < 4 && (
              <View
                style={[
                  styles.stepLine,
                  step > s && styles.stepLineActive,
                ]}
              />
            )}
          </View>
        ))}
      </View>

      {/* Step 1: Select Recipient */}
      {step === 1 && (
        <Card style={styles.card}>
          <Text style={styles.cardTitle}>Choose recipient</Text>
          <Text style={styles.cardSubtitle}>
            Select a saved recipient or add a new one
          </Text>

          {recipients.map((recipient) => (
            <TouchableOpacity
              key={recipient.id}
              onPress={() => setSelectedRecipient(recipient)}
              style={[
                styles.recipientOption,
                selectedRecipient?.id === recipient.id && styles.recipientOptionSelected,
              ]}>
              <Text style={styles.recipientFlag}>{recipient.flag}</Text>
              <View style={styles.recipientInfo}>
                <Text style={styles.recipientName}>{recipient.name}</Text>
                <Text style={styles.recipientDetails}>
                  {recipient.country} • {recipient.bank}
                </Text>
              </View>
              <View
                style={[
                  styles.radio,
                  selectedRecipient?.id === recipient.id && styles.radioSelected,
                ]}>
                {selectedRecipient?.id === recipient.id && (
                  <Text style={styles.radioCheck}>✓</Text>
                )}
              </View>
            </TouchableOpacity>
          ))}

          <Button
            title="New recipient"
            onPress={() => navigation.navigate('Recipients' as never)}
            variant="outline"
            style={styles.button}
          />

          <Button
            title="Continue"
            onPress={() => setStep(2)}
            disabled={!selectedRecipient}
            style={styles.button}
          />
        </Card>
      )}

      {/* Step 2: Transfer Details */}
      {step === 2 && (
        <View>
          <Card style={styles.card}>
            <Text style={styles.cardTitle}>Transfer details</Text>

            <Input
              label="Amount to send"
              placeholder="0.00"
              value={amount}
              onChangeText={(text) => {
                if (/^\d*\.?\d{0,2}$/.test(text)) {
                  setAmount(text);
                }
              }}
              keyboardType="decimal-pad"
            />

            <View style={styles.selectContainer}>
              <Text style={styles.selectLabel}>Purpose of transfer</Text>
              <View style={styles.select}>
                <TextInput
                  style={styles.selectInput}
                  placeholder="Select a purpose"
                  value={purpose}
                  onChangeText={setPurpose}
                />
              </View>
            </View>

            <View style={styles.buttonRow}>
              <Button
                title="Back"
                onPress={() => setStep(1)}
                variant="outline"
                style={[styles.button, {flex: 1}]}
              />
              <Button
                title="Review"
                onPress={() => setStep(3)}
                disabled={!parsedAmount || !purpose}
                style={[styles.button, {flex: 1}]}
              />
            </View>
          </Card>

          {/* Conversion Preview */}
          <LinearGradient
            colors={[colors.primary, colors.blue[600]]}
            style={styles.conversionCard}>
            <Text style={styles.conversionTitle}>You send</Text>
            <Text style={styles.conversionAmount}>
              {formatCurrency(parsedAmount, 'USD')}
            </Text>
            <Text style={styles.conversionArrow}>→</Text>
            <Text style={styles.conversionTitle}>They receive</Text>
            <Text style={styles.conversionAmount}>
              {formatCurrency(convertedAmount, 'INR')}
            </Text>
            <Text style={styles.conversionRate}>
              Rate: 1 USD = {conversionRate.toFixed(2)} INR • Fee: {formatCurrency(fee, 'USD')}
            </Text>
          </LinearGradient>
        </View>
      )}

      {/* Step 3: Review */}
      {step === 3 && (
        <Card style={styles.card}>
          <Text style={styles.cardTitle}>Review and confirm</Text>

          <View style={styles.reviewRow}>
            <View style={styles.reviewItem}>
              <Text style={styles.reviewLabel}>From</Text>
              <Text style={styles.reviewValue}>John Doe</Text>
            </View>
            <View style={styles.reviewItem}>
              <Text style={styles.reviewLabel}>To</Text>
              <Text style={styles.reviewValue}>{selectedRecipient?.name}</Text>
            </View>
          </View>

          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>You send</Text>
              <Text style={styles.summaryValue}>
                {formatCurrency(parsedAmount, 'USD')}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Transfer fee</Text>
              <Text style={styles.summaryValue}>
                {formatCurrency(fee, 'USD')}
              </Text>
            </View>
            <View style={[styles.summaryRow, styles.summaryTotal]}>
              <Text style={styles.summaryTotalLabel}>They receive</Text>
              <Text style={styles.summaryTotalValue}>
                {formatCurrency(convertedNet, 'INR')}
              </Text>
            </View>
          </View>

          <View style={styles.buttonRow}>
            <Button
              title="Back"
              onPress={() => setStep(2)}
              variant="outline"
              style={[styles.button, {flex: 1}]}
            />
            <Button
              title="Continue to payment"
              onPress={() => setStep(4)}
              style={[styles.button, {flex: 1}]}
            />
          </View>
        </Card>
      )}

      {/* Step 4: Payment */}
      {step === 4 && (
        <Card style={styles.card}>
          <Text style={styles.cardTitle}>Choose payment method</Text>

          {[
            {id: 1, label: 'Visa ending in 4242', desc: 'Instant'},
            {id: 2, label: 'Bank account — Chase', desc: '1-2 hours'},
            {id: 3, label: 'Apple Pay', desc: 'Instant'},
          ].map((method) => (
            <TouchableOpacity key={method.id} style={styles.paymentMethod}>
              <View>
                <Text style={styles.paymentLabel}>{method.label}</Text>
                <Text style={styles.paymentDesc}>{method.desc}</Text>
              </View>
              <View style={styles.radio}>
                <Text style={styles.radioCheck}>✓</Text>
              </View>
            </TouchableOpacity>
          ))}

          <View style={styles.buttonRow}>
            <Button
              title="Back"
              onPress={() => setStep(3)}
              variant="outline"
              style={[styles.button, {flex: 1}]}
            />
            <Button
              title={`Send ${formatCurrency(parsedAmount, 'USD')}`}
              onPress={handleSend}
              loading={loading}
              style={[styles.button, {flex: 1}]}
            />
          </View>
        </Card>
      )}
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
  stepIndicator: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.gray[300],
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  stepCircleActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  stepNumber: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.gray[500],
  },
  stepNumberActive: {
    color: colors.white,
  },
  stepLine: {
    flex: 1,
    height: 2,
    backgroundColor: colors.gray[200],
    marginHorizontal: 8,
  },
  stepLineActive: {
    backgroundColor: colors.primary,
  },
  card: {
    margin: 20,
    marginTop: 0,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.dark,
    marginBottom: 8,
  },
  cardSubtitle: {
    fontSize: 14,
    color: colors.gray[600],
    marginBottom: 24,
  },
  recipientOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.gray[200],
    marginBottom: 12,
    backgroundColor: colors.white,
  },
  recipientOptionSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.blue[50],
  },
  recipientFlag: {
    fontSize: 32,
    marginRight: 12,
  },
  recipientInfo: {
    flex: 1,
  },
  recipientName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.dark,
  },
  recipientDetails: {
    fontSize: 12,
    color: colors.gray[600],
    marginTop: 4,
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.gray[300],
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  radioCheck: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '700',
  },
  button: {
    marginTop: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
  },
  selectContainer: {
    marginBottom: 16,
  },
  selectLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.dark,
    marginBottom: 8,
  },
  select: {
    borderWidth: 2,
    borderColor: colors.gray[200],
    borderRadius: 12,
    backgroundColor: colors.white,
  },
  selectInput: {
    padding: 14,
    fontSize: 16,
    color: colors.dark,
  },
  conversionCard: {
    margin: 20,
    marginTop: 0,
    padding: 24,
    borderRadius: 20,
  },
  conversionTitle: {
    fontSize: 12,
    color: colors.blue[100],
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  conversionAmount: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.white,
    marginBottom: 16,
  },
  conversionArrow: {
    fontSize: 24,
    color: colors.white,
    textAlign: 'center',
    marginVertical: 8,
  },
  conversionRate: {
    fontSize: 12,
    color: colors.blue[100],
    marginTop: 16,
  },
  reviewRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  reviewItem: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.gray[50],
    borderRadius: 12,
  },
  reviewLabel: {
    fontSize: 12,
    color: colors.gray[600],
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  reviewValue: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.dark,
  },
  summaryCard: {
    backgroundColor: colors.blue[50],
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: colors.gray[600],
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.dark,
  },
  summaryTotal: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.primary + '30',
  },
  summaryTotalLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
  },
  summaryTotalValue: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
  },
  paymentMethod: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.gray[200],
    marginBottom: 12,
  },
  paymentLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.dark,
  },
  paymentDesc: {
    fontSize: 12,
    color: colors.gray[600],
    marginTop: 4,
  },
});

export default SendMoneyScreen;

