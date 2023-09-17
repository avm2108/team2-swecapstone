import React from 'react';
import DatePicker from 'react-native-date-picker';

export const DateTimePicker = ({
  date = new Date(),
  onChange = () => {},
  onConfirm = () => {},
  onCancel = () => {},
  type = 'modal',
  open = false,
  ...rest
}) => {
  if (type === 'modal') {
    return (
      <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={(date: any) => {
          //   setOpen(false);
          //   setDate(date);
          // @ts-ignore
          onConfirm(date);
        }}
        onCancel={() => {
          //   setOpen(false);
          onCancel();
        }}
        onDateChange={onChange}
        {...rest}
      />
    );
  }
  return <DatePicker date={date} onDateChange={onChange} {...rest} />;
};
