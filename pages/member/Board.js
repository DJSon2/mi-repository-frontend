// import Board from "../../components/Board";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import BoardCSS from './Board.module.css';

import {
    callBoardListAPI,
    // callBoardViewsUpdateAPI
} from '../../apis/BoardAPICall'
// import { GET_BOARD } from '../../modules/BoardModule';

function Board1() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const boards = useSelector(state => state.boardReducer); 
    const boardList = boards.data;
    const pageInfo = boards.pageInfo;
    const [currentPage, setCurrentPage] = useState(1);
    // const [form, setForm] = useState(null);
    
    const pageNumber = [];
    if(pageInfo){
        for(let i = 1; i <= pageInfo.pageEnd ; i++){
            pageNumber.push(i);
        }
    }

    useEffect(
        () => {
            dispatch(callBoardListAPI({
                currentPage: currentPage
            }));            
        }
        ,[currentPage]
    );

    const onClickTableTr = (boardNo) => {
        // dispatch(callBoardViewsUpdateAPI({
        //     form: form.boardViews
        // })); 
        navigate(`/board/${boardNo}`, { replace: false });
    }

    const onClickBoardInsert = () => {
        navigate("/board-registration", { replace: false })
    }

    return (
        <>
            <div style={{ listStyleType: "none", display: "flex", justifyContent: "center" }}>
                        
                        <table className={ BoardCSS.boardTable }>
                            <colgroup>
                                <col width="8%" />
                                <col width="8%" />
                                <col width="50%" />
                                <col width="10%" />
                                <col width="8%" />
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>번호</th>
                                    <th>사번</th>
                                    <th>제목</th>
                                    <th>생성일자</th>
                                    <th>조회수</th>
                                </tr>
                            </thead>
                            <tbody>
                                { Array.isArray(boardList) && boardList.map((p) => (
                                    <tr
                                        key={ p.boardNo }
                                        onClick={ () => onClickTableTr(p.boardNo) }
                                    >
                                        <td>{ p.boardNo }</td>
                                        <td>{ p.member?.memberCode }</td>
                                        <td>{ p.boardTitle }</td>
                                        <td>{ p.boardCreateDate }</td>
                                        <td>{ p.boardViews }</td>
                                    </tr>
                                )) 
                            }
                            </tbody>                    
                        </table>         
                        
            </div><br/><br/>

            <div style={{ listStyleType: "none", display: "flex", justifyContent: "center" }}>
                <button
                    onClick={ onClickBoardInsert }
                    >
                    게시물 등록
                </button>
            </div><br/>

            <div style={{ listStyleType: "none", display: "flex", justifyContent: "center" }}>
                { Array.isArray(boardList) &&
                <button 
                    onClick={() => setCurrentPage(currentPage - 1)} 
                    disabled={currentPage === 1}
                    className={ BoardCSS.pagingBtn }
                >
                    &lt;
                </button>
                }
                {pageNumber.map((num) => (
                <div key={num} onClick={() => setCurrentPage(num)}>
                    <button
                        style={ currentPage === num ? {backgroundColor : 'yellowgreen' } : null}
                        className={ BoardCSS.pagingBtn }
                    >
                        {num}
                    </button>
                </div>
                ))}
                { Array.isArray(boardList) &&
                <button 
                    className={ BoardCSS.pagingBtn }
                    onClick={() => setCurrentPage(currentPage + 1)} 
                    disabled={currentPage === pageInfo.pageEnd  || pageInfo.total === 0}
                >
                    &gt;
                </button>
                }
            </div>
            
        </>

    );
}

export default Board1;