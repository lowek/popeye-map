# popeye-map
 
### 1. Install dependencies
- Go to `/server` directory and in terminal run `npm install`
- Go to `/client` directory and in terminal run `npm install`

### 2. Run application
- Go to `/server` directory and use command `nodemon`
- Go to `/client` directory and use command `npm run start`

## Run by Docker

Use command `docker-compose up --build`

### 3. Run cypress
`npx cypress open`

### Components


#### MapPin
Props | type | example value
--- | --- | --- |
geoInterval | number | 4
geoData | object | { type: "FeatureCollection" }
pinType | string | work-lunch

#### Basic Select
Props | type | example value
--- | --- | --- |
label | string | Example title
values | array | [1,2,3,]
initial | string/number | 1

#### MapPin
Props | type | example value
--- | --- | --- |
type | string | work-lunch
