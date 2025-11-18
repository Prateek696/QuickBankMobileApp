import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import DashboardScreen from '../screens/DashboardScreen';
import SendMoneyScreen from '../screens/SendMoneyScreen';
import TransactionsScreen from '../screens/TransactionsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ReceiveMoneyScreen from '../screens/ReceiveMoneyScreen';
import RecipientsScreen from '../screens/RecipientsScreen';
import {colors} from '../constants/colors';
import {Text} from 'react-native';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

interface MainNavigatorProps {
  updateAuthState?: (authenticated: boolean) => void;
}

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.gray[500],
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: colors.gray[200],
          paddingBottom: 8,
          paddingTop: 8,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}>
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => <Text style={{color, fontSize: 20}}>🏠</Text>,
        }}
      />
      <Tab.Screen
        name="SendMoney"
        component={SendMoneyScreen}
        options={{
          tabBarLabel: 'Send',
          tabBarIcon: ({color}) => <Text style={{color, fontSize: 20}}>💸</Text>,
        }}
      />
      <Tab.Screen
        name="Transactions"
        component={TransactionsScreen}
        options={{
          tabBarLabel: 'History',
          tabBarIcon: ({color}) => <Text style={{color, fontSize: 20}}>📊</Text>,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color}) => <Text style={{color, fontSize: 20}}>👤</Text>,
        }}
      />
    </Tab.Navigator>
  );
};

const MainNavigator: React.FC<MainNavigatorProps> = ({updateAuthState}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: colors.gray[50]},
      }}>
      <Stack.Screen name="Tabs" component={TabNavigator} />
      <Stack.Screen name="ReceiveMoney" component={ReceiveMoneyScreen} />
      <Stack.Screen name="Recipients" component={RecipientsScreen} />
      <Stack.Screen name="Settings">
        {() => <SettingsScreen updateAuthState={updateAuthState} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default MainNavigator;

