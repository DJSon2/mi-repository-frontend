import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import {
    callExtraworkDetailAPI
} from '../../apis/MypageAPICalls';
import Extrawork from '../../components/Mypage/Extrawork';

function ExtraworkDetail() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const extraworkData = useSelector(state => state.mypageReducer);
    const extrawork = extraworkData.data;


    useEffect(
        () => {
            console.log('[ExtraworkDetail] ewNo : ', params.ewNo );
            dispatch(callExtraworkDetailAPI({	// 업무 외 수당 상세
                ewNo: params.ewNo
            }));            
        }
        ,[]
    );
    console.log(extrawork);
    return(
        <div>
            <div>
                <table>
                    <tbody>
                        <br/><br/>
                        <tr>
                            <th>사번</th>    
                            <td>{ extrawork?.memberNo?.memberNo || '' }</td>
                        </tr>
                        <tr>
                            <th>근무일</th>    
                            <td>{ extrawork.ewDate || '' }</td>
                        </tr>    
                        <tr>
                            <th>신청일</th>    
                            <td>{ extrawork.ewReqDate || '' }</td>
                        </tr>    
                        <tr>
                            <th>구분</th>    
                            <td>{ extrawork.ewType || '' }</td>
                        </tr>    
                        <tr>
                            <th>근무 시간</th>    
                            <td>{ extrawork.ewTime || '' }</td>
                        </tr> 
                        <tr>
                            <th>세부사항</th>    
                            <td>{ extrawork.ewDetail || '' }</td>
                        </tr>
                        <tr>
                            <th>승인 상태</th>    
                            <td>{ extrawork.ewApproval || '' }</td>
                        </tr>
                        <tr>
                            <th>반려사유</th>    
                            <td>{ extrawork.rejectionDetail || '' }</td>
                        </tr>   
                    </tbody>                    
                </table>
            </div>
        </div>
    )
}

export default ExtraworkDetail;