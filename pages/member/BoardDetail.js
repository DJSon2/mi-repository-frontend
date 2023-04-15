import BoardDetailCSS from './BoardDetail.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import {
    callBoardDetailAPI,
    callBoardUpdateAPI,
    callBoardDeleteAPI
} from '../../apis/BoardAPICall';

function BoardDetail() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const board = useSelector(state => state.boardReducer);

    // const [imageUrl, setImageUrl] = useState();

    const [modifyMode, setModifyMode] = useState(false);
    const [form, setForm] = useState(null);

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const onClickModifyHandler = (boardNo) => {
        setModifyMode(true);
        setForm({
            memberNo: board?.memberNo,
            boardTitle: board?.boardTitle,
            boardContent: board?.boardContent,
            boardNo: board?.boardNo
        })    
    }

    const onClickDeleteHandler = () => {
        console.log('delete boardNo : ', board.boardNo);
        dispatch(callBoardDeleteAPI({
            form: board
        }));
        alert('게시물을 삭제하였습니다.');
        navigate(`/board`, { replace: true});
        window.location.reload();
    }

    useEffect(
        () => {
            dispatch(callBoardDetailAPI({   // 상품 상세 정보 조회
                boardNo: params.boardNo
            }));            
        }
        ,[]
    );

    const onClickBoardUpdateHandler = () => {
        dispatch(callBoardUpdateAPI({   // 정보 업데이트
            form: form
        }));         
        alert('수정이 완료되었습니다')
        navigate(`/board`, { replace: true});
    }

    return(
        <div BoardDetailCSS><br/><br/>
            <div style={{ display: "flex", justifyContent: "center" }}
            className={ BoardDetailCSS.imgDiv }>
               <img src={ board?.boardImageUrl } alt="테스트" />
            </div>
            <div style={{ listStyleType: "none", display: "flex", justifyContent: "center" }}>
                <table>
                    <tbody className={ BoardDetailCSS.body }>
                        <br/>
                        <tr>
                            <th>게시물 번호</th>    
                            <td>{ board.boardNo || '' }</td>
                        </tr>
                        <tr>
                            <th>사번</th>    
                            <td>{ board?.member?.memberCode || '' }</td>
                        </tr>    
                        <tr>
                            <th>제목</th>    
                            <td>
                                <input 
                                    className={BoardDetailCSS.Title}
                                    name='boardTitle'
                                    readOnly={modifyMode ? false : true}
                                    style={ !modifyMode ? { backgroundColor: 'gray'} : null }
                                    onChange={ onChangeHandler }
                                    value={ form == null ? board?.boardTitle : form?.boardTitle }
                                />
                            </td>
                        </tr>    
                        <tr>
                            <th>내용</th>    
                            <td>
                                <input
                                    className={BoardDetailCSS.content}
                                    name='boardContent'
                                    readOnly={modifyMode ? false : true}
                                    style={ !modifyMode ? { backgroundColor: 'gray'} : null }
                                    onChange={ onChangeHandler }
                                    value={ form == null ? board?.boardContent : form?.boardContent }
                                />
                            </td>
                        </tr>    
                        <tr>
                            <th>작성일</th>    
                            <td>{ board.boardCreateDate || '' }</td>
                        </tr> <br/>
                        
                    </tbody>                    
                </table>
            </div>

            <div 
                style={{ listStyleType: "none", display: "flex", justifyContent: "center" }} 
                className={BoardDetailCSS.btn}>
                    <button onClick={ () => navigate(-1) }>돌아가기</button>
                <div>{!modifyMode &&
                    <button 
                        onClick={ onClickModifyHandler }
                    >수정하기
                    </button>
                }
                <div>{!modifyMode &&
                <button onClick = {onClickDeleteHandler}
                >
                    삭제하기
                </button>
                }
                </div>
                {modifyMode &&
                    <button onClick={ onClickBoardUpdateHandler }>게시물 수정 저장하기</button>
                }</div>
            </div>

            
            
        </div>
    )
}

export default BoardDetail;