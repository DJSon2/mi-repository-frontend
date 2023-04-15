import { useNavigate } from 'react-router-dom';

function Mypageextra({ mypageextra : {ewNo, ewDate, ewReqDate, ewType, approvalDate, ewApproval, rejectionDetail}}) {

    const navigate = useNavigate();

    const onClickExtraworkHandler = (ewDate) => {
        navigate(`/mypage/extrawork/${ewDate}`, { replace: false });
    }

    return (
        <div
            onClick = {() => onClickExtraworkHandler(ewDate)}
        >
            <h5>{ ewNo }</h5>
            <h5>{ ewDate }</h5>
            <h5>{ ewReqDate }</h5>
            <h5>{ ewType }</h5>
            <h5>{ approvalDate }</h5>
            <h5>{ ewApproval }</h5>
            <h5>{ rejectionDetail }</h5>
        </div>
    );
}

export default Mypageextra;