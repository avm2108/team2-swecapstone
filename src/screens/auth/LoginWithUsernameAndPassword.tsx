/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button, InputField} from '../../components';
import {AuthContext} from '../../../App';
import AuthScreenWrapper from '../../components/hoc/AuthWrapper';
import {authErrors} from '../../constants/auth';
import {STYLES} from '../../constants/styles';
import {ScooperLogo} from '../../svgs/ScooperLogo';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function LoginWithEmailAndPassword() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [apiError, setApiError] = useState('');
  const [isApiCalling, setIsApiCalling] = useState(false);
  // @ts-ignore
  const {signIn} = React.useContext(AuthContext);
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;

  const handleSubmit = async () => {
    try {
      console.log(
        '🚀 ~ file: LoginWithUsernameAndPassword.tsx:85 ~ handleSubmit ~ handleSubmit:',
        email,
        password,
      );
      setIsApiCalling(true);
      setApiError('');
      setEmailError('');
      setPasswordError('');

      if (!email) {
        setEmailError('Enter Email');
        setIsApiCalling(false);
      }
      if (!password) {
        setPasswordError('Enter Password');
        setIsApiCalling(false);
      }
      if (email && !emailRegex.test(email)) {
        setEmailError('Enter Valid Email');
        setIsApiCalling(false);
        return;
      }

      if (email && password) {
        const payload = {
          email: email,
          password: password,
        };
        const response = await signIn(payload);
        console.log(
          '🚀 ~ file: LoginWithUsernameAndPassword.tsx:56 ~ handleSubmit ~ response:',
          response,
        );

        if (response.success === false) {
          const apiEmailError = response.errorType === 'email';

          const apiPasswordError = response.errorType === 'both';

          if (apiEmailError) {
            console.log('apiEmailError: ', apiEmailError);
            setPasswordError('');
            //@ts-ignore
            setEmailError(response?.message);
            setIsApiCalling(false);
          } else if (apiPasswordError) {
            console.log('apiPasswordError: ', apiPasswordError);
            setEmailError('');
            //@ts-ignore
            setPasswordError(response?.message);
            setIsApiCalling(false);
          }
        }
        setIsApiCalling(false);
      }
    } catch (error) {
      console.log(
        '🚀 ~ file: LoginWithEmailAndPassword.tsx:31 ~ handleSubmit ~ error:',
        error,
      );
      setEmailError('');
      setPasswordError('');
      setApiError('Oops! Something went wrong, Please try again later.');
      setIsApiCalling(false);
    }
  };

  return (
    <AuthScreenWrapper showBackArrowIcon={false}>
      <View
        style={{
          alignItems: 'center',
          paddingBottom: 24,
          paddingTop: 42,
        }}>
        <ScooperLogo />
      </View>
      <View
        style={{
          backgroundColor: '#fff',
          flex: 1,
          paddingHorizontal: 24,
          paddingTop: 42,
          borderRadius: 24,
        }}>
        <Text
          // @ts-ignore
          style={{
            color: STYLES.lightGreenColor,
            fontSize: 20,
            fontFamily: 'Nunito-Bold',

            paddingTop: 12,
            textAlign: 'center',
            marginBottom: 31,
          }}>
          Welcome Back!
        </Text>
        <InputField
          value={email}
          style={styles.input}
          placeholder="Email"
          onChangeText={(text: string) => {
            setEmail(text);
            setEmailError('');
          }}
          placeholderTextColor={STYLES.lightGrayColor}
          inputBoxContainerStyle={[
            styles.inputBoxContainer,
            emailError ? styles.inputError : null,
            email && emailRegex.test(email) ? styles.validInput : null,
          ]}
          // @ts-ignore
          errorComponent={
            emailError ? (
              <Text style={styles.errorText}>{emailError}</Text>
            ) : null
          }
          errorMessageStyle={styles.errorMessageStyle}
        />
        <InputField
          style={styles.input}
          value={password}
          onChangeText={(text: string) => {
            setPassword(text);
            setPasswordError('');
          }}
          inputBoxContainerStyle={[
            styles.inputBoxContainer,
            passwordError ? styles.inputError : null,
            password.length >= 2 ? styles.validInput : null,
          ]}
          placeholder="Password"
          placeholderTextColor={STYLES.lightGrayColor}
          secureTextEntry={true}
          // @ts-ignore
          errorComponent={
            passwordError ? (
              <Text style={styles.errorText}>{passwordError}</Text>
            ) : null
          }
          errorMessageStyle={styles.errorMessageStyle}
        />
        {apiError ? <Text style={styles.errorText}>{apiError}</Text> : null}
        <View style={{alignItems: 'center'}}>
          <Button
            color={STYLES.greenColor}
            wrapperStyle={{
              marginTop: 16,
              height: 33,
              width: 190,
              paddingVertical: 8,
            }}
            title="Sign In"
            onPress={handleSubmit}
            textStyles={{fontSize: 12, fontFamily: 'Nunito-Bold'}}
            processing={isApiCalling}
          />
          <View
            style={{flexDirection: 'row', alignItems: 'center', paddingTop: 5}}>
            <Text
              // @ts-ignore
              style={{
                color: STYLES.lightGreenColor,
                fontSize: 10,
                textAlign: 'center',
                fontFamily: 'Nunito-Bold',
              }}>
              Forgot Password?{' '}
            </Text>
            <TouchableOpacity>
              <Text
                // @ts-ignore
                style={{
                  color: STYLES.lightGreenColor,
                  fontSize: 10,
                  fontFamily: 'Nunito-Bold',
                  textAlign: 'center',
                  textDecorationLine: 'underline',
                }}>
                Click Here
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </AuthScreenWrapper>
  );
}

const styles = StyleSheet.create({
  input: {
    paddingHorizontal: 12,
    color: 'black',
    paddingVertical: 8,
    fontSize: 11,
    fontFamily: 'Nunito-Bold',
    width: '100%',
  },
  inputBoxContainer: {
    borderColor: '#294959',
    borderWidth: 2,
    borderRadius: 5,
    height: 33,
  },
  inputError: {
    borderColor: 'red',
  },
  header: {
    fontSize: 32,
    fontFamily: 'Nunito-Bold',
    marginBottom: 24,
    color: 'black',
    textAlign: 'center',
  },
  errorMessageStyle: {
    marginTop: 8,
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
    fontSize: 10,
    fontFamily: 'Nunito-Bold',
  },
  validInput: {
    borderColor: 'green',
  },
});
