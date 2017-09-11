# Fullstack Remote Challenge Pickles

Pickles is a food delivery startup. In order for our dishes to be delivered in the best conditions, we want to create a delivery dispatching system based on the geolocalized position of our drivers.

The goal of this exercise is to create an API and a UI consuming the API.

## API 

The API should be written in NodeJS (ExpressJs, HapiJs, etc.) or PHP. The API endpoints are:

- `POST /drivers` - Creates a driver. A driver has a name, an email, a latitude and a longitude.
- `GET /drivers/{id?}` - Gets the drivers. A latitude and a longitude can be passed as parameters to get only the drivers in a 2km radius (euclidean distance).

Notes:

- Use a JSON file as database
- Write tests of endpoints and controllers

## UI

The UI should be written with Angular or React and use the API you wrote. It must allow:

- To create a driver
- To see the list of drivers and optionally visualize their position on a Google Map
- To find drivers in a 2km radius around some given address (use a text input and a [geocoding API](https://developers.google.com/maps/documentation/geocoding/intro#GeocodingResponses))

Bonus if your UI is well-designed and ergonomic.