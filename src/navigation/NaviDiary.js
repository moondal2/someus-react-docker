import mypage from 'C:/Javascript/someus-app/src/img/navicon_my.png'
import logout from 'C:/Javascript/someus-app/src/img/navicon_logout.png'
import home from 'C:/Javascript/someus-app/src/img/navicon_home.png'
import './navi.css'
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

const NaviDiary = (props) => {

    const [ name, setName ] = useState('');
    const [ memberId, setMemberId ] = useState('');

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        
        // if ( token != null ) {
            const decode_token = jwt_decode(token)
            setName(decode_token.name);
            setMemberId(decode_token.sub)
            
            let memberId = decode_token.sub;
        // }
    }, []);

    const handlerClickHome = () => {
        props.history.push('/someus');
    };

    const handlerClickMyPage = () => {
        props.history.push(`/someus/private/${memberId}`);
    };

    
   
    return (
            <>
            <div className= 'menu'>
                <input type="image" 
                        className= 'home'
                        src={home}
                        onClick={ handlerClickHome }></input>
                <div className='loginMessage'>
                    <p className="name">{ name }의 일기장 ◡̈⋆*</p>
                    <button type="button"
                            className='myPage' 
                            value="마이페이지"
                            onClick={ handlerClickMyPage }><img src={mypage} /></button>
                    <button type="button"
                            className= 'logout' 
                            value="로그아웃"
                            onClick={ handlerClickMyPage }><img src={logout} /></button>
                </div>
            </div>
        </>
    );
}

export default NaviDiary;


// 초초 나 갈게 ㅜㅜ 무리하지말고 근양대충 하고 가 내일 하면 되지 우리 2일밖에 안 됐어 