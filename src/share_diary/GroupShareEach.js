import groupdiaryimg from 'C:/javascript/someus-app/src/img/groupD_1.png';
import './groupshareEach.css';

const GroupShareEach = ({ list }) => {
    return (
        <>
        <div className='groupEachdiary'>
            <div className='groupdiaryimg'>
                <img src={groupdiaryimg} />
            </div>
            <div className='share_title'>우리들의 일기</div>
        </ div>
        </>
    );
}

export default GroupShareEach;