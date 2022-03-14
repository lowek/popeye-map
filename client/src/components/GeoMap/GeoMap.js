import 'mapbox-gl/dist/mapbox-gl.css';
import Map, {Source, Layer } from 'react-map-gl';
import {useCallback, useEffect, useRef, useState} from "react";

const GeoMap = ({ geoInterval, geoData, geoCoordinates }) => {
    const map = useRef();
    const [initialView, setInitialView] = useState(null);

    const setInitialViewCoordinates = () => {
        const getZoom = geoCoordinates.length / 2;
        const getCoordinates = geoCoordinates;
        //set initialView for mapbox
        const viewMap = {
            longitude: getCoordinates[getZoom][0],
            latitude: getCoordinates[getZoom][1],
            zoom: 12
        }
        setInitialView(viewMap);
    }

    useEffect( () => {
        setInitialViewCoordinates();
    },[])

    const onMapLoad = useCallback(async () => {
        const data = await geoData;
        // save full coordinate list for later
        const coordinates = geoCoordinates;
        const interval = geoInterval*1000;
        // start by showing just the first coordinate
        data.features[0].geometry.coordinates = [coordinates[0]];
        // on a regular basis, add more coordinates from the saved list and update the map
        let i = 0;
        const timer = setInterval(() => {
            if (i < coordinates.length) {
                data.features[0].geometry.coordinates.push(coordinates[i]);
                if(map && map.current) {
                    map.current.getSource('trace').setData(data);
                    map.current.panTo(coordinates[i]);
                }
                i++;
            } else {
                window.clearInterval(timer);
            }
        }, interval);
    }, []);

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
    }

    return (
        <>
            {initialView && geoInterval && geoData && geoCoordinates ?
               <>
                   {JSON.stringify((geoData))}
                   <Map
                        ref={map}
                        viewState={initialView}
                        style={{width: '100%', height: '100vh'}}
                        mapStyle="mapbox://styles/mapbox/streets-v9"
                        mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
                        onLoad={onMapLoad}
                    >
                        <Source id="trace" type="geojson" data={geoData}>
                            <Layer {...lineStyle} />
                        </Source>
                    </Map>
                </>
                :
                <p>Loading...</p>
            }
        </>
    );
}

export default GeoMap;


