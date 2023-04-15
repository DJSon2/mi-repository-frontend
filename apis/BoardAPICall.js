
import { 
    GET_BOARD,      
    GET_BOARDS,
    POST_BOARD,
    PUT_BOARD,
    GET_BOARDS2,
    DELETE_BOARD
} from '../modules/BoardModule.js';

export const callBoardListAPI = ({currentPage}) => {
    
    let requestURL;

    if(currentPage !== undefined || currentPage !== null){
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/main/board?offset=${currentPage}`;
    }else {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/main/board`;
    }

    console.log('[BoardAPICalls] requestURL : ', requestURL);

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"                
            }
        })
        .then(response => response.json());
        if(result.status === 200){

            console.log('[ProduceAPICalls] callBoardAPI RESULT : ', result);

            dispatch({ type: GET_BOARDS,  payload: result.data });
        }
        
    };
}

export const callSmallBoardListAPI = ({currentPage}) => {
    let requestURL;

    if(currentPage !== undefined || currentPage !== null){
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/main/smallboard?offset=${currentPage}`;
    }else {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/main/smallboard`;
    }

    console.log('[SmallBoardAPICalls] requestURL : ', requestURL);

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"                
            }
        })
        .then(response => response.json());
        if(result.status === 200){

            console.log('[ProduceAPICalls] callSmallBoardAPI RESULT : ', result);

            dispatch({ type: GET_BOARDS2,  payload: result.data });
        }
    };
}


export const callBoardDetailAPI = ({boardNo}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/main/board/${boardNo}`;

    return async (dispatch, getState) => {


        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"
            }
        })
        .then(response => response.json());

        console.log('[ProduceAPICalls] callBoardDetailAPI RESULT : ', result);
        if(result.status === 200){
            console.log('[ProduceAPICalls] callBoardDetailAPI SUCCESS');
            dispatch({ type: GET_BOARD,  payload: result.data });
        }
        
    };
}

export const callBoardRegistAPI = ({form}) => {
    console.log('[ProduceAPICalls] callBoardRegistAPI Call');

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/main/board`;

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

        console.log('[ProduceAPICalls] callBoardRegistAPI RESULT : ', result);

        dispatch({ type: POST_BOARD,  payload: result });
        
    };    
}

export const callBoardUpdateAPI = ({form}) => {
    console.log('[ProduceAPICalls] callBoardUpdateAPI Call');

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/main/boardUpdate`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
//              "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            },
            body: JSON.stringify({
                memberNo: form.memberNo,
                boardNo: form.boardNo,
                boardTitle: form.boardTitle,
                boardContent: form.boardContent,
                boardViews: form.boardViews
            })
        })
        .then(response => response.json());

        console.log('[ProduceAPICalls] callBoardUpdateAPI RESULT : ', result);

        dispatch({ type: PUT_BOARD,  payload: result });
        
    };    
}

export const callBoardDeleteAPI = ({form}) => {
    console.log('[BoardAPICalls] callBoardDeleteAPI Call')

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/main/board`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"
            },
            body: JSON.stringify({
                boardNo: form.boardNo,
                boardTitle: form.boardTitle,
                boardContent: form.boardContent,
                boardCreatedDate: form.boardCreatedDate,
                boardViews: form.boardViews,
                boardImageUrl: form.boardImageUrl,
                memberNo: form.memberNo
            })
        })
        .then(response => response.json());

        console.log('[BoardAPICalls] callBoardDeleteAPI RESULT : ', result);

        dispatch({type: DELETE_BOARD, payload: result});
    };
}