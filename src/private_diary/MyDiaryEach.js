import axios from 'axios';
import { useState } from 'react';
import './mydiaryeach.css'
import sampleimage from 'C:/javascript/someus-app/src/img/sampleimage.jpg';


const MyDiaryEach = ({ list }) => {

    const [ diaryId, setDiaryId ] = useState(0);
    const image = `http://localhost:8080/api/getImage/` + list.diaryImg;

    // const handlerClick = (e) => {
    //     axios.get(`http://localhost:8080/api/someus/private/${diaryId}`)
    //         .then((response) => {
    //             console.log(response);
    //             console.log(e.target);
    //             console.log(response.data.list);
    //             setDiaryId(response.data.list.diaryId);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         })
    // }

    
    return (
        <div className='eachdiary' >
            <div className='diaryimg'><img src={ image } /></div>
            <div className='diarydate'>{ list.createdDt }</div>
        </ div>
        
    );
}

export default MyDiaryEach;