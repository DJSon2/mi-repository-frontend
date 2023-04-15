import {createActions, handleActions} from 'redux-actions';

/* 초기값 */
const initialState = [];

/* action */
export const GET_NOTICE    = 'notice/GET_NOTICE';
export const POST_NOTICE   = 'notice/POST_NOTICE';
export const PUT_NOTICE    = 'notice/PUT_NOTICE';
export const DELETE_NOTICE = 'notice/DELETE_NOTICE';
export const GET_NOTICE2   = 'notice/GET_NOTICE2';

const actions = createActions({
    [GET_NOTICE]: () => {},
    [POST_NOTICE]: () => {},
    [PUT_NOTICE]: () => {},
    [DELETE_NOTICE]: () => {},
    [GET_NOTICE2]: () => {}
});

/* reducer */
const noticeReducer = handleActions(
    {
        [GET_NOTICE]: (state, {payload}) => {
            return payload;
        },
        [POST_NOTICE]: (state, {payload}) => {
            return payload;
        },
        [PUT_NOTICE]: (state, {payload}) => {
            return payload;
        },
        [DELETE_NOTICE]: (state, {payload}) => {
            return payload;
        },
        [GET_NOTICE2]: (state, {payload}) => {
            return payload;
        }
    },
    initialState
);

export default noticeReducer;
