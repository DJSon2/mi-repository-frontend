import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_MYPAGE              = 'mypage/GET_MYPAGE';
export const GET_MYPAGEEW            = 'mypage/GET_MYPAGEEW';
export const GET_MYPAGEEWS           = 'mypage/GET_MYPAGEEWS';
export const POST_MYPAGEEW           = 'mypage/POST_MYPAGEEW';
export const GET_MYPAGEVC            = 'mypage/GET_MYPAGEVC';
export const GET_MYPAGEVCS           = 'mypage/GET_MYPAGEVCS';
export const POST_MYPAGEVC           = 'mypage/POST_MYPAGEVC';
export const PUT_EXTRAWORK           = 'mypage/PUT_EXTRAWORK';
export const POST_LEAVE              = 'mypage/POST__LEAVE';

const actions = createActions({
    [GET_MYPAGE]: () => {},
    [GET_MYPAGEEW]: () => {},
    [GET_MYPAGEEWS]: () => {},
    [POST_MYPAGEEW]: () => {},
    [GET_MYPAGEVC]: () => {},
    [GET_MYPAGEVCS]: () => {},
    [POST_MYPAGEVC]: () => {},
    [PUT_EXTRAWORK]: () => {},
    [POST_LEAVE]: () => {}
});

/* 리듀서 */
const mypageReducer = handleActions(
    {
        [GET_MYPAGE]: (state, { payload }) => {

            return payload;
        },
        [GET_MYPAGEEW]: (state, { payload }) => {

            return payload;
        },
        [GET_MYPAGEEWS]: (state, { payload }) => {

            return payload;
        },
        [POST_MYPAGEEW]: (state, { payload }) => {

            return payload;
        },
        [GET_MYPAGEVC]: (state, { payload }) => {

            return payload;
        },
        [GET_MYPAGEVCS]: (state, { payload }) => {

            return payload;
        },
        [POST_MYPAGEVC]: (state, { payload }) => {

            return payload;
        },
        [PUT_EXTRAWORK]: (state, { payload }) => {

            return payload;
        },
        [POST_LEAVE]: (state, { payload }) => {

            return payload;
        }
    },
    initialState
);

export default mypageReducer;