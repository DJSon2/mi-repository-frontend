import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import ExtraworkCSS1 from './Extrawork.module.css'

import {
    callMypageListAPI
} from '../../../apis/MypageAPICalls'

function Extrawork() {

    const navigate = useNavigate();
    
    const dispatch = useDispatch();
    const extrawork  = useSelector(state => state.mypageReducer);  
    const extraworkList = extrawork.data;
    const pageInfo = extrawork.pageInfo;
    const [currentPage, setCurrentPage] = useState(1);
    
    const pageNumber = [];
    if(pageInfo){
        for(let i = 1; i <= pageInfo.pageEnd ; i++){
            pageNumber.push(i);
        }
    }

    useEffect(
        () => {
            dispatch(callMypageListAPI({	
                currentPage: currentPage
            }));            
        }
        ,[currentPage]
    );

    const onClickTableTrHandler = (ewNo) => {
        navigate(`/mypage/extrawork/master/${ewNo}`, { replace: false});
    }


    return (
        <>
            <div style={{ listStyleType: "none", display: "flex", justifyContent: "center" }}>

            <table className={ ExtraworkCSS1.extraworkTable }>
                <colgroup>
                    <col width="5%" />
                    <col width="10%" />
                    <col width="10%" />
                    <col width="5%" />
                </colgroup>
                <thead>
                    <tr>
                        <th>구분</th>
                        <th>초과 근무일</th>
                        <th>초과 근무 신청일</th>
                        <th>상태</th>
                    </tr>
                    </thead>
                    <tbody>
                        { Array.isArray(extraworkList) && extraworkList.map(
                            (extrawork) => (
                            <tr
                                key={ extrawork.ewNo }
                                onClick={ () => onClickTableTrHandler(extrawork.ewNo) }
                            >
                                <td>{ extrawork.ewType }</td>
                                <td>{ extrawork.ewDate }</td>
                                <td>{ extrawork.ewReqDate }</td>
                                <td>{ extrawork.ewApproval }</td>
                            </tr>
                        ))
                        }
                    </tbody>                    
                </table>    
            </div>

            <div style={{ listStyleType: "none", display: "flex", justifyContent: "center", position: "static" }}>
                { Array.isArray(extraworkList) &&
                <button 
                    onClick={() => setCurrentPage(currentPage - 1)} 
                    disabled={currentPage === 1}
                    className={ ExtraworkCSS1.pagingBtn }
                >
                    &lt;
                </button>
                }
                {pageNumber.map((num) => (
                <div key={num} onClick={() => setCurrentPage(num)}>
                    <button
                        style={ currentPage === num ? {backgroundColor : 'yellowgreen' } : null}
                        className={ ExtraworkCSS1.pagingBtn }
                    >
                        {num}
                    </button>
                </div>
                ))}
                { Array.isArray(extraworkList) &&
                <button 
                    className={ ExtraworkCSS1.pagingBtn }
                    onClick={() => setCurrentPage(currentPage + 1)} 
                    disabled={currentPage === pageInfo.pageEnd  || pageInfo.total == 0}
                >
                    &gt;
                </button>
                }
            </div>
        </>
    );
}

export default Extrawork;