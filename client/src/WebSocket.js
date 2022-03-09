import React, { createContext } from 'react'
import io from 'socket.io-client';
import { WS_BASE } from './config';
const WebSocketContext = createContext(null)


export { WebSocketContext }
export default ({ children }) => {
    let socket;
    let ws;
}
