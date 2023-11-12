import {View, Text, SafeAreaView} from 'react-native';
import React from 'react';
import TransactionDetailItem from '../../components/transactions/transactionDetailItem';
import Header from '../../components/common/Header';
import {useRoute} from '@react-navigation/native';
import {COMMON_TEXT} from '../../constants/common';
import BiometricVerification from '../../biometrics/biometricVerification';

const TransactionDetail = () => {
  const route = useRoute();

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
