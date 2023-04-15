import { NavLink } from 'react-router-dom';

function HrTeam2Navbar() {

    return (
        <div>
            <ul>
                <li><NavLink to="/hr-team2/member">직원 리스트</NavLink></li>
                <li><NavLink to="/hr-team2/salary">급여 정보</NavLink></li>
                <li><NavLink to="/hr-team2/attendance">근태</NavLink></li>
            </ul>
        </div>
    )
}

export default HrTeam2Navbar