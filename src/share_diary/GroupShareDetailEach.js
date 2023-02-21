import axios from "axios";
import { useEffect, useState } from "react";
import { withRouter } from 'react-router-dom';

const GroupShareDetailEach = ({ match, history }) => {
    
    const { shareroomId, createdDt } = match.params;
    
    const [ diary, setDiary ] = useState({});
    const [ weather, setWeather ] = useState('');
    const [ mood, setMood ] = useState('');
    const [ contents, setContents ] = useState('');

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
        <div style={ { border: '1px solid black', float: 'left', width: '800px'} }>
            <div style={ { border: '1px solid black', width:'300px', float:'left', marginLeft: '200px', marginRight: '200px'} }>
                <div>
                    <img src="" />
                </div>
                <div>
                    <p>{ diary.createdDt}</p>
                    <p>{ diary.weatherId }</p>
                    <p>{ diary.moodId }</p>
                    <p>{ diary.diaryContents }</p>
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