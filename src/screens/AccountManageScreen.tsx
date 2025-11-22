import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';

interface AccountManageScreenProps {
  navigation?: any;
}

const AccountManageScreen: React.FC<AccountManageScreenProps> = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Title */}
        <Text style={styles.title}>Manage</Text>

        {/* Feature Cards */}
        <View style={styles.featureCards}>
          <TouchableOpacity
            style={styles.featureCard}
            onPress={() => navigation?.navigate('Referrals')}>
            <Text style={styles.featureIcon}>🎁</Text>
            <Text style={styles.featureTitle}>Refer Friends</Text>
            <Text style={styles.featureDescription}>
              Invite friends to earn rewards
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.featureCard}
            onPress={() => navigation?.navigate('Support')}>
            <Text style={styles.featureIcon}>❓</Text>
            <Text style={styles.featureTitle}>Help Center</Text>
            <Text style={styles.featureDescription}>
              Find answers and contact us
            </Text>
          </TouchableOpacity>
        </View>

        {/* Account Details Section */}
        <Text style={styles.sectionTitle}>Account Details</Text>

        {/* Sending To */}
        <TouchableOpacity style={styles.sendingToButton}>
          <Text style={styles.flag}>🇵🇰</Text>
          <Text style={styles.sendingToText}>Sending To Pakistan</Text>
          <Text style={styles.chevron}>⌄</Text>
        </TouchableOpacity>

        {/* Menu Items */}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation?.navigate('Profile')}>
          <View style={styles.menuIcon}>
            <Text style={styles.iconText}>👤</Text>
          </View>
          <Text style={styles.menuText}>Profile</Text>
          <View style={styles.verifiedBadge}>
            <Text style={styles.verifiedText}>VERIFIED</Text>
            <Text style={styles.verifiedCheck}>✓</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation?.navigate('Settings')}>
          <View style={styles.menuIcon}>
            <Text style={styles.iconText}>⚙️</Text>
          </View>
          <Text style={styles.menuText}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation?.navigate('AddCard')}>
          <View style={styles.menuIcon}>
            <Text style={styles.iconText}>💳</Text>
          </View>
          <Text style={styles.menuText}>Payment Methods</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuIcon}>
            <Text style={styles.iconText}>🏆</Text>
          </View>
          <Text style={styles.menuText}>Redeem Offers</Text>
        </TouchableOpacity>

        {/* Remitly Section */}
        <Text style={styles.sectionTitle}>Remitly</Text>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation?.navigate('Privacy')}>
          <Text style={styles.menuTextGray}>Privacy Choices</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFF6FF',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1E3A8A',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 24,
  },
  featureCards: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginBottom: 32,
    gap: 12,
  },
  featureCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  featureIcon: {
    fontSize: 32,
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E3A8A',
    marginBottom: 8,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 14,
    color: '#1E3A8A',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E3A8A',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  sendingToButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D1FAE5',
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 24,
    marginBottom: 24,
  },
  flag: {
    fontSize: 24,
    marginRight: 12,
  },
  sendingToText: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '500',
  },
  chevron: {
    fontSize: 20,
    color: '#6B7280',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    marginBottom: 1,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1E3A8A',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  iconText: {
    fontSize: 20,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '500',
  },
  menuTextGray: {
    flex: 1,
    fontSize: 16,
    color: '#6B7280',
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D1FAE5',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 4,
  },
  verifiedText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#10B981',
  },
  verifiedCheck: {
    fontSize: 12,
    color: '#FFFFFF',
  },
});

export default AccountManageScreen;

