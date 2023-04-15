import RegisterCSS from './Register.module.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from "react-router-dom";
import {
    callIdCheckAPI,
    callRegisterAPI
} from '../../apis/MemberAPICalls'
import { POST_LOGIN } from '../../modules/MemberModule';
import * as React from 'react';
import PopupPostCode from '../../components/PopupPostCode';

function Register() {

    const navigate = useNavigate();
    
    /* 리덕스를 이용하기 위한 디스패처, 셀렉터 선언 */
    const dispatch = useDispatch();
    const member = useSelector(state => state.memberReducer);  // API 요청하여 가져온 loginMember 정보
    const memberIdCheck = useSelector(state => state.memberIdModule);
    const [form, setForm] = useState({
        memberId: '',
        memberPwd: '',
        memberName: '',
        memberEmail: '',
        memberBirth: '',
        memberAddress: '',
        memberPhone: '',
        memberCode: '',
        memberRank: 'staff',
        depCode: '1'
    });
    const {memberId} = form;
    const idRegexp = /[a-z]{5,15}|[a-z0-9]{5,15}/g;
    const validId = memberId.match(idRegexp);

    const [memberPwdConfirm, setMemberPwdConfirm] = useState('');
    const [idCheck, setIdCheck] = useState(false);
    
    /* 유효성 검사 */
    const [isId, setIsId] = useState(true);
    const [isPwd, setIsPwd] = useState(true);
    const [isEmail, setIsEmail] = useState(true);
    const [isPhone, setIsPhone] = useState(true);
    
    /* 오류메세지 상태저장 */
    const [idMessage, setIdMessage] = useState("");
    const [emailMessage, setEmailMessage] = useState('');
    const [passwordConfirmMessage, setPasswordConfirmMessage] = useState('');
    const [phoneMessage, setPhoneMessage] = useState("");
    
    // 팝업창 상태 관리
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const [isOpen, setOpen] = useState(false);

    const onClick = () => {
        setOpen(true);
    };
 
    
    useEffect(() => {
        if(member.status == 201){
            console.log("[Login] Register SUCCESS {}", member);
            navigate("/login", { replace: true })
        }
    },
    [member]);

    useEffect(
        () => {
            if(form.memberId != '') {
                dispatch(callIdCheckAPI({
                    memberId: form.memberId
                }));
            }
        },
        [idCheck]
    )
    
    const openPostCode = () => {
        setIsPopupOpen(true)
    };
 
    const closePostCode = () => {
        setIsPopupOpen(false)
    };

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };   
    
    const onChangeIdCheckHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
        setIdCheck(!idCheck);
    }

    const onChangeIdHandler = (e) => {
        const currentId = e.target.value;
        const idRegExp = /^[a-zA-z0-9]{4,12}$/;
        if (!idRegExp.test(currentId)) {
            setIdMessage("4-12사이 대소문자 또는 숫자만 입력해주세요!");
            setIsId(false);
        } else {
            setIdMessage("사용가능한 아이디 입니다.");
            setIsId(true);
            setForm({
                ...form,
                [e.target.name]: e.target.value
            });
            setIdCheck(!idCheck);
        }
    };

    const onChangePasswordHandler = (e) => {
         setForm({
             ...form,
             [e.target.name]: e.target.value
        });
       }
    
    const onChangePasswordHandlerConfirm = (e) => {
       const currentPasswordConfirm = e.target.value;
       setMemberPwdConfirm(currentPasswordConfirm);
       if (form.memberPwd !== currentPasswordConfirm) {
        setPasswordConfirmMessage("비밀번호가 다릅니다");
        setIsPwd(false);
       } else {
        setPasswordConfirmMessage("같은 비밀번호를 입력했습니다.");
        setIsPwd(true);
       }
    };

    const onChangeEmailHandler = (e) => {
        const currentEmail = e.target.value;
        const emailRegExp = /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;

        if(!emailRegExp.test(currentEmail) ) {
            setEmailMessage("이메일의 형식이 올바르지 않습니다.");
            setIsEmail(false);
        } else {
            setEmailMessage("사용 가능한 이메일 입니다.");
            setIsEmail(true);
            setForm({
                ...form,
                [e.target.name]: e.target.value
            })
        }
    };

    const onchangePhoneHandler = (e) => {
        const currentPhone = e.target.value;
        const phoneRegExp = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;

        if (!phoneRegExp.test(currentPhone)) {
            setPhoneMessage("올바른 형식이 아닙니다!");
            setIsPhone(false);
        } else {
            setPhoneMessage("사용 가능한 번호입니다.");
            setIsPhone(true);
            setForm({
                ...form,
                [e.target.name]: e.target.value
            })
        }
    };

    const onClickBackHandler = () => {
        /* 돌아가기 클릭시 메인 페이지로 이동 */
        navigate("/", { replace: true })
    };

    const onClickRegisterHandler = () => {
        if(form.memberId === ""){
            alert("아이디를 입력해주세요!");
            form.memberId.focus();
            return;
        } else if(form.memberPwd === ""){
            alert("비밀번호를 입력해주세요!");
            form.memberPwd.focus();
            return;
        } else if(form.memberName === ""){
            alert("이름을 입력해주세요!");
            form.memberName.focus();
            return;
        } else if(form.memberBirth === ""){
            alert("생년월일을 입력해주세요!");
            form.memberBirth.focus();
            return;
        } else if(form.memberAddress === ""){
            alert("주소를 입력해주세요!");
            form.memberAddress.focus();
            return;
        } else if(form.memberPhone === ""){
            alert("전화번호를 입력해주세요!");
            form.memberPhone.focus();
            return;
        } else if(form.memberEmail === ""){
            alert("이메일을 입력해주세요!");
            form.memberEmail.focus();
            return;
        } else if(form.memberCode === ""){
            alert("사번을 입력해주세요!");
            form.memberCode.focus();
            return;
        } else {
            dispatch(callRegisterAPI({
                form: form
        }));
            return alert("회원가입 성공!");
        }
    };

    return (
        <div className={ RegisterCSS.backgroundDiv}>
            <div className={ RegisterCSS.registerDiv }>
                <h1>회원가입</h1>

                <div>
                <input 
                    type="text" 
                    name="memberId"
                    value={memberId}
                    placeholder="4-12사이 대소문자 또는 숫자만 입력해주세요!" 
                    autoComplete='off'
                    onChange={ onChangeIdCheckHandler }
                />
                { validId && memberIdCheck.status == 500 ? 
                <div style={ {color : 'red', fontSize: '13px' }  }> 사용 가능한 아이디입니다.</div>
                : validId && memberIdCheck.status == 200 ? 
                <div style={ {color : 'red', fontSize : '13px'} }>중복 된 아이디입니다.</div> : <div>　</div>}
                </div>
               
                <input 
                    type="password"
                    name="memberPwd" 
                    placeholder="패스워드" 
                    autoComplete='off'
                    onChange={ onChangePasswordHandler }
                />

                <div>
                    <input 
                        type="password"
                        name="memberPwd" 
                        placeholder="패스워드확인" 
                        autoComplete='off'
                        onChange={ onChangePasswordHandlerConfirm }
                    />
                    <div style={ {color : 'red', fontSize: '13px' } }>
                    <p className="message">{passwordConfirmMessage}</p>
                    </div>
                </div>

                <input 
                    type="text" 
                    name="memberName"
                    placeholder="이름" 
                    autoComplete='off'
                    onChange={ onChangeHandler }
                />

                <input 
                    type="date" 
                    name="memberBirth"
                    placeholder="생년월일" 
                    autoComplete='off'
                    onChange={ onChangeHandler }
                />

                <div>
                    <input 
                        disabled
                        type="text" 
                        name="memberAddress"
                        placeholder="주소" 
                        autoComplete='off'
                        onChange={ onChangeHandler }
                        value={form.memberAddress}
                    />
                    <div>
                    <button  onClick={openPostCode}>우편번호 검색</button>
                    <div>
                        {isPopupOpen && (
                        <PopupPostCode form={form} setForm={setForm} onClose={closePostCode} />
                    )}
                    </div>
                    </div>
                </div>
                <div>
                <input 
                    type="text" 
                    name="memberPhone"
                    placeholder="전화번호" 
                    autoComplete='off'
                    onChange={ onchangePhoneHandler }
                />
                <div style={ {color : 'red', fontSize: '13px' } }>
                <p className="message">{phoneMessage}</p>
                </div>
                </div>            

                <div>
                <input 
                    type="text" 
                    name="memberEmail"
                    placeholder="이메일" 
                    autoComplete='off'
                    onChange={ onChangeEmailHandler }
                />
                <div style={ {color : 'red', fontSize: '13px' } }>
                <p className="message">{emailMessage}</p>
                </div>
                </div>

                <input 
                    type="text" 
                    name="memberCode"
                    placeholder="사번" 
                    autoComplete='off'
                    onChange={ onChangeHandler }
                />
                <div>
                <label>부서</label>
                    <select name="depCode" onChange={ onChangeHandler }>
                    <option value="1">인사1팀</option>
                    <option value="2">인사2팀</option>
                    <option value="3">영업팀</option>
                    <option value="4">총무팀</option>
                    <option value="5">기획팀</option>
                    <option value="6">개발팀</option>
                    <option value="7">마케팅팀</option>
                    </select>
                  &nbsp;&nbsp;&nbsp;&nbsp; 
                <label>직급</label>
                    <select name="memberRank" onChange={ onChangeHandler }>
                    <option value="staff">사원</option>
                    <option value="assistantM">대리</option>
                    <option value="sectionM">과장</option>
                    <option value="deputyM">차장</option>
                    <option value="generalM">부장</option>
                    </select>
                </div>
                
                <button
                    onClick = { onClickRegisterHandler }
                >   
                    회원가입
                </button>
                <button
                    style={ { border: 'none', margin: 0, fontSize: '13px', height: '10px' } }
                    onClick = { onClickBackHandler }
                >
                    돌아가기
                </button>
            </div>
        </div>
    );
}

export default Register;