import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {callHr1MemberInfoUpdateAPI, callHr1MemberInfoDetailAPI} from "../../../apis/HrTeam1APICalls";
import HrTeam1CSS from "./HrTeam1.module.css";

function Hr1MemberInfoDetail() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const memberInfo = useSelector(state => state.hrteam1Reducer);

    const [modifyMode, setModifyMode] = useState(false);
    const [form, setForm] = useState({});

    useEffect(
        () => {
            console.log('[Hr1MemberInfoDetail] MemberNo : ', params.memberNo);

            dispatch(callHr1MemberInfoDetailAPI({
                memberNo: params.memberNo
            }));

            console.log('memberInfo : ' , memberInfo)
        }
        ,[]
    );

    const onChangeHandler = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const onClickModifyModeHandler = () => {
        setModifyMode(true);
        setForm({
            memberNo: memberInfo.memberNo,
            memberAddress: memberInfo.memberAddress,
            memberPhone: memberInfo.memberPhone,
            memberEmail: memberInfo.memberEmail,
            depCode: memberInfo.depCode,
            memberRank:memberInfo.memberRank
        });
    }

    const onClickMemberInfoUpdateHandler = () => {

        dispatch(callHr1MemberInfoUpdateAPI({
            form: form
        }));
        
        alert('회원정보를 수정했습니다.');
        navigate(`/hrteam1/member-info/${memberInfo.memberNo}`, {replace: true});
        window.location.reload();
    }
 
    return (
        <>
            <br></br>
            <br></br>
            <div style={{ listStyleType: "none", display: "flex", justifyContent: "center" }}>
            <br></br>
            <br></br>
                <table>
                    <colgroup>
                        <col width = "30%" />
                        <col width = "70%" />
                    </colgroup>
                    <tbody>
                        <tr>
                            <th>이름</th>
                            <td>{memberInfo.memberName}</td>
                        </tr>

                        <tr>
                            <th>ID</th>
                            <td>{memberInfo.memberId}</td>
                        </tr>

                        <tr>
                            <th>사번</th>
                            <td>{memberInfo.memberCode}
                            </td>
                        </tr>

                        <tr>
                            <th>생년월일</th>
                            <td>{memberInfo.memberBirth}</td>
                        </tr>

                        <tr>
                            <th>주소</th>
                            <td>
                                <input
                                    name = 'memberAddress'
                                    className = {HrTeam1CSS.input}
                                    readOnly = {modifyMode ? false : true}
                                    style={ !modifyMode ? null : {backgroundColor: '#ECECEC'}}
                                    onChange = {onChangeHandler}
                                    value = {(!modifyMode ? memberInfo.memberAddress : form.memberAddress) || ''}
                                />
                            </td>
                        </tr>

                        <tr>
                            <th>전화번호</th>
                            <td>
                                <input
                                    name = 'memberPhone'
                                    className = {HrTeam1CSS.input}
                                    readOnly = {modifyMode ? false : true}
                                    style={ !modifyMode ? null : {backgroundColor: '#ECECEC'}}
                                    onChange = {onChangeHandler}
                                    value = {(!modifyMode ? memberInfo.memberPhone : form.memberPhone) || ''}
                                />
                            </td>
                        </tr>

                        <tr>
                            <th>Email</th>
                            <td>
                                <input
                                    name = 'memberEmail'
                                    className = {HrTeam1CSS.input}
                                    readOnly = {modifyMode ? false : true}
                                    style={ !modifyMode ? null : {backgroundColor: '#ECECEC'}}
                                    onChange = {onChangeHandler}
                                    value = {(!modifyMode ? memberInfo.memberEmail : form.memberEmail) || ''}
                                />
                            </td>
                        </tr>

                        <tr>
                            <th>부서코드</th>
                            <td>
                                <input
                                    name = 'depCode'
                                    className = {HrTeam1CSS.input}
                                    readOnly = {modifyMode ? false : true}
                                    style={ !modifyMode ? null : {backgroundColor: '#ECECEC'}}
                                    onChange = {onChangeHandler}
                                    value = {(!modifyMode ? memberInfo.depCode : form.depCode) || ''}
                                />
                            </td>
                        </tr>
                        
                        <tr>
                            <th>부서명</th>
                            <td>{memberInfo.dep?.depName}</td>
                        </tr>
                        
                        <tr>
                            <th>직급</th>
                            <td>
                                <input
                                    name = 'memberRank'
                                    className = {HrTeam1CSS.input}
                                    readOnly = {modifyMode ? false : true}
                                    style={ !modifyMode ? null : {backgroundColor: '#ECECEC'}}
                                    onChange = {onChangeHandler}
                                    value = {(!modifyMode ? memberInfo.memberRank : form.memberRank) || ''}
                                />
                            </td>
                        </tr>
                        
                        <tr>
                            <th>연차</th>
                            <td>{memberInfo.memberAnnualLeave}</td>
                        </tr>

                        <tr>
                            <th>퇴사여부</th>
                            <td>{memberInfo.memberEntYn}</td>
                        </tr>
                        
                    </tbody>
                </table>
            </div>
            <br></br>
            <div style={{ listStyleType: "none", display: "flex", justifyContent: "right" }}>
                <button className = {HrTeam1CSS.btn}
                    onClick = { () => navigate(-1)}
                >
                    돌아가기
                </button>

                <div>{!modifyMode &&
                    <button className = {HrTeam1CSS.btn}
                        onClick = {onClickModifyModeHandler}
                    >
                        회원정보 수정
                    </button>
                }
                {modifyMode &&
                    <button className = {HrTeam1CSS.btn}
                        onClick = {onClickMemberInfoUpdateHandler}
                    >
                        회원정보 저장
                    </button>
                }
                </div>
            </div>
        </>
    );

}

export default Hr1MemberInfoDetail;