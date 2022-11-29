import {AsyncStorage} from 'react-native';
import {showMessage} from 'react-native-flash-message';

export const createAnNewAccount =
  (firtName, email, password, navigation) => async dispatch => {
    var logindata = {
      firstName: firtName,
      email: email,
      password: password,
    };
    try {
      await AsyncStorage.setItem('response', 'LOG');
      await AsyncStorage.setItem('loginData', JSON.stringify(logindata)).then(
        () => {
          dispatch({
            type: 'SET_LOADING_STATE',
            payload: false,
          });
          dispatch({
            type: 'SET_USER_DETAILS',
            payload: logindata,
          });
          showMessage({
            message: 'Your account has been successfully created',
            type: 'success',
          });
          navigation.navigate('Login');
        },
      );
    } catch (e) {
      showMessage({
        message: 'Something went wrong! try again',
        type: 'danger',
      });
      dispatch({
        type: 'SET_LOADING_STATE',
        payload: false,
      });
    }
  };

export const updateUser = text => async dispatch => {
  dispatch({
    type: 'SET_USER_DETAILS',
    payload: text,
  });
};

export const updateAnNewAccount = loginData => async dispatch => {
  try {
    await AsyncStorage.setItem('loginData', JSON.stringify(loginData)).then(
      () => {
        dispatch({
          type: 'SET_LOADING_STATE',
          payload: false,
        });
        showMessage({
          message: 'successfully Updated',
          type: 'success',
        });
      },
    );
  } catch (e) {
    showMessage({
      message: 'Something went wrong! try again',
      type: 'danger',
    });
    dispatch({
      type: 'SET_LOADING_STATE',
      payload: false,
    });
  }
};
