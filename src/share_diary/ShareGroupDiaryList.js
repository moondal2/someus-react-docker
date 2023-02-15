import Calendar from "../Calendar";
import EachDiary from "./EachDiary";

const ShareGroupDiaryList = () => {

    const list = [ { contents: '어쩌구', date:'20230214'}, 
                    { contents: '저쩌구', date:'20230211'},
                    { contents: '몰랑', date: '20220222' } ]

    return (
        <>
        <div style={ { borderRight: '1px solid gray', width: '350px', float: 'left'} }>
            <Calendar />
        </div>
        <div style={ { width: '300px', float: 'left'} }>
            { list.map((list, index) => <EachDiary key={ index } list={ list } />) }
        </div>
        </>
    );
}

export default ShareGroupDiaryList;