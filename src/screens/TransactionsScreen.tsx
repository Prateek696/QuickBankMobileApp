import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Card} from '../components/ui/Card';
import {colors} from '../constants/colors';
import {transactionsAPI} from '../services/api';
import type {Transaction} from '../services/api';

const TransactionsScreen: React.FC = () => {
  const navigation = useNavigation();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filterType, setFilterType] = useState<'all' | 'sent' | 'received'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'pending' | 'failed'>('all');

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    const data = await transactionsAPI.getTransactions();
    setTransactions(data);
  };

  const filteredTransactions = transactions.filter((tx) => {
    const typeMatch = filterType === 'all' || tx.type === filterType;
    const statusMatch = filterStatus === 'all' || tx.status === filterStatus;
    return typeMatch && statusMatch;
  });

  const stats = {
    totalSent: transactions
      .filter((t) => t.type === 'sent')
      .reduce((sum, t) => sum + t.amount, 0),
    totalReceived: transactions
      .filter((t) => t.type === 'received')
      .reduce((sum, t) => sum + t.amount, 0),
    monthlyAverage: 1240,
  };

  const renderTransaction = ({item}: {item: Transaction}) => (
    <View style={styles.transactionRow}>
      <View style={styles.transactionLeft}>
        <View
          style={[
            styles.transactionIcon,
            item.type === 'sent'
              ? {backgroundColor: colors.error + '20'}
              : {backgroundColor: colors.success + '20'},
          ]}>
          <Text style={styles.transactionIconText}>
            {item.type === 'sent' ? '↑' : '↓'}
          </Text>
        </View>
        <View>
          <Text style={styles.transactionName}>{item.recipient}</Text>
          <Text style={styles.transactionDate}>{item.date}</Text>
        </View>
      </View>
      <View style={styles.transactionRight}>
        <Text
          style={[
            styles.transactionAmount,
            item.type === 'sent' ? styles.amountSent : styles.amountReceived,
          ]}>
          {item.type === 'sent' ? '-' : '+'} ${item.amount}
        </Text>
        <View
          style={[
            styles.statusBadge,
            {
              backgroundColor:
                item.status === 'completed'
                  ? colors.success + '20'
                  : item.status === 'pending'
                  ? colors.warning + '20'
                  : colors.error + '20',
            },
          ]}>
          <Text
            style={[
              styles.statusText,
              {
                color:
                  item.status === 'completed'
                    ? colors.success
                    : item.status === 'pending'
                    ? colors.warning
                    : colors.error,
              },
            ]}>
            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Transaction History</Text>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <Card style={styles.statCard}>
          <Text style={styles.statLabel}>Total Sent</Text>
          <Text style={[styles.statValue, {color: colors.error}]}>
            ${stats.totalSent.toFixed(2)}
          </Text>
        </Card>
        <Card style={styles.statCard}>
          <Text style={styles.statLabel}>Total Received</Text>
          <Text style={[styles.statValue, {color: colors.success}]}>
            ${stats.totalReceived.toFixed(2)}
          </Text>
        </Card>
        <Card style={styles.statCard}>
          <Text style={styles.statLabel}>Monthly Avg</Text>
          <Text style={[styles.statValue, {color: colors.primary}]}>
            ${stats.monthlyAverage.toFixed(2)}
          </Text>
        </Card>
      </View>

      {/* Filters */}
      <Card style={styles.filterCard}>
        <View style={styles.filterRow}>
          <TouchableOpacity
            onPress={() => setFilterType('all')}
            style={[
              styles.filterButton,
              filterType === 'all' && styles.filterButtonActive,
            ]}>
            <Text
              style={[
                styles.filterButtonText,
                filterType === 'all' && styles.filterButtonTextActive,
              ]}>
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setFilterType('sent')}
            style={[
              styles.filterButton,
              filterType === 'sent' && styles.filterButtonActive,
            ]}>
            <Text
              style={[
                styles.filterButtonText,
                filterType === 'sent' && styles.filterButtonTextActive,
              ]}>
              Sent
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setFilterType('received')}
            style={[
              styles.filterButton,
              filterType === 'received' && styles.filterButtonActive,
            ]}>
            <Text
              style={[
                styles.filterButtonText,
                filterType === 'received' && styles.filterButtonTextActive,
              ]}>
              Received
            </Text>
          </TouchableOpacity>
        </View>
      </Card>

      {/* Transactions List */}
      <Card style={styles.transactionsCard}>
        <FlatList
          data={filteredTransactions}
          renderItem={renderTransaction}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false}
        />
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
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
  },
  backButton: {
    marginRight: 16,
  },
  backIcon: {
    fontSize: 24,
    color: colors.gray[600],
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    padding: 16,
  },
  statLabel: {
    fontSize: 12,
    color: colors.gray[600],
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  filterCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 16,
  },
  filterRow: {
    flexDirection: 'row',
    gap: 8,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: colors.gray[100],
    alignItems: 'center',
  },
  filterButtonActive: {
    backgroundColor: colors.primary,
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.gray[700],
  },
  filterButtonTextActive: {
    color: colors.white,
  },
  transactionsCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 16,
  },
  transactionRow: {
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
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  transactionIconText: {
    fontSize: 20,
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
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  amountSent: {
    color: colors.error,
  },
  amountReceived: {
    color: colors.success,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
  },
});

export default TransactionsScreen;

