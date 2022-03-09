import 'mapbox-gl/dist/mapbox-gl.css';
import Map from 'react-map-gl';

const GeoMap = () => {
    return (
        <Map
            initialViewState={{
                longitude: -122.4,
                latitude: 37.8,
                zoom: 14
            }}
            style={{width: '100%', height: '100vh'}}
            mapStyle="mapbox://styles/mapbox/streets-v9"
            mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        />
    );
}

export default GeoMap;
