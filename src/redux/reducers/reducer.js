import {SET_BIOMETRIC} from '../actions/action';

const initialState = {
  biometric: false,
};

const biometricReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BIOMETRIC:
      return {...state, biometric: action.payload};
    default:
      return state;
  }
};

export default biometricReducer;
