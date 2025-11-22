import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';

interface PayBillsScreenProps {
  navigation?: any;
}

const PayBillsScreen: React.FC<PayBillsScreenProps> = ({navigation}) => {
  const billCategories = [
    {icon: '📱', title: 'Airtime', color: '#3B82F6'},
    {icon: '💡', title: 'Electricity', color: '#F59E0B'},
    {icon: '💧', title: 'Water', color: '#10B981'},
    {icon: '📺', title: 'TV/Cable', color: '#EF4444'},
    {icon: '🌐', title: 'Internet', color: '#8B5CF6'},
    {icon: '🏠', title: 'Rent', color: '#EC4899'},
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Pay Bills</Text>
          <Text style={styles.subtitle}>Quick and easy bill payments</Text>
        </View>

        {/* Bill Categories Grid */}
        <View style={styles.grid}>
          {billCategories.map((category, index) => (
            <TouchableOpacity key={index} style={styles.categoryCard}>
              <View style={[styles.categoryIcon, {backgroundColor: `${category.color}20`}]}>
                <Text style={styles.categoryIconText}>{category.icon}</Text>
              </View>
              <Text style={styles.categoryTitle}>{category.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recent Bills */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Bills</Text>
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No recent bills</Text>
          </View>
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  categoryCard: {
    width: '30%',
    alignItems: 'center',
    marginBottom: 24,
    marginRight: '3.33%',
  },
  categoryIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  categoryIconText: {
    fontSize: 32,
  },
  categoryTitle: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
  },
  emptyState: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 32,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: '#9CA3AF',
  },
});

export default PayBillsScreen;

