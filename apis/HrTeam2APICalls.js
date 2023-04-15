import { 
    GET_SALARY,
    GET_SALARYS,
    POST_SALARY,
    PUT_SALARY,
    GET_MEMBERS,
    GET_ATTINFO,
    PUT_ATT,
    POST_ATT
  
} from '../modules/HrTeam2Module.js';

export const callSalaryAPI = ({currentPage}) => {
    
    let requestURL;

    if(currentPage !== undefined || currentPage !== null){
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/hr-team2/salary?offset=${currentPage}`;
    }else {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/hr-team2/salary`;
    }
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
        if(result.status === 200){
            console.log('[SalaryAPICalls] callSalaryAPI RESULT : ', result);
            dispatch({ type: GET_SALARYS,  payload: result.data });
        }
        
    };
}

export const callMemberInfoAPI = ({currentPage}) => {
    
    let requestURL;

    if(currentPage !== undefined || currentPage !== null){
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/hr-team2/member?offset=${currentPage}`;
    }else {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/hr-team2/member`;
    }
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
        if(result.status === 200){
            console.log('[MemberAPICalls] callMemberAPI RESULT : ', result);
            dispatch({ type: GET_MEMBERS,  payload: result.data });
        }
        
    };
}

export const callSalaryUpdateAPI = ({form}) => {
    console.log('[HrTeam2APICalls] callSalaryUpdateAPI Call');

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/hr-team2/updateSalary`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "PUT",
            headers: {
                "Accept": "*/*",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            },
            body: JSON.stringify({
                memberNo: form.memberNo,
                baseSalary: form.baseSalary,
                vacationPay: form.vacationPay,
                overTimePay: form.overTimePay,
                salNo: form.salNo,
                salDate: form.salDate
            })
        })
        .then(response => response.json());

        console.log('[HrTeam2APICalls] callSalaryUpdateAPI RESULT : ', result);

        dispatch({ type: PUT_SALARY,  payload: result });
        
    };    

}

export const callSalaryDetailAPI = ({salNo}) => {
    console.log('[HrTeam2APICalls] callSalaryDetailAPI Call');

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/hr-team2/salary-detail/${salNo}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Accept": "*/*",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            }
        })
        .then(response => response.json());
        
        if(result.status === 200){
            dispatch({ type: GET_SALARY,  payload: result.data });
        } else {
            console.log('[HrTeam2APICalls] callSalaryDetailAPI RESULT 실패 : ', result);
        }
    };    
}

export const callSalaryRegistAPI = ({form}) => {
    console.log('[HrTeam2APICalls] callSalaryRegistAPI Call');

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/hr-team2/salarys`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "POST",
            headers: {
                "Accept": "*/*",
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            },
            body: JSON.stringify({
                memberNo: form.memberNo,
                baseSalary: form.baseSalary,
                vacationPay: form.vacationPay,
                overTimePay: form.overTimePay,
                salDate: form.salDate
            })
        })
        .then(response => response.json());

        console.log('[HrTeam2APICalls] callSalaryRegistAPI RESULT : ', result);

        dispatch({ type: POST_SALARY,  payload: result });
        
    };    
}

export const callMemberAttInfoAPI = ({currentPage}) => {
    console.log('[callMemberAttInfoAPI] callMemberAttInfoAPI Call');
    let requestURL;

    if(currentPage !== undefined || currentPage !== null){
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/hr-team2/attendance?offset=${currentPage}`;
    }else {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/hr-team2/attendance`;
    }
    console.log('[callMemberAttInfoAPI] requestURL : ', requestURL);
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
        if(result.status === 200){
            console.log('[callMemberAttInfoAPI] callMemberAttInfoAPI RESULT : ', result);
            dispatch({ type: GET_ATTINFO,  payload: result.data });
        }

    };
}

export const callAttRegistAPI = (form) => {
    console.log('[HrTeam2APICalls] callAttRegistAPI Call');

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/attendance/insertAttendance`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "POST",
            headers: {
                "Accept": "*/*",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                memberId: form.memberId,
                attTime: form.attTime,
                attDate: form.attDate 
            })
        })
        .then(response => response.json());

        console.log("넘어가는 body부분 : " + JSON.stringify({form}))
        console.log('[HrTeam2APICalls] callAttRegistAPI RESULT : ', result);

        dispatch({ type: POST_ATT,  payload: result.data });
        
    };    
}


export const callOffTimeUpdateAPI = ({form}) => {
    console.log('[HrTeam2APICalls] callOffTimeUpdateAPI Call');

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/hr-team2/updateOffTime`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "PUT",
            headers: {
                "Accept": "*/*",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            },
            body: JSON.stringify({
                memberId: form.memberId,
                offTime: form.offTime,
                workTime: form.workTime
            })
        })
        .then(response => response.json());

        console.log('[HrTeam2APICalls] callOffTimeUpdateAPI RESULT : ', result);

        dispatch({ type: PUT_ATT,  payload: result.data });
        
    };    

}