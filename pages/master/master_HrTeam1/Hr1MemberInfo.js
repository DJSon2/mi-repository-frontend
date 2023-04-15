import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import {callHr1MemberInfoListAPI} from "../../../apis/HrTeam1APICalls";
import HrTeam1CSS from "./HrTeam1.module.css";


function Hr1MemberInfo () {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const memberInfo = useSelector(state => state.hrteam1Reducer);
    const memberInfoList = memberInfo.data;

    const pageInfo = memberInfo.pageInfo;

    const [search, setSearch] = useState("");
    
    const onChange = (e) => {
        setSearch(e.target.value)
    }

    const [currentPage, setCurrentPage] = useState(1);
    const pageNumber = [];
    if(pageInfo) {
        for(let i = 1; i <= pageInfo.pageEnd; i++) {
            pageNumber.push(i);
        }
    }

    useEffect(
        () => {
            dispatch(callHr1MemberInfoListAPI({
                currentPage: currentPage,
                search: search
            }));
        }
        ,[currentPage]
    );

    const onClickSearch = (e) => {
        dispatch(callHr1MemberInfoListAPI({
            currentPage: currentPage,
            search: search
        }));
    }

    const onClickTableTr = (memberNo) => {
        navigate(`/hrteam1/member-info/${memberNo}`, {replace: false})
    }

    return (
        <>
            <div align="center">
                <h2>사원조회</h2>   
                <input type = 'text' size = '30' maxLength = '30' className = 'searchInput' onChange={onChange} placeholder = '사원의 이름을 입력해주세요.'/>
                <input type = 'button' value = '검색' className = 'searchSubmit' onClick={onClickSearch}/>
            </div>
            <div style={{ listStyleType: "none", display: "flex", justifyContent: "center" }}>
                <table className = {HrTeam1CSS.hr1Table}>
                    <thead>
                        <tr>
                            <th>이름</th>
                            <th>ID</th>
                            <th>사번</th>
                            <th>부서</th>
                            <th>직급</th>
                        </tr>
                    </thead>
                    <tbody>
                    {Array.isArray(memberInfoList) && memberInfoList.map((m) => (
                        <tr
                            key = {m.memberNo}
                            onClick = {() => onClickTableTr(m.memberNo)}
                        >
                            <td>{m.memberName}</td>
                            <td>{m.memberId}</td>
                            <td>{m.memberCode}</td>
                            <td>{m.dep?.depName}</td>
                            <td>{m.memberRank}</td>
                        </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>

            <br></br>
            
            <div style={{ listStyleType: "none", display: "flex", justifyContent: "center" }}>
                {Array.isArray(memberInfoList) && 
                    <button
                        onClick = {() => setCurrentPage(currentPage - 1)} 
                        disabled = {currentPage === 1}
                        className = {HrTeam1CSS.pagingBtn}
                    >
                        &lt;
                    </button>
                }
                {pageNumber.map((num) => (
                    <li key = {num} onClick = {() => setCurrentPage(num)}>
                        <button
                            style = {currentPage === num ? {backgroundColor : 'yellowgreen'} : null}
                            className = {HrTeam1CSS.pagingBtn}
                        >
                            {num}
                        </button>
                    </li>
                ))}
                {Array.isArray(memberInfoList) && 
                    <button
                        onClick = {() => setCurrentPage(currentPage + 1)} 
                        disabled = {currentPage === pageInfo.pageEnd  || pageInfo.total == 0}
                        className = {HrTeam1CSS.pagingBtn}
                    >
                        &gt;
                    </button>
                }

            </div>
        </>
    );
}

export default Hr1MemberInfo;