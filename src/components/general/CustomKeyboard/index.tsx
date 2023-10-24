import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
} from 'react-native';
import PropTypes from 'prop-types';

import PinInput from './PinInput';
import PinKeyboard from './PinKeyboard';

class PinScreen extends Component {
  /**
   * [ Built-in React method. ]
   *
   * Setup the component. Executes when the component is created
   *
   * @param {object} props
   *
   */
  constructor(props) {
    super(props);

    this.state = {
      pin: '',
      errorText: null,
    };
  }

  /**
   * [ Built-in React method. ]
   *
   * Executed when the component is mounted to the screen.
   */
  componentDidMount() {
    this.props.onRef(this);
    this.props?.navigation?.addListener('blur', () => {
      this.setState({pin: '', errorText: ''});
    });
  }

  /**
   * [ Built-in React method. ]
   *
   * Executed when the component is unmounted from the screen
   */
  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  /**
   * [ Built-in React method. ]
   *
   * Allows us to render JSX to the screen
   */
  componentDidUpdate(prevProps) {
    const {pin, errorText} = this.props;
    if (errorText !== prevProps.errorText) {
      this.setState(
        {errorText: errorText},
        //   () => {
        //   setTimeout(() => {
        //     this.setState({ pin: "" });
        //   }, 20);
        // }
      );
    }
    if (pin !== prevProps.pin) {
      // We want to filter the pin so it always is a string
      const filteredPin = pin ? pin.toString() : '';

      this.setState({
        pin: filteredPin,
      });
    }
  }

  /**
   * [ Built-in React method. ]
   *
   * Allows us to render JSX to the screen
   */
  render() {
    /** Props */
    const {
      logo,
      tagline,
      numberOfPins,
      shakeVibration,
      logoEnabled,
      pinInputContainerStyle,
      // Style Props
      containerStyle,
      logoStyle,
      taglineStyle,
      // Pin style props
      pinContainerStyle,
      pinStyle,
      pinActiveStyle,
      // Keyboard style props
      keyboardStyle,
      keyboardDisabledStyle,
      keyStyle,
      keyTextStyle,
      keyImageStyle,
      errorStyle,
      errorTextStyle,
      theme,
      keyboard,
      rippleColor,
      rippleContainerBorderRadius,
      rippleSize,
      actionButtonsStyle,
      keyboardRowStyle,
      onEnterPress = () => {},
      pinErrorStyle = {borderColor: 'red'},
      keyboardContainerStyle,
      tagline1,
      tagline1Style,
    } = this.props;

    /** State */
    const {pin} = this.state;

    /** Style */
    const {
      containerDefaultStyle,
      defaultTaglineStyle,
      safeAreaViewHeaderDefaultStyle,
      safeAreaViewFooterDefaultStyle,
    } = styles;

    return (
      <View style={[containerDefaultStyle, containerStyle]}>
        <SafeAreaView
          style={[safeAreaViewHeaderDefaultStyle, pinInputContainerStyle]}>
          {logoEnabled ? (
            <Image style={[{flex: 2}, logoStyle]} source={logo} />
          ) : null}
          <Text
            style={[
              defaultTaglineStyle,
              {fontFamily: theme?.fonts?.regular},
              taglineStyle,
            ]}>
            {tagline}
          </Text>
          <PinInput
            onRef={ref => (this.pins = ref)}
            numberOfPins={numberOfPins}
            numberOfPinsActive={pin.length}
            vibration={shakeVibration}
            animationShakeCallback={this.shakeAnimationComplete.bind(this)}
            containerStyle={pinContainerStyle}
            pinStyle={pinStyle}
            pinErrorStyle={this.state.errorText ? pinErrorStyle : {}}
            pinActiveStyle={pinActiveStyle}
          />
          <Text
            style={[
              defaultTaglineStyle,
              {fontFamily: theme?.fonts?.regular},
              tagline1Style,
            ]}>
            {tagline1}
          </Text>
        </SafeAreaView>

        <SafeAreaView
          style={[safeAreaViewFooterDefaultStyle, keyboardContainerStyle]}>
          <PinKeyboard
            onRef={ref => {
              this.keyboard = ref;
            }}
            rippleSize={rippleSize}
            rippleColor={rippleColor}
            keyDown={this.keyDown.bind(this)}
            keyboard={keyboard}
            keyboardStyle={keyboardStyle}
            keyboardDisabledStyle={keyboardDisabledStyle}
            keyStyle={keyStyle}
            keyTextStyle={keyTextStyle}
            keyImageStyle={keyImageStyle}
            errorStyle={errorStyle}
            errorText={this.state.errorText}
            errorTextStyle={errorTextStyle}
            actionButtonsStyle={actionButtonsStyle}
            onEnterPress={() => onEnterPress()}
            keyboardRowStyle={keyboardRowStyle}
            rippleContainerBorderRadius={rippleContainerBorderRadius}
          />
          {this.props.ItemFooter}
        </SafeAreaView>
      </View>
    );
  }

