import React, { useState } from 'react'

import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

import { withRouter } from 'react-router-dom';

const MyMapComponent = withScriptjs(withGoogleMap((props) => {
    return <GoogleMap
        ref={(map) => map && map.panTo(props.coordinate)}
        defaultZoom={18}
        defaultCenter={props.coordinate}
        mapTypeId="satellite"
        onClick={props.onClick}
    >
        <Marker onClick={props.handleToggleOpen} position={props.coordinate}></Marker>
    </GoogleMap>
}))

const MapFactoryMarker = withRouter(props => {

    const [center, setCenter] = useState({ lat: 14.783753, lng: 101.957377 });

    function renderMap() {

        return <MyMapComponent
            // markers={null}
            // markers={markersAll}
            // markers={markers}
            // &key=AIzaSyCAF3vtQPCvMIK3kCOawnpKoL_6ITUzdL4
            coordinate={center}
            isMarkerShown
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCAF3vtQPCvMIK3kCOawnpKoL_6ITUzdL4"
            loadingElement={< div style={{ height: `100%` }
            } />}
            containerElement={< div style={{ height: `100%` }} />}
            mapElement={< div style={{ height: `100%` }} />}
            onClick={(e) => {
                props.onClick(e);
                setCenter({
                    lat: e.latLng.lat(),
                    lng: e.latLng.lng()
                });
                new window.google.maps.LatLng(e.latLng.lat(), e.latLng.lng())
            }}
        />
    }

    return (
        <div>
            <div style={{
                height: '50vh',
                // marginTop: 10,
                paddingBottom: 10,
            }}>
                {renderMap()}
            </div>

        </div>
    )
})

export default MapFactoryMarker;