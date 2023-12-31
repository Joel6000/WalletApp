import React from 'react';
import Seperator from '../common/Seperator';
import {useNavigation} from '@react-navigation/native';
import {NAVIGATION_SCREEN} from '../../constants/common';
import {View, Text, TouchableOpacity} from 'react-native';

const TransactionItem = ({item, disabled}) => {
  const navigation = useNavigation();

  return (
    <View style={{flex: 1}}>
      <TouchableOpacity
        style={{
          flex: 1,
          margin: 7.5,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
        disabled={!disabled}
        onPress={() => {
          console.log(item);
          navigation.navigate(NAVIGATION_SCREEN.transaction_detail, {
            item: item,
          });
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
          }}>
          <Text>Data: {item.date} </Text>
          <Text>Description: {item.description} </Text>
          <Text>Type: {item.type} </Text>
        </View>
        <View
          style={{
            flex: 0.3,
            alignContent: 'center',
            justifyContent: 'center',
          }}>
          {!disabled ? (
            <>
              <Text
                style={{
                  margin: 10,
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}>
                ******
              </Text>
            </>
          ) : (
            <>
              <Text
                style={{
                  margin: 10,
                  textAlign: 'center',
                  fontWeight: 'bold',
                  color: item.type === 'Debit' ? 'red' : 'green',
                }}>
                {item.type === 'Debit' ? '-' : '+'}
                {item.amount}
              </Text>
            </>
          )}
        </View>
      </TouchableOpacity>
      <Seperator />
    </View>
  );
};

export default TransactionItem;
