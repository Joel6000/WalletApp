import AsyncStorage from '@react-native-async-storage/async-storage';

const {add, isPast} = require('date-fns');
const currentTime = new Date();
const expireTime = add(currentTime, { minutes: 1 });


const saveBiometricWithExpiration = async (key, data) => {
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
      if (isPast(expirationTime)) {
        console.log('Data loaded successfully');
        return data;
      } else {
        // Data has expired, remove it
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
