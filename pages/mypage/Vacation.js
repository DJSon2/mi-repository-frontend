import mypagevacationlist from "../../components/Mypage/Vacation";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import ExtraworkCSS from './Extrawork.module.css'

import {
    callVacationListAPI
} from '../../apis/MypageAPICalls'
import { GET_MYPAGEVC } from "../../modules/MypageModule";

function Vacation() {

    const navigate = useNavigate();
    
    const dispatch = useDispatch();
    const vacation  = useSelector(state => state.mypageReducer);  
    const vacationList = vacation.data;
    const pageInfo = vacation.pageInfo;
    const [currentPage, setCurrentPage] = useState(1);
    
    const pageNumber = [];
    if(pageInfo){
        for(let i = 1; i <= pageInfo.pageEnd ; i++){
            pageNumber.push(i);
        }
    }

    useEffect(
        () => {
            dispatch(callVacationListAPI({	
                currentPage: currentPage
            }));            
        }
        ,[currentPage]
    );

    const onClickVacationInsert = () => {
        console.log('[Vacation] onClickVacationInsert');
        navigate("/mypage/vacation-registration", { replace: false })
    }

    const onClickTableTrHandler = (vacNo) => {
        navigate(`/mypage/vacation/${vacNo}`, { replace: false});
    }


    return (
        <>
            <div style={{ listStyleType: "none", display: "flex", justifyContent: "center" }}>

            <table className={ ExtraworkCSS.extraworkTable }>
                <colgroup>
                    <col width="5%" />
                    <col width="10%" />
                    <col width="10%" />
                    <col width="5%" />
                    <col width="5%" />
                </colgroup>
                <thead>
                    <tr>
                        <th>구분</th>
                        <th>휴가 신청일</th>
                        <th>휴가 시작일</th>
                        <th>휴가 일수</th>
                        <th>상태</th>
                    </tr>
                    </thead>
                    <tbody>
                        { Array.isArray(vacationList) && vacationList.map(
                            (vacation) => (
                            <tr
                                key={ vacation.vacNo }
                                onClick={ () => onClickTableTrHandler(vacation.vacNo) }
                            >
                                <td>{ vacation.vacType }</td>
                                <td>{ vacation.vacReqDate }</td>
                                <td>{ vacation.vacDate }</td>
                                <td>{ vacation.vacDay }</td>
                                <td>{ vacation.vacApproval }</td>
                            </tr>
                        ))
                        }
                    </tbody>                    
                </table>    
            </div>

            <div>
                <button
                    onClick = { onClickVacationInsert }
                    className={ ExtraworkCSS.insertBtn }
                >
                    상신
                </button>
            </div>

            <div style={{ listStyleType: "none", display: "flex", justifyContent: "center", position: "static" }}>
                { Array.isArray(vacationList) &&
                <button 
                    onClick={() => setCurrentPage(currentPage - 1)} 
                    disabled={currentPage === 1}
                    className={ ExtraworkCSS.pagingBtn }
                >
                    &lt;
                </button>
                }
                {pageNumber.map((num) => (
                <div key={num} onClick={() => setCurrentPage(num)}>
                    <button
                        style={ currentPage === num ? {backgroundColor : 'yellowgreen' } : null}
                        className={ ExtraworkCSS.pagingBtn }
                    >
                        {num}
                    </button>
                </div>
                ))}
                { Array.isArray(vacationList) &&
                <button 
                    className={ ExtraworkCSS.pagingBtn }
                    onClick={() => setCurrentPage(currentPage + 1)} 
                    disabled={currentPage === pageInfo.pageEnd  || pageInfo.total == 0}
                >
                    &gt;
                </button>
                }
            </div>
        </>
    );
}

export default Vacation;