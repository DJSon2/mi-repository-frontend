import { combineReducers } from 'redux';
import boardReducer from './BoardModule';
import memberReducer from './MemberModule';
import hrTeam2Reducer from './HrTeam2Module';
import memberIdModule from './MemberIdModule';
import mypageReducer from './MypageModule';
import noticeReducer from './NoticeModule';
import hrteam1Reducer from './HrTeam1Module';

const rootReducer = combineReducers({
    boardReducer,
    memberReducer,
    hrTeam2Reducer,
    memberIdModule,
    mypageReducer,
    noticeReducer,
    hrteam1Reducer
});

export default rootReducer;
