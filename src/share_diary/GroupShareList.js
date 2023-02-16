import axios from "axios";
import { useEffect, useState } from "react";
import NavigationLogin from "../navigation/NavigationLogin";
import GroupShareEach from "./GroupShareEach";



const GroupShareList = () => {
   
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
            <NavigationLogin />
            
            <div style={ { width: '300px', float: 'left'} }>
                { list.map((list, index) => <GroupShareEach key={ index } list={ list } />) }
            </div>
        </>
    );
}

export default GroupShareList;