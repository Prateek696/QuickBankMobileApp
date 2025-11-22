import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

interface DatePickerScreenProps {
  navigation?: any;
  route?: any;
}

const DatePickerScreen: React.FC<DatePickerScreenProps> = ({
  navigation,
  route,
}) => {
  const [selectedDate, setSelectedDate] = useState('22 November 2000');
  const [selectedDay, setSelectedDay] = useState(22);
  const [currentMonth, setCurrentMonth] = useState(11); // November
  const [currentYear, setCurrentYear] = useState(2000);

  // Generate calendar days for November 2000
  const generateCalendarDays = () => {
    const days = [];
    const firstDay = new Date(currentYear, currentMonth - 1, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
    
    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const calendarDays = generateCalendarDays();
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handleDaySelect = (day: number) => {
    if (day) {
      setSelectedDay(day);
      const dateStr = `${day} ${monthNames[currentMonth - 1]} ${currentYear}`;
      setSelectedDate(dateStr);
    }
  };

  const handlePrevMonth = () => {
    if (currentMonth === 1) {
      setCurrentMonth(12);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 12) {
      setCurrentMonth(1);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleOk = () => {
    // Pass selected date back to previous screen via callback
    if (route?.params?.onDateSelect) {
      route.params.onDateSelect(selectedDate);
    }
    navigation?.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation?.goBack()}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>

        {/* Title */}
        <Text style={styles.title}>Date of birth</Text>
        <Text style={styles.selectedDate}>{selectedDate}</Text>

        {/* Calendar Section */}
        <View style={styles.calendarContainer}>
          {/* Month/Year Header */}
          <View style={styles.monthHeader}>
            <Text style={styles.monthYear}>
              {monthNames[currentMonth - 1]}, {currentYear}
            </Text>
            <View style={styles.navigationArrows}>
              <TouchableOpacity onPress={handlePrevMonth}>
                <Text style={styles.arrow}>‹</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleNextMonth}>
                <Text style={styles.arrow}>›</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Days of Week */}
          <View style={styles.daysOfWeek}>
            {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
              <Text key={day} style={styles.dayLabel}>
                {day}
              </Text>
            ))}
          </View>

          {/* Calendar Grid */}
          <View style={styles.calendarGrid}>
            {calendarDays.map((day, index) => {
              if (day === null) {
                return <View key={index} style={styles.calendarDayEmpty} />;
              }
              const isSelected = day === selectedDay;
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.calendarDay,
                    isSelected && styles.calendarDaySelected,
                  ]}
                  onPress={() => handleDaySelect(day)}>
                  <Text
                    style={[
                      styles.calendarDayText,
                      isSelected && styles.calendarDayTextSelected,
                    ]}>
                    {day}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => navigation?.goBack()}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.okButton} onPress={handleOk}>
            <Text style={styles.okButtonText}>Ok</Text>
          </TouchableOpacity>
        </View>
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
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 24,
  },
  backArrow: {
    fontSize: 24,
    color: '#1E3A8A',
    fontWeight: '600',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1E3A8A',
    marginBottom: 8,
  },
  selectedDate: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 24,
  },
  calendarContainer: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 16,
    marginBottom: 32,
  },
  monthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  monthYear: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E3A8A',
  },
  navigationArrows: {
    flexDirection: 'row',
    gap: 16,
  },
  arrow: {
    fontSize: 24,
    color: '#1E3A8A',
  },
  daysOfWeek: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  dayLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    minHeight: 200,
  },
  calendarDay: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  calendarDayEmpty: {
    width: '14.28%',
    aspectRatio: 1,
  },
  calendarDaySelected: {
    backgroundColor: '#1E3A8A',
    borderRadius: 20,
  },
  calendarDayText: {
    fontSize: 14,
    color: '#1F2937',
  },
  calendarDayTextSelected: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 'auto',
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    marginRight: 12,
  },
  cancelButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E3A8A',
  },
  okButton: {
    flex: 1,
    backgroundColor: '#1E3A8A',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginLeft: 12,
  },
  okButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

export default DatePickerScreen;

