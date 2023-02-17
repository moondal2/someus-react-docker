

const NavigationLogin = (props) => {

    const handlerClickHome = () => {
        props.history.push('/someus');
    };

    const handlerClickMyPage = () => {
        // TODO. props.history.push('/someus/private/~~');
    };

    const handlerClickGuide = () => {
        props.history.push('someus/guide');
    };

    return(
        <>
            <div className="navi">
                <input type="image" 
                        className= 'navi_icon'
                        style={ { width: '30px', height: '30px'}}
                        src="https://cdn-icons-png.flaticon.com/512/25/25694.png" 
                        onClick={ handlerClickHome }></input>
                <input type="button" 
                        value="사용법"
                        className= 'howTo'
                        onClick={ handlerClickGuide }></input>
                <p className="name">{ props.name }님의 일기장입니다.</p>
                <input type="button"
                        className= 'myPage' 
                        value="마이페이지"
                        onClick={ handlerClickMyPage }></input>
            </div>
        </>
    );
}

export default NavigationLogin;

