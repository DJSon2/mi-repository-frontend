import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';

import {
    callMemberAttInfoAPI
} from '../../../apis/HrTeam2APICalls'

function GetAttList() {
    
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const atts = useSelector(state => state.hrTeam2Reducer);
    const attList = atts.data;

    const pageInfo = atts.pageInfo;

    const [currentPage, setCurrentPage] = useState(1);

    const pageNumber = [];
    if(pageInfo){
        for(let i = 1; i <= pageInfo.pageEnd ; i++){
            pageNumber.push(i);
        }
    }


    useEffect(
        () => {
            dispatch(callMemberAttInfoAPI({
                currentPage: currentPage
            }));            
        }
        ,[currentPage]
    );

    return (
        <>
            <div >
            <table className='table'>
                <colgroup>
                    <col width="5%" />
                    <col width="10%" />
                    <col width="10%" />
                    <col width="10%" />
                    <col width="10%" />
                    <col width="10%" />
                </colgroup>
                <thead>
                    <tr>
                        <th>회원번호</th>
                        <th>회원 이름</th>
                        <th>출근시간</th>
                        <th>퇴근시간</th>
                        <th>출근날</th>
                        <th>일한 시간</th>
                    </tr>
                </thead>
                <tbody>
                    { Array.isArray(attList) && attList.map((p, index) => (
                        <tr
                            key={ index }
                        >
                            <td>{ p.member?.memberCode }</td>
                            <td>{ p.member?.memberName }</td>
                            <td>{ p.attTime }</td>
                            <td>{ p.offTime}</td>
                            <td>{ p.attDate }</td>
                            <td>{ p.workTime }</td>
                        </tr>
                    )) 
                    }
                </tbody>                    
            </table>    
          
            </div>
            <div style={{ listStyleType: "none", display: "flex", justifyContent: "center"}}>
                { Array.isArray(attList) &&
                <button 
                    onClick={() => setCurrentPage(currentPage - 1)} 
                    disabled={currentPage === 1}
                >
                    &lt;
                </button>
                }
                {pageNumber.map((num) => (
                <li key={num} onClick={() => setCurrentPage(num)}>
                    <button
                        style={ currentPage === num ? {backgroundColor : 'yellowgreen' } : null}
                    >
                        {num}
                    </button>
                </li>
                ))}
                { Array.isArray(attList) &&
                <button 
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

export default GetAttList;
