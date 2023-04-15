import { useNavigate } from 'react-router-dom';


function Salary({ salary : {salNo, baseSalary, overTimePay, vacationPay, salDate, setMember}}) {

    const navigate = useNavigate();

    const onClickSalaryHandler = (salNo) => {
        navigate(`/salary/${salNo}`, { replace: false });
    }

    return (
        <div>
            <h5>{ baseSalary }</h5>
            <h5>{ overTimePay }</h5>
            <h5>{ vacationPay }</h5>
            <h5>{ salDate }</h5>
            <h5>{ setMember }</h5>
        </div>
    );
}

export default Salary;