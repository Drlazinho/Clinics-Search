import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GoogleApiWrapper, Map, Marker } from 'google-maps-react';

import { setClinics, setClinic } from '../../redux/modules/clinics'

export const MapContainer = (props) => {
    const dispatch = useDispatch();
    const { clinics } = useSelector((state) => state.clinics)
    const [map, setMap] = useState(null);
    const { google, query, placeId } = props;

    useEffect(() => {
        query && searchByQuery(query);
    }, [query]);

    useEffect(() => {
        if(placeId) {
            getClinicById(placeId);
        }
    }, [placeId]);

    function getClinicById() {
        const service = new google.maps.places.PlacesService(map);
        dispatch(setClinic(null));

        const request = {
            placeId,
            fields: ['name', 'opening_hours', 'formatted_address', 'formatted_phone_number']
        };

        service.getDetails(request, (place, status) => {
            if(status === google.maps.places.PlacesServiceStatus.OK) {
                dispatch(setClinic(place));
            }
        });
    }

    function searchByQuery(query) {
        const service = new google.maps.places.PlacesService(map);
        dispatch(setClinics([]));

        const request = {
            location: map.center,
            radius: '200',
            type: ['clinic'],
            query,
        };

        service.textSearch(request, (results, status) => {
            if(status === google.maps.places.PlacesServiceStatus.OK) {
                dispatch(setClinics(results));
            }
        });
    }

    function searchNearby(map, center) {
        const service = new google.maps.places.PlacesService(map);
        dispatch(setClinics([]));


        const request = {
            location: center,
            radius: '20000',
            type: ['clinic'],
        };

        service.nearbySearch(request, (results, status) => {
            if(status === google.maps.places.PlacesServiceStatus.OK) {
                dispatch(setClinics(results));
            }
        });
    }

    function onMapReady(_, map) {
        setMap(map);
        searchNearby(map, map.center);
    }

    return (
    <Map google={google} centerAroundCurrentLocation onReady={onMapReady} onRecenter={onMapReady} { ...props }>
        {clinics.map((clinic) => (
            <Marker key={clinic.place_id} name={clinic.name} position={{
                lat: clinic.geometry.location.lat(),
                lng: clinic.geometry.location.lng(),
            }} />
        ))}
    </Map>
    );
};

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    language: 'pt-BR',
})(MapContainer);