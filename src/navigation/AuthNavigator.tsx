import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';

const Stack = createStackNavigator();

interface AuthNavigatorProps {
  updateAuthState?: (authenticated: boolean) => void;
}

const AuthNavigator: React.FC<AuthNavigatorProps> = ({updateAuthState}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: '#FFFFFF'},
      }}>
      <Stack.Screen name="Login">
        {() => <LoginScreen updateAuthState={updateAuthState} />}
      </Stack.Screen>
      <Stack.Screen name="Signup">
        {() => <SignupScreen updateAuthState={updateAuthState} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default AuthNavigator;

