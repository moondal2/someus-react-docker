import axios from "axios";
import { useState, useRef } from "react";
import NaviDiary from "../navigation/NaviDiary";



const AddGroup = ({ history, name }) => {

    const [ shareRoomName, setShareRoomName ] = useState('');
    const [ memberId, setMemberId ] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();

        axios.post(`http://localhost:8080/api/someus/addgroup`,
            { "share_room_name": shareRoomName,
              "member_id": memberId },
              { headers: { 'Authorization' : `Bearer ${ sessionStorage.getItem('token') }`}}
            )
            .then((response) => {
                console.log(response);
                alert(`정상적으로 등록되었습니다.`);
                history.push(`/someus/grouplist`)
            })
            .catch((error) => {
                alert(`등록에 실패했습니다.`);
                console.log(error);
            })
    };

    const handlerChangeRoomName = (e) => {
        setShareRoomName(e.target.value);
    };

    const handlerChangeMemberId = (e) => {
        setMemberId(e.target.value);
    };

    return (
        <>
        <NaviDiary name={ name }/>
            <div style={ { marginLeft: '10px'} }>
                <form onSubmit={ onSubmit }>
                    <input style={ { width: '300px', height: '40px'} }
                            type="text" 
                            value={ shareRoomName }
                            onChange={ handlerChangeRoomName }
                            placeholder='교환 일기의 이름을 정해 주세요.' />
                    <hr />
                    <input style={ { width: '300px', height: '40px'} }
                            type="text"
                            value={ memberId }
                            onChange={ handlerChangeMemberId }
                            placeholder='함께할 친구의 아이디를 입력해 주세요.' />
                    <hr />
                    <input type="submit" value="등록" />
                </form>
            </div>
        </>
    );
}

export default AddGroup;