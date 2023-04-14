import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SalaryCSS from "./SalaryCSS.css";

import {
    callSalaryRegistAPI,
    callMemberInfoAPI
} from '../../../apis/HrTeam2APICalls';

function SalaryRegistration() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const members = useSelector(state => state.hrTeam2Reducer)
    const memberList = members.data;
    const pageInfo = members.pageInfo;

    const [currentPage, setCurrentPage] = useState(1);
    const [selectedMember, setSelectedMember] = useState(null);
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
    useEffect(() => {
        dispatch(callMemberInfoAPI({ currentPage: 1 }));
      }, [dispatch]);

    const handleSelectChange = (e) => {
        const selectedValue = parseInt(e);
        const selectedMember = memberList.find(member => member.memberNo === selectedValue);
        setSelectedMember(selectedMember);
    }


    const [form, setForm] = useState({
        baseSalary: 0,
        vacationPay: 0,
        overTimePay: 0,
        salDate: "",
        memberNo: 0
    }); 

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };
    
    const onClickSalaryRegistrationHandler =  () => {

        console.log('[SalaryRegistration] onClickSalaryRegistrationHandler');


        try {
             dispatch(callSalaryRegistAPI({
                form: {
                    memberNo: selectedMember.memberNo,
                    baseSalary: selectedMember.memberBaseSalary,
                    vacationPay: form.vacationPay,
                    overTimePay: form.overTimePay,
                    salDate: form.salDate,
                    salNo: form.salNo
                }
            }));
    
            alert('급여 지급 내역이 생성되었습니다.');
            navigate('/hr-team2/salary', { replace: true});
            window.location.reload();
        } catch (error) {
            console.error(error);
            alert('급여 지급 등록에 실패했습니다. 오류를 확인해주세요.');
        }
    }   

    return (
        <div>
            <div>
                
                <button        
                    onClick={ () => navigate(-1) }            
                >
                    돌아가기
                </button>
                <button       
                    onClick={ onClickSalaryRegistrationHandler }             
                >
                    급여 등록
                </button>
            </div>        
                <div>
                    <table>
                        <tbody>
                            <tr>
                                <td><label>회원넘버</label></td>
                                <td>
                                    <input 
                                        name='memberNo'
                                        type='number'
                                        onChange={ onChangeHandler }
                                        value={selectedMember ? selectedMember.memberNo : ""}
                                    ></input>
                                </td>
                            </tr>
                            <tr>
                                <td><label>기본 급여</label></td>
                                <td>
                                    <input 
                                        name='baseSalary'
                                        placeholder='기본 급여'
                                        type='number'
                                        onChange={ onChangeHandler }
                                        value={selectedMember ? selectedMember.memberBaseSalary : ""}
                                    />
                                </td>
                            </tr>         
                            <tr>
                                <td><label>급여지급일</label></td>
                                <td>
                                <input 
                                        placeholder='급여지급일'
                                        name='salDate'
                                        type='date'
                                        onChange={ onChangeHandler }
                                    />
                                </td>
                            </tr>   
                        </tbody>                        
                    </table>
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
                        <th>기본 주급</th>
                        <th>직급</th>
                        <th>연락처</th>
                        <th>이메일</th>
                    </tr>
                </thead>
                <tbody>
                    { Array.isArray(memberList) && memberList.map((p, index) => (
                        <tr
                            key={ index }
                            onClick={ () =>  handleSelectChange(p.memberNo)}
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
                </div>
    );


}

export default SalaryRegistration;