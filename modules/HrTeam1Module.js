import {createActions, handleActions} from 'redux-actions';

/* 초기값 */
const initialState = [];

/* action */
export const GET_MEMBERINFO    = 'hrteam1/GET_MEMBERINFO';
export const PUT_MEMBERINFO    = 'hrteam1/PUT_MEMBERINFO';
export const GET_APPROVAL      = 'hrteam1/GET_APPROVAL';
export const PUT_APPROVAL      = 'hrteam1/PUT_APPROVAL';

const actions = createActions({
    [GET_MEMBERINFO]: () => {},
    [PUT_MEMBERINFO]: () => {},
    [GET_APPROVAL]: () => {},
    [PUT_APPROVAL]: () => {}
});

/* reducer */
const hrteam1Reducer = handleActions(
    {
        [GET_MEMBERINFO]: (state, {payload}) => {
            return payload;
        },
        [PUT_MEMBERINFO]: (state, {payload}) => {
            return payload;
        },
        [GET_APPROVAL]: (state, {payload}) => {
            return payload;
        },
        [PUT_APPROVAL]: (state, {payload}) => {
            return payload;
        }
    },
    initialState
);

export default hrteam1Reducer;