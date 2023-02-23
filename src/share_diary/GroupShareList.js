import axios from "axios";
import { useEffect, useState } from "react";
import NaviDiary from "../navigation/NaviDiary";
import GroupShareEach from "./GroupShareEach";




const GroupShareList = ({ history }) => {
   
    const [ list, setList ] = useState([]); 
    
    useEffect(() => {
        axios.get(`http://localhost:8080/api/someus/share/groupsharelist`,
                { headers: { 'Authorization' : `Bearer ${ sessionStorage.getItem('token') }`}})
            .then((response) => {
                console.log(response);
                setList(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    });

    return (
        <>
            <NaviDiary history={history}/>
            
            <div>
                { list.map((list, index) => <GroupShareEach key={ index } list={ list } />) }
            </div>
        </>
    );
}

export default GroupShareList;