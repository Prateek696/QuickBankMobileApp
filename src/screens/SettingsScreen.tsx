import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Card} from '../components/ui/Card';
import {colors} from '../constants/colors';
import {storage} from '../services/storage';
import {authAPI} from '../services/api';

interface SettingsScreenProps {
  updateAuthState?: (authenticated: boolean) => void;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({updateAuthState}) => {
  const navigation = useNavigation();
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    twoFactorAuth: true,
    biometricAuth: true,
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings({...settings, [key]: !settings[key]});
  };

  const handleLogout = async () => {
    await storage.clearAll();
    await authAPI.logout();
    updateAuthState?.(false);
  };

  const SettingToggle = ({
    label,
    value,
    onChange,
  }: {
    label: string;
    value: boolean;
    onChange: () => void;
  }) => (
    <View style={styles.settingRow}>
      <Text style={styles.settingLabel}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onChange}
        trackColor={{false: colors.gray[300], true: colors.primary}}
        thumbColor={colors.white}
      />
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
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      {/* Notifications */}
      <Card style={styles.card}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionIcon}>🔔</Text>
          <Text style={styles.sectionTitle}>Notifications</Text>
        </View>
        <SettingToggle
          label="Email Notifications"
          value={settings.emailNotifications}
          onChange={() => handleToggle('emailNotifications')}
        />
        <View style={styles.divider} />
        <SettingToggle
          label="SMS Notifications"
          value={settings.smsNotifications}
          onChange={() => handleToggle('smsNotifications')}
        />
        <View style={styles.divider} />
        <SettingToggle
          label="Push Notifications"
          value={settings.pushNotifications}
          onChange={() => handleToggle('pushNotifications')}
        />
      </Card>

      {/* Security */}
      <Card style={styles.card}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionIcon}>🔒</Text>
          <Text style={styles.sectionTitle}>Security</Text>
        </View>
        <SettingToggle
          label="Two-Factor Authentication"
          value={settings.twoFactorAuth}
          onChange={() => handleToggle('twoFactorAuth')}
        />
        <View style={styles.divider} />
        <SettingToggle
          label="Biometric Authentication"
          value={settings.biometricAuth}
          onChange={() => handleToggle('biometricAuth')}
        />
        <View style={styles.divider} />
        <TouchableOpacity style={styles.settingRow}>
          <View>
            <Text style={styles.settingLabel}>Change Password</Text>
            <Text style={styles.settingSubtext}>Update your password</Text>
          </View>
          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity style={styles.settingRow}>
          <View>
            <Text style={styles.settingLabel}>Active Sessions</Text>
            <Text style={styles.settingSubtext}>Manage your login sessions</Text>
          </View>
          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>
      </Card>

      {/* Help & Support */}
      <Card style={styles.card}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionIcon}>❓</Text>
          <Text style={styles.sectionTitle}>Help & Support</Text>
        </View>
        <TouchableOpacity style={styles.settingRow}>
          <Text style={styles.settingLabel}>Help Center</Text>
          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity style={styles.settingRow}>
          <Text style={styles.settingLabel}>Contact Support</Text>
          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity style={styles.settingRow}>
          <Text style={styles.settingLabel}>Report Issue</Text>
          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>
      </Card>

      {/* Legal */}
      <Card style={styles.card}>
        <Text style={styles.sectionTitle}>Legal</Text>
        <TouchableOpacity style={styles.settingRow}>
          <Text style={[styles.settingLabel, {color: colors.primary}]}>
            Privacy Policy
          </Text>
          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity style={styles.settingRow}>
          <Text style={[styles.settingLabel, {color: colors.primary}]}>
            Terms of Service
          </Text>
          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity style={styles.settingRow}>
          <Text style={[styles.settingLabel, {color: colors.primary}]}>
            Cookie Policy
          </Text>
          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>
      </Card>

      {/* Version */}
      <Card style={styles.versionCard}>
        <Text style={styles.versionText}>QuickBank Version 1.0.0</Text>
        <Text style={styles.versionSubtext}>Last updated: December 2024</Text>
      </Card>

      {/* Danger Zone */}
      <Card style={[styles.card, styles.dangerCard]}>
        <Text style={styles.dangerTitle}>Danger Zone</Text>
        <TouchableOpacity style={styles.dangerButton}>
          <Text style={styles.dangerButtonText}>Disconnect Devices</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.dangerButton}>
          <Text style={styles.dangerButtonText}>Logout All Devices</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.dangerButton, styles.deleteButton]}
          onPress={handleLogout}>
          <Text style={[styles.dangerButtonText, styles.deleteButtonText]}>
            Delete Account
          </Text>
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
  card: {
    margin: 20,
    marginTop: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.dark,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.dark,
  },
  settingSubtext: {
    fontSize: 12,
    color: colors.gray[600],
    marginTop: 4,
  },
  arrow: {
    fontSize: 18,
    color: colors.gray[400],
  },
  divider: {
    height: 1,
    backgroundColor: colors.gray[200],
    marginVertical: 8,
  },
  versionCard: {
    margin: 20,
    marginTop: 20,
    backgroundColor: colors.gray[50],
    alignItems: 'center',
    padding: 20,
  },
  versionText: {
    fontSize: 14,
    color: colors.gray[600],
    marginBottom: 4,
  },
  versionSubtext: {
    fontSize: 12,
    color: colors.gray[500],
  },
  dangerCard: {
    borderWidth: 2,
    borderColor: colors.error + '40',
  },
  dangerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.error,
    marginBottom: 16,
  },
  dangerButton: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.warning,
    marginBottom: 12,
    alignItems: 'center',
  },
  dangerButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.warning,
  },
  deleteButton: {
    borderColor: colors.error,
  },
  deleteButtonText: {
    color: colors.error,
  },
});

export default SettingsScreen;

