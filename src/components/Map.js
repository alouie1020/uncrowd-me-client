import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import MapMarker from './MapMarker';
import './Results.css';
import InfoBox from './InfoBox';

const handleApiLoaded = (map, maps) => {
    // use map and maps objects
};

export default class GoogleMap extends Component {
    static defaultProps = {
        center: {
            lat: 40.7831,
            lng: -73.9712
        },
        zoom: 13
    };

    constructor() {
        super();
        this.updatehoveredMarkerId = this.updatehoveredMarkerId.bind(this);
    }

    showInfoBox(name, address, lat, lng) {
        const infoBoxDetails = { name, address, lat, lng };
        this.props.handleMarkerClick(infoBoxDetails);
    }

    updatehoveredMarkerId(value) {
        this.props.updateHoveredMarker(value);
    }

    render() {
        const { places, userCoordinates, zoom, hoveredCardId, currentHover, infoBoxDetails } = this.props;

        return (
            <div style={{ height: '100vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyBmA40LNSpv2kVlUf8Byn-YW6W_ji6zuMY' }}
                    defaultCenter={userCoordinates}
                    defaultZoom={zoom}
                    yesIWantToUseGoogleMapApiInternals={true}
                    onChildClick={this.handleMarkerClick}
                    onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
                >

                    <MapMarker
                        lat={userCoordinates[0]}
                        lng={userCoordinates[1]}
                        userLocation={true}
                        text="Your location"
                        hoverDistance={15}
                    />

                    {places.map((place, index) => (
                        <MapMarker
                            key={place.id}
                            name={place.name}
                            address={place.address}
                            lat={place.lat}
                            lng={place.lng}
                            index={index}
                            hoveredCardId={hoveredCardId}
                            currentHover={currentHover}
                            updateHoveredMarker={this.updatehoveredMarkerId.bind(this)}
                            showInfoBox={this.showInfoBox.bind(this)}
                        />
                    ))}

                        <InfoBox {...infoBoxDetails} />
                        
                </GoogleMapReact>
            </div>
        );
    }
}