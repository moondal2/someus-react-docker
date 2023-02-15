const ShareDiaryDetail = (props) => {

    const handlerOnClickWrite = () => {
        props.history.push('/someus/share/write');
    };

    const handlerOnClickDelete = () => {
        
    };

    return (
        <>
        <div style={ { border: '1px solid black', float: 'left', width: '800px', alignItems: 'center'} }>
            <div style={ { border: '1px solid black', width:'300px', float:'left', alignItems: 'center'} }>
                <div>
                    <img src="" />
                </div>
                <div>
                    <p>날짜</p>
                    <p>기분</p>
                    <p>내용</p>
                    <input type="button" 
                            value="연필"
                            onClick={ handlerOnClickWrite } />
                    <input type="button" 
                            value="휴지통" 
                            onClick={ handlerOnClickDelete }/>
                </div>
            </div>
            <div style={ {border: '1px solid black', width:'300px', float:'left', alignItems: 'center'} }>
                <div>
                    <img src="" />
                </div>
                <div>
                    <p>날짜</p>
                    <p>기분</p>
                    <p>내용</p>
                    <input type="button" 
                            value="연필"
                            onClick={ handlerOnClickWrite } />
                    <input type="button" 
                            value="휴지통" 
                            onClick={ handlerOnClickDelete }/>
                </div>
            </div>
        </div>
        </>
    );
}

export default ShareDiaryDetail;