import './App.scss';
import BasicSelect from "../components/BasicSelect/BasicSelect";
import GeoMap from "../components/GeoMap/GeoMap";
import {useCallback, useEffect, useRef, useState} from "react";

const App = () => {
    const [mapData, setMapData] = useState(null);
    const [ws, setWs] = useState(new WebSocket(process.env.REACT_APP_WEBSOCKET));

    const routes = ['work-home','work-lunch','lunch-work'];
    const intervals = [1,5,10];
    const [route, setRoute] = useState('work-home');
    const [interval, setInterval] = useState(1);
    const [mapKey, setMapKey] = useState(0);
    const [pinType, setPinType] = useState('work-home');

    //init change route
    const changeRoute = () => {
        setPinType(route);
        ws.send(route);
    }

    // for reverse coordination for lunch-work
    const reversCoordinate = (map) => {
        const copyCoordinates = map.features[0].geometry.coordinates;
        let finalMap = (map);
        finalMap.features[0].geometry.coordinates = copyCoordinates.reverse();
        return finalMap;
    }

    const setMapProperly = (map) => {
        if (route === 'lunch-work') {
            setMapData(reversCoordinate(map));
        } else {
            setMapData(map);
        }
        const currentKey = mapKey + 1;
        setMapKey(currentKey);
    }

    useEffect(() => {
        ws.onopen = (e) => {
            console.log('WebSocket Connected');
        }
        ws.onmessage =  (e) => {
            let map =  e.data;
            const currMap = JSON.parse(map);
            setMapProperly(currMap);
        }
        return () => {
            ws.onclose = () => {
                console.log('WebSocket Disconnected');
                setWs(new WebSocket(URL));
            }
        }
    }, [ws.onmessage, ws.onopen, ws.onclose]);

    return (
        <div className="App">
            <header className="header absolute right-0 top-0 z-20 shadow-md">
                <h1 className="text-2xl text-white py-3 px-5 font-bold">PopeyeMAP</h1>
                <div className="flex flex-col bg-white px-3 py-3">
                    <BasicSelect label="Intervals" values={intervals} initial={interval} parentCallback={useCallback((i) => setInterval(i), [])}/>
                    <BasicSelect label="Routes" values={routes} initial={route} parentCallback={useCallback((r) => setRoute(r), [])}/>
                    <button className="rounded-md py-3 shadow-md bg-blue-600 text-sm text-white hover:bg-blue-500 transition" onClick={() => changeRoute()}>Set map</button>
                </div>
            </header>
            <div className="w-full">
                {mapData ? <GeoMap key={mapKey} geoInterval={interval} geoData={mapData} pinType={pinType}/> : <p>Loading map...</p>}
            </div>
        </div>
    );
}

export default App;
