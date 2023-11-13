import React from 'react';
import {useDispatch} from 'react-redux';
import {View, Text, Button} from 'react-native';
import {setBiometric} from '../redux/actions/action';
import ReactNativeBiometrics from 'react-native-biometrics';
import {saveBiometricWithExpiration} from '../services/sessionService';

const {add} = require('date-fns');

const BiometricVerification = ({disabled}) => {
  const rnBiometrics = new ReactNativeBiometrics();

  const dispatch = useDispatch();

  const handleBiometricAuth = async () => {
    const currentTime = new Date();
    const expireTime = add(currentTime, { minutes: 1 });
    
    // Set expiration time of biometric as 1 min after currentTime

    try {
      const {success, error} = await rnBiometrics.simplePrompt({
        promptMessage: 'Authenticate using your biometric',
      });

      if (success) {
        saveBiometricWithExpiration('biometric', success, expireTime).then(
          resp => {
            if (resp.data === true && resp.expirationTime) {
              dispatch(setBiometric(true));
            }
          },
        );
      } else {
        console.log(error);
        return error;
      }
    } catch (error) {
      console.error('Biometric authentication error:', error);
    }
  };

  return (
    <View>
      <Text>
        {!disabled ? 'Please authenticate your verification' : 'Authenticated'}
      </Text>
      <Button
        title="Authenticate"
        onPress={handleBiometricAuth}
        disabled={disabled}
      />
    </View>
  );
};

export default BiometricVerification;
