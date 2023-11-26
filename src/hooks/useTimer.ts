import {useCallback, useEffect, useState} from 'react';
import {Alert} from 'react-native';
import moment from 'moment-timezone';

export function useTimerLogic({onGetSelectedTime = () => {}}: any) {
  const [isTimeSelected, setIsTimeSelected] = useState(false);
  const [selectedDate, setSelectedDate] = useState();
  const [isValidTimeSelected, setIsValidTimeSelected] = useState(false);

  const handleDateSelection = useCallback((date: any) => {
    setSelectedDate(date);
    setIsTimeSelected(true);
  }, []);

  useEffect(() => {
    if (selectedDate && isTimeSelected) {
      // @ts-ignore
      const serverTimeFromApi = new Date();
      console.log(
        '🚀 ~ file: useTimer.ts:28 ~ useEffect ~ serverTimeFromApi:',
        serverTimeFromApi,
      );

      // Convert server time to Asia/Kolkata timezone
      const serverTimeInKolkata = moment(serverTimeFromApi).tz('Asia/Kolkata');

      // Convert selected date to Asia/Kolkata timezone
      const selectedDateInKolkata = moment(selectedDate).tz('Asia/Kolkata');

      // Calculate the time difference in minutes
      const timeDifference = selectedDateInKolkata.diff(
        serverTimeInKolkata,
        'milliseconds',
      );

      // Check if the selected time is at least 20 minutes ahead of server time
      // if (timeDifference > 1800000) {
      // setFormField('is_ride_later', '1');

      // // @ts-ignore
      // setFormField('start_time', timeDifference);

      onGetSelectedTime(timeDifference);
      setIsValidTimeSelected(true);
      // } else {
      //   Alert.alert(
      //     'Scheduled Trip',
      //     'Select a time at least 20 minutes from now.',
      //   );
      //   setIsValidTimeSelected(false);
      // }
    }
  }, [selectedDate, isTimeSelected]);

  return {isValidTimeSelected, handleDateSelection};
}
