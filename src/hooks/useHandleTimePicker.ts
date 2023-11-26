import {useEffect, useState} from 'react';
import {useTimerLogic} from './useTimer';
import {Alert} from 'react-native';

export function useHandleTimePicker({onSelectedValidTime = () => {}}) {
  const {handleDateSelection, isValidTimeSelected} = useTimerLogic({
    onGetSelectedTime: onSelectedValidTime,
  });

  console.log(
    '🚀 ~ file: useHandleTimePicker.ts:8 ~ useHandleTimePicker ~ isValidTimeSelected:',
    isValidTimeSelected,
  );

  const [selectedDate, setSelectedDate] = useState(new Date());

  const [open, setOpen] = useState(false);

  const handleOpenTimer = () => {
    setOpen(true);
  };

  const handleConfirmPickDate = (date: any) => {
    setOpen(false);
    setSelectedDate(date);
    handleDateSelection(date);
    onSelectedValidTime(date);
  };

  useEffect(() => {
    if (isValidTimeSelected) {
      console.log(
        '🚀 ~ file: useHandleTimePicker.ts:32 ~ useEffect ~ isValidTimeSelected:',
        isValidTimeSelected,
      );
      //   setSelectedDate(date);
    } else {
      //   Alert.alert('Invalid Time Selected');
    }
  }, [isValidTimeSelected]);

  return {
    open,
    handleOpenTimer,
    handleConfirmPickDate,
    selectedDate,
    setOpen,
  };
}
