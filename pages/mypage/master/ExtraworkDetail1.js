import { form, useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import {
    callExtraworkDetailAPI,
    callExtraworkUpdateAPI
} from '../../../apis/MypageAPICalls';
import Extrawork from '../../../components/Mypage/Extrawork';

function ExtraworkDetail1() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const extraworkData = useSelector(state => state.mypageReducer);
    const extrawork = extraworkData.data;

    const [form, setForm] = useState({});

    useEffect(
        () => {
            console.log('[ExtraworkDetail] ewNo : ', params.ewNo );
            dispatch(callExtraworkDetailAPI({	// 업무 외 수당 상세
                ewNo: params.ewNo
            }));            
        }
        ,[]
    );

    const onClickcallExtraworkUpdateHandler = () => {

        // setForm({
        //     ewNo: extrawork.ewApproval,
        //     ewApproval: "2차 승인 대기 중"
        // })

        form.ewNo = extrawork.ewNo;
        form.ewApproval = "2차 승인 대기 중";

        dispatch(callExtraworkUpdateAPI({
            form: form
        }));

        alert('1차 승인이 완료되었습니다.');
        navigate(`/mypage/extrawork/master/${extrawork.ewNo}`, {replace: true});
        window.location.reload();

    }
    console.log(extrawork);
    return(
        
        <div>
            <div>
            <button
                onClick = {onClickcallExtraworkUpdateHandler}
            >
                결재 승인
            </button>
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

export default ExtraworkDetail1;