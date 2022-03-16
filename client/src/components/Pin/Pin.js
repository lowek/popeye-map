import {useRef} from "react";
import car from '../../assets/img/car.png'
import guy from '../../assets/img/guy.png'
const Pin = ({type}) => {
    console.log(type);
    const paths = useRef({
        'work-home': car,
        default: guy
    })
    const getImagePath = paths.current[type] || paths.current.default
    return (
        <>
            <img src={getImagePath} alt="pin" />
        </>
    );
};

export default Pin;
