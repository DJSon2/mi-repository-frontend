import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_SALARYS            = 'salary/GET_SALARYS';
export const PUT_SALARY             = 'salary/PUT_SALARY';
export const GET_SALARY             = 'salary/GET_SALARY';
export const POST_SALARY            = 'salary/POST_SALARY';
export const GET_MEMBERS            = 'salary/GET_MEMBERS';
export const GET_ATTINFO            = 'attendance/GET_ATTINFO';
export const POST_ATT               = 'attendance/POST_ATT';
export const PUT_ATT                = 'attendance/PUT_ATT';


const actions = createActions({
    [GET_SALARYS]: () => {},
    [PUT_SALARY]: () => {},
    [GET_SALARY]: () => {},
    [POST_SALARY]: () => {},
    [GET_MEMBERS]: () => {},
    [GET_ATTINFO]: () => {},
    [POST_ATT]: () => {},
    [PUT_ATT]: () => {}
});

/* 리듀서 */
const hrTeam2Reducer = handleActions(
    {
        [PUT_SALARY]: (state, { payload }) => {

            return payload;
        },
        [GET_SALARYS]: (state, { payload }) => {
            
            return payload;
        },
        [GET_SALARY]: (state, { payload }) => {
            return payload;
        },
        [POST_SALARY]: (state, { payload }) => {
            return payload;
        },
        [GET_MEMBERS]: (state, { payload }) => {
            return payload;
        },
        [GET_ATTINFO]: (state, { payload }) => {
            return payload;
        },
        [POST_ATT]: (state, { payload }) => {
            return payload;
        },
        [PUT_ATT]: (state, { payload }) => {
            return payload;
        }
    },
    initialState
);

export default hrTeam2Reducer;