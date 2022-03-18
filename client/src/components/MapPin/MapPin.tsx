import React from 'react';
//@ts-ignore
import car from '../../assets/img/car.png';
//@ts-ignore
import guy from '../../assets/img/car.png';
import PropTypes from "prop-types";
import {IMapPin, TPin} from "@/interfaces";

const MapPin = ({ pinType } : { pinType:TPin}) => {
    const paths: IMapPin = {
        'work-home': car,
        default: guy
    }
    const getImagePath = paths[pinType] ||paths.default
    return  (<img src={getImagePath} alt="pin" />);
};

MapPin.propTypes = {
    pinType: PropTypes.string,
}

export default MapPin
