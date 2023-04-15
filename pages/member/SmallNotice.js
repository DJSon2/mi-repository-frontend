import MainCSS from '../member/Main.module.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';

import {
    callNoticeSmallListAPI
} from '../../apis/NoticeAPICalls'

function SmallNotice() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const notice = useSelector(state => state.noticeReducer); 
    const noticeList = notice.data;
    const [currentPage, setCurrentPage] = useState(1);
    
    useEffect(
        () => {
            dispatch(callNoticeSmallListAPI({
                currentPage: currentPage
            }));  
        }
        ,[currentPage]
    );

    /* 메인페이지-공지사항 중 클릭 시 이동할 경로 */
    const onClickTableTr = (noticeNo) => {
        navigate(`/notice/${noticeNo}`, { replace: false });
    }
    
    return (
        <>
            <div>
                { Array.isArray(noticeList) && noticeList.map((p) => (
                    <div
                    key={ p.noticeNo }
                    onClick={ () => onClickTableTr(p.noticeNo) }
                    >
                            <div className={MainCSS.mainnoticelist}>
                                <li>
                                    { '날짜 : ' + p.noticeCreatedDate }
                                    { ' / 제목 : ' + p.noticeTitle }
                                </li>
                            </div>
                        </div>
                    )) 
                }
            </div>
        </>
    );
}

export default SmallNotice;