import React, {useState, useMemo} from 'react';
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

const CheckIcon = ({checked}: {checked: boolean}) => (
  <Text style={{fontSize: 16, color: checked ? colors.success : colors.gray[300]}}>
    {checked ? '✓' : '○'}
  </Text>
);

interface SignupScreenProps {
  updateAuthState?: (authenticated: boolean) => void;
}

const SignupScreen: React.FC<SignupScreenProps> = ({updateAuthState}) => {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const passwordStrength = useMemo(
    () => ({
      hasLength: formData.password.length >= 8,
      hasUppercase: /[A-Z]/.test(formData.password),
      hasNumber: /[0-9]/.test(formData.password),
    }),
    [formData.password],
  );

  const handleChange = (field: string, value: string) => {
    setFormData({...formData, [field]: value});
    setError('');
  };

  const handleSubmit = async () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!passwordStrength.hasLength || !passwordStrength.hasUppercase || !passwordStrength.hasNumber) {
      setError('Password does not meet requirements');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await authAPI.signup(formData);
      await storage.setAuthToken(response.token);
      await storage.setUserData(response.user);
      updateAuthState?.(true);
      setLoading(false);
    } catch (err: any) {
      setError(err.message || 'Signup failed. Please try again.');
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
          <Text style={styles.logo}>🛡️</Text>
          <Text style={styles.title}>Create your QuickBank account</Text>
          <Text style={styles.subtitle}>
            Join over 2M users already moving money globally with transparent fees and delivery guarantees.
          </Text>
        </View>

        <Card style={styles.card}>
          <Text style={styles.cardTitle}>Let's get you started</Text>
          <Text style={styles.cardSubtitle}>
            Create your account to send, receive, and manage wallets globally.
          </Text>

          {error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          <View style={styles.nameRow}>
            <View style={styles.nameInput}>
              <Input
                label="First name"
                placeholder="John"
                value={formData.firstName}
                onChangeText={(text) => handleChange('firstName', text)}
                autoCapitalize="words"
              />
            </View>
            <View style={styles.nameInput}>
              <Input
                label="Last name"
                placeholder="Doe"
                value={formData.lastName}
                onChangeText={(text) => handleChange('lastName', text)}
                autoCapitalize="words"
              />
            </View>
          </View>

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
            placeholder="Create a strong password"
            value={formData.password}
            onChangeText={(text) => handleChange('password', text)}
            secureTextEntry={!showPassword}
            rightIcon={<EyeIcon visible={showPassword} />}
            onRightIconPress={() => setShowPassword(!showPassword)}
          />

          <Input
            label="Confirm password"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChangeText={(text) => handleChange('confirmPassword', text)}
            secureTextEntry={!showConfirmPassword}
            rightIcon={<EyeIcon visible={showConfirmPassword} />}
            onRightIconPress={() => setShowConfirmPassword(!showConfirmPassword)}
          />

          <View style={styles.passwordRequirements}>
            <Text style={styles.requirementsTitle}>Password requirements</Text>
            <View style={styles.requirementItem}>
              <CheckIcon checked={passwordStrength.hasLength} />
              <Text
                style={[
                  styles.requirementText,
                  passwordStrength.hasLength && styles.requirementTextMet,
                ]}>
                At least 8 characters
              </Text>
            </View>
            <View style={styles.requirementItem}>
              <CheckIcon checked={passwordStrength.hasUppercase} />
              <Text
                style={[
                  styles.requirementText,
                  passwordStrength.hasUppercase && styles.requirementTextMet,
                ]}>
                One uppercase letter
              </Text>
            </View>
            <View style={styles.requirementItem}>
              <CheckIcon checked={passwordStrength.hasNumber} />
              <Text
                style={[
                  styles.requirementText,
                  passwordStrength.hasNumber && styles.requirementTextMet,
                ]}>
                One number
              </Text>
            </View>
          </View>

          <Button
            title="Create Account"
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
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.footerLink}>Sign in</Text>
            </TouchableOpacity>
          </View>
        </Card>

        <View style={styles.securityNote}>
          <Text style={styles.securityText}>
            ✨ Join 2M+ users and start sending money instantly
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
  nameRow: {
    flexDirection: 'row',
    gap: 12,
  },
  nameInput: {
    flex: 1,
  },
  passwordRequirements: {
    backgroundColor: colors.blue[50],
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.blue[100],
    marginBottom: 24,
  },
  requirementsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.dark,
    marginBottom: 12,
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  requirementText: {
    fontSize: 12,
    color: colors.gray[500],
  },
  requirementTextMet: {
    color: colors.dark,
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

export default SignupScreen;

