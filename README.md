# popeye-map
 
### 1. Install dependencies
- Go to `/server` directory and in terminal run `npm install`
- Go to `/client` directory and in terminal run `npm install`

### 2. Config env. file
In client directory use command `cp .env.example .env` or just create .env file and put access token from mapbox.com

`REACT_APP_MAPBOX_ACCESS_TOKEN=`

### 3. Run application
- Go to `/server` directory and use command `nodemon`
- Go to `/client` directory and use command `npm run start`

## Run by Docker
Use command `docker-compose up --build`

### Run cypress
Run cypress test in client directory
`npx cypress open`

### Components

#### GeoMap
Props | type | example value
--- | --- | --- |
geoInterval | number | 4
geoData | object | { type: "FeatureCollection" }
pinType | string | work-lunch

#### Basic Select
Props | type | example value
--- | --- | --- |
label | string | Example title
values | array | [1,2,3]
initial | string/number | 1

#### MapPin
Props | type | example value
--- | --- | --- |
type | string | work-lunch
