import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { decodeJwt } from '../../utils/tokenUtils';
import RegisterCSS from './Register.module.css';


import {
    callMyinfoListAPI
} from '../../apis/MypageAPICalls';

function Mypage() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const mypage = useSelector(state => state.mypageReducer);  
    const token = decodeJwt(window.localStorage.getItem("accessToken"));   
    const memberDetail = mypage.data;

    useEffect(
        () => {
             console.log('token', token.sub);
                if(token !== null) {
                dispatch(callMyinfoListAPI({	// 마이페이지 조회
                    memberId: token.sub
                }));
            }
         }
        ,[]
    );
    console.log(Mypage);

    return (
        <div 
            className={ RegisterCSS.backgroundDiv}
            style={ { backgroundColor: 'white' } }
        >
            { memberDetail &&
            <div className={ RegisterCSS.registerDiv }>
                <h1>My Information</h1>

                <input 
                    type="text" 
                    placeholder="ID" 
                    readOnly={true}
                    value={memberDetail.memberId || ''}
                />
                <input 
                    type="text" 
                    placeholder="이름" 
                    readOnly={true}
                    value={memberDetail.memberName || ''}
                />
                <input 
                    type="text" 
                    placeholder="생년월일" 
                    readOnly={true}
                    value={memberDetail.memberBirth || ''}
                />
                <input 
                    type="text" 
                    placeholder="주소" 
                    readOnly={true}
                    value={memberDetail.memberAddress || ''}
                />
                <input 
                    type="text" 
                    placeholder="전화번호" 
                    readOnly={true}
                    value={memberDetail.memberPhone || ''}
                />
                <input 
                    type="text" 
                    placeholder="이메일" 
                    readOnly={true}
                    value={memberDetail.memberEmail || ''}
                />
                {/* <input 
                    type="text" 
                    placeholder="입사일" 
                    readOnly={true}
                    value={memberDetail.memberHireDate || ''}
                />
                <input 
                    type="text" 
                    placeholder="이번 달 총 급여" 
                    readOnly={true}
                    value={memberDetail.memberBaseSalary || ''}
                />
                <input 
                    type="text" 
                    placeholder="연차일수" 
                    readOnly={true}
                    value={memberDetail.memberAnnualLeave || ''}
                /> */}
            </div>
            }
        </div>
    )
}

export default Mypage;