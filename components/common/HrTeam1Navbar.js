import { NavLink } from "react-router-dom";

function HrTeam1Navbar() {
    return (
        <div>
            <ul>

                <li>결재요청 목록
                    <ul>
                        <li><NavLink to = "/hrteam1/approval-list/leave">퇴사</NavLink></li>
                        <li>휴가</li>
                        <li>초과근무</li>
                    </ul>
                </li>
                <li><NavLink to = "/hrteam1/member-info">회원정보 조회</NavLink></li>
            </ul>
        </div>
    );
}

export default HrTeam1Navbar;
