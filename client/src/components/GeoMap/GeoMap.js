import 'mapbox-gl/dist/mapbox-gl.css';
import Map, {Source, Layer} from 'react-map-gl';
import {useCallback, useEffect, useRef, useState} from "react";

const GeoMap = ({geoInterval, geoData}) => {
    const map = useRef();
    const marker = useRef();
    const [mapData, setMapData] = useState(null);

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
        const copyMap = JSON.parse(JSON.stringify(geoData))
        const copyCoordinates = geoData.features[0].geometry.coordinates
        copyMap.features[0].geometry.coordinates = [copyCoordinates[0]];
        setMapData(copyMap);
    }, [geoData])

    const onMapLoad = useCallback(async () => {
        const data = await geoData;
        // save full coordinate list for later
        const coordinates = geoData.features[0].geometry.coordinates;
        const interval = geoInterval * 1000;

        // start by showing just the first coordinate
        data.features[0].geometry.coordinates = [coordinates[0]];
        map.current.jumpTo({'center': coordinates[0], 'zoom': 15});
        map.current.setPitch(30);

        // on a regular basis, add more coordinates from the saved list and update the map
        let i = 0;
        const timer = setInterval(() => {
            if (i < coordinates.length) {
                data.features[0].geometry.coordinates.push(coordinates[i]);
                marker.current = coordinates[i];
                if (map && map.current) {
                    map.current.getSource('trace').setData(data);
                    map.current.panTo(coordinates[i]);
                }
                i++;
            } else {
                window.clearInterval(timer);
            }
        }, interval);
    }, []);

    return (
        <>
            {geoInterval && geoData ?
                <Map
                    ref={map}
                    // viewState={initialView}
                    style={{width: '100%', height: '100vh'}}
                    mapStyle="mapbox://styles/mapbox/streets-v9"
                    mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
                    onLoad={onMapLoad}
                >
                    <Source id="trace" type="geojson" data={mapData}>
                        <Layer {...lineStyle} />
                    </Source>
                </Map> : <p>Loading map...</p>
            }
        </>
    );
};

export default GeoMap;


