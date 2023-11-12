import {View, Text, Button} from 'react-native';
import React from 'react';
import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';
import {saveBiometricWithExpiration} from '../services/sessionService';
import {SET_BIOMETRIC, setBiometric} from '../redux/actions/action';
import {useDispatch} from 'react-redux';

const BiometricVerification = () => {
  const rnBiometrics = new ReactNativeBiometrics();

  const dispatch = useDispatch();

  const handleBiometricAuth = async () => {
    try {
      const {success, error} = await rnBiometrics.simplePrompt({
        promptMessage: 'Authenticate using your biometric',
      });

      if (success) {
        saveBiometricWithExpiration('biometric', success);
        dispatch(setBiometric(true, SET_BIOMETRIC));
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
      <Button title="Authenticate" onPress={handleBiometricAuth} />
    </View>
  );
};

export default BiometricVerification;
