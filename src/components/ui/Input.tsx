import React from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
} from 'react-native';
import {colors} from '../../constants/colors';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  rightIcon,
  onRightIconPress,
  style,
  ...props
}) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, error && styles.inputError, style]}
          placeholderTextColor={colors.gray[400]}
          {...props}
        />
        {rightIcon && (
          <TouchableOpacity
            onPress={onRightIconPress}
            style={styles.rightIconContainer}
            activeOpacity={0.7}>
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.dark,
    marginBottom: 8,
  },
  inputContainer: {
    position: 'relative',
  },
  input: {
    borderWidth: 2,
    borderColor: colors.gray[200],
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: colors.dark,
    backgroundColor: colors.white,
  },
  inputError: {
    borderColor: colors.error,
  },
  rightIconContainer: {
    position: 'absolute',
    right: 12,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  errorText: {
    color: colors.error,
    fontSize: 12,
    marginTop: 4,
  },
});

