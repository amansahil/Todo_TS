const INITIAL_STATE = {
  chosenDate: new Date(),
  chosenAndroidTime: '00:00',
  androidDate: `${new Date().getUTCDate()}/${new Date().getUTCMonth() + 1}/${new Date().getUTCFullYear()}`,
  task: '',
  radioSelected: '#00BCD4',
};

interface IOSDateTimeChange {
  type: 'ios_date_time_changed';
  payload: Date
}
interface AndroidDateChange {
  type: 'android_date_changed';
  payload: Date
}
interface AndroidTimeChange {
  type: 'android_time_changed';
  payload: Date
}
interface TaskChange {
  type: 'task_changed';
  payload: string
}
interface ColorChange {
  type: 'color_changed';
  payload: string
}

type Action = IOSDateTimeChange | AndroidDateChange | AndroidTimeChange | TaskChange | ColorChange ;
  
  export default (state = INITIAL_STATE, action: Action) => {
    switch (action.type) {
      case 'ios_date_time_changed':
        return { ...state, chosenDate: action.payload };
      case 'android_date_changed':
        return { ...state, androidDate: action.payload };
      case 'android_time_changed':
        return { ...state, chosenAndroidTime: action.payload };
      case 'task_changed':
        return { ...state, task: action.payload }
      case 'color_changed':
        return { ...state, radioSelected: action.payload }
      default:
        return state;
    }
  };