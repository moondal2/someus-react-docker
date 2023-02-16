import axios from "axios";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './datepicker.css'
import MyDiaryEach from "./MyDiaryEach";


const MyDiaryList = ({ history }) => {

    const [ list, setList ] = useState([]);
    const [ startDate, setStartDate ] = useState(new Date());

    useEffect(() => {
        axios.get(`http://localhost:8080/api/someus/private`,
            { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
            .then((response) => {
                console.log(response);
                setList(response.data.list);
            })
            .catch((error) => {
                console.log(error);
                return;
            })
    })

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
        history.push(`http://localhost:8080/api/someus/private/write`)
    }

    // 날짜 변경 시 해당 날짜를 기준으로 목록이 리랜더링
    const handlerChangeDate = (date) => {
        setStartDate(date);
        axios.get(`http://localhost:8080/api/someus/private/다이어리아이디`,
        { headers: { 'Authorization' : `Bearer ${ sessionStorage.getItem('token') }`}})
            .then((response) => {
                console.log(response);
                // 해당하는 날짜에 대한 일기의 데이터가 없을 경우
                if(response.data.list === null) {
                    alert(`일기를 작성하지 않았어요.`);
                }
                // 해당하는 날짜에 대한 일기의 데이터가 있는 경우 리스트를 새로 만들어 map 함수 실행
                else {
                    // history.push(`/someus/private/${diaryId}`);
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <>
            <div style={{ borderRight: '1px solid gray', width: '350px', float: 'left' }}>
                <div className="calender-container">
                    <div className="calender-box">
                        <DatePicker
                            // 시작 날짜 셋팅
                            selected={startDate}
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
            </div>
            <div>
                <input type='button' 
                        value='일기 쓰기'
                        onClick= { handlerClickWrite } />
            </div>
            <div>
                <div style={{ width: '300px', float: 'left' }}>
                    {list.map((list, index) => <MyDiaryEach key={index} list={list} />)}
                </div>

            </div>
        </>
    );

}

export default MyDiaryList;