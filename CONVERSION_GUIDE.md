# React Web → React Native Conversion Guide

This document outlines the conversion from the QuickBank web app (Next.js/React) to React Native mobile app.

## 📋 Overview

The entire QuickBank web application has been converted to a React Native mobile app for Android, maintaining:
- ✅ Same business logic
- ✅ Same API calls structure
- ✅ Same user flows
- ✅ Mobile-optimized UI

## 🔄 Component Conversions

### HTML → React Native Components

| Web (HTML/CSS) | React Native | Location |
|----------------|--------------|----------|
| `<div>` | `<View>` | All screens |
| `<span>`, `<p>` | `<Text>` | All screens |
| `<button>` | `<TouchableOpacity>` + `<Button>` | All screens |
| `<input>` | `<TextInput>` | Login, Signup, Forms |
| `<img>` | `<Image>` | (Not used yet, ready for icons) |
| CSS classes | `StyleSheet` | All components |
| `localStorage` | `AsyncStorage` | `src/services/storage.ts` |
| Next.js routing | React Navigation | `src/navigation/` |

## 📱 Screen Conversions

### 1. Login Screen
**Web:** `app/login/page.tsx` → **Mobile:** `src/screens/auth/LoginScreen.tsx`

**Changes:**
- Converted Tailwind classes to StyleSheet
- Replaced `Link` with `TouchableOpacity` for navigation
- Added `KeyboardAvoidingView` for mobile keyboard handling
- Password visibility toggle using emoji icons
- Same form validation and API calls

### 2. Signup Screen
**Web:** `app/signup/page.tsx` → **Mobile:** `src/screens/auth/SignupScreen.tsx`

**Changes:**
- Password strength indicator with checkmarks
- Mobile-optimized form layout
- Same validation rules
- Same API integration

### 3. Dashboard
**Web:** `app/dashboard/page.tsx` → **Mobile:** `src/screens/DashboardScreen.tsx`

**Changes:**
- Balance card with gradient using `react-native-linear-gradient`
- Quick action cards in grid layout
- Recent transactions list
- Pull-to-refresh functionality
- Same data fetching logic

### 4. Send Money
**Web:** `components/send/SendMoneyPage.tsx` → **Mobile:** `src/screens/SendMoneyScreen.tsx`

**Changes:**
- 4-step wizard flow maintained
- Step indicator with visual progress
- Recipient selection with radio buttons
- Amount input with currency formatting
- Conversion preview card
- Same calculation logic

### 5. Transactions
**Web:** `app/transactions/page.tsx` → **Mobile:** `src/screens/TransactionsScreen.tsx`

**Changes:**
- Stats cards in horizontal scroll
- Filter buttons (All/Sent/Received)
- Transaction list with FlatList
- Same filtering logic
- Same API calls

### 6. Profile
**Web:** `app/profile/page.tsx` → **Mobile:** `src/screens/ProfileScreen.tsx`

**Changes:**
- Avatar with initials
- Editable form fields
- Address information
- Document verification list
- Same data structure

### 7. Settings
**Web:** `app/settings/page.tsx` → **Mobile:** `src/screens/SettingsScreen.tsx`

**Changes:**
- Toggle switches for notifications
- Security settings
- Help & Support links
- Logout functionality
- Same settings structure

### 8. Receive Money
**Web:** `app/receive-money/page.tsx` → **Mobile:** `src/screens/ReceiveMoneyScreen.tsx`

**Changes:**
- Account details with copy functionality
- Step-by-step instructions
- Tips section
- Clipboard integration

### 9. Recipients
**Web:** `app/recipients/page.tsx` → **Mobile:** `src/screens/RecipientsScreen.tsx`

**Changes:**
- Search functionality
- Recipient cards in grid
- Quick stats
- Same CRUD operations

## 🎨 Styling Conversions

### Tailwind CSS → StyleSheet

**Before (Web):**
```tsx
<div className="card p-8 mb-8">
  <h3 className="text-2xl font-bold text-dark">Title</h3>
</div>
```

**After (Mobile):**
```tsx
<Card style={styles.card}>
  <Text style={styles.title}>Title</Text>
</Card>

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.dark,
  },
});
```

### Colors
All colors from `tailwind.config.ts` converted to `src/constants/colors.ts`:
- `primary: '#0066FF'`
- `success: '#22C55E'`
- `error: '#EF4444'`
- etc.

