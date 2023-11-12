import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  RefreshControl,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {DATA} from '../../constants/transactions';
import TransactionItem from '../../components/transactions/transactionItem';
import Header from '../../components/common/Header';
import {COMMON_TEXT} from '../../constants/common';
import BiometricVerification from '../../biometrics/biometricVerification';
import {loadBiometricWithExpiration} from '../../services/sessionService';
import { useSelector } from 'react-redux';

const Transaction = () => {
  const [transaction, setTransactions] = useState(DATA);
  const [refreshing, setRefreshing] = React.useState(false);
  
  const { biometric } = useSelector(state => state.biometricReducer);
  
  useEffect(() => {
    loadBiometricWithExpiration('biometric');
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    loadBiometricWithExpiration('biometric')
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        contentContainerStyle={{flex: 1}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={{flex: 1}}>
          <Header text={COMMON_TEXT.history} />
          <BiometricVerification />

          <FlatList
            data={transaction}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index}
            initialNumToRender={10}
            ListEmptyComponent={() => (
              <View>
                <Text>Loading...</Text>
              </View>
            )}
            renderItem={({item, index}) => <TransactionItem item={item} />}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Transaction;
