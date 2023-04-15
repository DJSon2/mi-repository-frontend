import {
    GET_NOTICE,
    POST_NOTICE,
    PUT_NOTICE,
    DELETE_NOTICE,
    GET_NOTICE2
} from '../modules/NoticeModule.js';

/* 공지사항 리스트 API */
export const callNoticeListAPI = ({currentPage}) => {
    let requestURL;

    if(currentPage !== undefined || currentPage !== null) {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/notice?offset=${currentPage}`;
    } else {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/notice`;
    }

    console.log('[NoticeAPICalls] requestURL : ', requestURL);

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Accept": "*/*"
            }
        })
        .then(response => response.json());
        if(result.status === 200) {
            console.log('[NoticeAPICalls] callNoticeAPI RESULT : ', result);
            dispatch({type: GET_NOTICE, payload: result.data});
        }
    };
}

/* 공지사항 리스트 API - 부서장 권한(글쓰기 권한 때문에 분리) */
export const callNoticeForMasterListAPI = ({currentPage}) => {
    let requestURL;

    if(currentPage !== undefined || currentPage !== null) {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/notice?offset=${currentPage}`;
    } else {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/notice`;
    }

    console.log('[NoticeAPICalls] requestURL : ', requestURL);

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Accept": "*/*"
            }
        })
        .then(response => response.json());
        if(result.status === 200) {
            console.log('[NoticeAPICalls] callNoticeAPI RESULT : ', result);
            dispatch({type: GET_NOTICE, payload: result.data});
        }
    };
}

/* 공지사항 상세페이지 API */
export const callNoticeDetailAPI = ({noticeNo}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/notice/${noticeNo}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Accept": "*/*"
            }

        })
        .then(response => response.json());
        if(result.status === 200) {
            console.log('[NoticeAPICalls] callNoticeDetailAPI SUCCESS');
            dispatch({type:GET_NOTICE, payload: result.data});
        }

    };
}

/* 공지사항 상세페이지 API - 부서장 권한(공지사항 수정 권한 때문에 분리) */
export const callNoticeDetailForMasterAPI = ({noticeNo}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/notice/${noticeNo}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Accept": "*/*"
            }
        })
        .then(response => response.json());
        if(result.status === 200) {
            console.log('[NoticeAPICalls] callNoticeDetailAPI SUCCESS');
            dispatch({type:GET_NOTICE, payload: result.data});
        }

    };
}

/* 공지사항 등록 API - 부서장 권한 */
export const callNoticeRegistAPI = ({form}) => {
    console.log('[NoticeAPICalls] callNoticeRegistAPI Call');
    // console.log('token' + window.localStorage.getItem("accessToken"));
    // console.log('form Id : ' + form.memberId);

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/notice`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "POST",
            headers: {
                "Accept": "*/*",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            },
            body: JSON.stringify(
                {
                    notice: {
                        noticeTitle : form.noticeTitle,
                        noticeContent : form.noticeContent
                    },
                    member: {
                        memberId : form.memberId
                    }
                }
            )
               
        })
        .then(response => response.json());

        console.log('[NoticeAPICalls] callNoticeRegistAPI RESULT : ', result);

        dispatch({type: POST_NOTICE, payload: result.data});

    };
}





/* 공지사항 update */
export const callNoticeUpdateAPI = ({form}) => {
    console.log('[NoticeAPICalls] callNoticeUpdateAPI Call')

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/notice`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")  
            },
            body: JSON.stringify({
                noticeNo: form.noticeNo,
                noticeTitle: form.noticeTitle,
                noticeContent: form.noticeContent,
                noticeCreatedDate: form.noticeCreatedDate
            })
        })
        .then(response => response.json());

        console.log('[NoticeAPICalls] callNoticeUpdateAPI RESULT : ', result);

        dispatch({type: PUT_NOTICE, payload: result});
    };
}

/* 공지사항 delete */
export const callNoticeDeleteAPI = ({form}) => {
    console.log('[NoticeAPICalls] callNoticeDeleteAPI Call')

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/notice`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")  
            },
            body: JSON.stringify({
                noticeNo: form.noticeNo,
                noticeTitle: form.noticeTitle,
                noticeContent: form.noticeContent,
                noticeCreatedDate: form.noticeCreatedDate
            })
        })
        .then(response => response.json());

        console.log('[NoticeAPICalls] callNoticeDeleteAPI RESULT : ', result);

        dispatch({type: DELETE_NOTICE, payload: result});
    };
}

/* 메인페이지-공지사항(5) */
export const callNoticeSmallListAPI = ({currentPage}) => {
    let requestURL;

    if(currentPage !== undefined || currentPage !== null) {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/smallnotice?offset=${currentPage}`;
    } else {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/smallnotice`;
    }

    console.log('[NoticeAPICalls] requestURL : ', requestURL);

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Accept": "*/*"
            }
        })
        .then(response => response.json());
        if(result.status === 200) {
            console.log('[NoticeAPICalls] callNoticeAPI RESULT : ', result);
            dispatch({type: GET_NOTICE2, payload: result.data});
        }
    };
}