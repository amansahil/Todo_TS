import _ from 'lodash';
import { REHYDRATE } from 'redux-persist/constants';

import { TaskType } from '../lib/types';


interface Hydrate {
  type: 'persist/REHYDRATE';
  payload: any
}

interface ClearItems {
  type: 'clear_items';
  payload: null[]
}
interface AddItem {
  type: 'add_item';
  payload: TaskType
}

type Action = Hydrate | ClearItems | AddItem

export default function(state = [], action: Action) {
  switch (action.type) {
    case REHYDRATE:
        return action.payload.list || [];
    case 'clear_items':
      return [];
    case 'add_item':
      return _.uniqBy([
        action.payload, ...state
      ], 'key');
    default:
      return state;
  }
}