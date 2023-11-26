/* eslint-disable react-native/no-inline-styles */
import moment from 'moment';
import React, {useState} from 'react';
import {View} from 'react-native';
import {Calendar} from 'react-native-calendars';

export function CustomCalendar({onSelectDate = () => {}}: any) {
  const [selectedDate, setSelectedDate] = useState(
    moment().format('YYYY-MM-DD'),
  );

  const handleSelect = (date: any) => {
    const formattedSelectedDate = moment(date).format('YYYY-MM-DD');
    setSelectedDate(formattedSelectedDate);
    onSelectDate(formattedSelectedDate);
  };

  const calendarTheme = {
    backgroundColor: '#ffffff', // Background color
    calendarBackground: '#ffffff', // Calendar background color
    textSectionTitleColor: '#000000', // Title text color
    selectedDayBackgroundColor: 'pink', // Selected day background color
    selectedDayTextColor: '#ffffff', // Selected day text color
    todayTextColor: '#00adf5', // Today's text color
    dayTextColor: '#2d4150', // Day text color
    textDisabledColor: '#d9e1e8', // Disabled text color
    dotColor: '#00adf5', // Dot color (for marked dates)
    selectedDotColor: '#ffffff', // Selected dot color
    arrowColor: 'orange', // Arrow color
    monthTextColor: 'blue', // Month text color
    textDayFontFamily: 'monospace', // Day font family
    textMonthFontFamily: 'monospace', // Month font family
    textDayHeaderFontFamily: 'monospace', // Day header font family
    textDayFontWeight: 'bold', // Day font weight
    textMonthFontWeight: 'bold', // Month font weight
    textDayHeaderFontWeight: 'bold', // Day header font weight
    textDayFontSize: 16, // Day font size
    textMonthFontSize: 16, // Month font size
    textDayHeaderFontSize: 16, // Day header font size
  };

  return (
    <View style={{justifyContent: 'center', backgroundColor: 'red'}}>
      <Calendar
        current={selectedDate}
        onDayPress={day => {
          handleSelect(day.dateString);
        }}
        markedDates={{
          [selectedDate]: {
            selected: true,
            disableTouchEvent: true,
            selectedDotColor: 'green',
          },
        }}
        // @ts-ignore
        theme={calendarTheme}
      />
    </View>
  );
}
