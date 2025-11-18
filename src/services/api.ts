/**
 * API Service
 * Centralized API calls for the QuickBank mobile app
 * Replace with actual backend endpoints when ready
 */

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000/api';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
}

export interface Transaction {
  id: number;
  recipient: string;
  amount: number;
  type: 'sent' | 'received';
  date: string;
  status: 'completed' | 'pending' | 'failed';
  reference?: string;
  flag?: string;
}

export interface Recipient {
  id: number;
  name: string;
  country: string;
  bank: string;
  flag: string;
  accountNumber?: string;
}

// Auth API
export const authAPI = {
  login: async (credentials: LoginCredentials): Promise<{ user: User; token: string }> => {
    // TODO: Replace with actual API call
    console.log('Login attempt:', credentials);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          user: {
            id: '1',
            firstName: 'John',
            lastName: 'Doe',
            email: credentials.email,
          },
          token: 'mock-token-123',
        });
      }, 1000);
    });
  },

  signup: async (data: SignupData): Promise<{ user: User; token: string }> => {
    // TODO: Replace with actual API call
    console.log('Signup attempt:', data);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          user: {
            id: '1',
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
          },
          token: 'mock-token-123',
        });
      }, 1000);
    });
  },

  logout: async (): Promise<void> => {
    // TODO: Replace with actual API call
    console.log('Logout');
  },
};

// Transactions API
export const transactionsAPI = {
  getTransactions: async (): Promise<Transaction[]> => {
    // TODO: Replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 1, recipient: 'Sarah Johnson', amount: 150, type: 'sent', date: '2024-12-15', status: 'completed', reference: 'TXN001234', flag: '🇬🇧' },
          { id: 2, recipient: 'Mike Chen', amount: 75, type: 'sent', date: '2024-12-14', status: 'completed', reference: 'TXN001235', flag: '🇨🇦' },
          { id: 3, recipient: 'Emma Davis', amount: 200, type: 'received', date: '2024-12-10', status: 'completed', reference: 'TXN001236', flag: '🇦🇺' },
          { id: 4, recipient: 'John Smith', amount: 50, type: 'sent', date: '2024-12-09', status: 'pending', reference: 'TXN001237', flag: '🇺🇸' },
        ]);
      }, 500);
    });
  },
};

// Recipients API
export const recipientsAPI = {
  getRecipients: async (): Promise<Recipient[]> => {
    // TODO: Replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 1, name: 'Sarah Johnson', country: 'UK', bank: 'Barclays', flag: '🇬🇧', accountNumber: '****4567' },
          { id: 2, name: 'Mike Chen', country: 'Canada', bank: 'TD Bank', flag: '🇨🇦', accountNumber: '****8901' },
          { id: 3, name: 'Emma Davis', country: 'Australia', bank: 'NAB', flag: '🇦🇺', accountNumber: '****2345' },
        ]);
      }, 500);
    });
  },
};

// Wallet/Balance API
export const walletAPI = {
  getBalance: async (): Promise<{ balance: number; currency: string }> => {
    // TODO: Replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ balance: 5432.5, currency: 'USD' });
      }, 500);
    });
  },
};

// Send Money API
export const sendMoneyAPI = {
  sendMoney: async (data: {
    recipientId: number;
    amount: number;
    currency: string;
    purpose: string;
  }): Promise<{ success: boolean; transactionId: string }> => {
    // TODO: Replace with actual API call
    console.log('Send money:', data);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, transactionId: 'TXN' + Date.now() });
      }, 1500);
    });
  },
};

