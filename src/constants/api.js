
let host = '';
switch (process.env.NODE_ENV) {
    case 'production':
        host = 'https://api.zengyangping.cn';
        break;
    default:
        // host = 'http://localhost:8888';
        host = 'https://api.zengyangping.cn';
        break;
}

export const HOST = host;

// 文件服务器地址
export const HOST_OSS = 'https://oss.zengyangping.cn';
// 上传文件
export const API_UPLOAD = `${host}/upload`;

// user
export const API_USER_LOGIN = `${host}/user/wxAppLogin`
export const API_USER_INVITE = `${host}/user/wxAppReferee`
export const API_USER_UPDATE = `${host}/user/updateUserInfo`

// anniversary
export const API_ANNIVERSARY_LIST = `${host}/commemorationDay/listCommemorationDay`
export const API_ANNIVERSARY_DETAIL = `${host}/commemorationDay/getCommemorationDayById`
export const API_ANNIVERSARY_SAVE = `${host}/commemorationDay/saveCommemorationDay`
export const API_ANNIVERSARY_UPDATE = `${host}/commemorationDay/updateCommemorationDay`

// // wishes
// export const API_WISHES_LIST = `${host}/wishes/listWishes`
// export const API_WISHES_DETAIL = `${host}/wishes/getWishesById`
// export const API_WISHES_SAVE = `${host}/wishes/saveWishes`
// export const API_WISHES_UPDATE = `${host}/wishes/updateWishes`

// wishes
export const API_WISHES_LIST = `${host}/wishBox/listWishBox`
export const API_WISHES_DETAIL = `${host}/wishBox/getWishBoxById`
export const API_WISHES_SAVE = `${host}/wishBox/saveWishBox`
export const API_WISHES_UPDATE = `${host}/wishBox/updateWishBox`
