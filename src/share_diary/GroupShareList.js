import Calendar from "../Calendar";
import GroupShareEach from "./GroupShareEach";

const GroupShareList = () => {

    // const list = [ { contents: '어쩌구', date:'20230214'}, 
    //                 { contents: '저쩌구', date:'20230211'},
    //                 { contents: '몰랑', date: '20220222' } ];

    const [ list, setList ] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/someus/share/groupsharelist`)
            .then((response) => {
                console.log(response);
                setList(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    })

    return (
        <>
        <div style={ { borderRight: '1px solid gray', width: '350px', float: 'left'} }>
            <Calendar />
        </div>
        <div style={ { width: '300px', float: 'left'} }>
            { list.map((list, index) => <GroupShareEach key={ index } list={ list } />) }
        </div>
        </>
    );
}

export default GroupShareList;