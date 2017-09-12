import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";

export let Map = withGoogleMap(props => {

    let options = {
        ref: props.onMapLoad,
        onClick: props.onMapClick,
        defaultZoom: 15,
        defaultCenter: { lat: 48.8829551, lng: 2.2485991 }
    };

    if(props.longitude && props.latitude) options.center = { lat: props.latitude, lng: props.longitude };
        return (
            <GoogleMap {...options}>
                {props.drivers ? props.drivers.map((driver, i) => {
                    return (<Marker key={i} position={new window.google.maps.LatLng(driver.lat, driver.lng)} />)}
                ) : null}
            </GoogleMap>
        )
});