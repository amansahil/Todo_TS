const INITIAL_STATE = {
    name: '',
    token: '',
    userName:''
  };

interface NameChange {
  type: 'name_changed';
  payload: string
}
interface LoginUser {
  type: 'login_user';
  payload: string
}
interface LogoutUser {
  type: 'logout_user';
  payload: null
}
interface GetUser {
  type: 'get_user';
  payload: string
}

type Action = NameChange | LoginUser | LogoutUser | GetUser ;

  export default (state = INITIAL_STATE, action: Action) => {
    switch (action.type) {
      case 'name_changed':
        return { ...state, name: action.payload };
      case 'login_user':
        return { ...state, token: action.payload };
      case 'logout_user':
        return {...state, token: null};
      case 'get_user':
        return {...state, userName: action.payload}
      default:
        return state;
    }
  };