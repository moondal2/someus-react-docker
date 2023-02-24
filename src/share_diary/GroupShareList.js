import axios from "axios";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../private_diary/datepicker.css';
import ko from 'date-fns/locale/ko';
import NaviDiary from "../navigation/NaviDiary";
import GroupShareListEach from "./GroupShareListEach";
import './groupsharelist.css';
import Modal from "./Modal";
import jwt_decode from "jwt-decode";


const GroupShareList = ({ history, name, match }) => {
    // 모달
    const [modalState, setModalState] = useState(false);
    const { shareroomid } = match.params;

    const closeModal = () => {
        setModalState(false);
    };
    
    const [ list, setList ] = useState([]);
    const [ startDate, setStartDate ] = useState(new Date());
    const { shareRoomId } = match.params;
    const { write } = match.params;
    const [ memberId, setMemberId ] = useState('');
    const [ memberName, setMemberName ] = useState('');
    const [ selectedDate, setSelectedDate ] = useState('');

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        const decode_token = jwt_decode(token);
        setMemberId(decode_token.sub);
        setMemberName(decode_token.name);

        let memberId = decode_token.sub;

        axios.get(`http://localhost:8080/api/someus/shareroom/${shareroomid}`,
            { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
            .then((response) => {
                console.log(response.data);
                setList(response.data);
                
                for (let i = 0; i < list.length; i++){
                    setModalState(prevState => {
                        const updateModalArray = [...prevState];
                        updateModalArray[i] = false;
                        return updateModalArray;
                    });
                }
            })
            .catch((error) => {
                console.log(error);
                return;
            })
    }, []);
    // 요일의 이름 반환
    const getDayName = (date) => {
        return date.toLocaleDateString('ko-KR', {
            weekday: 'long',
        }).substr(0, 1);
    };

    // 날짜를 년, 월, 일로 비교
    const createDate = (date) => {
        return new Date(new Date(date.getFullYear()
            , date.getMonth()
            , date.getDate()
            , 0
            , 0
            , 0));
    };

    const handlerClickWrite = () => {
        history.push(`/someus/share/${shareroomid}/write`)
    };

    const formatDate = (date) => {
        if (!date) return '';
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
      };


    // 날짜 변경 시 해당 날짜를 기준으로 목록이 리랜더링
    const handlerChangeDate = (date) => {
        setSelectedDate(date)
        console.log(formatDate(date))
        const createdDt = formatDate(date);
        axios.get(`http://localhost:8080/api/someus/shareroom/${shareroomid}/${createdDt}`,
            { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
            .then((response) => {
                console.log(response);
                // 해당하는 날짜에 대한 일기의 데이터가 없을 경우
                if (response.data.list === null) {
                    alert(`일기를 작성하지 않았어요.`);
                }
                // 해당하는 날짜에 대한 일기의 데이터가 있는 경우 리스트를 새로 만들어 map 함수 실행
                else {
                    setList(response.data);
                }
            })
            .catch((error) => {
                console.log(error);
            })
    };

    const handlerClickDetail = (index) => {
        setModalState(prevState =>{
            const updateArray = [...prevState];
            updateArray[index] = true;
            return updateArray;
        });       
    };


    const result = () => {
       return list && list.map((lst, index) => {
            return (
            <div key={index} id={lst.diaryId}>           
              {modalState[index] && <Modal match={match} closeModal={()=>closeModal(index)} id={lst.diaryId} list={lst}/>}
              <button className="diaryeachbutton" type="button" value={lst.diaryId} onClick={() => handlerClickDetail(index)}>
                <GroupShareListEach list={lst} />
              </button>
            </div>
            );
        });
    };

    return (
        <>
            <NaviDiary history={ history } />
            <div className='groupshare_background'>
                <div className='body1' >
                    <div className="groupcalendar-container">
                        <div className="groupcalendar-box">
                        <DatePicker
                                    // 시작 날짜 셋팅
                                    selected={selectedDate}
                                    locale={ko}
                                    // 날짜가 클릭되면 해당 날짜로 이동
                                    onChange={handlerChangeDate}
                                    inline
                                    // 토, 일 색깔 변경
                                    dayClassName={date =>
                                        getDayName(createDate(date)) === '토' ? "saturday"
                                            :
                                            getDayName(createDate(date)) === '일' ? "sunday" : undefined
                                    }
                                    todayButton="today"
                                />
                        </div>
                    </div>
                    <div className="group_line" />
                    <div className='groupdiary-container'>
                        <div>
                            {/* <p className="name_diary">{list.shareRoomName}</p> */}
                            <p className='date'>{startDate.getMonth() + 1} {startDate.toLocaleString("en-US", { month: "long" })}</p>
                        </div>

                        <button className='group_write' onClick={handlerClickWrite}>
                            <div className='groupWrite-button' />
                                <span className="writebutton_text"> 일기 쓰기 </span>
                        </button>
                                    
                        <div className='diary1'>
                            {/* { list.map((list, index) => <GroupShareEach key={ index } list={ list } />) } */}
                            <div className="diaryWrap1">
                                { result() }
                                {/* 모달 */}
                                {/* {modalState && <Modal closeModal={closeModal} />}
                                <button className="groupdiaryeachbutton" type="button" onClick={() => setModalState(true)}><GroupShareListEach /></button>
                                <button className="groupdiaryeachbutton" type="button" onClick={() => setModalState(true)}><GroupShareListEach /></button>
                                <button className="groupdiaryeachbutton" type="button" onClick={() => setModalState(true)}><GroupShareListEach /></button>
                                <button className="groupdiaryeachbutton" type="button" onClick={() => setModalState(true)}><GroupShareListEach /></button>
                                <button className="groupdiaryeachbutton" type="button" onClick={() => setModalState(true)}><GroupShareListEach /></button> */}
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default GroupShareList;