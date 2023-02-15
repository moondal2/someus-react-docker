import './navigation.css'

const NavigationLogout = (props) => {

    const handlerClickHome = () => {
        props.history.push('/someus');
    };

    const handlerClickGuide = () => {
        props.history.push('/someus/guide');
    }

    const handlerClickLogin = () => {
        props.history.push('/someus/login');
    }

    return(
        <>
        <form >
            <input type="image" 
                    className= 'navi_icon'
                    src="https://cdn-icons-png.flaticon.com/512/25/25694.png" 
                    onClick={ handlerClickHome }></input>
            <input type="button" 
                    value='사용법'
                    onClick={ handlerClickGuide }></input>
            <input type="button" 
                    value='로그인'
                    onClick={ handlerClickLogin }></input>
        </form>
        </>
    );
}

export default NavigationLogout;