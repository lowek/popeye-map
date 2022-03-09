const WebSocket = require('ws');
// const lunch = require('./geojson/popeye-village-balluta.geojson');
const wss = new WebSocket.Server({ port: 8880 });

wss.on('connection', function connection(ws) {
    // const message = JSON.parse(lunch);
    ws.send('Welcome');
    // wss.clients.forEach(function each(client) {
    //     if (client !== ws && client.readyState === WebSocket.OPEN) {
    //         client.send(message);
    //     }
    // });
});
