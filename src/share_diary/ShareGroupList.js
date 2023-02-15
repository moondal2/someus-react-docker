const ShareGroupList = (props) => {
    
    const list = [ { title: '첫 번째 목록', img: '사진1'},
                    { title: '두 번째 목록', img: '사진2'},
                    { title: '세 번째 목록', img: '사진3'}];

    const handlerClickAdd = () => {
        props.history.push('/someus/addGroup');
    };

    return (
        <>
            <input type="button" 
                    value="추가"
                    onClick={ handlerClickAdd }></input>
            { list.map((list, index) => 
                <div key={ index }>
                    <p>{ list.title }</p>
                    <p>{ list.img }</p>
                </div>) }
        </>
    );
}

export default ShareGroupList;