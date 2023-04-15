import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Login from './pages/member/Login';
import Error from './pages/Error';
import MainLayout from './layouts/MainLayout';

import NoticeMaster from './pages/master/master_Notice/NoticeMaster';
import NoticeRegistration from './pages/master/master_Notice/NoticeRegistration';
import NoticeDetailMaster from './pages/master/master_Notice/NoticeDetailMaster';

import HrTeam1Layout from './layouts/HrTeam1Layout';
import HrTeam1 from './pages/master/master_HrTeam1/HrTeam1';
import Hr1ApprovalLeave from './pages/master/master_HrTeam1/Hr1ApprovalLeave';
import Hr1ApprovalLeaveDetail from './pages/master/master_HrTeam1/Hr1ApprovalLeaveDetail';
import Hr1MemberInfo from './pages/master/master_HrTeam1/Hr1MemberInfo';
import Hr1MemberInfoDetail from './pages/master/master_HrTeam1/Hr1MemberInfoDetail';

import GetSalary from './pages/master/master_HrTeam2/GetSalary';
import HrTeam2Layout from './layouts/HrTeam2Layout';
import SalaryDetail from './pages/master/master_HrTeam2/SalaryDetail';
import SalaryRegistration from './pages/master/master_HrTeam2/SalaryRegist';
import GetMemberInfo from './pages/master/master_HrTeam2/GetMemberInfo';
import GetAttList from './pages/master/master_HrTeam2/GetAttList';

import Register from './pages/member/Register';
import Board from './pages/member/Board';
import BoardDetail from './pages/member/BoardDetail';
import BoardRegistration from './pages/member/BoardRegistration';

import MyPageLayout from './layouts/MyPageLayout';
import Mypage from './pages/mypage/Mypage';
import Extrawork from './pages/mypage/Extrawork';
import ExtraworkDetail from './pages/mypage/ExtraworkDetail';
import ExtraworkRegist from './pages/mypage/ExtraworkRegist';
import Vacation from './pages/mypage/Vacation';
import VacationDetail from './pages/mypage/VacationDetail';

import LeaveRegist from './pages/mypage/LeaveRegist';

import Extrawork1 from './pages/mypage/master/Extrawork1';
import ExtraworkDetail1 from './pages/mypage/master/ExtraworkDetail1'
import Vacation1 from './pages/mypage/master/Vacation1';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        
          <Route index element={ <Login/> } />   
          <Route path="/register" element={ <Register/> } />
          <Route path="*" element={ <Error/> }/>
          <Route path="/login" element={ <Login/> }/>

          <Route path="/" element={ <Layout/> }>
              <Route path="/mainLayout" element={ <MainLayout/> } />
              <Route path="/notice" element={ <NoticeMaster/> } />
              <Route path="/notice/:noticeNo" element={ <NoticeDetailMaster/> } />
              <Route path="/notice-registration" element={ <NoticeRegistration/> } /> 

              <Route path="/hrteam1" element={<HrTeam1Layout/>}>
                <Route index element={ <HrTeam1/> } />
                <Route path="approval-list/leave" element={ <Hr1ApprovalLeave/>} />
                <Route path="approval-list/leave/:leaveNo" element={ <Hr1ApprovalLeaveDetail/>} />
                <Route path="member-info" element={ <Hr1MemberInfo/> } />
                <Route path="member-info/:memberNo" element={ <Hr1MemberInfoDetail/> } />
              </Route>

              <Route path="/hr-team2" element={ <HrTeam2Layout/> } >
                <Route index element={ <GetMemberInfo/>}/>
                <Route path='member' element={<GetMemberInfo/>}/>
                <Route path='salary' element={ <GetSalary/>}/>
                <Route path="salaryDetail/:salNo" element={ <SalaryDetail/> } />
                <Route path='salaryRegistration' element= {<SalaryRegistration/>} />
                <Route path='attendance' element={<GetAttList/>}/>
              </Route> 
              <Route path="/board" element={ <Board/> } />
              <Route path="/board/:boardNo" element={<BoardDetail/>} />
              <Route path="/board-registration" element={ <BoardRegistration/> } />
              
              <Route path="/mypage" element={ <MyPageLayout/> } >
                <Route index element={ <Mypage/> } />

                <Route path="/mypage/extrawork" element={ <Extrawork/> } />
                <Route path="/mypage/extrawork/:ewNo" element={ <ExtraworkDetail/> } />
                <Route path="/mypage/extrawork-registration" element={<ExtraworkRegist/>} />

                <Route path="/mypage/vacation" element={ <Vacation/> } />
                <Route path="/mypage/vacation/:vacNo" element={ <VacationDetail/> } />

                <Route path="/mypage/leave" element={ <LeaveRegist/> } />

                <Route path="/mypage/extrawork/master" element={ <Extrawork1/> } />
                <Route path="/mypage/extrawork/master/:ewNo" element={ <ExtraworkDetail1/> } />
                <Route path="/mypage/vacation/master" element={ <Vacation1/> } />
                
              </Route>
          </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
