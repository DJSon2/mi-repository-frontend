import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import HrTeam2Navbar from "../components/common/HrTeam2Navbar";
import HrCSS from "./HrTeam2.module.css";

function HrTeam2Layout() {
    
    const navigate = useNavigate();

    useEffect(() => {
        navigate("/hr-team2/member",  { replace: false});
    },
    []);

    return (
        <>
            <div>
                <div className={HrCSS.hrNav}>
                        <div className={HrCSS.doListTitle}>
                            <h3>인사2팀 목록</h3>
                        </div>
                        <HrTeam2Navbar/>
                    </div>
                <div className={HrCSS.hrOutlet}>
                    <main>
                        <Outlet/>
                    </main>
                </div>
            </div>
        </>
    )
}

export default HrTeam2Layout;