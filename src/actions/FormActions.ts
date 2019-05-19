import { DatePickerAndroid, TimePickerAndroid } from 'react-native'

import { DispatchType, taskType } from '../lib/types'

export const iosDateTimeChanged = (date: Date) => {
    return {
        type: 'ios_date_time_changed',
        payload: date
    }
}

let androidDate: String

export const androidDateChanged = () => {
    return async (dispatch: DispatchType) => {
        try {
            const {
              action, year, month, day,
            } = await DatePickerAndroid.open({
            date: new Date(),
            minDate: new Date(),
            });
            if (action !== DatePickerAndroid.dismissedAction) {
              androidDate = `${day}/${month + 1}/${year}`
            }
          } catch ({ code, message }) {
            console.warn('Cannot open date picker', message);
          }
        
          dispatch({ type: 'android_date_changed', payload: androidDate })
    }
}

let chosenAndroidTime: String

export const androidTimeChanged = () => {
    return async (dispatch: DispatchType) => {
        try {
            const { action, hour, minute } = await TimePickerAndroid.open({
              hour: 14,
              minute: 0,
              is24Hour: false, // Will display '2 PM'
            });
            if (action !== TimePickerAndroid.dismissedAction) {
              // Selected hour (0-23), minute (0-59)
              const m = (minute < 10) ? `0${minute}` : minute;
              const h = (hour < 10) ? `0${hour}` : hour;
              console.log(`time: ${hour}:${minute}`);
              chosenAndroidTime = `${h}:${m}`
            }
          } catch ({ code, message }) {
            console.warn('Cannot open time picker', message);
          }

          dispatch({ type: 'android_time_changed', payload: chosenAndroidTime })
    }
}

export const taskChanged = (text: string) => {
    return {
        type: 'task_changed',
        payload: text
    }
}

export const colorChanged = (color: string) => {
    return {
        type: 'color_changed',
        payload: color
    } 
}

export const submitForm = (itemObject: taskType) => {
  return {
    type: 'add_item',
    payload: itemObject
  }
}