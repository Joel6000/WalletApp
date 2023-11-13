export const SET_BIOMETRIC = 'SET_BIOMETRIC';

export const setBiometric = value => dispatch => {
  dispatch({
    type: SET_BIOMETRIC,
    payload: value,
  });
};
