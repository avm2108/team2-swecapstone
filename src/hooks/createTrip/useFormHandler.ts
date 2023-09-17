import {useDispatch} from 'react-redux';
import {createTripFormStore} from '../../components/protected/CreateTrip/createTripFormState';
import {clearMapState} from '../../redux/mapSlice';
import {useCallback, useEffect, useState} from 'react';
import {Alert} from 'react-native';

export const useFormHandler = () => {
  const {formData, setFormField} = createTripFormStore;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMapState());
  }, []);

  const [selectedDate, setSelectedDate] = useState(new Date());

  const [open, setOpen] = useState(false);

  const handleRideLater = () => {
    setOpen(true);
  };

  const handleConfirmPickDate = (date: any) => {
    console.log('🚀 ~ file: Form.tsx:40 ~ handleConfirmPickDate ~ date:', date);
    setOpen(false);
    setSelectedDate(date);
    validationOfDate(date);
  };

  const validationOfDate = useCallback((date: any) => {
    if (!date) {
      // Alert.alert('Select date and time.');
      return;
    } else {
      // Your logic here
      const now = new Date();
      console.log(
        '🚀 ~ file: Form.tsx:45 ~ handleConfirmPickDate ~ now:',
        typeof now,
      );
      if (date.getTime() < now.getTime()) {
        Alert.alert('Select a time at least 20 minutes from now');
      }

      // @ts-ignore
      let timeDiff = Math.round(selectedDate.getTime() - now.getTime());

      const scheduledRequestPreStartMinute = 20; // Minimum 20-minute gap
      console.log(
        '🚀 ~ file: Form.tsx:50 ~ handleConfirmPickDate ~ scheduledRequestPreStartMinute:',
        scheduledRequestPreStartMinute,
      );

      timeDiff = timeDiff / 60000;
      console.log(
        '🚀 ~ file: Form.tsx:60 ~ handleConfirmPickDate ~ timeDiff:',
        timeDiff,
      );

      if (!selectedDate) {
        Alert.alert('Select date and time.');
      } else if (timeDiff >= scheduledRequestPreStartMinute) {
        // Check if the time difference is less than 20 minutes (in milliseconds)

        Alert.alert('Success');
      } else {
        Alert.alert('Select a time at least 20 minutes from now.');
        // Your logic here
        // ...

        // Handle success case
        // e.g., hide modal, reset dateError, and perform your action
      }
    }
  }, []);
  return {
    formData,
    setFormField,
    open,
    handleRideLater,
    handleConfirmPickDate,
    setOpen,
    selectedDate,
  };
};
