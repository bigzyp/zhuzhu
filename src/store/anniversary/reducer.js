import { ANNIVERSARY_LIST, ANNIVERSARY_DETAIL, ANNIVERSARY_SAVE, ANNIVERSARY_UPDATE } from './action-type';

const INITIAL_STATE = {
  anniversaryList: [],
  anniversaryDetail: {}
}

export default function anniversary (state = INITIAL_STATE, action) {
  switch (action.type) {
    case ANNIVERSARY_LIST:
      return {
        ...state,
        anniversaryList: [
          ...action.payload
        ]
      }
    case ANNIVERSARY_DETAIL:
      const { commemorationDayId } = action.payload;
      return {
        ...state,
        anniversaryDetail: {
          ...state.anniversaryDetail,
          [commemorationDayId]: action.payload
        }
      }
    case ANNIVERSARY_SAVE:
    case ANNIVERSARY_UPDATE:
    default:
       return state
  }
}
