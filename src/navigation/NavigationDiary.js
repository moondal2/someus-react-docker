

const NavigationDiary = (props) => {

    const handlerClickHome = () => {
        props.history.push('/someus');
    };

    const handlerClickMyPage = () => {
        props.history.push(`/someus/private/token에서 추출한 subject`);
    };

   
    return (
            <>
            <div className= 'navi'>
                <input type="image" 
                        className= 'navi_icon'
                        style={ { width: '30px', height: '30px'}}
                        src="https://cdn-icons-png.flaticon.com/512/25/25694.png" 
                        onClick={ handlerClickHome }></input>
                <input type="button"
                        className= 'myPage' 
                        value="마이페이지"
                        onClick={ handlerClickMyPage }></input>
            </div>
        </>
    );
}

export default NavigationDiary;


// 초초 나 갈게 ㅜㅜ 무리하지말고 근양대충 하고 가 내일 하면 되지 우리 2일밖에 안 됐어 