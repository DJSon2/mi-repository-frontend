import ProductRegistrationCSS from './ProductRegistration.module.css';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import {
    callExtraworkRegistAPI
} from '../../apis/MypageAPICalls';

function ExtraworkRexistration() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        ewNo: '',
        memberName: '',
        ewType: '',
        ewDate: '',
        ewTime: '',
        ewReqDate: '',
        ewDetail: '',
        ewApproval: '',
    });

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const onClickExtraworkRegistrationHandler = () => {

        console.log('[ExtraworkRexistration] onClickExtraworkRegistrationHandler');

        const formData = new FormData();

        // formData.append("ewNo", form.ewNo);
        formData.append("ewType", form.memberName);
        formData.append("ewType", form.ewType);
        formData.append("ewDate", form.ewDate);
        formData.append("ewTime", form.ewTime);
        formData.append("ewReqDate", form.ewReqDate);
        formData.append("ewDetail", form.ewDetail);
        formData.append("ewApproval", form.ewApproval);

        dispatch(callExtraworkRegistAPI({       // 업무 외 수당 상세 정보 조회
            form: formData
        }));

        alert('업무 외 수당 목록으로 이동합니다.');
        navigate('/mypage/extrawork', {replace: true});
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
                    onClick={ onClickExtraworkRegistrationHandler }             
                >
                    상신
                </button>
            </div>        
            <div className={ ProductRegistrationCSS.productSection }>
                <div className={ ProductRegistrationCSS.productInfoDiv }>
                    <table>
                        <tbody>
                            <tr>
                                <td><label>구분</label></td>
                                <td>
                                    <label><input type="radio" name="ewType"  onChange={ onChangeHandler } value="휴일"/> 휴일</label> &nbsp;
                                    <label><input type="radio" name="ewType"  onChange={ onChangeHandler } value="연장"/> 연장</label>
                                </td>
                            </tr>    
                            <tr>
                                <td><label>초과 근무일</label></td>
                                <td>
                                    <input 
                                        name='ewDate'
                                        placeholder='초과 근무일'
                                        type='date'
                                        className={ ProductRegistrationCSS.productInfoInput }
                                        onChange={ onChangeHandler }
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td><label>초과 근무 신청일</label></td>
                                <td>
                                    <input 
                                        name='ewReqDate'
                                        placeholder='초과 근무 신청일'
                                        type='date'
                                        className={ ProductRegistrationCSS.productInfoInput }
                                        onChange={ onChangeHandler }
                                    />
                                </td>
                            </tr>  
                            <tr>
                                <td><label>초과 근무 시간</label></td>
                                <td>
                                    <input
                                        name='ewTime'
                                        placeholder='숫자만 입력해 주세요'
                                        type='number'
                                        className={ ProductRegistrationCSS.productInfoInput }
                                        onChange={ onChangeHandler }
                                    />
                                </td>
                            </tr>    
                            <tr>
                                <td><label>초과 근무 세부 사항</label></td>
                                <td>
                                    <input
                                        className={ ProductRegistrationCSS.textAreaStyle }
                                        name='ewDetail'
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

export default ExtraworkRexistration;