import { useNavigate } from 'react-router-dom';


function Board({ board : {boardNo, boardTitle, boardCreateDate, boardViews, memberNo, memberCode}}) {

    const navigate = useNavigate();

    const onClickBoardHandler = (boardNo) => {
        navigate(`/board/${boardNo}`, { replace: false });
    }

    return (
        <div 
            // className={ ProductCSS.productDiv }
            onClick={ () => onClickBoardHandler(boardNo) }
        >
            {/* <img src={ productImageUrl } alt="테스트" /> */}
            <h5>{ memberCode }</h5>
            <h5>{ boardTitle }</h5>
            <h5>{ boardCreateDate }</h5>
            <h5>{ memberNo }</h5>
            <h5>{ boardViews }</h5>
        </div>
    );
}

export default Board;