const fs = require('fs');
const { readFileSync } = require('fs');
const lunch = readFileSync('./geojson/lunch.geojson');
const village = readFileSync('./geojson/popeye-village-balluta.geojson');
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8880 });

wss.on('connection', (socket) => {
    try {
        socket.send(village.toString('utf8'));
    } catch(e) {
        console.log('Something gone wrong, please try again:', e)
    }
    socket.on('message', message  => {
        try {
            const selectedMap = message?.toString();
            const newMap = {
                'work-home': village,
                'work-lunch': lunch,
                'lunch-work': lunch
            }
            const chooseMap = newMap[selectedMap]
            socket.send(chooseMap?.toString('utf8'));
        } catch(e) {
            console.log('Something gone wrong, please try again:', e)
        }
    });
});
