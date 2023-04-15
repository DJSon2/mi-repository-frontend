import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import MyPageNavbar from "../components/common/MypageNavbar";
import MyPageCSS from "./MyPageLayout.module.css";

function MyPageLayout() {

    const navigate = useNavigate();

    useEffect(() => {
        navigate("/mypage", { replace: false });
    }, 
    []);


    return (
        <>
            <div className={MyPageCSS.mypagefirst}>
                <div className={MyPageCSS.mypageNav}>
                        <div className={MyPageCSS.doListTitle}>
                            <h3>마이페이지</h3>
                        </div>
                        <MyPageNavbar/>
                    </div>
                <div className={MyPageCSS.hrOutlet}>
                    <main>
                        <Outlet/>
                    </main>
                </div>
            </div>
        </>
    );
}

export default MyPageLayout;