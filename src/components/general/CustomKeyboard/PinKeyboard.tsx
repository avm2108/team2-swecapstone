import React, {Component} from 'react';
import {View, Image, Text, StyleSheet, Platform} from 'react-native';
import Ripple from 'react-native-material-ripple';
import PropTypes from 'prop-types';

class PinKeyboard extends Component {
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
      disabled: false,
      // error: null,
    };
  }

  /**
   * [ Built-in React method. ]
   *
   * Executed when the component is mounted to the screen.
   */
  componentDidMount() {
    this.props.onRef(this);
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
  render() {
    /** Styles */
    const {containerStyle, keyboardDefaultStyle, keyboardRowStyle} = styles;
    /** Props */
    const {
      keyboard,
      // Style Props
      keyboardStyle,
    } = this.props;

    return (
      <View style={containerStyle}>
        {this.renderError()}
        <View style={[keyboardDefaultStyle, keyboardStyle]}>
          {
            // Maps each array of numbers in the keyboardValues array
            keyboard.map((row, r) => {
              return (
                <View
                  key={r}
                  style={[keyboardRowStyle, this.props.keyboardRowStyle]}>
                  {
                    // Maps each number in row and creates key for that number
                    row.map((element, k) => {
                      return this.renderKey(element, r, k);
                    })
                  }
                </View>
              );
            })
          }
        </View>
      </View>
    );
  }

  /**
   * Renders the error
   *
   * @return {*}
   */
  renderError() {
    // Styles
    const {errorDefaultStyle, errorTextDefaultStyle} = styles;

    // Props
    const {
      // Style Props
      errorStyle,
      errorTextStyle,
      errorText,
    } = this.props;

    return (
      <View style={[errorDefaultStyle, errorStyle]}>
        {errorText ? (
          <Text style={[errorTextDefaultStyle, errorTextStyle]}>
            {errorText}
          </Text>
        ) : null}
      </View>
    );
  }

  /**
   * Renders a key on the keyboard
   *
   * @param entity
   * @param row
   * @param column
   *
   * @return {jsx}
   */
  renderKey(entity, row, column) {
    /** Styles */
    const {
      keyContainerStyle,
      keyboardDisabledDefaultStyle,
      keyDefaultStyle,
      keyTextDefaultStyle,
      keyImageDefaultStyle,
    } = styles;
    /** Props */
    const {
      keyDown = () => {},
      keyboardFunc,
      keyboardDisabledStyle,
      // Style Props
      keyStyle,
      keyTextStyle,
      keyImageStyle,
      actionButtonsStyle,
      rippleColor,
      rippleSize,
      rippleContainerBorderRadius,
    } = this.props;
    /** State */
    const {disabled} = this.state;

    // Custom functions for the keyboard key
    const keyboardFuncSet = keyboardFunc
      ? keyboardFunc
      : [
          [null, null, null],
          [null, null, null],
          [null, null, null],
          [
            () => this.props.keyDown('back'),
            0,
            () => {
              this.props.onEnterPress();
              this.props.keyDown('done');
            },
          ],
        ];

    // Decide if the element passed as the key is text
    const keyJsx = keyboardFuncSet[row][column] ? (
      typeof entity === 'string' ? (
        <Image
          style={[keyImageDefaultStyle, keyImageStyle]}
          source={entity}
          failure={() => alert('failed')}
        />
      ) : (
        <Text style={[keyTextDefaultStyle, actionButtonsStyle]}>{entity}</Text>
      )
    ) : (
      <Text style={[keyTextDefaultStyle, keyTextStyle]}>{entity}</Text>
    );

    // We want to block keyboard interactions if it has been disabled.
    if (!disabled) {
      return (
        <View
          key={column}
          style={[keyContainerStyle, keyDefaultStyle, keyStyle]}>
          <Ripple
            rippleColor={rippleColor ? rippleColor : '#000'}
            rippleSize={rippleSize}
            key={column}
            onPressIn={() => {
              keyboardFuncSet[row][column]
                ? keyboardFuncSet[row][column]()
                : keyDown(entity);
            }}
            rippleContainerBorderRadius={rippleContainerBorderRadius}>
            {keyJsx}
          </Ripple>
        </View>
      );
    } else {
      return (
        <View
          key={column}
          style={[
            keyContainerStyle,
            keyDefaultStyle,
            keyStyle,
            keyboardDisabledDefaultStyle,
            keyboardDisabledStyle,
          ]}>
          {keyJsx}
        </View>
      );
    }
  }

  /**
   * Function used to display an error above the keyboard
   *
   * @param error
   */
  throwError(error) {
    this.setState({
      error,
    });
  }

  /**
   * Function used to clear the error on the keyboard
   */
  clearError() {
    this.setState({error: null});
  }

  /**
   * Function used to disable the keyboard
   */
  disable() {
    this.setState({
      disabled: true,
    });
  }

  /**
   * Function used to enable the keyboard
   */
  enable() {
    this.setState({
      disabled: false,
    });
  }
}

PinKeyboard.propTypes = {
  onRef: PropTypes.any.isRequired,
  keyDown: PropTypes.func.isRequired,
  keyboard: PropTypes.array,
  keyboardFunc: PropTypes.array,
  // Style props
  keyboardStyle: PropTypes.object,
  keyboardDisabledStyle: PropTypes.object,
  keyStyle: PropTypes.object,
  keyTextStyle: PropTypes.object,
  keyImageStyle: PropTypes.object,
  errorStyle: PropTypes.object,
  errorTextStyle: PropTypes.object,
};

PinKeyboard.defaultProps = {
  // Keyboard configuration. The default contains a key
  // for each number 0 - 9 and a back button.
  keyboard: [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [null, 0, null],
  ],
  // Keyboard functions. By default the text (number) in the
  // keyboard array will be passed via the keyDown callback.
  // Use this array to set custom functions for certain keys.
  keyboardFunc: null,
  keyboardErrorDisplayTime: 3000,
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: null,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  // Style applied to the keyboard. Must contain a height or
  // the keyboard will not be displayed.
  keyboardDefaultStyle: {
    minHeight: 250,
    backgroundColor: '#fff',
  },
  keyboardRowStyle: {
    flex: 1,
    flexDirection: 'row',
  },
  keyContainerStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Style applied to keyboard when it is disabled.
  keyboardDisabledDefaultStyle: {
    backgroundColor: '#fff',
  },
  // Style the individual keys
  keyDefaultStyle: {
    // backgroundColor: '#fff',
    borderRightColor: '#e8e8e8',
    borderRightWidth: 1,
    borderBottomColor: '#e8e8e8',
    borderBottomWidth: 1,
  },
  // Style for the text inside a key
  keyTextDefaultStyle: {
    ...Platform.select({
      ios: {
        fontFamily: 'HelveticaNeue',
        overflow: 'hidden',
      },
      android: {
        fontFamily: 'Roboto',
      },
    }),
    fontWeight: '400',
    fontSize: 25,
    textAlign: 'center',
    color: '#222222',
  },
  // Style for an image inside a key
  keyImageDefaultStyle: {
    width: 28,
    height: 28,
  },
  errorDefaultStyle: {
    height: 30,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DA0F72',
  },
  errorTextDefaultStyle: {
    color: '#214C34',
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default PinKeyboard;