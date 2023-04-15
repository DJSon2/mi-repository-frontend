import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import BoardRegistrationCSS from './BoardRegistration.module.css'

import {
    callBoardRegistAPI
} from '../../apis/BoardAPICall';

function BoardRegistration() {

    const dispatch = useDispatch();

    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState();
    const imageInput = useRef();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        boardTitle: '',
        boardContent: '',
        boardCreateDate: '',
        boardViews: 0,
        memberNo: ''
    });

    useEffect(() => {

        /* 이미지 업로드시 미리보기 세팅 */
        if(image){
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
                const { result } = e.target;
                if( result ){
                    setImageUrl(result);
                }
            }
            fileReader.readAsDataURL(image);
        }
    },
    [image]);


    const onChangeImageUpload = (e) => {

        const image = e.target.files[0];

        setImage(image);
    };

    const onClickImageUpload = () => {
        imageInput.current.click();
    }

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    
    const onClickBoardRegistrationHandler = () => {

        const formData = new FormData();

        formData.append("boardTitle", form.boardTitle);
        formData.append("boardContent", form.boardContent);
        formData.append("boardCreateDate", form.boardCreateDate);
        formData.append("boardViews", form.boardViews);
        formData.append("memberNo", form.memberNo);

        if(image){
            formData.append("boardImage", image);
        }

        dispatch(callBoardRegistAPI({	// 상품 상세 정보 조회
            form: formData
        }));        
        
        alert('커뮤니티 페이지로 돌아갑니다.');
        navigate('/board', { replace: true});
        window.location.reload();
    }

    return (
        <div><br/><br/>

<div style={{ listStyleType: "none", display: "flex", justifyContent: "center" }}>
                { imageUrl && <img 
                    src={ imageUrl } 
                    alt="preview"
                />}
                <input          
                    style={ { display: 'flex' }}
                    type="file"
                    name='boardImage' 
                    accept='image/jpg,image/png,image/jpeg,image/gif'
                    onChange={ onChangeImageUpload }
                    ref={ imageInput }
                />
                <button      
                    className={BoardRegistrationCSS.btn} 
                    onClick={ onClickBoardRegistrationHandler }             
                >
                    게시물 등록하기
                </button>&nbsp;&nbsp;
                
                {/* <button    
                    className={BoardRegistrationCSS.btn} 
                    onClick={ onClickImageUpload } 
                >
                    이미지 업로드
                </button> */}
            </div><br/>
            <div style={{ listStyleType: "none", display: "flex", justifyContent: "center" }}>
                <table>
                    <tbody>
                        <tr>
                            <td><label>제목</label></td>
                            <td>
                                <input 
                                    id={BoardRegistrationCSS.title_txt}
                                    name='boardTitle'
                                    placeholder='제목을 입력해 주세요'
                                    onChange={ onChangeHandler }
                                />
                            </td>
                        </tr> 
                        <tr>
                            <td><label>내용</label></td>
                            <td>
                                <textarea 
                                    id = {BoardRegistrationCSS.content_txt}
                                    name='boardContent'
                                    onChange={ onChangeHandler }
                                ></textarea>
                            </td>
                        </tr> 
                        <tr>
                            <td><label>날짜</label></td>
                            <td>
                                <input
                                    id = {BoardRegistrationCSS.content_date}
                                    type='date' 
                                    name='boardCreateDate'
                                    placeholder='날짜를 입력해 주세요'
                                    onChange={ onChangeHandler }
                                />
                            </td>
                        </tr> 
                        <tr>
                            <td><label>회원번호</label></td>
                            <td>
                                <input 
                                    id = {BoardRegistrationCSS.content_member}
                                    name='memberNo'
                                    onChange={ onChangeHandler }
                                />
                            </td>
                        </tr>
                        <div/>
                    </tbody>                        
                </table>
            </div>

           
        </div>    

        
    );
}










export default BoardRegistration;