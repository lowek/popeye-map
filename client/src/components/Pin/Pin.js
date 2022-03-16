import {useRef} from "react";
import car from '../../assets/img/car.png'
import guy from '../../assets/img/guy.png'
import PropTypes from "prop-types";

const Pin = ({type}) => {
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
Pin.propTypes = {
    type: PropTypes.string,
}
export default Pin;
