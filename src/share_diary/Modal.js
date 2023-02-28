import { useEffect, useState } from "react";
import Modal_GroupL from "./Modal_GroupL";
import Modal_GroupR from "./Modal_GroupR";
import './modal.css';


const Modal = (props) => {

    //일기 정보 1개 또는 2개 각각 뿌려줄 객체 배열 변수
    const [diaryDetailInfo, setDiaryDetailInfo] = useState([]);

    useEffect(() => {
        document.body.style.cssText = `
        position: fixed;
        top: -${window.scrollY}px;
        overflow-y: scroll;
        width: 100%;`;


        //{ 반복문 } 같은 날짜인 거 골라서 diaryDetailInfo에 담음 변수 이름 바꾸는게 좋을 듯 어려움.
        for (let i = 0; i < props.allList.length; i++) {
            if (props.allList[i].createdDt === props.list.createdDt) {
                setDiaryDetailInfo(prevState => [...prevState, props.allList[i]]);
            } else { }
        }
        return () => {
            const scrollY = document.body.style.top;
            document.body.style.cssText = '';
            window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
        };
    }, []);

    const modalClose = () => {
        props.closeModal();
    }

    return (
        <>
            <div className="modal" onClick={modalClose}>
                {props.list.number === 0 ?
                    <div className="group_modalBody" onClick={(e) => e.stopPropagation()}>
                        <Modal_GroupL diaryDetailInfo={diaryDetailInfo[0]} />
                        <div className="vertical_line"></div>
                        <Modal_GroupR />
                    </div>
                    :
                    <div className="group_modalBody" onClick={(e) => e.stopPropagation()}>
                        <Modal_GroupL diaryDetailInfo={diaryDetailInfo[0]} />
                        <div className="vertical_line"></div>
                        <Modal_GroupR diaryDetailInfo={diaryDetailInfo[1]} />
                    </div>
                }
            </div>
        </>
    );
};

export default Modal;