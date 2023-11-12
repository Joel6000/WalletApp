import {View, Text} from 'react-native';
import React from 'react';

const Header = ({text}) => {
  return (
    <View style={{margin: 7.5}}>
      <Text style={{fontWeight: 'bold', fontSize: 30, fontStyle: 'italic'}}>
        {text}
      </Text>
    </View>
  );
};

export default Header;
