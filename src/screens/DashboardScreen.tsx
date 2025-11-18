import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {Card} from '../components/ui/Card';
import {colors} from '../constants/colors';
import {walletAPI, transactionsAPI, recipientsAPI} from '../services/api';
import type {Transaction, Recipient} from '../services/api';

const DashboardScreen: React.FC = () => {
  const navigation = useNavigation();
  const [showBalance, setShowBalance] = useState(true);
  const [balance, setBalance] = useState(5432.5);
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([]);
  const [savedRecipients, setSavedRecipients] = useState<Recipient[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [balanceData, transactions, recipients] = await Promise.all([
        walletAPI.getBalance(),
        transactionsAPI.getTransactions(),
        recipientsAPI.getRecipients(),
      ]);
      setBalance(balanceData.balance);
      setRecentTransactions(transactions.slice(0, 4));
      setSavedRecipients(recipients.slice(0, 3));
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const quickActions = [
    {icon: '💸', label: 'Send Money', screen: 'SendMoney', color: colors.blue[600]},
    {icon: '📥', label: 'Receive', screen: 'ReceiveMoney', color: colors.success},
    {icon: '👥', label: 'Recipients', screen: 'Recipients', color: colors.warning},
    {icon: '📊', label: 'Rates', screen: 'Transactions', color: colors.error},
  ];

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.logoContainer}>
            <Text style={styles.logo}>💸</Text>
          </View>
          <Text style={styles.headerTitle}>QuickBank</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Profile' as never)}
          style={styles.profileButton}>
          <Text style={styles.profileInitials}>JD</Text>
        </TouchableOpacity>
      </View>

      {/* Balance Card */}
      <LinearGradient
        colors={[colors.primary, colors.blue[600], colors.blue[700]]}
        style={styles.balanceCard}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}>
        <View style={styles.balanceHeader}>
          <View>
            <Text style={styles.balanceLabel}>Your Balance</Text>
            <View style={styles.balanceRow}>
              <Text style={styles.balanceAmount}>
                {showBalance ? `$${balance.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}` : '••••••••'}
              </Text>
              <TouchableOpacity
                onPress={() => setShowBalance(!showBalance)}
                style={styles.eyeButton}>
                <Text style={styles.eyeIcon}>{showBalance ? '👁️' : '👁️‍🗨️'}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>✓ Verified</Text>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Total Sent</Text>
            <Text style={styles.statValue}>$8,950</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Total Received</Text>
            <Text style={styles.statValue}>$3,200</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Monthly Avg</Text>
            <Text style={styles.statValue}>$1,240</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        {quickActions.map((action, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => navigation.navigate(action.screen as never)}
            style={styles.actionCard}>
            <View style={[styles.actionIcon, {backgroundColor: action.color + '20'}]}>
              <Text style={styles.actionIconText}>{action.icon}</Text>
            </View>
            <Text style={styles.actionLabel}>{action.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Recent Transactions */}
      <Card style={styles.sectionCard}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Transactions' as never)}>
            <Text style={styles.seeAllText}>View All →</Text>
          </TouchableOpacity>
        </View>

        {recentTransactions.map((transaction) => (
          <View key={transaction.id} style={styles.transactionItem}>
            <View style={styles.transactionLeft}>
              <View
                style={[
                  styles.transactionIcon,
                  transaction.type === 'sent'
                    ? {backgroundColor: colors.error + '20'}
                    : {backgroundColor: colors.success + '20'},
                ]}>
                <Text style={styles.transactionFlag}>{transaction.flag || '🌍'}</Text>
              </View>
              <View>
                <Text style={styles.transactionName}>{transaction.recipient}</Text>
                <Text style={styles.transactionDate}>{transaction.date}</Text>
              </View>
            </View>
            <View style={styles.transactionRight}>
              <Text
                style={[
                  styles.transactionAmount,
                  transaction.type === 'sent' ? styles.amountSent : styles.amountReceived,
                ]}>
                {transaction.type === 'sent' ? '-' : '+'} ${transaction.amount}
              </Text>
              <View
                style={[
                  styles.statusBadgeSmall,
                  {backgroundColor: colors.success + '20'},
                ]}>
                <Text style={[styles.statusTextSmall, {color: colors.success}]}>
                  {transaction.status}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </Card>

      {/* Saved Recipients */}
      <Card style={styles.sectionCard}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Saved Recipients</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Recipients' as never)}>
            <Text style={styles.addButton}>+</Text>
          </TouchableOpacity>
        </View>

        {savedRecipients.map((recipient) => (
          <TouchableOpacity
            key={recipient.id}
            style={styles.recipientItem}
            onPress={() => navigation.navigate('SendMoney' as never)}>
            <Text style={styles.recipientFlag}>{recipient.flag}</Text>
            <View style={styles.recipientInfo}>
              <Text style={styles.recipientName}>{recipient.name}</Text>
              <Text style={styles.recipientDetails}>
                {recipient.country} • {recipient.bank}
              </Text>
            </View>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={styles.viewAllButton}
          onPress={() => navigation.navigate('Recipients' as never)}>
          <Text style={styles.viewAllButtonText}>View All Recipients</Text>
        </TouchableOpacity>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logoContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.blue[500],
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitials: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 14,
  },
  balanceCard: {
    margin: 20,
    padding: 24,
    borderRadius: 24,
    shadowColor: colors.primary,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 32,
  },
  balanceLabel: {
    color: colors.blue[100],
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  balanceAmount: {
    color: colors.white,
    fontSize: 36,
    fontWeight: '700',
  },
  eyeButton: {
    padding: 8,
  },
  eyeIcon: {
    fontSize: 20,
  },
  statusBadge: {
    backgroundColor: colors.success + '40',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.success + '60',
  },
  statusText: {
    color: colors.success + 'CC',
    fontSize: 12,
    fontWeight: '700',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: colors.blue[400] + '40',
  },
  statItem: {
    flex: 1,
  },
  statLabel: {
    color: colors.blue[100],
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
  },
  statValue: {
    color: colors.white,
    fontSize: 20,
    fontWeight: '700',
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 20,
  },
  actionCard: {
    width: '47%',
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: colors.dark,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  actionIconText: {
    fontSize: 28,
  },
  actionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.dark,
  },
  sectionCard: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.dark,
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  addButton: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[100],
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  transactionIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  transactionFlag: {
    fontSize: 24,
  },
  transactionName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.dark,
  },
  transactionDate: {
    fontSize: 12,
    color: colors.gray[600],
    marginTop: 4,
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  amountSent: {
    color: colors.error,
  },
  amountReceived: {
    color: colors.success,
  },
  statusBadgeSmall: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusTextSmall: {
    fontSize: 10,
    fontWeight: '600',
  },
  recipientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    backgroundColor: colors.gray[50],
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: colors.gray[200],
  },
  recipientFlag: {
    fontSize: 32,
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
  viewAllButton: {
    marginTop: 12,
    padding: 16,
    backgroundColor: colors.gray[100],
    borderRadius: 12,
    alignItems: 'center',
  },
  viewAllButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.dark,
  },
});

export default DashboardScreen;

