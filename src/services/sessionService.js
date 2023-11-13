import AsyncStorage from '@react-native-async-storage/async-storage';

const {isPast, parseISO} = require('date-fns');

const saveBiometricWithExpiration = async (key, data, expireTime) => {
  try {
    const expirationTime = expireTime;
    const dataToSave = {
      data,
      expirationTime,
    };

    await AsyncStorage.setItem(key, JSON.stringify(dataToSave));
    console.log('Data saved successfully');
    return dataToSave;
  } catch (error) {
    console.error('Error saving data: ', error);
  }
};

const loadBiometricWithExpiration = async key => {
  try {
    const storedValue = await AsyncStorage.getItem(key);
    if (storedValue !== null) {
      const dataObject = JSON.parse(storedValue);
      const {data, expirationTime} = dataObject;
      if (!isPast(parseISO(expirationTime))) {
        return data;
      } else {
        await AsyncStorage.removeItem(key);
        console.log('Data has expired');
        const returnData = {
          data: false,
          expirationTime: null,
        };
        return returnData;
      }
    } else {
      const returnData = {
        data: false,
        expirationTime: null,
      };
      return returnData;
    }
  } catch (error) {
    console.error('Error loading data: ', error);
  }
};

export {saveBiometricWithExpiration, loadBiometricWithExpiration};
