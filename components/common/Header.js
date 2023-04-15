import {NavLink, useNavigate} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import HeaderCSS from './Header.module.css';
import { useEffect, useState } from 'react';
import LoginModal from './LoginModal';
import { decodeJwt } from '../../utils/tokenUtils';
import {
    callLogoutAPI,
    callGetMemberAPI
} from '../../apis/MemberAPICalls'
import {
    callAttRegistAPI,
    callOffTimeUpdateAPI
} from '../../apis/HrTeam2APICalls'

function Header() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [loginModal, setLoginModal] = useState(false);
    const [search, setSearch] = useState('');
    
    const loginMember = useSelector(state => state.memberIdModule);
    const token = decodeJwt(window.localStorage.getItem("accessToken"));  
    console.log(loginMember.data);
    useEffect(
        () => {
            console.log('token', token);
            if(token !== null) {
                dispatch(callGetMemberAPI({
                    memberId: token.sub
                }));
            }
        }
        ,[]
    );

    const onClickLogoHandler = () => {
        navigate("/mainLayout", { replace: true})
    }

    const onClickLogoutHandler = () => {
        window.localStorage.removeItem('accessToken');  
        //로그아웃
        dispatch(callLogoutAPI());
        
        alert('로그아웃이 되어 로그인화면으로 이동합니다.');
        navigate("/", { replace: true })
        window.location.reload();
    }

    const onClickMypageHandler = () => {

        const token = decodeJwt(window.localStorage.getItem("accessToken"));
        console.log(`[Header] onClickMypageHandler token : `, token);

        if (token.exp * 10000000 < Date.now()) {
            setLoginModal(true);
            return;
        }
        
        navigate("/mypage", { replace: true})
    }
    
    
    const [form, setForm] = useState({
        memberId: token.sub,
        attTime: "0",
        offTime: "",
        attDate: "0",
        attNo: "",
        workTime: ""
    }); 

    return (
        <>
            { loginModal ? <LoginModal setLoginModal={ setLoginModal }/> : null}
            <div>
                <button
                    className={ HeaderCSS.LogoBtn }
                    onClick={ onClickLogoHandler}
                >
                <h1>Miracle Investment</h1>
                </button>

            <button 
                    className={ HeaderCSS.HeaderBtn }
                    onClick= { onClickMypageHandler }
            >
                마이페이지
            </button>
            <button 
                    className={ HeaderCSS.HeaderLogoutBtn }
                    onClick= { onClickLogoutHandler }
            >
                로그아웃
            </button>
            <button
                    className={ HeaderCSS.HeaderAttBtn }
                    onClick={() => dispatch(callOffTimeUpdateAPI(form),
                    alert('퇴근 처리가 완료되었습니다.'))}
            >
                퇴근
            </button>
            <button
                    className={ HeaderCSS.HeaderAttBtn }
                    onClick={() => dispatch(callAttRegistAPI(form),
                    alert('출근 처리가 완료되었습니다.'))}
            >
                출근
            </button>
            <div className={ HeaderCSS.HeaderLogoutBtn }>
            {loginMember && <b>{`${loginMember?.data?.memberName}님 환영합니다`}</b>}
            </div>
            </div>
        </>
    );
}

export default Header;