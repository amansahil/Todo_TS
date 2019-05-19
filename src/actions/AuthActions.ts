import { AsyncStorage } from 'react-native';
import { DispatchType } from '../lib/types'

interface formResult {
    name: string
}

export const nameChanged = (text: String) => {
    return {
        type: 'name_changed',
        payload: text
    }
}

export const loginUser = ({name}: formResult) => {
    return async (dispatch: DispatchType) => {
      await AsyncStorage.setItem('userToken', name );
      dispatch({ type: 'login_user', payload: name });
    };
};

export const logoutUser = () => {
    return async (dispatch: DispatchType) => {
      await AsyncStorage.clear();
      dispatch({ type: 'logout_user' });
    };
};

export const getUserName = () => {
    return async (dispatch: DispatchType) => {
        const userName = await AsyncStorage.getItem('userToken');
        dispatch({ type: 'get_user', payload: userName });
    };    
}