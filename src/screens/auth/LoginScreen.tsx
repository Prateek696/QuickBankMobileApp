import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Input} from '../../components/ui/Input';
import {Button} from '../../components/ui/Button';
import {Card} from '../../components/ui/Card';
import {colors} from '../../constants/colors';
import {authAPI} from '../../services/api';
import {storage} from '../../services/storage';

const EyeIcon = ({visible}: {visible: boolean}) => (
  <Text style={{fontSize: 18}}>{visible ? '👁️' : '👁️‍🗨️'}</Text>
);

interface LoginScreenProps {
  updateAuthState?: (authenticated: boolean) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({updateAuthState}) => {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({email: '', password: ''});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (field: string, value: string) => {
    setFormData({...formData, [field]: value});
    setError('');
  };

  const handleSubmit = async () => {
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await authAPI.login(formData);
      await storage.setAuthToken(response.token);
      await storage.setUserData(response.user);
      updateAuthState?.(true);
      setLoading(false);
    } catch (err: any) {
      setError(err.message || 'Login failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.logo}>💸</Text>
          <Text style={styles.title}>Welcome back to QuickBank</Text>
          <Text style={styles.subtitle}>
            Sign in to manage transfers, wallets, and recipients across 150+ countries.
          </Text>
        </View>

        <Card style={styles.card}>
          <Text style={styles.cardTitle}>Sign in to QuickBank</Text>
          <Text style={styles.cardSubtitle}>
            Manage your transfers, rate alerts, and trusted recipients in seconds.
          </Text>

          {error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          <Input
            label="Email address"
            placeholder="you@example.com"
            value={formData.email}
            onChangeText={(text) => handleChange('email', text)}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />

          <Input
            label="Password"
            placeholder="Enter your password"
            value={formData.password}
            onChangeText={(text) => handleChange('password', text)}
            secureTextEntry={!showPassword}
            rightIcon={<EyeIcon visible={showPassword} />}
            onRightIconPress={() => setShowPassword(!showPassword)}
          />

          <TouchableOpacity
            onPress={() => {
              // Navigate to forgot password
            }}
            style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot password?</Text>
          </TouchableOpacity>

          <Button
            title="Sign In"
            onPress={handleSubmit}
            loading={loading}
            style={styles.button}
          />

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.socialButtons}>
            <Button
              title="Google"
              onPress={() => {}}
              variant="outline"
              style={styles.socialButton}
            />
            <Button
              title="Facebook"
              onPress={() => {}}
              variant="outline"
              style={styles.socialButton}
            />
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Signup' as never)}>
              <Text style={styles.footerLink}>Sign up now</Text>
            </TouchableOpacity>
          </View>
        </Card>

        <View style={styles.securityNote}>
          <Text style={styles.securityText}>
            🔒 Your login is protected with bank-level encryption
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[50],
  },
  scrollContent: {
    padding: 20,
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logo: {
    fontSize: 64,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.dark,
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: colors.gray[600],
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  card: {
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.dark,
    marginBottom: 8,
  },
  cardSubtitle: {
    fontSize: 14,
    color: colors.gray[600],
    marginBottom: 24,
  },
  errorContainer: {
    backgroundColor: colors.error + '10',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    color: colors.error,
    fontSize: 14,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  button: {
    marginBottom: 24,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.gray[200],
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 12,
    fontWeight: '600',
    color: colors.gray[400],
    letterSpacing: 2,
  },
  socialButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  socialButton: {
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: colors.gray[600],
  },
  footerLink: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
  securityNote: {
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.gray[200],
    marginTop: 20,
  },
  securityText: {
    fontSize: 14,
    color: colors.gray[600],
    textAlign: 'center',
  },
});

export default LoginScreen;

