import { HOME_ANNIVERSARY_LIST } from './action-type';

const INITIAL_STATE = {
  anniversaryList: []
}

export default function home (state = INITIAL_STATE, action) {
  switch (action.type) {
    case HOME_ANNIVERSARY_LIST:
      return {
        ...state,
        anniversaryList: [
          ...action.payload
        ]
      }
    default:
       return state
  }
}
