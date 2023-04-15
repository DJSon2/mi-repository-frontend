import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { callNoticeRegistAPI } from "../../../apis/NoticeAPICalls";
import NoticeRegistrationCSS from "./NoticeRegistration.module.css";
import { decodeJwt } from '../../../utils/tokenUtils';

function NoticeReg() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const notice = useSelector(state => state.noticeReducer);
    const token = decodeJwt(window.localStorage.getItem("accessToken"));  

    const [form, setForm] = useState({
        noticeTitle:'',
        noticeContent:'',
        memberId: token.sub
    })

    // console.log(token.sub);

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const onClickNoticeRegistrationHandler = () => {
        console.log('[NoticeRegistration] onClickNoticeRegistrationHandler');

        dispatch(callNoticeRegistAPI({
            form: form
        }));

        alert('공지사항이 등록되었습니다.');
        navigate('/notice', {replace: true});
        window.location.reload();

    }


    return (
        <>
        <div style={{ listStyleType: "none", display: "flex", justifyContent: "center" }}>
            <div className = {NoticeRegistrationCSS.write}>
                <br></br>
                <br></br>
                <table className = {NoticeRegistrationCSS.table}>
                    <tbody>
                        <tr>
                            <td><label>제목</label></td>
                            <td>
                                <input
                                    id = {NoticeRegistrationCSS.title_txt}
                                    name = 'noticeTitle'
                                    onChange = {onChangeHandler}
                                />
                            </td>
                        </tr>

                        <tr>
                            <td><label>내용</label></td>
                            <td>
                                <textarea
                                    id = {NoticeRegistrationCSS.content_txt}
                                    placeholder = '내용을 입력하세요.'
                                    name = 'noticeContent'
                                    onChange = {onChangeHandler}
                                ></textarea>
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>
        </div>
        <div>
            <div style={{ listStyleType: "none", display: "flex", justifyContent: "right" }}>
                <button
                    className = {NoticeRegistrationCSS.btn}
                    onClick = {onClickNoticeRegistrationHandler}
                >
                    등록
                </button>
                <button
                    className = {NoticeRegistrationCSS.btn}
                    onClick = {() => navigate(-1)}
                >
                    취소
                </button>
            </div>
        </div>
        </>
    );
}
export default NoticeReg;