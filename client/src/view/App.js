import './App.scss';
import BasicSelect from "../components/BasicSelect/BasicSelect";
import GeoMap from "../components/GeoMap/GeoMap";
import {useCallback, useEffect, useRef, useState} from "react";
import List from "../components/List/List";

const App = () => {
    const [popeyData, setPopeyData] = useState(null);
    const inProgress = useRef(false);
    const [ws, setWs] = useState(new WebSocket(process.env.REACT_APP_WEBSOCKET));

    const routes = ['work-home','work-lunch','lunch-work'];
    const intervals = [1,5,10];
    const [route, setRoute] = useState('work-home');
    const [interval, setInterval] = useState(1);

    //functions
    const changeRoute = (name) => {
        ws.send(name);
    }

    const reversCoordinate = (copyMap) => {
        const copyCoordinatesReverse = copyMap.features[0].geometry.coordinates.reverse();
        copyMap.features[0].geometry.coordinates = [];
        copyMap.features[0].geometry.coordinates.push(copyCoordinatesReverse);
        setPopeyData(copyMap);
    }

    const clearCoordinates = (map) => {
        const copyMap = JSON.parse(JSON.stringify(map))
        const copyCoordinates = popeyData.features[0].geometry.coordinates
        copyMap.features[0].geometry.coordinates = [copyCoordinates[0]];
        return copyMap
    }

    useEffect(() => {
        ws.onopen = (e) => {
            console.log('WebSocket Connected');
        }
        ws.onmessage =  (e) => {
            let map =  e.data;
            const currMap = JSON.parse(map);
            inProgress.current = false
            if (route === 'lunch-work') {
                const currMap = JSON.parse(map);
                reversCoordinate(currMap);
                inProgress.current = true
            } else {
                const currMap = JSON.parse(map);
                setPopeyData(currMap);
                inProgress.current = true
            }
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
            <header className="header w-full z-20 py-4 px-4 absolute flex justify-between items-start">
                <h1 className="text-2xl text-white py-3 px-5 font-bold rounded-md">Popeye-map</h1>
                <div className="flex flex-col bg-white px-3 py-3 shadow-md rounded-md">
                    <BasicSelect intervals={intervals} initial={interval} parentCallback={useCallback((interval) => {setInterval(interval)}, [])}/>
                    <List routes={routes} parentCallback={useCallback((r) => { setRoute(r); changeRoute(r); }, [])} />
                </div>
            </header>
            <div className="w-full">
                {popeyData && inProgress ? <GeoMap geoInterval={interval} geoData={clearCoordinates(popeyData)} geoCoordinates={popeyData.features[0].geometry.coordinates} /> : <p>Loading map...</p>}
            </div>
        </div>
    );
}

export default App;
