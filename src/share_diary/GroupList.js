import axios from "axios";
import { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import NaviDiary from "../navigation/NaviDiary";
import AddGroup from "./AddGroup";


const GroupList = ({ name, history }) => {

    // 모달
    const [modalState, setModalState] = useState(false);

    const closeModal = () => {
        setModalState(false);
    };

    // 일기
    const [groupList, setGroupList] = useState([]);
    let title = "우리들의 일기";

    useEffect(() => {
        axios.get(`http://localhost:8080/api/someus/share/grouplist`,
            { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
            .then(response => {
                // console.log(response.data);
                setGroupList(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    const handlerClickAdd = () => {
        // history.push('/someus/addgroup');
        setModalState(true);
    };

    return (
        <>
            <NaviDiary />
            <div className="groupList_background">
                <div className="grouplist_box">
                    <input type="button"
                        className="groupAddbtn"
                        onClick={handlerClickAdd}></input>
                    {modalState && <AddGroup closeModal={closeModal} />}

                    {/* // TODO. grouplist가 null이 아닐 때 맵 돌리도록 */}
                    {/* {groupList.map((groupList, index) =>
                        <div key={index}>
                            <p>{groupList.title}</p>
                            <p>{groupList.img}</p>
                        </div>)} */}
                </div>
            </div>
        </>
    );
}


export default GroupList;