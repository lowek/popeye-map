import React from 'react';
//@ts-ignore
import car from '../../assets/img/car.png';
//@ts-ignore
import guy from '../../assets/img/car.png';
import PropTypes, { InferProps } from "prop-types";

const PinPropTypes = {
    pinType: PropTypes.oneOf(['work-home', 'lunch-work', 'work-lunch']).isRequired
}
type PinType = InferProps<typeof PinPropTypes>

const MapPin = ({ pinType } : PinType) => {
    const getImagePath = pinType === 'work-home' ? car : guy
    return  (<img src={getImagePath} alt="pin" />);
};

MapPin.propTypes = PinPropTypes

export default MapPin
