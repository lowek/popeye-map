import 'mapbox-gl/dist/mapbox-gl.css';
import Map, {Source, Layer, Marker} from 'react-map-gl';
import {useCallback, useEffect, useRef, useState} from "react";
import Pin from "../Pin/Pin";
import PropTypes from 'prop-types';

const GeoMap = ({geoInterval, geoData, pinType}) => {
    const map = useRef(null);
    const [mapData, setMapData] = useState(null);
    const [pin, setPin] = useState(geoData.features[0].geometry.coordinates[0]);

    // display line on map
    const lineStyle = {
        id: 'trace',
        type: 'line',
        source: 'trace',
        paint: {
            'line-color': 'blue',
            'line-opacity': 0.75,
            'line-width': 5
        }
    };

    useEffect(() => {
        //initial map
        const copyMap = JSON.parse(JSON.stringify(geoData))
        const copyCoordinates = geoData.features[0].geometry.coordinates
        copyMap.features[0].geometry.coordinates = [copyCoordinates[0]];
        setMapData(copyMap);
    }, [geoData])

    const onMapLoad = useCallback(async () => {
        const data = await geoData;
        const interval = geoInterval * 1000;
        // save full coordinate list for later
        const coordinates = geoData.features[0].geometry.coordinates;
        // start by showing just the first coordinate
        data.features[0].geometry.coordinates = [coordinates[0]];
        map.current.jumpTo({'center': coordinates[0], 'zoom': 15});
        map.current.setPitch(30);

        let i = 1;
        const timer = setInterval(() => {
            if (i < coordinates.length) {
                if (map && map.current) {
                    data.features[0].geometry.coordinates.push(coordinates[i]);
                    setPin(coordinates[i])
                    map.current.getSource('trace').setData(data);
                    map.current.panTo(coordinates[i]);
                    i++;
                }
            } else {
                window.clearInterval(timer);
            }
        }, interval);
    }, [geoData, geoInterval]);

    return (
        <>
            {geoInterval && geoData && mapData ?
                <Map
                    ref={map}
                    style={{width: '100%', height: '100vh'}}
                    mapStyle="mapbox://styles/mapbox/streets-v9"
                    mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
                    onLoad={onMapLoad}
                >
                    <Source id="trace" type="geojson" data={mapData}>
                        <Layer {...lineStyle} id="line"/>
                        {pin && <Marker longitude={pin[0]} latitude={pin[1]} anchor="center">
                            <Pin type={pinType}/>
                        </Marker>
                        }
                    </Source>
                </Map> : <p>Loading map...</p>
            }
        </>
    );
}
GeoMap.propTypes = {
    geoInterval: PropTypes.number,
    geoData: PropTypes.object,
    pinType: PropTypes.string
}
export default GeoMap;


