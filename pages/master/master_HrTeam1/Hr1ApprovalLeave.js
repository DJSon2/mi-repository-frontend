import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect} from "react";
import {callHr1ApprovalLeaveListAPI} from "../../../apis/HrTeam1APICalls";
import HrTeam1CSS from "./HrTeam1.module.css";

function Hr1ApprovalLeave() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const approvalLeave = useSelector(state => state.hrteam1Reducer);
    const approvalLeaveList = approvalLeave.data;

    const pageInfo = approvalLeave.pageInfo;

    const [currentPage, setCurrentPage] = useState(1);

    const approvalStatus = "first";

    const pageNumber = [];
    if(pageInfo) {
        for(let i = 1; i <= pageInfo.pageEnd; i++) {
            pageNumber.push(i);
        }
    }

    useEffect(
        () => {
            dispatch(callHr1ApprovalLeaveListAPI({
                currentPage: currentPage,
                approvalStatus: approvalStatus
            }));
        }
        ,[currentPage]
    );

    const onClickTableTr = (leaveNo) => {
        navigate(`/hrteam1/approval-list/leave/${leaveNo}`, {replace: false})
    };

    const onClickChange = (value) => {
        dispatch(callHr1ApprovalLeaveListAPI({
            currentPage: currentPage,
            approvalStatus: value
        }));

    }

    
    return (
        <>
            <div style={{ listStyleType: "none", display: "flex", justifyContent: "center" }}>
                <h1>퇴사 결재 요청 리스트</h1>
            </div>
            <br></br>
            <div style={{ listStyleType: "none", display: "flex", justifyContent: "center" }}>
                <button
                    className= {HrTeam1CSS.btn}
                    onClick={() => onClickChange("first")}
                >1차승인 리스트</button>

                <button
                    className= {HrTeam1CSS.btn}
                    onClick={() => onClickChange("all")}
                >전체 리스트</button>
            </div>
            <div style={{ listStyleType: "none", display: "flex", justifyContent: "center" }}>
                <table className = {HrTeam1CSS.hr1Table}>
                    <thead>
                        <tr>
                            <th>결재요청일</th>
                            <th>이름</th>
                            <th>사번</th>
                            <th>부서코드</th>
                            <th>직급</th>
                            <th>승인여부</th>
                        </tr>
                    </thead>
                    <tbody>
                    {Array.isArray(approvalLeaveList) && approvalLeaveList.map((l) => 
                        <tr
                            key = {l.leaveNo}
                            onClick = {() => onClickTableTr(l.leaveNo)} 
                        >
                            <td>{l.leaveReqDate}</td>
                            <td>{l.memberNo?.memberName}</td>
                            <td>{l.memberNo?.memberCode}</td>
                            <td>{l.memberNo?.depCode}</td>
                            <td>{l.memberNo?.memberRank}</td>
                            <td>{l.leaveApproval}</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
            <br></br>
            <div style={{ listStyleType: "none", display: "flex", justifyContent: "center" }}>
                {Array.isArray(approvalLeaveList) && 
                    <button
                        onClick = {() => setCurrentPage(currentPage - 1)} 
                        disabled = {currentPage === 1}
                        className = {HrTeam1CSS.pagingBtn}
                    >
                        &lt;
                    </button>
                }
                {pageNumber.map((num) => (
                    <li key = {num} onClick = {() => setCurrentPage(num)}>
                        <button
                            style = {currentPage === num ? {backgroundColor : 'yellowgreen'} : null}
                            className = {HrTeam1CSS.pagingBtn}
                        >
                            {num}
                        </button>
                    </li>
                ))}
                {Array.isArray(approvalLeaveList) && 
                    <button
                        onClick = {() => setCurrentPage(currentPage + 1)} 
                        disabled = {currentPage === pageInfo.pageEnd  || pageInfo.total == 0}
                        className = {HrTeam1CSS.pagingBtn}
                    >
                        &gt;
                    </button>
                }

            </div>
        </>
    )
}

export default Hr1ApprovalLeave;