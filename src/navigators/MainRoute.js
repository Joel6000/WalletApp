/* eslint-disable prettier/prettier */
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/login/Login';
import Transaction from '../screens/transactions/transaction';
import TransactionDetail from '../screens/transactions/transactionDetail';

const Stack = createStackNavigator();

const MainRoute = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Transaction" component={Transaction}/>
      <Stack.Screen name="Login" component={Login}/>
      <Stack.Screen name="TransactionDetail" component={TransactionDetail}/>
    </Stack.Navigator>
  );
};

export default MainRoute;
