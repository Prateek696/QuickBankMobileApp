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

interface SendMoneyCurrencyScreenProps {
  navigation?: any;
}

const SendMoneyCurrencyScreen: React.FC<SendMoneyCurrencyScreenProps> = ({
  navigation,
}) => {
  const [sendAmount, setSendAmount] = useState('0,00');
  const [receiveAmount, setReceiveAmount] = useState('0,00');

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

        {/* Info Box */}
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            Lorem ipsum dolor sit amet consectetur. Tellus lorem arcu arcu at.
            In non ultricies ultricies non
          </Text>
        </View>

        {/* Amount Card */}
        <View style={styles.amountCard}>
          {/* You Send */}
          <View style={styles.amountRow}>
            <View style={styles.amountLeft}>
              <TextInput
                style={styles.amountInput}
                placeholder="0,00"
                placeholderTextColor="#1F2937"
                value={sendAmount}
                onChangeText={(text) => {
                  // Allow only numbers and comma
                  const formatted = text.replace(/[^0-9,]/g, '');
                  setSendAmount(formatted);
                  // Calculate receive amount (1 EUR = 287.46 PKR)
                  if (formatted && formatted !== '0,00') {
                    const numValue = parseFloat(formatted.replace(',', '.'));
                    if (!isNaN(numValue)) {
                      const receive = (numValue * 287.46).toFixed(2).replace('.', ',');
                      setReceiveAmount(receive);
                    }
                  } else {
                    setReceiveAmount('0,00');
                  }
                }}
                keyboardType="numeric"
                color="#1F2937"
              />
              <Text style={styles.amountLabel}>You send</Text>
            </View>
            <View style={styles.currencyBadge}>
              <Text style={styles.flag}>🇵🇹</Text>
              <Text style={styles.currency}>EUR</Text>
            </View>
          </View>

          {/* They Receive */}
          <View style={styles.amountRow}>
            <View style={styles.amountLeft}>
              <TextInput
                style={styles.amountInput}
                placeholder="0,00"
                placeholderTextColor="#1F2937"
                value={receiveAmount}
                onChangeText={(text) => {
                  // Allow only numbers and comma
                  const formatted = text.replace(/[^0-9,]/g, '');
                  setReceiveAmount(formatted);
                  // Calculate send amount (1 EUR = 287.46 PKR)
                  if (formatted && formatted !== '0,00') {
                    const numValue = parseFloat(formatted.replace(',', '.'));
                    if (!isNaN(numValue)) {
                      const send = (numValue / 287.46).toFixed(2).replace('.', ',');
                      setSendAmount(send);
                    }
                  } else {
                    setSendAmount('0,00');
                  }
                }}
                keyboardType="numeric"
                color="#1F2937"
              />
              <Text style={styles.amountLabel}>They receive</Text>
            </View>
            <View style={styles.currencyBadge}>
              <Text style={styles.flag}>🇵🇰</Text>
              <Text style={styles.currency}>PKR</Text>
            </View>
          </View>

          {/* Exchange Rate */}
          <Text style={styles.exchangeRate}>1 EUR = 287,46 PKR</Text>
        </View>

        {/* Fee Card */}
        <View style={styles.feeCard}>
          <View style={styles.feeRow}>
            <Text style={styles.feeLabel}>Fee</Text>
            <Text style={styles.feeValue}>EUR 1,99</Text>
          </View>
          <View style={styles.feeRow}>
            <Text style={styles.feeLabel}>Total</Text>
            <Text style={[styles.feeValue, styles.totalValue]}>EUR 1,99</Text>
          </View>
        </View>

        {/* Offer Code */}
        <TouchableOpacity style={styles.offerCodeButton}>
          <Text style={styles.offerIcon}>🎁</Text>
          <Text style={styles.offerText}>Apply an offer code</Text>
        </TouchableOpacity>

        {/* Continue Button */}
        <TouchableOpacity
          style={styles.continueButton}
          activeOpacity={0.8}
          onPress={() => navigation?.navigate('DeliveryMethod')}>
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
    width: '30%',
    backgroundColor: '#1E3A8A',
    borderRadius: 2,
  },
  infoBox: {
    backgroundColor: '#E0E7FF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
  },
  infoText: {
    fontSize: 14,
    color: '#1F2937',
    lineHeight: 20,
  },
  amountCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  amountLeft: {
    flex: 1,
  },
  amountInput: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
    padding: 0,
    minWidth: 100,
  },
  amountLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  currencyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  flag: {
    fontSize: 20,
  },
  currency: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  exchangeRate: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  feeCard: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  feeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  feeLabel: {
    fontSize: 16,
    color: '#1F2937',
  },
  feeValue: {
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '600',
  },
  totalValue: {
    textDecorationLine: 'underline',
  },
  offerCodeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  offerIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  offerText: {
    fontSize: 16,
    color: '#4A69BD',
    fontWeight: '600',
  },
  continueButton: {
    backgroundColor: '#4A69BD',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

export default SendMoneyCurrencyScreen;

