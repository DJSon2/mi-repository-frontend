import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { callNoticeForMasterListAPI } from "../../../apis/NoticeAPICalls";
import NoticeMasterCSS from "./NoticeMaster.module.css";
import { decodeJwt } from "../../../utils/tokenUtils";

function NoticeMaster() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const notice = useSelector(state => state.noticeReducer);
    const noticeList = notice.data;

    console.log('noticeMaster', noticeList);

    const pageInfo = notice.pageInfo;

    /* 로그인 정보 조회 */
    const isLogin = window.localStorage.getItem('accessToken');
    let decoded = null;

    if(isLogin !== undefined && isLogin !== null) {
        const temp = decodeJwt(window.localStorage.getItem("accessToken"));
        console.log(temp);
        decoded = temp.auth[0,1];
    }

    console.log('decoded ', decoded);

    const [currentPage, setCurrentPage] = useState(1);
    const pageNumber = [];
    if(pageInfo) {
        for(let i = 1; i <= pageInfo.pageEnd; i++) {
            pageNumber.push(i);
        }
    }

    useEffect(
        () => {
            dispatch(callNoticeForMasterListAPI({
                currentPage: currentPage
            }));
        }
        ,[currentPage]
    );

    const onClickNoticeInsert = () => {
        console.log('[NoticeMaster] onClickNoticeInsert');
        navigate("/notice-registration", { replace: false })
    }

    const onClickTableTr = (noticeNo) => {
        navigate(`/notice/${noticeNo}`, {replace: false})
    }

    return (
        <>
            <br></br>
            <div style={{ listStyleType: "none", display: "flex", justifyContent: "center" }}>
                <table className = {NoticeMasterCSS.noticeTable}>
                    <colgroup>
                        <col width = "10%" />
                        <col width = "30%" />
                        <col width = "15%" />
                        <col width = "15%" />
                        <col width = "10%" />
                    </colgroup>
                    <thead>
                        <tr>
                            <th>공지번호</th>
                            <th>제목</th>
                            <th>작성자</th>
                            <th>작성일</th>
                            <th>조회수</th>
                        </tr>
                    </thead>
                    <tbody>
                    {Array.isArray(noticeList) && noticeList.map((n) => (
                        <tr
                            key = {n.noticeNo}
                            onClick = {() => onClickTableTr(n.noticeNo)}
                        >
                            <td>{n.noticeNo}</td>
                            <td>{n.noticeTitle}</td>
                            <td>{n.member?.memberName}</td>
                            <td>{n.noticeCreatedDate}</td>
                            <td>{n.noticeViews}</td>
                        </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
            <br></br>
            <div style={{ listStyleType: "none", display: "flex", justifyContent: "center" }}>
                {Array.isArray(noticeList) && 
                    <button
                        onClick = {() => setCurrentPage(currentPage - 1)} 
                        disabled = {currentPage === 1}
                        className = {NoticeMasterCSS.pagingBtn}
                    >
                        &lt;
                    </button>
                }
                {pageNumber.map((num) => (
                    <li key = {num} onClick = {() => setCurrentPage(num)}>
                        <button
                            style = {currentPage === num ? {backgroundColor : 'yellowgreen'} : null}
                            className = {NoticeMasterCSS.pagingBtn}
                        >
                            {num}
                        </button>
                    </li>
                ))}
                {Array.isArray(noticeList) && 
                    <button
                        onClick = {() => setCurrentPage(currentPage + 1)} 
                        disabled = {currentPage === pageInfo.pageEnd  || pageInfo.total == 0}
                        className = {NoticeMasterCSS.pagingBtn}
                    >
                        &gt;
                    </button>
                }

            </div>
            <div style={{ listStyleType: "none", display: "flex", justifyContent: "right" }}>
                { decoded ==="ROLE_MASTER" &&
                <button
                    className={NoticeMasterCSS.btn}
                    onClick={ onClickNoticeInsert }
                >
                    공지사항 등록
                </button>
                }
            </div>  
        </>
    );
}
export default NoticeMaster;