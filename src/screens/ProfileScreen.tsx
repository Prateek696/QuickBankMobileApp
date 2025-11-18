import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Card} from '../components/ui/Card';
import {Input} from '../components/ui/Input';
import {Button} from '../components/ui/Button';
import {colors} from '../constants/colors';
import {storage} from '../services/storage';

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 234-567-8900',
    dateOfBirth: '1990-01-15',
    country: 'United States',
    address: '123 Main Street',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
  });

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    const data = await storage.getUserData();
    if (data) {
      setUserData({...userData, ...data});
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile Settings</Text>
        <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
          <Text style={styles.editButton}>{isEditing ? 'Cancel' : 'Edit'}</Text>
        </TouchableOpacity>
      </View>

      {/* Profile Header */}
      <Card style={styles.profileCard}>
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>JD</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>
              {userData.firstName} {userData.lastName}
            </Text>
            <Text style={styles.profileEmail}>{userData.email}</Text>
            <View style={styles.verifiedBadge}>
              <Text style={styles.verifiedText}>✓ Verified Account</Text>
            </View>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Account Status</Text>
            <Text style={styles.statValue}>Active</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Member Since</Text>
            <Text style={styles.statValue}>March 2024</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Verification</Text>
            <Text style={styles.statValue}>Advanced</Text>
          </View>
        </View>
      </Card>

      {/* Personal Information */}
      <Card style={styles.card}>
        <Text style={styles.sectionTitle}>Personal Information</Text>

        <View style={styles.nameRow}>
          <View style={styles.nameInput}>
            <Input
              label="First Name"
              value={userData.firstName}
              onChangeText={(text) =>
                setUserData({...userData, firstName: text})
              }
              editable={isEditing}
            />
          </View>
          <View style={styles.nameInput}>
            <Input
              label="Last Name"
              value={userData.lastName}
              onChangeText={(text) =>
                setUserData({...userData, lastName: text})
              }
              editable={isEditing}
            />
          </View>
        </View>

        <Input
          label="Email"
          value={userData.email}
          onChangeText={(text) => setUserData({...userData, email: text})}
          editable={isEditing}
          keyboardType="email-address"
        />

        <Input
          label="Phone"
          value={userData.phone}
          onChangeText={(text) => setUserData({...userData, phone: text})}
          editable={isEditing}
          keyboardType="phone-pad"
        />

        <Input
          label="Date of Birth"
          value={userData.dateOfBirth}
          onChangeText={(text) =>
            setUserData({...userData, dateOfBirth: text})
          }
          editable={isEditing}
        />
      </Card>

      {/* Address Information */}
      <Card style={styles.card}>
        <Text style={styles.sectionTitle}>Address Information</Text>

        <Input
          label="Country"
          value={userData.country}
          onChangeText={(text) => setUserData({...userData, country: text})}
          editable={isEditing}
        />

        <Input
          label="Address"
          value={userData.address}
          onChangeText={(text) => setUserData({...userData, address: text})}
          editable={isEditing}
        />

        <View style={styles.addressRow}>
          <View style={styles.addressInput}>
            <Input
              label="City"
              value={userData.city}
              onChangeText={(text) => setUserData({...userData, city: text})}
              editable={isEditing}
            />
          </View>
          <View style={styles.addressInput}>
            <Input
              label="State"
              value={userData.state}
              onChangeText={(text) => setUserData({...userData, state: text})}
              editable={isEditing}
            />
          </View>
          <View style={styles.addressInput}>
            <Input
              label="Zip Code"
              value={userData.zipCode}
              onChangeText={(text) =>
                setUserData({...userData, zipCode: text})
              }
              editable={isEditing}
            />
          </View>
        </View>
      </Card>

      {/* Save Button */}
      {isEditing && (
        <View style={styles.saveContainer}>
          <Button
            title="Save Changes"
            onPress={() => {
              setIsEditing(false);
              // Save to storage/API
            }}
            style={styles.saveButton}
          />
        </View>
      )}

      {/* Documents */}
      <Card style={styles.card}>
        <Text style={styles.sectionTitle}>Documents</Text>
        {[
          {name: 'ID Verification', status: 'verified', date: '2024-03-15'},
          {name: 'Address Proof', status: 'verified', date: '2024-03-15'},
          {name: 'Bank Statement', status: 'verified', date: '2024-09-01'},
        ].map((doc, index) => (
          <View key={index} style={styles.documentItem}>
            <View>
              <Text style={styles.documentName}>{doc.name}</Text>
              <Text style={styles.documentDate}>Verified on {doc.date}</Text>
            </View>
            <View style={styles.verifiedBadgeSmall}>
              <Text style={styles.verifiedTextSmall}>
                {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
              </Text>
            </View>
          </View>
        ))}
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
    justifyContent: 'space-between',
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
    flex: 1,
  },
  editButton: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  profileCard: {
    margin: 20,
    marginBottom: 0,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.blue[500],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.white,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.dark,
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: colors.gray[600],
    marginBottom: 8,
  },
  verifiedBadge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.success + '20',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  verifiedText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.success,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  statItem: {
    flex: 1,
    backgroundColor: colors.gray[50],
    padding: 12,
    borderRadius: 12,
  },
  statLabel: {
    fontSize: 12,
    color: colors.gray[600],
    marginBottom: 4,
  },
  statValue: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.dark,
  },
  card: {
    margin: 20,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.dark,
    marginBottom: 20,
  },
  nameRow: {
    flexDirection: 'row',
    gap: 12,
  },
  nameInput: {
    flex: 1,
  },
  addressRow: {
    flexDirection: 'row',
    gap: 12,
  },
  addressInput: {
    flex: 1,
  },
  saveContainer: {
    padding: 20,
  },
  saveButton: {
    marginTop: 0,
  },
  documentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.gray[50],
    borderRadius: 12,
    marginBottom: 12,
  },
  documentName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.dark,
  },
  documentDate: {
    fontSize: 12,
    color: colors.gray[600],
    marginTop: 4,
  },
  verifiedBadgeSmall: {
    backgroundColor: colors.success + '20',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  verifiedTextSmall: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.success,
  },
});

export default ProfileScreen;

