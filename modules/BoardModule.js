import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_BOARDS            = 'board/GET_BOARDS';
export const GET_BOARD             = 'board/GET_BOARD';
export const POST_BOARD            = 'board/POST_BOARD'; 
export const PUT_BOARD             = 'board/PUT_BOARD';
export const GET_BOARDS2           = 'board/GET_BOARDS2'
export const DELETE_BOARD          = 'board/DELETE_BOARD'

const actions = createActions({
    [GET_BOARDS]: () => {},
    [GET_BOARD]: () => {},
    [POST_BOARD]: () => {},
    [PUT_BOARD]: () => {},
    [GET_BOARDS2]: () => {},
    [DELETE_BOARD]: () => {},
});

/* 리듀서 */
const boardReducer = handleActions(
    {
        [GET_BOARDS]: (state, { payload }) => {
            
            return payload;
        },
        
        [GET_BOARD]: (state, { payload }) => {
            
            return payload;
        }, 

        [POST_BOARD]: (state, { payload }) => {
            
            return payload;
        },

        [PUT_BOARD]: (state, { payload }) => {
            
            return payload;
        },

        [GET_BOARDS2]: (state, { payload }) => {
            
            return payload;
        },

        [DELETE_BOARD]: (state, { payload }) => {
            
            return payload;
        }
    },
    initialState
);

export default boardReducer;