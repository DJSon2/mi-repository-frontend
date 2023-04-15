import {NavLink, useNavigate} from 'react-router-dom';
import NavCSS from './Navbar.module.css';
import { useState } from 'react';
import { decodeJwt } from '../../utils/tokenUtils';
import LoginModal from './LoginModal';

function Navbar() {

    const navigate = useNavigate();
    const [loginModal, setLoginModal] = useState(false);

    const onClickNoticeHandler = (e) => {
        const token = decodeJwt(window.localStorage.getItem("accessToken"));
        console.log(`[Header] onClickMypageHandler token : `, token);

        if (token.exp * 10000000 < Date.now()) {
            setLoginModal(true);
            return;
        }
        navigate(`/${e.target.id}`, { replace: true})
    }

    const onClickHr1Handler = (e) => {
        const token = decodeJwt(window.localStorage.getItem("accessToken"));
        console.log(`[Header] onClickMypageHandler token : `, token);

        if (token.exp * 10000000 < Date.now()) {
            setLoginModal(true);
            return;
        }
        navigate(`/${e.target.id}`, { replace: true})
    }


    const onClickHr2Handler = (e) => {
        const token = decodeJwt(window.localStorage.getItem("accessToken"));
        console.log(`[Header] onClickMypageHandler token : `, token);

        if (token.exp * 10000000 < Date.now()) {
            setLoginModal(true);
            return;
        }
        navigate(`/${e.target.id}`, { replace: true})
    }

    const onClickBoardHandler = (e) => {
        const token = decodeJwt(window.localStorage.getItem("accessToken"));
        console.log(`[Header] onClickMypageHandler token : `, token);

        if (token.exp * 10000000 < Date.now()) {
            setLoginModal(true);
            return;
        }
        navigate(`/${e.target.id}`, { replace: true})
    }
    
    return (
        <>
            { loginModal ? <LoginModal setLoginModal={ setLoginModal }/> : null}
            <div className={ NavCSS.NavbarDiv }>
                <ul className={ NavCSS.NavlistUl }>
                    <li onClick = { onClickNoticeHandler } id="notice">공지사항</li>
                    <li onClick = { onClickHr1Handler } id="hrTeam1">인사1팀</li>
                    <li onClick = { onClickHr2Handler } id="hr-team2">인사2팀</li>
                    <li onClick = { onClickBoardHandler } id="board">커뮤니티</li>
                </ul>
            </div>
        </>
    );
}

export default Navbar;