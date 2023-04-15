import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { callNoticeDetailForMasterAPI, callNoticeUpdateAPI, callNoticeDeleteAPI } from "../../../apis/NoticeAPICalls";
import NoticeMasterCSS from "./NoticeMaster.module.css";
import { decodeJwt } from "../../../utils/tokenUtils";

function NoticeDetailMaster() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const notice = useSelector(state => state.noticeReducer);
    
    const [modifyMode, setModifyMode] = useState(false);
    const [form, setForm] = useState({}); 

    /* 로그인 정보 조회 */
    const isLogin = window.localStorage.getItem('accessToken');
    let decoded = null;

    if(isLogin !== undefined && isLogin !== null) {
        const temp = decodeJwt(window.localStorage.getItem("accessToken"));
        console.log(temp);
        decoded = temp.auth[0,1];
    }

    console.log('decoded ', decoded);

    useEffect(
        () => {

            console.log('[NoticeDetailMaster] NoticeNo : ', params.noticeNo);
            dispatch(callNoticeDetailForMasterAPI({
                noticeNo: params.noticeNo
            }));

            console.log('notice : ', notice);
        }
        ,[]
    );

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const onClickModifyModeHandler = () => {
        setModifyMode(true);
        setForm({
            noticeNo: notice.noticeNo,
            noticeTitle: notice.noticeTitle,
            noticeContent: notice.noticeContent,
            noticeCreatedDate: notice.noticeCreatedDate
        });
    }

    const onClickDeleteHandler = () => {
        console.log('delete noticeNo : ', notice.noticeNo);
        dispatch(callNoticeDeleteAPI({
            form: notice
        }));
        alert('공지사항을 삭제하였습니다.');
        navigate(`/notice`, { replace: true});
        window.location.reload();
    }

    const onClickNoticeUpdateHandler = () => {        

        const formData = new FormData();

        formData.append("noticeNo", form.noticeNo);
        formData.append("noticeTitle", form.noticeTitle);
        formData.append("noticeContent", form.noticeContent);
        formData.append("noticeCreatedDate", formData.noticeCreatedDate);

        dispatch(callNoticeUpdateAPI({
            form: form
        }));         

        alert('공지사항을 수정하였습니다.');
        navigate(`/notice/${notice.noticeNo}`, { replace: true});
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
                            <th>제목</th>
                            <td>
                                <input
                                    name = 'noticeTitle'
                                    className = {NoticeMasterCSS.input}
                                    readOnly = {modifyMode ? false : true}
                                    style={ !modifyMode ? null : {backgroundColor: '#ECECEC'}}
                                    onChange = {onChangeHandler}
                                    value = {(!modifyMode ? notice.noticeTitle : form.noticeTitle) || ''}
                                />
                            </td>
                        </tr>
                    <tr>
                            <th>작성일</th>
                            <td>{notice.noticeCreatedDate}</td>
                        </tr>
                        <tr>
                            <th>작성자</th>
                            <td>{notice.member?.memberName}</td>
                        </tr>
                        <tr>
                            <th>조회수</th>
                            <td>{notice.noticeViews}</td>
                        </tr>
                        <tr>
                            <th>내용</th>
                            <td>
                                <textarea
                                    name = 'noticeContent'
                                    className = {NoticeMasterCSS.textarea}
                                    readOnly = {modifyMode ? false : true}
                                    style={ !modifyMode ? null : {backgroundColor: '#ECECEC'}}
                                    onChange = {onChangeHandler}
                                    value = {(!modifyMode ? notice.noticeContent : form.noticeContent) || ''}
                                >  
                                </textarea>  
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <br></br>
            <div style={{ listStyleType: "none", display: "flex", justifyContent: "right" }}>
                <div>
                    <button className = {NoticeMasterCSS.btn}
                        onClick = { () => navigate(-1)}
                    >
                        돌아가기
                    </button>
                </div>

                <div style={{ listStyleType: "none", display: "flex", justifyContent: "right" }}>
                    {!modifyMode && decoded ==="ROLE_MASTER" &&

                    <button className = {NoticeMasterCSS.btn}
                        onClick = {onClickModifyModeHandler}
                    >
                        수정
                    </button>
                }
                    {!modifyMode && decoded ==="ROLE_MASTER" &&
                    <button className = {NoticeMasterCSS.btn}
                        onClick = {onClickDeleteHandler}
                    >
                        삭제
                    </button>
                
                }
                </div>

                <div style={{ listStyleType: "none", display: "flex", justifyContent: "right" }}>
                {modifyMode && decoded ==="ROLE_MASTER" &&
                    <button className = {NoticeMasterCSS.btn}
                        onClick = {onClickNoticeUpdateHandler}
                    >
                        저장
                    </button>
                }
                </div>
            </div>
        </>
    )

}

export default NoticeDetailMaster;