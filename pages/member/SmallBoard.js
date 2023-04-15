import MainCSS from '../member/Main.module.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';

import {
    callSmallBoardListAPI
} from '../../apis/BoardAPICall'

function SmallBoard() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const boards = useSelector(state => state.boardReducer); 
    const boardList = boards.data;
    // const pageInfo = boards.pageInfo;
    const [currentPage, setCurrentPage] = useState(1);
    
    useEffect(
        () => {
            dispatch(callSmallBoardListAPI({
                currentPage: currentPage
            }));  
        }
        ,[currentPage]
    );

    /* 메인페이지-커뮤니티 중 클릭 시 이동할 경로 */
    const onClickTableTr = (boardNo) => {
        navigate(`/board/${boardNo}`, { replace: false });
    }
    
    return (
        <>
            <div>
                { Array.isArray(boardList) && boardList.map((p) => (
                    <div
                    key={ p.boardNo }
                    onClick={ () => onClickTableTr(p.boardNo) }
                    >
                            <div className={MainCSS.mainboardlist}>
                                <li>
                                    { '날짜 : ' + p.boardCreateDate }
                                    { ' / 제목 : ' + p.boardTitle }
                                </li>
                            </div>
                        </div>
                    )) 
                }
            </div>
        </>
    );
}

export default SmallBoard;