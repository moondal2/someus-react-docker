import axios from "axios";
import { useEffect, useState } from "react";
import { withRouter } from 'react-router-dom';

const GroupShareDetailEach = ({ match, history }) => {
    
    const { shareroomId, createdDt } = match.params;
    
    const [ diary, setDiary ] = useState({});
    const [ weather, setWeather ] = useState('');
    const [ mood, setMood ] = useState('');
    const [ contents, setContents ] = useState('');
    const image = `http://localhost:8080/api/getImage/` + diary.diaryImg;

    useEffect(() => {
        axios.get(`http://localhost:8080/api/someus/share/${shareroomId}/${createdDt}`,
                    { headers: { 'Authorization' : `Bearer ${ sessionStorage.getItem('token') }`}})
            .then(response =>{
                console.log(response);
                setDiary(response.data);
                setWeather(response.data.weather);
                setMood(response.data.mood);
                setContents(response.data.contents);
            })
            .catch(error => {
                console.log(error);
            })
    });

    const handlerOnClickUpdate = () => {
        axios.put(`http://localhost:8080/api/someus/share/${shareroomId}/${createdDt}`)
            .then((response) => {
                if(response.data === 1) {
                    alert(`정상적으로 수정되었습니다.`);
                    JSON.stringify(history).push('/someus/share/groupsharelist');
                } else {
                    alert(`수정에 실패했습니다.`);
                    return;
                }
            })
            .catch((error) => {
                console.log(error);
                alert(`수정에 실패했습니다.`);
                    return;
            })
    };

    const handlerOnClickDelete = () => {
        axios.delete(`http://localhost:8080/api/someus/share/${shareroomId}/${createdDt}`)
            .then((response) => {
                if(response.data === 1) {
                    alert(`정상적으로 삭제되었습니다.`);
                    JSON.stringify(history).push('/someus/share/groupsharelist');
                } else {
                    alert(`삭제에 실패했습니다.`);
                    return;
                }
            })
            .catch((error) => {
                console.log(error);
                alert(`삭제에 실패했습니다.`);
                    return;
            })
    };
    
    return (
    <>
        <div>
            <div>
                <div>
                    <img src="" />
                </div>
                <div>
                    <p>{ diary.createdDt}</p>
                    <img src={image} />
                    <p>{ diary.weatherId }</p>
                    <p>{ diary.moodId }</p>
                    <p>{ diary.diaryContent }</p>
                    <input type="button" 
                            value="연필"
                            onClick={ handlerOnClickUpdate } />
                    <input type="button" 
                            value="휴지통" 
                            onClick={ handlerOnClickDelete }/>
                </div>
            </div>
        </div>
    </>
    );
}

export default withRouter(GroupShareDetailEach);