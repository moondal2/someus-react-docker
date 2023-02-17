import axios from "axios";
import { useState } from "react";



const Loginpage = ({ history }) => {
    //id, pw state 설정
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    //id 바뀌면 state에 저장
    
    const handlerIdInput = (e) => {
        setId(e.target.value);
    };
    //pw 바뀌면 state에 저장
    const handlerPwInput = (e) => {
        setPw(e.target.value);
    };

    const handlerRegist = () => {
        console.log(history);
        history.push('/someus/regist');
    };

    const handlerSubmit = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:8080/login`,
            { "memberId": id, "memberPw": pw })
            .then((response) => {
                if (response.data) {
                    sessionStorage.setItem("token", response.data);
                    alert('로그인에 성공했습니다.');
                    history.push('/someus/mainpage');
                } else {
                    sessionStorage.clear();
                    alert('일치하는 정보가 없습니다.');
                }
            })
            .catch(error => {
                sessionStorage.clear();
                alert('일치하는 정보가 없습니다.');
                setId('');
                setPw('');
            })
    }

    return (
        <div className="loginPage">
            <div className="logo">로고사진</div>
            <div className="loginInput">
                <form onSubmit={handlerSubmit}>
                    {/* id, pw가 값이 있다면 label의 클래스명이 바껴서 다른 css가 적용되도록. */}
                    <div className={id === '' ? "dust-class" : "non-dust-class"}>
                        <label><span>아이디</span></label><span className="A">A</span>
                        <input type='text' value={id} onChange={handlerIdInput}></input>
                    </div>
                    <div className={pw === '' ? "dust-class" : "non-dust-class"}>
                        <label><span>비밀번호</span></label><span className="A">A</span>
                        <input type="password" value={pw} onChange={handlerPwInput}></input>

                    </div>
                    <div>
                        <input type="submit" value='로그인'></input>
                        <button type="button" onClick={handlerRegist}>회원가입</button>
                    </div>
                </form>

            </div>
        </div>
    );
};
export default Loginpage;