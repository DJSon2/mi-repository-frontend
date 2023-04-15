import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {callHr1ApprovalLeaveDetailAPI, callHr1ApprovalLeaveUpdateAPI} from "../../../apis/HrTeam1APICalls";
import HrTeam1CSS from "./HrTeam1.module.css";

function Hr1ApprovalLeaveDetail() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const approvalLeave = useSelector(state => state.hrteam1Reducer);

    const [form, setForm] = useState({});

    useEffect(
        () => {
            console.log('[Hr1ApprovalLeaveDetail] leaveNo : ', params.leaveNo);

            dispatch(callHr1ApprovalLeaveDetailAPI({
                leaveNo: params.leaveNo
            }));
            console.log('approvalLeave : ' , approvalLeave)
        }
        ,[]
    );

    const onClickApprovalLeaveUpdateHandler = () => {
        
        /* 비동기 이슈.. */
        // setForm({
        //     leaveNo: approvalLeave.leaveNo,
        //     leaveApproval: "최종승인"
        // })

        form.leaveNo = approvalLeave.leaveNo;
        form.leaveApproval = "최종승인";

        dispatch(callHr1ApprovalLeaveUpdateAPI({
            form: form
        }));

        alert('퇴사요청을 승인하였습니다.');
        navigate(`/hrteam1/approval-list/leave/${approvalLeave.leaveNo}`, {replace: true});
        window.location.reload();
    }

    return (
        <>
            <div style={{ listStyleType: "none", display: "flex", justifyContent: "center" }}>
                
                <table className = {HrTeam1CSS.hr1Table}>
                    <colgroup>
                        <col width = "30%" />
                        <col width = "70%" />
                    </colgroup>
                    <tbody>
                        <tr>
                            <th>사번</th>
                            <td>{approvalLeave.memberNo?.memberCode}</td>
                        </tr>

                        <tr>
                            <th>이름</th>
                            <td>{approvalLeave.memberNo?.memberName}</td>
                        </tr>

                        <tr>
                            <th>부서코드</th>
                            <td>{approvalLeave.memberNo?.depCode}</td>
                        </tr>

                        <tr>
                            <th>직급</th>
                            <td>{approvalLeave.memberNo?.memberRank}</td>
                        </tr>

                        <tr>
                            <th>퇴사일</th>
                            <td>{approvalLeave.leaveDate}</td>
                        </tr>

                        <tr>
                            <th>퇴사 사유</th>
                            <td>{approvalLeave.leaveDetail}</td>
                        </tr>

                        <tr>
                            <th>결재 상태</th>
                            <td>{approvalLeave.leaveApproval}</td>
                        </tr>

                        <tr>
                            <th>1차 결재 승인자</th>
                            <td>{approvalLeave.firstApprover?.memberName}</td>
                        </tr>

                        <tr>
                            <th>2차 결재 승인자</th>
                            <td>{approvalLeave.secondApprover?.memberName}</td>
                        </tr>

                        <tr>
                            <th>결재 승인일</th>
                            <td>{approvalLeave.approvalDate}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <br></br>

            <div style={{ listStyleType: "none", display: "flex", justifyContent: "right" }}>
                <div>
                    <button className = {HrTeam1CSS.btn}
                    
                        onClick = { () => navigate(-1)}
                    >
                        돌아가기
                    </button>

                    <button className = {HrTeam1CSS.btn}
                        onClick = {onClickApprovalLeaveUpdateHandler}
                    >
                        결재 승인
                    </button>
                </div>
            </div>
        </>
    )
}

export default Hr1ApprovalLeaveDetail;