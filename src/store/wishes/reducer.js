import { WISHES_LIST, WISHES_DETAIL, WISHES_SAVE, WISHES_UPDATE } from './action-type';

const INITIAL_STATE = {
  wishBoxList: [],
  wishDetail: {},
  wishSuccessNum: 0,
  wishTotalNum: 0
}

export default function wishes (state = INITIAL_STATE, action) {
  switch (action.type) {
    case WISHES_LIST:
      return {
        ...state,
        ...action.payload
      }
    case WISHES_DETAIL:
      return {
        ...state,
        wishDetail: action.payload
      }
    case WISHES_SAVE:
    case WISHES_UPDATE:
    default:
       return state
  }
}
