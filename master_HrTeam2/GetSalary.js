import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';

import { NavLink } from 'react-router-dom';

import {
    callSalaryAPI,
} from '../../../apis/HrTeam2APICalls'


function GetSalary() {

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const salarys = useSelector(state => state.hrTeam2Reducer)
    const salaryList = salarys.data;

    const pageInfo = salarys.pageInfo;

    const [currentPage, setCurrentPage] = useState(1);

    const pageNumber = [];
    if(pageInfo){
        for(let i = 1; i <= pageInfo.pageEnd ; i++){
            pageNumber.push(i);
        }
    }


    useEffect(
        () => {
            dispatch(callSalaryAPI({
                currentPage: currentPage
            }));            
        }
        ,[currentPage]
    );

    const onClickTableTr = (salNo) => {
        navigate(`/hr-team2/salaryDetail/${salNo}`, { replace: false });
    }

    return (
        <>
        <button><NavLink to="/hr-team2/salaryRegistration">급여 내역 추가</NavLink></button>
            <div >
            <table className='table'>
                <colgroup>
                    <col width="5%" />
                    <col width="10%" />
                    <col width="10%" />
                    <col width="10%" />
                    <col width="10%" />
                    <col width="10%" />
                    <col width="15%" />
                </colgroup>
                <thead>
                    <tr>
                        <th>회원번호</th>
                        <th>회원 이름</th>
                        <th>기본급여</th>
                        <th>추가급여</th>
                        <th>총급여</th>
                        <th>급여지급일</th>
                        <th>추가급여사항</th>
                    </tr>
                </thead>
                <tbody>
                    { Array.isArray(salaryList) && salaryList.map((p, index) => (
                        <tr
                            key={ index}
                            onClick={ () => onClickTableTr(p.salNo) }
                        >
                            <td>{ p.member?.memberCode }</td>
                            <td>{ p.member?.memberName }</td>
                            <td>{ p.baseSalary }</td>
                            <td>{ p.vacationPay + p.overTimePay }</td>  
                            <td>{ p.vacationPay + p.overTimePay + p.baseSalary }</td>
                            <td>{ p.salDate }</td>
                            <td>
                                { p.overTimePay != 0 ?  `연장 근무 시간 : ${Math.round(p.overTimePay / (1.5 * (p.baseSalary/160)))}` : ""}
                                , {}
                                { p.vacationPay != 0 ?  `미사용 연차 수당 적용 일 : ${Math.round(p.vacationPay / (8 * (p.baseSalary/160)))}` : ""}
                            </td>
                        </tr>
                    )) 
                    }
                </tbody>                    
            </table>    
          
            </div>
            <div style={{ listStyleType: "none", display: "flex", justifyContent: "center"}}>
                { Array.isArray(salaryList) &&
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
                { Array.isArray(salaryList) &&
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

export default GetSalary;