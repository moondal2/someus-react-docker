import axios from "axios";
import { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import NavigationDiary from "../navigation/NaviDiary";


const GroupList = ({ name, history }) => {
   
    const [ groupList, setGroupList ] = useState([]);
    

    useEffect(() => {
        axios.get(`http://localhost:8080/api/someus/share/grouplist`,
                { headers: { 'Authorization' : `Bearer ${ sessionStorage.getItem('token') }`}})
            .then(response => {
                console.log(response);
                setGroupList(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    })

    const handlerClickAdd = () => {
        history.push('/someus/addgroup');
    };

    return (
        <>
            <NavigationDiary name={ name }/>
            <input type="button" 
                    value="추가"
                    onClick={ handlerClickAdd }></input>
            
            { groupList.map((groupList, index) => 
                <div key={ index }>
                    <p>{ groupList.title }</p>
                    <p>{ groupList.img }</p>
                </div>) }
        </>
    );
}


export default GroupList;