import axios from 'axios';
import './groupsharelisteach.css';
import trueimage from '../img/group_half.png';


const GroupShareListEach = ({ list }) => {

    
    return (
        <div className='group_eachdiary'>
            {list.number === 0 ? <div className='group_diaryimg1' /> : <div className='group_diaryimg2' /> }
            <div className='group_diarydate'>{list.createdDt}</div>
        </ div>
    );
}

export default GroupShareListEach;