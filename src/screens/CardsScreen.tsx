import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';

interface Card {
  id: string;
  number: string;
  name: string;
  expiry: string;
  type: 'debit' | 'credit';
  isDefault: boolean;
}

interface CardsScreenProps {
  navigation?: any;
}

const CardsScreen: React.FC<CardsScreenProps> = ({navigation}) => {
  const [cards] = useState<Card[]>([
    {
      id: '1',
      number: '1234 5678 9012 3456',
      name: 'John Doe',
      expiry: '12/25',
      type: 'debit',
      isDefault: true,
    },
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>My Cards</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation?.navigate('AddCard')}>
            <Text style={styles.addButtonText}>+ Add Card</Text>
          </TouchableOpacity>
        </View>

        {/* Cards List */}
        {cards.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>💳</Text>
            <Text style={styles.emptyTitle}>No cards added</Text>
            <Text style={styles.emptyText}>
              Add a card to start making payments
            </Text>
            <TouchableOpacity
              style={styles.emptyAddButton}
              onPress={() => navigation?.navigate('AddCard')}>
              <Text style={styles.emptyAddButtonText}>Add Your First Card</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.cardsList}>
            {cards.map(card => (
              <View key={card.id} style={styles.cardItem}>
                {/* Card Preview */}
                <View style={styles.cardPreview}>
                  <View style={styles.cardHeader}>
                    <Text style={styles.cardType}>
                      {card.type === 'debit' ? 'Debit' : 'Credit'}
                    </Text>
                    {card.isDefault && (
                      <View style={styles.defaultBadge}>
                        <Text style={styles.defaultText}>DEFAULT</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.cardNumber}>{card.number}</Text>
                  <View style={styles.cardFooter}>
                    <Text style={styles.cardName}>{card.name}</Text>
                    <Text style={styles.cardExpiry}>{card.expiry}</Text>
                  </View>
                </View>

                {/* Card Actions */}
                <View style={styles.cardActions}>
                  <TouchableOpacity style={styles.actionButton}>
                    <Text style={styles.actionText}>Set as Default</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionButton}>
                    <Text style={[styles.actionText, styles.deleteText]}>
                      Delete
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Payment Methods Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Methods</Text>
          <TouchableOpacity
            style={styles.paymentMethodItem}
            onPress={() => navigation?.navigate('AddCard')}>
            <Text style={styles.paymentMethodIcon}>💳</Text>
            <Text style={styles.paymentMethodText}>Add Card</Text>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1E3A8A',
  },
  addButton: {
    backgroundColor: '#1E3A8A',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 64,
    paddingHorizontal: 24,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  emptyAddButton: {
    backgroundColor: '#1E3A8A',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  emptyAddButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  cardsList: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  cardItem: {
    marginBottom: 24,
  },
  cardPreview: {
    backgroundColor: '#1E3A8A',
    borderRadius: 16,
    padding: 24,
    marginBottom: 12,
    minHeight: 200,
    justifyContent: 'space-between',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardType: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  defaultBadge: {
    backgroundColor: '#22C55E',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  defaultText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  cardNumber: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: 2,
    marginVertical: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardName: {
    fontSize: 16,
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
  cardExpiry: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
  },
  actionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  actionText: {
    fontSize: 14,
    color: '#1E3A8A',
    fontWeight: '500',
  },
  deleteText: {
    color: '#EF4444',
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
  paymentMethodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
  },
  paymentMethodIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  paymentMethodText: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '500',
  },
  chevron: {
    fontSize: 20,
    color: '#9CA3AF',
  },
});

export default CardsScreen;