## 🔌 API & Storage

### API Service
**Location:** `src/services/api.ts`

All API calls maintain the same structure:
- `authAPI.login()` - Same parameters
- `authAPI.signup()` - Same parameters
- `transactionsAPI.getTransactions()` - Same return format
- `recipientsAPI.getRecipients()` - Same return format
- `walletAPI.getBalance()` - Same return format
- `sendMoneyAPI.sendMoney()` - Same parameters

**Note:** Currently using mock data. Replace with actual API endpoints when ready.

### Storage
**Location:** `src/services/storage.ts`

`localStorage` → `AsyncStorage`:
- `setAuthToken()` - Store auth token
- `getAuthToken()` - Retrieve auth token
- `setUserData()` - Store user data
- `getUserData()` - Retrieve user data
- `clearAll()` - Clear all stored data

## 🧭 Navigation

### Web (Next.js)
```tsx
import Link from 'next/link';
<Link href="/dashboard">Dashboard</Link>
```

### Mobile (React Navigation)
```tsx
import {useNavigation} from '@react-navigation/native';
const navigation = useNavigation();
navigation.navigate('Dashboard');
```

**Navigation Structure:**
- **Auth Stack:** Login → Signup
- **Main Stack:** 
  - **Tabs:** Dashboard, Send Money, Transactions, Profile
  - **Stack Screens:** Receive Money, Recipients, Settings

## 📦 Dependencies Added

| Package | Purpose |
|---------|---------|
| `@react-navigation/native` | Navigation |
| `@react-navigation/stack` | Stack navigation |
| `@react-navigation/bottom-tabs` | Tab navigation |
| `@react-native-async-storage/async-storage` | Local storage |
| `@react-native-clipboard/clipboard` | Clipboard operations |
| `react-native-linear-gradient` | Gradient backgrounds |
| `react-native-screens` | Native screen optimization |
| `react-native-safe-area-context` | Safe area handling |
| `react-native-gesture-handler` | Gesture support |

## 🚀 Key Features Maintained

1. **Authentication Flow**
   - Login with email/password
   - Signup with validation
   - Token-based authentication
   - Remember me functionality

2. **Dashboard**
   - Balance display with hide/show
   - Quick actions
   - Recent transactions
   - Saved recipients

3. **Send Money**
   - Multi-step flow
   - Recipient selection
   - Amount calculation
   - Fee calculation
   - Currency conversion

4. **Transaction History**
   - Filter by type (sent/received)
   - Filter by status
   - Transaction details
   - Statistics

5. **Profile Management**
   - Edit personal information
   - Address management
   - Document verification

6. **Settings**
   - Notification preferences
   - Security settings
   - Help & Support

## 📝 Notes

1. **Icons:** Currently using emoji icons. Can be replaced with `react-native-vector-icons` for better visuals.

2. **Images:** Image components are ready but not heavily used. Add images as needed.

3. **Animations:** Basic transitions. Can add `react-native-reanimated` for advanced animations.

4. **Offline Support:** Not implemented. Can add with `@react-native-community/netinfo`.

5. **Push Notifications:** UI ready, needs backend integration.

6. **Biometric Auth:** UI ready, needs native module integration.

## 🔧 Next Steps

1. **Initialize React Native Project:**
   ```bash
   cd quickbank-mobile-application
   npm install
   ```

2. **For Android:**
   ```bash
   npx react-native init QuickBank --template react-native-template-typescript
   # Then copy the src/ folder and App.tsx
   ```

3. **Connect to Backend:**
   - Update `API_BASE_URL` in `src/services/api.ts`
   - Replace mock API calls with real endpoints
   - Add authentication headers

4. **Add Native Modules:**
   - Biometric authentication
   - Push notifications
   - Deep linking

5. **Testing:**
   - Unit tests for services
   - Integration tests for screens
   - E2E tests with Detox

## ✅ Conversion Checklist

- [x] All screens converted
- [x] Navigation setup
- [x] API service layer
- [x] Storage service
- [x] UI components (Button, Input, Card)
- [x] Color constants
- [x] Authentication flow
- [x] All user flows maintained
- [x] Mobile-optimized layouts
- [x] README and documentation

## 📚 Resources

- [React Native Docs](https://reactnative.dev/)
- [React Navigation](https://reactnavigation.org/)
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)

