import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import HrTeam1Navbar from "../components/common/HrTeam1Navbar";
import Hr1CSS from "./HrTeam1Layout.module.css";

function HrTeam1Layout() {

    const navigate = useNavigate();

    useEffect(() => {
        navigate("/hrteam1", {replace: false});
    },
    []);
    
    return (
        <>
            <div>
                <div className = {Hr1CSS.hr1Nav}>
                    <div className = {Hr1CSS.listTitle}>
                        <br></br>
                        <h3>인사 1팀</h3>
                    </div>
                    <HrTeam1Navbar/>
                </div>
                <div className = {Hr1CSS.hr1Outlet}>
                    <main> 
                        <Outlet/>
                    </main>
                </div>
            </div>
        </>
    );
}

export default HrTeam1Layout;