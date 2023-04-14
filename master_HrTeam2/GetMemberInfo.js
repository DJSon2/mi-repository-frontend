import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';

import {
    callMemberInfoAPI
} from '../../../apis/HrTeam2APICalls'

function GetMemberInfo() {

    const dispatch = useDispatch();
    const members = useSelector(state => state.hrTeam2Reducer)
    const memberList = members.data;

    const pageInfo = members.pageInfo;

    const [currentPage, setCurrentPage] = useState(1);

    const pageNumber = [];
    if(pageInfo){
        for(let i = 1; i <= pageInfo.pageEnd ; i++){
            pageNumber.push(i);
        }
    }

    useEffect(
        () => {
            dispatch(callMemberInfoAPI({
                currentPage: currentPage
            }));            
        }
        ,[currentPage]
    );   

    return (
        <>
            <div>
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
                        <th>기본 급여</th>
                        <th>직급</th>
                        <th>연락처</th>
                        <th>이메일</th>
                    </tr>
                </thead>
                <tbody>
                    { Array.isArray(memberList) && memberList.map((p, index) => (
                        <tr
                            key={ index }
                        >
                            <td>{ p.memberCode }</td>
                            <td>{ p.memberName }</td>
                            <td>{ p.memberBaseSalary }</td>
                            <td>{ p.memberRank }</td>
                            <td>{ p.memberPhone }</td>
                            <td>{ p.memberEmail }</td>
                        </tr>
                    )) 
                    }
                </tbody>                    
            </table>    
          
            </div>
            <div style={{ listStyleType: "none", display: "flex", justifyContent: "center"}}>
                { Array.isArray(memberList) &&
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
                { Array.isArray(memberList) &&
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

export default GetMemberInfo;
