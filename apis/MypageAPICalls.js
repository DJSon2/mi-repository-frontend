import { 
    GET_MYPAGE,         // 마이페이지 조회
    GET_MYPAGEEW,       // 시간 외 수당 조회 목록
    GET_MYPAGEEWS,      // 시간 외 수당 상세페이지
    POST_MYPAGEEW,      // 시간 외 수당 신청
    GET_MYPAGEVC,       // 휴무 조회 목록
    GET_MYPAGEVCS,      // 휴무 상세페이지
    POST_MYPAGEVC,      // 휴무 신청

    PUT_EXTRAWORK,       // 부장 페이지..
    POST_LEAVE          // 퇴사 상신
} from '../modules/MypageModule.js';

export const callMyinfoListAPI = ({memberId}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/mypage/information/${memberId}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
                // "Authorization": "Bearer " + window.localStorage.getItem("accessToken") 
            }
        })
        .then(response => response.json());

        console.log('[MypageAPICalls] callMyinfoListAPI  : ', result);
        if(result.status === 200){
            console.log('[MypageAPICalls] callMyinfoListAPI SUCCESS');
            dispatch({ type: GET_MYPAGE,  payload: result });
        }
    };
}

export const callMypageListAPI = ({currentPage}) => {

    let requestURL;

    if(currentPage !== undefined || currentPage !== null){
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/mypage/extraworklist?offset=${currentPage}`;
    }else {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/mypage/extraworklist`;
    }

    console.log('[MypageAPICalls] requestURL : ', requestURL);

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")                
            }
        })
        .then(response => response.json());

        console.log('[MypageAPICalls] callMypageListAPI  : ', result);
        if(result.status === 200){
            console.log('[MypageAPICalls] callMypageListAPI SUCCESS');
            dispatch({ type: GET_MYPAGEEW,  payload: result.data });
        }
    };
}

export const callExtraworkDetailAPI = ({ewNo}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/mypage/extraworklist/${ewNo}`;
    
    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            }
        })
        .then(response => response.json());
    
        console.log('[MypageAPICalls] callExtraworkDetailAPI RESULT : ', result);
        if(result.status === 200){
            console.log('[MypageAPICalls] callExtraworkDetailAPI SUCCESS', result);
            dispatch({ type: GET_MYPAGEEWS,  payload: result });
        }
    };
}

export const callExtraworkRegistAPI = ({form}) => {
    console.log('[MypageAPICalls] callExtraworkRegistAPI Call');

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/mypage/extraworklist`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "POST",
            headers: {
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            },
            body: form
        })
        .then(response => response.json());

        console.log('[MypageAPICalls] callExtraworkRegistAPI RESULT : ', result);

        dispatch({ type: POST_MYPAGEEW,  payload: result });
        
    };    
}

export const callVacationListAPI = ({currentPage}) => {

    let requestURL;

    if(currentPage !== undefined || currentPage !== null){
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/mypage/vacationlist?offset=${currentPage}`;
    }else {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/mypage/vacationlist`;
    }

    console.log('[MypageAPICalls] requestURL : ', requestURL);

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")                
            }
        })
        .then(response => response.json());

        console.log('[MypageAPICalls] callVacationListAPI  : ', result);
        if(result.status === 200){
            console.log('[MypageAPICalls] callVacationListAPI SUCCESS');
            dispatch({ type: GET_MYPAGEVC,  payload: result.data });
        }
    };
}

export const callVacationDetailAPI = ({vacNo}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/mypage/vacationlist/${vacNo}`;
    
    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            }
        })
        .then(response => response.json());
    
        console.log('[MypageAPICalls] callVacationDetailAPI RESULT : ', result);
        if(result.status === 200){
            console.log('[MypageAPICalls] callVacationDetailAPI SUCCESS', result);
            dispatch({ type: GET_MYPAGEVCS,  payload: result });
        }
    };
}

/* 수정 중 */
export const callVacationRegistAPI = ({form}) => {
    console.log('[MypageAPICalls] callExtraworkRegistAPI Call');

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/mypage/extraworklist`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            },
            body: JSON.stringify({
                memberNo: form.memberNo,
                ewType: form.ewType,
                ewDate: form.ewDate,
                ewTime: form.ewTime,
                ewReqDate: form.ewReqDate,
                ewDetail: form.ewDetail,
                ewApproval: form.ewApproval,
            })
        })
        .then(response => response.json());

        console.log('[MypageAPICalls] callExtraworkRegistAPI RESULT : ', result);

        dispatch({ type: POST_MYPAGEVC,  payload: result });
    };    
}

/* 1차 승인(update) API */
export const callExtraworkUpdateAPI = ({form}) => {
    console.log('[MypageMasterAPICalls] callExtraworkUpdateAPI Call')
    
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/mypage/extraworklist`;

        return async (dispatch, getState) => {
            const result = await fetch(requestURL, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*",
                    "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
                },
                body: JSON.stringify({
                    ewNo: form.ewNo,
                    ewReqDate: form.ewReqDate,
                    ewType: form.ewType,
                    ewDate: form.ewDate,
                    ewTime: form.ewTime,
                    ewDetail: form.ewDetail,
                    leaveApproval: form.leaveApproval,
                    ewApproval: form.ewApproval,
                    approvalDate: form.approvalDate,
                    memberNo: form.memberNo,
                    firstApprover: form.firstApprover,
                    secondApprover: form.secondApprover,
                    rejectionDetail: form.rejectionDetail,
                })
            })
            .then(response => response.json());

            console.log('[MypageMasterAPICalls] callExtraworkUpdateAPI RESULT : ', result);

            dispatch({type: PUT_EXTRAWORK, payload: result});
        };
}

export const callLeaveRegistAPI = ({form}) => {
    console.log('[MypageAPICalls] callLeaveRegistAPI Call');

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/mypage/leave`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "POST",
            headers: {
                "Accept": "*/*",
                // "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            },
            body: form
        })
        .then(response => response.json());

        console.log('[MypageAPICalls] callLeaveRegistAPI RESULT : ', result);

        dispatch({ type: POST_LEAVE,  payload: result });
        
    };    
}