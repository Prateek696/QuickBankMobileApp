import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../../constants/colors';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  style,
  textStyle,
}) => {
  if (variant === 'primary') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        style={[styles.button, style, disabled && styles.disabled]}
        activeOpacity={0.8}>
        <LinearGradient
          colors={[colors.primary, colors.blue[600]]}
          style={styles.gradient}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}>
          {loading ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            <Text style={[styles.primaryText, textStyle]}>{title}</Text>
          )}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  if (variant === 'outline') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        style={[styles.outlineButton, style, disabled && styles.disabled]}
        activeOpacity={0.8}>
        {loading ? (
          <ActivityIndicator color={colors.primary} />
        ) : (
          <Text style={[styles.outlineText, textStyle]}>{title}</Text>
        )}
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[styles.secondaryButton, style, disabled && styles.disabled]}
      activeOpacity={0.8}>
      {loading ? (
        <ActivityIndicator color={colors.dark} />
      ) : (
        <Text style={[styles.secondaryText, textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: colors.primary,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  gradient: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  primaryText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: colors.gray[100],
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.gray[200],
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  secondaryText: {
    color: colors.dark,
    fontSize: 16,
    fontWeight: '600',
  },
  outlineButton: {
    backgroundColor: 'transparent',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  outlineText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  disabled: {
    opacity: 0.5,
  },
});

