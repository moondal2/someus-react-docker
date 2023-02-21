import axios from "axios";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './datepicker.css';
import MyDiaryEach from "./MyDiaryEach";
import ko from 'date-fns/locale/ko';
import pentool from 'C:/javascript/someus-app/src/img/pentool.png';
import NaviDiary from "../navigation/NaviDiary";
import '../navigation/navi.css';
import './mydiarylist.css';
import jwt_decode from "jwt-decode";


const MyDiaryList = ({ match, history, name }) => {

    const [ list, setList ] = useState([]);
    const [ startDate, setStartDate ] = useState(new Date());
    const { diaryId } = match.params;
    const [ userId, setUserId ] = useState('');
    const [ userName, setUserName ] = useState('');


    useEffect(() => {
        const token = sessionStorage.getItem('token');
        const decode_token = jwt_decode(token);
        console.log(decode_token);
        
        axios.get(`http://localhost:8080/api/someus/private`,
            { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
            .then((response) => {
                console.log(response);
                setList(response.data.list);
                setUserId(response.data.list.userId);
                setUserName(response.data.list.userName);
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
        history.push(`/someus/private/write`)
    }

    // 날짜 변경 시 해당 날짜를 기준으로 목록이 리랜더링
    const handlerChangeDate = (date) => {
        console.log(date);
        
        setStartDate(date);
        axios.get(`http://localhost:8080/api/someus/private/${diaryId}`,
            { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
            .then((response) => {
                console.log(response);
                setStartDate(date);

                // 해당하는 날짜에 대한 일기의 데이터가 없을 경우
                if (response.data.list === null) {
                    alert(`일기를 작성하지 않았어요.`);
                }
                // 해당하는 날짜에 대한 일기의 데이터가 있는 경우 리스트를 새로 만들어 map 함수 실행
                else {
                    history.push(`/someus/private/${diaryId}`);
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <>
        <div style={{ border: '3px solid red' }}>
            <NaviDiary name={name} />
            <div className='background'
                style={{ backgroundImage: `url('../img/bg_mylist.png')`}} >
                 {/* <img src={backimg} style={ { backgroundAttachment: 'fixed'}}/> */}
                <div className='body' >
                    <div className="calendar-container">
                        <div className="calendar-box">
                            <DatePicker
                                // 시작 날짜 셋팅
                                selected={startDate}
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
                    <div className='diary-container'>
                        <div>
                            <p>{name}의 일기</p>
                            <p className='date'>{startDate.getMonth() + 1} {startDate.toLocaleString("en-US", { month: "long" })}</p>
                        </div>
                        
                        <button className='write' onClick={handlerClickWrite}>
                            <div className='write-button'>
                                <img src={pentool} alt='write' style={ {width: '15px', height: '15px'}}/>
                                <span> 일기 쓰기 </span>
                            </div>
                        </button>




                        {/* <img src={pentool} />
                        <input type='button'
                            value='일기 쓰기'
                            onClick={handlerClickWrite} /> */}
                        <div className='diary'>
                            {/* <div style={{ width: '300px', float: 'left' }}>
                            {list.map((list, index) => <MyDiaryEach key={index} list={list} />)}
                        </div> */}
                            {/* 하드코딩 테스트용 */}
                            <MyDiaryEach />
                            <MyDiaryEach />
                            <MyDiaryEach />
                            <MyDiaryEach />
                            <MyDiaryEach />
                            <MyDiaryEach />
                            <MyDiaryEach />
                            <MyDiaryEach />
                            

                        </div>
                    </div>
                </div>

            </div>
            </div>
        </>
    );

}

export default MyDiaryList;