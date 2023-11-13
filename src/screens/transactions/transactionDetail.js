import React, { useEffect } from 'react';
import {COMMON_TEXT, NAVIGATION_SCREEN} from '../../constants/common';
import Header from '../../components/common/Header';
import {View, SafeAreaView} from 'react-native';
import TransactionDetailItem from '../../components/transactions/transactionDetailItem';
import {useRoute, useIsFocused, useNavigation} from '@react-navigation/native';
import {loadBiometricWithExpiration} from '../../services/sessionService';
import {useDispatch} from 'react-redux';
import {setBiometric} from '../../redux/actions/action';

const TransactionDetail = () => {
  const route = useRoute();

  const dispatch = useDispatch();

  const isFocused = useIsFocused()

  const navigation = useNavigation();

  const timeOut = setTimeout(_setTimeOut, 60000)

  const _setTimeOut = () => {
    return true
  }

  const checkBiometricActive = () => {
    loadBiometricWithExpiration('biometric').then(resp => {
      if (resp.data === false && resp.expirationTime === null) {
        dispatch(setBiometric(false));
        navigation.navigate(NAVIGATION_SCREEN.transaction);
      }
    });
  };

  // Check biometric active session every once the screen is on focus or after 1 min have passed
  useEffect(() => {
    checkBiometricActive()
  }, [isFocused, timeOut]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <Header text={COMMON_TEXT.detail} />
        <TransactionDetailItem item={route.params.item} />
      </View>
    </SafeAreaView>
  );
};

export default TransactionDetail;
