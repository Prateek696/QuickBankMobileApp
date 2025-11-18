import React, {useState, useEffect} from 'react';
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
import {recipientsAPI} from '../services/api';
import type {Recipient} from '../services/api';

const RecipientsScreen: React.FC = () => {
  const navigation = useNavigation();
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadRecipients();
  }, []);

  const loadRecipients = async () => {
    const data = await recipientsAPI.getRecipients();
    setRecipients(data);
  };

  const filteredRecipients = recipients.filter(
    (r) =>
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.country.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleDelete = (id: number) => {
    setRecipients(recipients.filter((r) => r.id !== id));
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Recipients</Text>
        <TouchableOpacity
          onPress={() => {
            // Navigate to add recipient
          }}
          style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search recipients by name or country..."
          value={searchTerm}
          onChangeText={setSearchTerm}
          placeholderTextColor={colors.gray[400]}
        />
      </View>

      {/* Recipients List */}
      {filteredRecipients.length > 0 ? (
        <View style={styles.recipientsGrid}>
          {filteredRecipients.map((recipient) => (
            <Card key={recipient.id} style={styles.recipientCard}>
              <View style={styles.recipientHeader}>
                <View style={styles.recipientInfo}>
                  <Text style={styles.recipientFlag}>{recipient.flag}</Text>
                  <View>
                    <Text style={styles.recipientName}>{recipient.name}</Text>
                    <Text style={styles.recipientCountry}>{recipient.country}</Text>
                  </View>
                </View>
                <TouchableOpacity>
                  <Text style={styles.moreIcon}>⋯</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.recipientDetails}>
                <View style={styles.recipientDetailRow}>
                  <Text style={styles.recipientDetailLabel}>Bank</Text>
                  <Text style={styles.recipientDetailValue}>{recipient.bank}</Text>
                </View>
                <View style={styles.recipientDetailRow}>
                  <Text style={styles.recipientDetailLabel}>Account</Text>
                  <Text style={styles.recipientDetailValue}>
                    {recipient.accountNumber || '****1234'}
                  </Text>
                </View>
              </View>

              <View style={styles.recipientActions}>
                <Button
                  title="Send"
                  onPress={() => navigation.navigate('SendMoney' as never)}
                  style={styles.actionButton}
                />
                <TouchableOpacity
                  style={styles.iconButton}
                  onPress={() => {
                    // Edit recipient
                  }}>
                  <Text style={styles.iconButtonText}>✏️</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.iconButton}
                  onPress={() => handleDelete(recipient.id)}>
                  <Text style={styles.iconButtonText}>🗑️</Text>
                </TouchableOpacity>
              </View>
            </Card>
          ))}
        </View>
      ) : (
        <Card style={styles.emptyCard}>
          <Text style={styles.emptyText}>No recipients found</Text>
          <Button
            title="Add Your First Recipient"
            onPress={() => {}}
            style={styles.emptyButton}
          />
        </Card>
      )}

      {/* Quick Stats */}
      <View style={styles.statsContainer}>
        <Card style={styles.statCard}>
          <Text style={styles.statIcon}>📤</Text>
          <Text style={styles.statLabel}>Total Recipients</Text>
          <Text style={styles.statValue}>{recipients.length}</Text>
        </Card>
        <Card style={styles.statCard}>
          <Text style={styles.statIcon}>🌍</Text>
          <Text style={styles.statLabel}>Countries</Text>
          <Text style={styles.statValue}>
            {new Set(recipients.map((r) => r.country)).size}
          </Text>
        </Card>
        <Card style={styles.statCard}>
          <Text style={styles.statIcon}>📱</Text>
          <Text style={styles.statLabel}>Quick Access</Text>
          <Text style={styles.statSubtext}>3 most used saved</Text>
        </Card>
      </View>
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
    flex: 1,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.white,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 20,
    marginBottom: 0,
    paddingHorizontal: 16,
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.gray[200],
  },
  searchIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
    color: colors.dark,
  },
  recipientsGrid: {
    padding: 20,
    gap: 16,
  },
  recipientCard: {
    marginBottom: 0,
  },
  recipientHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  recipientInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  recipientFlag: {
    fontSize: 40,
  },
  recipientName: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.dark,
  },
  recipientCountry: {
    fontSize: 14,
    color: colors.gray[600],
    marginTop: 4,
  },
  moreIcon: {
    fontSize: 24,
    color: colors.gray[400],
  },
  recipientDetails: {
    backgroundColor: colors.gray[50],
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  recipientDetailRow: {
    marginBottom: 8,
  },
  recipientDetailLabel: {
    fontSize: 12,
    color: colors.gray[600],
    marginBottom: 4,
  },
  recipientDetailValue: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.dark,
    fontFamily: 'monospace',
  },
  recipientActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    marginTop: 0,
  },
  iconButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: colors.gray[100],
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconButtonText: {
    fontSize: 20,
  },
  emptyCard: {
    margin: 20,
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: colors.gray[600],
    marginBottom: 24,
  },
  emptyButton: {
    maxWidth: 200,
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  statIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 12,
    color: colors.gray[600],
    marginBottom: 8,
    textAlign: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
  },
  statSubtext: {
    fontSize: 12,
    color: colors.gray[600],
    textAlign: 'center',
  },
});

export default RecipientsScreen;

