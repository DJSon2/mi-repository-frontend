import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import {
    callSalaryDetailAPI,
    callSalaryUpdateAPI
} from '../../../apis/HrTeam2APICalls'

function SalaryDetail() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const salary = useSelector(state => state.hrTeam2Reducer);

    const [modifyMode, setModifyMode] = useState(false);
    const [form, setForm] = useState(null);

    useEffect(
        () => {

            dispatch(callSalaryDetailAPI({
                salNo: params.salNo
            }));
        }
        ,[]
    );

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const onClickModifyModeHandler = () => {
        setModifyMode(true);
        setForm({
            memberNo: salary?.memberNo,
            baseSalary: salary?.baseSalary,
            vacationPay: salary?.vacationPay,
            overTimePay: salary?.overTimePay,
            salNo: salary?.salNo,
            salDate: salary?.salDate
        });
    }


    const onClickSalaryUpdateHandler = () => {        

        dispatch(callSalaryUpdateAPI({	
            form: form
        }));         

        alert('급여 수정이 완료되었습니다')
        navigate(`/hr-team2/salary`, { replace: true});
    }    

    return (
        <>
        { salary &&
            <div>
                <table>
                <colgroup>
                        <col width="5%" />
                        <col width="10%" />
                    </colgroup>
                    <tbody>            
                        <tr>
                            <th>회원이름</th>
                            <td>
                                {salary?.memberNum?.memberName}
                            </td>
                        </tr>
                        <tr>
                            <th>회원코드</th>
                            <td>
                                {salary?.memberNum?.memberCode}
                            </td>
                        </tr>
                        <tr>
                            <th>기본급여</th>
                            <td>    
                                {salary?.baseSalary}
                            </td>
                        </tr>
                        <tr>
                            <th>남은 연차 일</th>
                            <td>
                                <input 
                                    name='vacationPay'
                                    readOnly={modifyMode ? false : true}
                                    style={ !modifyMode ? { backgroundColor: 'gray'} : null}
                                    type='number'
                                    onChange={ onChangeHandler }
                                    value={ form == null ? Math.round(salary?.vacationPay / (8 * (salary?.baseSalary/160))) : form?.vacationPay }
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>추가근무시간</th>
                            <td>
                                <input 
                                    name='overTimePay'
                                    readOnly={modifyMode ? false : true}
                                    style={ !modifyMode ? { backgroundColor: 'gray'} : null}
                                    type='number'
                                    onChange={ onChangeHandler }
                                    value={ form == null ? Math.round(salary?.overTimePay/ (1.5 * (salary?.baseSalary/160))): form?.overTimePay }
                                />
                            </td>
                        </tr>
                    </tbody>                    
                </table>            
            </div>
            }<br/><br/>
            { salary && 
                <div className='SalaryCSS.btn'
                style={{ listStyleType: "none", display: "flex", justifyContent: "center" }} >
                    <button
                        onClick={ () => navigate(-1) }
                    >
                        돌아가기
                    </button>
                            <div>{!modifyMode &&
                                <button       
                                    onClick={ onClickModifyModeHandler }             
                                >
                                    급여 추가
                                </button>
                            }
                            {modifyMode &&
                                <button       
                                    onClick={ onClickSalaryUpdateHandler }             
                                >
                                    직원 급여 수정 저장하기
                                </button>
                            }
                            </div>
                </div>
            }
        </>
    )


} 

export default SalaryDetail;