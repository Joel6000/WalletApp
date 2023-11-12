import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import biometricReducer from '../reducers/reducer';

const rootReducer = combineReducers({biometricReducer});

export const Store = createStore(rootReducer, applyMiddleware(thunk));
