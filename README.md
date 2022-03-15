# popeye-map
 
### 1.Install
To start project you need install whole node packages. 
1. Go to `/server` directory and in terminal run `npm install`
2. Go to `/client` directory and in terminal run `npm install`

### 2. Start project
1. Go to `/server` directory and in terminal run `node server.js`, you can also use `nodemon server.js`
2. Go to `/client` directory and in terminal run `npm run start`

Most important things from the project below. 
This code is to put new coordination to array, which print line on map.

        const data = await geoData;
        const coordinates = geoData.features[0].geometry.coordinates;
        const interval = geoInterval*100;

        // start by showing just the first coordinate
        data.features[0].geometry.coordinates = [coordinates[0]];
        map.current.jumpTo({ 'center': coordinates[0], 'zoom': 15 });
        map.current.setPitch(30);

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


