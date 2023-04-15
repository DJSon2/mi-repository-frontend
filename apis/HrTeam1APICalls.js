import {
    GET_MEMBERINFO,
    PUT_MEMBERINFO,
    GET_APPROVAL,
    PUT_APPROVAL
} from '../modules/HrTeam1Module';

/*
    결재요청 조회
 */

/* 퇴사 결재요청 리스트 API */
export const callHr1ApprovalLeaveListAPI = ({currentPage, approvalStatus}) => {

    console.log('[HrTeam1APICalls] callHr1ApprovalLeaveListAPI Call')

    let requestURL;

    if(currentPage !== undefined || currentPage !== null) {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/hrteam1/approval-list/leave?offset=${currentPage}`;
    } else {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/hrteam1/approval-list/leave?1=1`;
    }
     
    requestURL = requestURL + `&approvalStatus=${approvalStatus}`;

    console.log('[HrTeam1APICalls] requestURL : ', requestURL);

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")     
            }
        })
        .then(response => response.json());
        if(result.status === 200) {
            console.log('[HrTeam1APICalls] callHr1ApprovalLeaveListAPI RESULT : ', result);
            dispatch({type: GET_APPROVAL, payload: result.data});
        }
    };
}

/* 퇴사 결재요청 상세페이지 */
export const callHr1ApprovalLeaveDetailAPI = ({leaveNo}) => {
    console.log('[HrTeam1APICalls] callHr1ApprovalLeaveDetailAPI Call')

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/hrteam1/approval-list/leave/${leaveNo}`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")  
            }
        })
        .then(response => response.json());
        if(result.status === 200) {
            console.log('[HrTeam1APICalls] callHr1ApprovalLeaveDetailAPI SUCCESS');
            dispatch({type:GET_APPROVAL, payload: result.data});
        }
    };
}

/* 퇴사 승인(update) API */
export const callHr1ApprovalLeaveUpdateAPI = ({form}) => {
    console.log('[HrTeam1APICalls] callHr1ApprovalLeaveUpdateAPI Call')

    if(typeof form.leaveNo === "undefined") {
        alert('잠시후 다시 시도해주세요.');
    } else {
        const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/hrteam1/approval-list/leave`;

        console.log('form.leaveNo : ', form.leaveNo);
        console.log('requestURL: ', requestURL);
        return async (dispatch, getState) => {
            const result = await fetch(requestURL, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*",
                    "Authorization": "Bearer " + window.localStorage.getItem("accessToken")  
                },
                body: JSON.stringify({
                    leaveNo: form.leaveNo,
                    memberNo: form.memberNo,
                    leaveReqDate: form.leaveReqDate,
                    leaveDate: form.leaveDate,
                    leaveDetail: form.leaveDetail,
                    firstApprover: form.firstApprover,
                    leaveApproval: form.leaveApproval,
                    secondApprover: form.secondApprover,
                    approvalDate: form.approvalDate
                })
            })
            .then(response => response.json());

            console.log('[HrTeam1APICalls] callHr1ApprovalLeaveUpdateAPI RESULT : ', result);

            dispatch({type: PUT_APPROVAL, payload: result});
        };
    }
}


/*
    회원정보 조회
 */

/* 회원정보 리스트 API */
export const callHr1MemberInfoListAPI = ({currentPage, search}) => {

    console.log('[HrTeam1APICalls] callHr1MemberInfoListAPI Call')

    let requestURL;

    if(currentPage !== undefined || currentPage !== null) {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/hrteam1/member-info?offset=${currentPage}`;
    } else {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/hrteam1/member-info?1=1`;
    }

    requestURL = requestURL + `&search=${search}`;

    console.log('[HrTeam1APICalls] requestURL : ', requestURL);

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")  
            }
        })
        .then(response => response.json());
        if(result.status === 200) {
            console.log('[HrTeam1APICalls] callHr1MemberInfoListAPI RESULT : ', result);
            dispatch({type: GET_MEMBERINFO, payload: result.data});
        }
    };
}

/* 회원정보 상세페이지 */
export const callHr1MemberInfoDetailAPI = ({memberNo}) => {
    console.log('[HrTeam1APICalls] callHr1MemberInfoDetailAPI Call')

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/hrteam1/member-info/${memberNo}`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")  
            }
        })
        .then(response => response.json());
        if(result.status === 200) {
            console.log('[HrTeam1APICalls] callHr1MemberInfoDetailAPI SUCCESS');
            dispatch({type:GET_MEMBERINFO, payload: result.data});
        }
    };
}

/* 회원정보 수정 */
export const callHr1MemberInfoUpdateAPI = ({form}) => {
    console.log('[HrTeam1APICalls] callHr1MemberInfoUpdateAPI Call')

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/hrteam1/member-info`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")  
            },
            body: JSON.stringify({
                memberNo: form.memberNo,
                memberAddress: form.memberAddress,
                memberPhone: form.memberPhone,
                memberEmail: form.memberEmail,
                depCode: form.depCode,
                memberRank: form.memberRank
            })
        })
        .then(response => response.json());

        console.log('[HrTeam1APICalls] callHr1MemberInfoUpdateAPI RESULT : ', result);

        dispatch({type: PUT_MEMBERINFO, payload: result});
    };
}

