import {View, Text, FlatList, SafeAreaView} from 'react-native';
import React, {useState, useEffect} from 'react';
import {DATA} from '../../constants/transactions';
import TransactionItem from '../../components/transactions/transactionItem';
import Header from '../../components/common/Header';
import {COMMON_TEXT} from '../../constants/common';
import BiometricVerification from '../../biometrics/biometricVerification';
import {loadBiometricWithExpiration} from '../../services/sessionService';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {setBiometric} from '../../redux/actions/action';
import {loadData} from '../../services/accountService';

const Transaction = () => {
  const [transaction, setTransactions] = useState(DATA);
  const [refreshing, setRefreshing] = React.useState(false);

  const dispatch = useDispatch();

  const {biometric} = useSelector(state => state.biometricReducer);

  useEffect(() => {
    _loadData();
    checkBiometricActive();
  }, [biometric]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    checkBiometricActive();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const checkBiometricActive = () => {
    loadBiometricWithExpiration('biometric').then(resp => {
      if (resp.data === false && resp.expirationTime === null) {
        dispatch(setBiometric(false));
      }
    });
  };

  const _loadData = () => {
    loadData().then(resp => {
      if (resp) {
        setTransactions(resp);
      }
    });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <Header text={COMMON_TEXT.history} />

        <BiometricVerification disabled={biometric} />

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
          refreshing={refreshing}
          onRefresh={onRefresh}
          renderItem={({item, index}) => (
            <TransactionItem item={item} disabled={biometric} />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default Transaction;
