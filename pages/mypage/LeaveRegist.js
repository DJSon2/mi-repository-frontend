import ProductRegistrationCSS from './ProductRegistration.module.css';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import {
    callLeaveRegistAPI
} from '../../apis/MypageAPICalls';

function LeaveRegistration() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        leaveNo: '',
        leaveReqDate: '',
        leaveApproval: '',
        approvalDate: '',
        leaveDetail: '',
        approvalDate: '',
        memberNo: '',
        firstApprover: '',
        secondApprover: '',
        memberName: '',
        memberRank: '',
        depCode: '',
    });

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const onClickLeaveRegistrationHandler = () => {

        console.log('[LeavekRegistration] onClickLeaveRegistrationHandler');

        const formData = new FormData();

        // formData.append("leaveNo", form.leaveNo);
        formData.append("leaveReqDate", form.leaveReqDate);
        formData.append("leaveApproval", form.leaveApproval);
        formData.append("approvalDate", form.approvalDate);
        formData.append("leaveDetail", form.leaveDetail);
        formData.append("ewReqDate", form.ewReqDate);
        formData.append("approvalDate", form.approvalDate);
        formData.append("secondApprover", form.secondApprover);
        formData.append("memberName", form.memberName);             // 이름
        formData.append("memberRank", form.memberRank);             // 직급
        formData.append("depCode", form.depCode);                   // 부서코드

        dispatch(callLeaveRegistAPI({       // 업무 외 수당 상세 정보 조회
            form: formData
        }));

        alert('메인 화면으로 이동합니다.');
        navigate('/main', {replace: true});
        window.location.reload();
    }

    return (
        <div>
            <div className={ ProductRegistrationCSS.productButtonDiv }>
                <button        
                    onClick={ () => navigate(-1) }            
                >
                    돌아가기
                </button>
                <button       
                    onClick={ onClickLeaveRegistrationHandler }      
                >
                    상신
                </button>
            </div>        
            <div className={ ProductRegistrationCSS.productSection }>
                <div className={ ProductRegistrationCSS.productInfoDiv }>
                    <table>
                        <tbody>
                            <tr>
                                <td><label>이름</label></td>
                                <td>
                                    <input 
                                        name='memberName'
                                        placeholder='이름'
                                        type='text'
                                        className={ ProductRegistrationCSS.productInfoInput }
                                        onChange={ onChangeHandler }
                                    />
                                </td>
                            </tr> 
                            <tr>
                                <td><label>부서코드</label></td>
                                <td>
                                    <label><input type="radio" name="depCode"  onChange={ onChangeHandler } value="인사1"/> 인사1</label> &nbsp;
                                    <label><input type="radio" name="depCode"  onChange={ onChangeHandler } value="인사2"/> 인사2</label> &nbsp;
                                    <label><input type="radio" name="depCode"  onChange={ onChangeHandler } value="영업"/> 영업</label> &nbsp;
                                    <label><input type="radio" name="depCode"  onChange={ onChangeHandler } value="총무"/> 총무</label> &nbsp;
                                    <label><input type="radio" name="depCode"  onChange={ onChangeHandler } value="기획"/> 기획</label> &nbsp;
                                    <label><input type="radio" name="depCode"  onChange={ onChangeHandler } value="개발"/> 개발</label> &nbsp;
                                    <label><input type="radio" name="depCode"  onChange={ onChangeHandler } value="마케팅"/> 마케팅</label>
                                </td>
                            </tr>    
                            <tr>
                                <td><label>직급</label></td>
                                <td>
                                    <label><input type="radio" name="memberRank"  onChange={ onChangeHandler } value="일반사원"/> 사원</label> &nbsp;
                                    <label><input type="radio" name="memberRank"  onChange={ onChangeHandler } value="일반사원"/> 대리</label> &nbsp;
                                    <label><input type="radio" name="memberRank"  onChange={ onChangeHandler } value="일반사원"/> 과장</label> &nbsp;
                                    <label><input type="radio" name="memberRank"  onChange={ onChangeHandler } value="일반사원"/> 차장</label> &nbsp;
                                    <label><input type="radio" name="memberRank"  onChange={ onChangeHandler } value="부장"/> 부장</label>
                                </td>
                            </tr>
                            <tr>
                                <td><label>퇴사신청일</label></td>
                                <td>
                                    <input 
                                        name='leaveReqDate'
                                        placeholder='퇴사신청일'
                                        type='date'
                                        className={ ProductRegistrationCSS.productInfoInput }
                                        onChange={ onChangeHandler }
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td><label>퇴사일</label></td>
                                <td>
                                    <input 
                                        name='leaveDate'
                                        placeholder='퇴사신청일'
                                        type='date'
                                        className={ ProductRegistrationCSS.productInfoInput }
                                        onChange={ onChangeHandler }
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td><label>퇴사 사유</label></td>
                                <td>
                                    <input
                                        className={ ProductRegistrationCSS.textAreaStyle }
                                        name='leaveDetail'
                                        onChange={ onChangeHandler }
                                    />
                                </td>
                            </tr> 
                        </tbody>                        
                    </table>
                </div>
            </div>
        </div>
    );
}

export default LeaveRegistration;