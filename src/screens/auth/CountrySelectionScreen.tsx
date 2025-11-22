import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
} from 'react-native';

interface CountrySelectionScreenProps {
  navigation?: any;
}

interface Country {
  id: string;
  name: string;
  flag: string;
  selected?: boolean;
}

const countries: Country[] = [
  {id: '1', name: 'Vietnamese', flag: '🇻🇳'},
  {id: '2', name: 'French', flag: '🇫🇷'},
  {id: '3', name: 'English', flag: '🇬🇧', selected: true},
  {id: '4', name: 'Japanese', flag: '🇯🇵'},
  {id: '5', name: 'Portuguese', flag: '🇵🇹'},
  {id: '6', name: 'China', flag: '🇨🇳'},
  {id: '7', name: 'Korea', flag: '🇰🇷'},
  {id: '8', name: 'Nicaragua', flag: '🇳🇮'},
  {id: '9', name: 'Russia', flag: '🇷🇺'},
];

const CountrySelectionScreen: React.FC<CountrySelectionScreenProps> = ({
  navigation,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string>('3');

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation?.goBack()}>
            <Text style={styles.backIcon}>⌄</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Select country</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder=""
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Country List */}
        <FlatList
          data={filteredCountries}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.countryItem}
              onPress={() => {
                setSelectedCountry(item.id);
                navigation?.navigate('CountryResidence');
              }}>
              <Text style={styles.flag}>{item.flag}</Text>
              <Text
                style={[
                  styles.countryName,
                  item.id === selectedCountry && styles.selectedCountryName,
                ]}>
                {item.name}
              </Text>
              {item.id === selectedCountry && (
                <Text style={styles.checkmark}>✓</Text>
              )}
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  backButton: {
    marginRight: 16,
  },
  backIcon: {
    fontSize: 20,
    color: '#1E3A8A',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E3A8A',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    marginHorizontal: 16,
    marginBottom: 16,
    paddingHorizontal: 16,
    borderRadius: 8,
    height: 48,
  },
  searchIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
  },
  countryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  flag: {
    fontSize: 24,
    marginRight: 12,
  },
  countryName: {
    flex: 1,
    fontSize: 16,
    color: '#6B7280',
  },
  selectedCountryName: {
    color: '#1F2937',
    fontWeight: '600',
  },
  checkmark: {
    fontSize: 20,
    color: '#4A69BD',
    fontWeight: 'bold',
  },
  separator: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginLeft: 52,
  },
});

export default CountrySelectionScreen;

