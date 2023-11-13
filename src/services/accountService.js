import {DATA} from '../constants/transactions';

export const loadData = async () => {
  try {
    // await api to load call to load data
    return DATA;
  } catch (error) {
    console.error('Error saving data: ', error);
  }
};