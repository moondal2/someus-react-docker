import { useEffect, useState } from "react";
import NaviLogin from "./NaviLogin";
import NaviLogout from "./NaviLogout";
import jwt_decode from "jwt-decode";

const Navigation = (props) => {
    const [ name, setName ] = useState('');
    const [ isLoggedIn, setIsLoggedIn ] = useState('');

    const handlerClickHome = () => {
        props.history.push('/someus/mainpage');
    };

    const handlerClickHowTo = () => {
        props.history.push('/someus/howto');
    };

    const handlerClickLogin = () => {
        props.history.push('/login');
    };

    const handlerClickLogout = () => {
        alert('로그아웃되었습니다.');
        setIsLoggedIn(false);
        sessionStorage.clear();
        props.history.push('/someus/mainpage')
    };

    const handlerClickMyPage = () => {
        props.history.push('/someus/mypage');
    };

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        
        if ( token != null ) {
            const decode_token = jwt_decode(token);
            setIsLoggedIn(true);
            setName(decode_token.name);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    return (
        <>
        {/* 로그인 여부에 따라 네비게이션 출력 */}
            { isLoggedIn ?  
            <NaviLogin handlerClickHome={ handlerClickHome }
                        handlerClickHowTo = { handlerClickHowTo }
                        handlerClickLogout = { handlerClickLogout }
                        handlerClickMyPage = { handlerClickMyPage }
                        name={ name }/> : 
            <NaviLogout handlerClickHome={ handlerClickHome }
                        handlerClickHowTo = { handlerClickHowTo }
                        handlerClickLogin = { handlerClickLogin }/> }
        </>
    );
}

export default Navigation;