  /**
   * Callback triggered when a key is pressed on the keyboard
   *
   * @param key
   */
  keyDown(key) {
    /** Props */
    const {numberOfPins, keyDown} = this.props;
    /** State */
    const {pin} = this.state;

    // An instance of the pin
    let newPin = pin;

    // Check if key is the back buttons. The 'back' value is
    // defined in the array keyboardFunc passed to keyboard as
    // a parameter.
    if (key === 'back') {
      newPin = pin.substring(0, pin.length - 1);
      this.setState({pin: newPin});
    } else if (key === 'done') {
      if (pin.length === 0) {
        this.setState({
          pin: '',
          errorText: this.props.emptyStateErrorText || 'Please enter PIN',
        });
      } else if (pin.length === numberOfPins) {
        this.setState({
          pin: '',
          errorText: '',
        });
      }
    } else {
      this.setState({errorText: ''});

      // Concat the letter in the string
      if (pin.length < numberOfPins) {
        newPin = pin.concat(key);
        this.setState({pin: newPin});
      }
    }

    // The pin has been changed, trigger the callback
    // Don't allow the callback if the input exceeds the number of pins

    if (newPin.length <= numberOfPins) {
      if (keyDown) keyDown(newPin);
    }
  }

  /**
   * Function used to throw an error on the pin screen.
   *
   * @param error
   */
  throwError(error) {
    // Shake the pins
    this.pins.shake();

    // throw error on the keyboard
    this.keyboard.throwError(error);

    // Disable the keyboard
    this.keyboard.disable();
  }

  /**
   * Function used to clear the error on the pin screen
   */
  clearError() {
    this.keyboard.clearError();
  }

  /**
   * Callback when shake animation has completed on the pin
   */
  shakeAnimationComplete() {
    if (this.props.onError) this.props.onError();

    this.keyboard.enable();
  }
}

PinScreen.propTypes = {
  pin: PropTypes.string,
  onRef: PropTypes.any.isRequired,
  keyDown: PropTypes.func.isRequired,
  onError: PropTypes.func,
  tagline: PropTypes.string,
  logo: PropTypes.any,
  numberOfPins: PropTypes.number,
  // keyVibration: PropTypes.bool,
  // shakeVibration: PropTypes.bool,
  logoEnabled: PropTypes.bool,
  headerBackgroundColor: PropTypes.string,
  footerBackgroundColor: PropTypes.string,
  ItemFooter: PropTypes.element,

  // Style props
  containerStyle: PropTypes.object,
  logoStyle: PropTypes.object,
  taglineStyle: PropTypes.object,

  // Pin style props
  pinContainerStyle: PropTypes.object,
  pinStyle: PropTypes.object,
  pinActiveStyle: PropTypes.object,

  // Keyboard style props
  keyboardStyle: PropTypes.object,
  keyboardDisabledStyle: PropTypes.object,
  keyStyle: PropTypes.object,
  keyTextStyle: PropTypes.object,
  keyImageStyle: PropTypes.object,
  errorStyle: PropTypes.object,
  errorTextStyle: PropTypes.object,
};

PinScreen.defaultProps = {
  // Text above the pins acting as a indicator
  tagline: 'Enter your PIN',
  // Number of pins to create
  numberOfPins: 4,
  // Is vibration enabled or disabled
  // keyVibration: true,
  // shakeVibration: true,
  logoEnabled: false,
  headerBackgroundColor: '#fff',
  footerBackgroundColor: '#fff',
};

export default PinScreen;

/** -------------------------------------------- */
/**             Component Styling                */
/** -------------------------------------------- */
const styles = StyleSheet.create({
  containerDefaultStyle: {
    // flex: 1,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  safeAreaViewHeaderDefaultStyle: {
    // flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    width: '100%',
  },
  safeAreaViewFooterDefaultStyle: {
    flex: null,
    backgroundColor: 'red',
    width: '100%',
  },
  defaultTaglineStyle: {
    flex: null,
    color: '#212121',
    fontSize: 17,
    fontWeight: 'bold',
    ...Platform.select({
      ios: {
        fontFamily: 'HelveticaNeue',
      },
      android: {
        fontFamily: 'Roboto',
      },
    }),
  },
});
