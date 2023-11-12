import {View, Text} from 'react-native';
import React from 'react';
import _ from 'lodash';
import Seperator from '../common/Seperator';

const TransactionDetailItem = ({item}) => {
  const ListItem = item => {
    const data = item.item;

    return (
      <View>
        {_.map(data, (value, key) => {
          return (
            <View key={key}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  margin: 12,
                  borderBottomColor: 'black',
                }}>
                <View style={{flex: 0.5}}>
                  <Text
                    style={{textAlign: 'left', textTransform: 'capitalize'}}>
                    {key}
                  </Text>
                </View>
                <View style={{flex: 0.5}}>
                  {key == 'amount' ? (
                    <>
                      <Text
                        style={{
                          textAlign: 'right',
                          fontWeight: 'bold',
                          color: data.type === 'Debit' ? 'red' : 'green',
                        }}>
                        {data.type === 'Debit' ? '-' : '+'}
                        {value}
                      </Text>
                    </>
                  ) : (
                    <>
                      <Text style={{textAlign: 'right'}}>{value}</Text>
                    </>
                  )}
                </View>
              </View>
              <Seperator />
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          margin: 7.5,
        }}>
        <ListItem item={item} />
      </View>
    </View>
  );
};

export default TransactionDetailItem;
