import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';

interface MenuItem {
  icon: string;
  title: string;
  description: string;
  route: string;
}

interface ProfileScreenProps {
  navigation?: any;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({navigation}) => {
  const menuItems: MenuItem[] = [
    {
      icon: '💼',
      title: 'Pay Bills',
      description: 'Pay for bills like airtime',
      route: 'PayBills',
    },
    {
      icon: '👤',
      title: 'Account',
      description: 'Manage your personal information',
      route: 'Account',
    },
    {
      icon: '📄',
      title: 'Transfer History',
      description: 'View you transfer',
      route: 'TransferHistory',
    },
    {
      icon: '💳',
      title: 'Add Card',
      description: 'Add and manage your cards',
      route: 'AddCard',
    },
    {
      icon: '🛡️',
      title: 'Settings',
      description: 'Device settings and security',
      route: 'Settings',
    },
    {
      icon: '❓',
      title: 'Support',
      description: 'Find answers to your queries',
      route: 'Support',
    },
    {
      icon: 'ℹ️',
      title: 'Legal Documents',
      description: 'Legal notices and agreements',
      route: 'LegalDocuments',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* User Info */}
        <View style={styles.userInfo}>
          <Text style={styles.username}>Username</Text>
          <Text style={styles.email}>Useremail@gmail.com</Text>
          <Text style={styles.phone}>+91 67483xxxx</Text>
        </View>

        {/* Menu Items */}
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => {
              if (item.route === 'Account') {
                navigation?.navigate('AccountManage');
              } else {
                navigation?.navigate(item.route);
              }
            }}>
            <View style={styles.menuIcon}>
              <Text style={styles.iconText}>{item.icon}</Text>
            </View>
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuTitle}>{item.title}</Text>
              <Text style={styles.menuDescription}>{item.description}</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  userInfo: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 32,
  },
  username: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1E3A8A',
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
    color: '#6C7A89',
    marginBottom: 4,
  },
  phone: {
    fontSize: 16,
    color: '#6C7A89',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  menuIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#1E3A8A',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  iconText: {
    fontSize: 24,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 4,
  },
  menuDescription: {
    fontSize: 14,
    color: '#6C7A89',
  },
  chevron: {
    fontSize: 20,
    color: '#D1D5DB',
  },
});

export default ProfileScreen;

