import { NavLink } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { decodeJwt } from '../../utils/tokenUtils';

function MypageNavbar() {

    const isLogin = window.localStorage.getItem('accessToken');
    let decoded = null;

    if(isLogin !== undefined && isLogin !== null) {
        const temp = decodeJwt(window.localStorage.getItem("accessToken"));
        console.log(temp);
        decoded = temp.auth[0, 1];
    }

    return (
        <div>
            <ul>
                <li><NavLink to="/mypage/extrawork">업무 외 수당</NavLink></li>
                <li><NavLink to="/mypage/vacation">휴무</NavLink></li>
                <li><NavLink to="/mypage/leave">퇴사</NavLink></li>
            </ul>

            
            { decoded ==="ROLE_MASTER" && <div>
            <h3>승인 목록</h3>
            <ul>
                <li><NavLink to="/mypage/extrawork/master">업무 외 수당</NavLink></li>
                <li><NavLink to="/mypage/vacation/master">휴무</NavLink></li>
                <li><NavLink to="/mypage/퇴사">퇴사</NavLink></li>
            </ul>
            </div> }
        </div>
    );
}

export default MypageNavbar;