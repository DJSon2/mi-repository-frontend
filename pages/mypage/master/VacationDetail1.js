import { useNavigate, useParams, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import {
    callVacationDetailAPI
} from '../../apis/MypageAPICalls';
// import VacationDetail from '../../components/Mypage/Vacation';

function VacationDetail() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const vacationData = useSelector(state => state.mypageReducer);
    const vacation = vacationData.data;

    useEffect(
        () => {
            dispatch(callVacationDetailAPI({	// 휴무 상세
                vacNo: params.vacNo
            }));            
        }
        ,[]
    );

    return(
        <div>
            <div>
                <table>
                    <tbody><br/><br/>
                        <tr>
                            <th>게시물 번호</th>    
                            <td>{ vacation.vacNo || '' }</td>
                        </tr>
                        <tr>
                            <th>사번</th>    
                            <td>{ vacation?.memberNo?.memberCode || '' }</td>
                        </tr>    
                        <tr>
                            <th>휴가시작일</th>    
                            <td>{ vacation.vacDate || '' }</td>
                        </tr>  
                        <tr>
                            <th>휴가종류</th>    
                            <td>{ vacation.vacType || '' }</td>
                        </tr>  
                        <tr>
                            <th>휴가사유</th>    
                            <td>{ vacation.vacDetail || '' }</td>
                        </tr>    
                        <tr>
                            <th>휴가신청일</th>    
                            <td>{ vacation.vacReqDate || '' }</td>
                        </tr> 
                        <tr>
                            <th>휴가일수</th>    
                            <td>{ vacation.vacDay || '' }</td>
                        </tr>
                        <tr>
                            <th>결재상태</th>    
                            <td>{ vacation.vacApproval || '' }</td>
                        </tr>  
                    </tbody>                    
                </table>
            </div>
        </div>
    )
}

export default VacationDetail;