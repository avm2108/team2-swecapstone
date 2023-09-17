/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
} from 'react-native';

export default function ({
  scrollView = true,
  footer = false,
  backgroundColor = null,
  stickyHeader = <></>,
  stickyFooter = <></>,
  ...props
}) {
  const safeAreaViewStyle = {
    flex: 1,
    backgroundColor: 'white',
    ...props.wrapperStyles,
  };

  return (
    <SafeAreaView style={{...safeAreaViewStyle}}>
      <KeyboardAvoidingView
        enabled
        style={{
          flex: 1,
          borderColor: 'white',
        }}
        // @ts-ignore
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={0}>
        {stickyHeader}
        {scrollView ? (
          <ScrollView
            scrollIndicatorInsets={{
              right: 1,
            }}
            nestedScrollEnabled={true}
            contentInsetAdjustmentBehavior="automatic"
            style={{
              ...{
                flex: 1,
                backgroundColor: !backgroundColor ? 'white' : backgroundColor,
                width: '100%',
                borderColor: !backgroundColor ? 'white' : backgroundColor,
              },
              ...Platform.select({
                ios: {
                  shadowOffset: {width: 2, height: 2},
                  shadowColor: 'white',
                  shadowOpacity: 0.4,
                  shadowRadius: 20,
                },
              }),
            }}
            contentContainerStyle={{
              flexGrow: 1,
              borderColor: 'white',
            }}
            keyboardShouldPersistTaps={'handled'}>
            <TouchableWithoutFeedback
              onPress={Keyboard.dismiss}
              style={{
                flex: 1,
                justifyContent: 'flex-end',
                borderColor: 'black',
              }}>
              <>{props.children}</>
            </TouchableWithoutFeedback>
          </ScrollView>
        ) : !footer ? (
          <>
            <View>{props.children}</View>
          </>
        ) : (
          <>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              {props.children}
            </View>
          </>
        )}
        {stickyFooter}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
