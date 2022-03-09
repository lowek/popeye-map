import './App.scss';
import BasicSelect from "../components/BasicSelect/BasicSelect";
import GeoMap from "../components/GeoMap/GeoMap";
import {useEffect, useState} from "react";

const App = () => {
    const [popeyData, setPopeyData] = useState();
    const [ws, setWs] = useState(new WebSocket(process.env.REACT_APP_WEBSOCKET));

    useEffect(() => {
        ws.onopen = () => {
            console.log('WebSocket Connected');
        }

        ws.onmessage = (e) => {
            const data = JSON.parse(e.data);
            setPopeyData([data]);
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
            <header className="header w-full z-20 py-4 px-4 absolute flex justify-between items-center">
                <h1 className="text-2xl text-white py-3 px-5 font-bold rounded-md">Popeye-map</h1>
                <BasicSelect/>
            </header>
            <div className="w-full">
                <GeoMap/>
                {popeyData}
            </div>
        </div>
    );
}

export default App;
