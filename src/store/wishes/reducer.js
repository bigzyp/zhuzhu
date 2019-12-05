import { WISHES_LIST, WISHES_DETAIL, WISHES_SAVE, WISHES_UPDATE } from './action-type';

const INITIAL_STATE = {
  wishBoxList: [],
  wishesDetail: {
    detail: "这是一个测试心愿盒这是一个测试心愿盒这是一个测试心愿盒这是一个测试心愿盒这是一个测试心愿盒这是一个测试心愿盒这是一个测试心愿盒这是一个测试心愿盒这是一个测试心愿盒",
    state: 1,
    wishAddress: "杭州",
    wishBoxId: 1,
    wishName: "测试测试测试心愿盒",
    wishPic: ["https://ac-dev.oss-cn-hangzhou.aliyuncs.com/20190231/test/wish1.jpg"],
    wishSuccess: 1,
    wishDate: '2019-11-12',
    isHomeDisplay: 1
  },
}

export default function wishes (state = INITIAL_STATE, action) {
  switch (action.type) {
    case WISHES_LIST:
      return {
        ...state,
        ...action.payload
      }
    case WISHES_DETAIL:
      const { wishBoxId } = action.payload;
      return {
        ...state,
        wishesDetail: {
          ...state.wishesDetail,
          [wishBoxId]: action.payload
        }
      }
    case WISHES_SAVE:
    case WISHES_UPDATE:
    default:
       return state
  }
}
