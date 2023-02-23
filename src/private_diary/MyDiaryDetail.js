import axios from "axios";
import { useEffect, useState } from "react";


const MyDiaryDetail = ({ match, history }) => {

    const [ diary, setDiary ] = useState({});
    const [ weather, setWeather ] = useState('');
    const [ mood, setMood ] = useState('');
    const [ contents, setContents ] = useState('');
    const image = `http://localhost:8080/api/getImage/` + diary.diaryImg;

    const { diaryId } = match.params;

    useEffect(() => {
        console.log(match);
        axios.get(`http://localhost:8080/api/someus/private/${diaryId}`,
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
    },[]);

    const hanlderChangeContents = (e) => {
        setContents(e.target.value);
        console.log(contents);
    };

    const handlerOnClickUpdate = () => {
        axios.put(`http://localhost:8080/api/someus/private/${diaryId}`,
                    { "diaryContent": contents },
                    { headers: { 'Authorization' : `Bearer ${ sessionStorage.getItem('token') }`}})
            .then((response) => {
                if(response.data === 1) {
                    alert(`정상적으로 수정되었습니다.`);
                    history.push(`/someus/private/${diaryId}`);
                } else {
                    alert(`수정에 실패했습니다.`);
                    return;
                }
            })
            .catch((error) => {
                console.log(contents);
                console.log(error);
                alert(`수정에 실패했습니다.`);
                    return;
            })
    };

    const handlerOnClickDelete = () => {
        axios.delete(`http://localhost:8080/api/someus/private/${diaryId}`,
        { headers: { 'Authorization' : `Bearer ${ sessionStorage.getItem('token') }`}})
            .then((response) => {
                if(response.data === 1) {
                    alert(`정상적으로 삭제되었습니다.`);
                    history.push('/someus/private');
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
                    <p>{ diary.createdDt }</p>
                    <img src={image} />
                    {/* <img src={diary.diaryImg} /> */}
                    <p>{ diary.moodId }</p>
                    <p>{ diary.weatherId }</p>
                    <input type='text'
                            value={ diary.diaryContent }
                            onChange={ hanlderChangeContents } />
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

export default MyDiaryDetail;