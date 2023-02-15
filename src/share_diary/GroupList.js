import axios from "axios";
import { useEffect, useState } from "react";

const GroupList = (props) => {
    
    // const list = [ { title: '첫 번째 목록', img: '사진1'},
    //                 { title: '두 번째 목록', img: '사진2'},
    //                 { title: '세 번째 목록', img: '사진3'}];

    const [ groupList, setGroupList ] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/someus/share/grouplist`)
            .then(response => {
                console.log(response);
                setGroupList(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    })

    const handlerClickAdd = () => {
        props.history.push('/someus/addgroup');
    };

    // useEffect(() => {
    //     axios.get(`http://localhost:8080/api/someus/share/grouplist`)
    //         .then((response) => {
    //             console.log(response);
    //             setGroupList(response.data);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         })
    // })

    return (
        <>
            <input type="button" 
                    value="추가"
                    onClick={ handlerClickAdd }></input>
            
            { groupList.map((groupList, index) => 
                <div key={ index }>
                    <p>{ groupList.title }</p>
                    <p>{ groupList.img }</p>
                </div>) }
        </>
    );
}

export default GroupList;