import { HOME_ANNIVERSARY_LIST, HOME_WISHES_LIST } from './action-type';

const INITIAL_STATE = {
  wishesList: [],
  anniversaryList: []
}

export default function home (state = INITIAL_STATE, action) {
  switch (action.type) {
    case HOME_ANNIVERSARY_LIST:
      return {
        ...state,
        anniversaryList: action.payload
      }
    case HOME_WISHES_LIST:
      const { wishBoxList=[] } = action.payload;
      return {
        ...state,
        wishesList: [...wishBoxList]
      }
    default:
       return state
  }
}
