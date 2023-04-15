import { Outlet, useNavigate } from "react-router-dom";
import MainPicture from "../components/Main/MainPicture";
import MainCSS from "../pages/member/Main.module.css";
import SmallBoard from "../pages/member/SmallBoard";
import SmallNotice from "../pages/member/SmallNotice";

function MainLayout() {
    
    const navigate = useNavigate();

    return (
        <>
            <div>
                <div>
                    <div className={MainCSS.MainPicture}>
                        <MainPicture/>
                    </div>
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    
                    <div className={MainCSS.SmallNotice}>
                        <main>
                            <h4>공지사항 보드(최신순) : 오늘의 공지</h4>
                            <SmallNotice/>
                        </main>
                    </div>

                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                    <div className={MainCSS.SmallBoard}>
                        <main>
                            <h4>커뮤니티 보드(조회순) : 오늘의 이슈</h4>
                            <SmallBoard/>
                        </main>    
                    </div>
                </div>
            </div>
        </>
    )
}

export default MainLayout;