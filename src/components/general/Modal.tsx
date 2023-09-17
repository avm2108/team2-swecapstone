import React from 'react';
import Modal from 'react-native-modal';

export const CustomModal = ({
  visible = false,
  onClose = () => {},
  modalWrapperStyle = {},
  children = <></>,
  coverScreen = true,
  backdropColor = 'transparent',
}: any) => {
  return (
    <Modal
      isVisible={visible}
      onDismiss={onClose}
      style={{...modalWrapperStyle}}
      coverScreen={coverScreen}
      backdropColor={backdropColor}
      animationIn={'slideInDown'}>
      {children}
    </Modal>
  );
};
