import React, { useEffect, useState } from 'react';

const Datelocation = () => {
    const [map, setMap] = useState(null);
    const [geocoder, setGeocoder] = useState(null);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDO1q_a9_xikW_XTx6iQhE_NeYOXqyLWWY&callback=initMap";
        document.head.appendChild(script);

        script.onerror = () => {
            console.error("Failed to load the Google Maps API script.");
        };

        window.initMap = () => {
            const mapInstance = new google.maps.Map(document.getElementById("map"), {
                center: { lat: -34.397, lng: 150.644 },
                zoom: 8,
            });
            const geocoderInstance = new google.maps.Geocoder();
            setMap(mapInstance);
            setGeocoder(geocoderInstance);
        };

        script.onload = () => {
            window.initMap();
        };

        return () => {
            document.head.removeChild(script);
        };
    }, []);

    const handleInput = (event) => {
        let address = event.target.value;
        geocodeAddress(address);
    };

    const geocodeAddress = (address) => {
        if (geocoder && map) {
            geocoder.geocode({ 'address': address }, function (results, status) {
                if (status === 'OK') {
                    map.setCenter(results[0].geometry.location);
                    new google.maps.Marker({
                        map: map,
                        position: results[0].geometry.location
                    });
                } else {
                    console.error('Geocode was not successful for the following reason: ' + status);
                }
            });
        } else {
            console.error('Geocoder or map is not initialized.');
        }
    };

    useEffect(() => {
        const inputElement = document.getElementById("event-location");
        if (inputElement) {
            inputElement.addEventListener("input", handleInput);
        }

        return () => {
            if (inputElement) {
                inputElement.removeEventListener("input", handleInput);
            }
        };
    }, [map, geocoder]);

    return (
        <>
            <div className="card">
                <h2>Event Overview</h2>
                <h4>Event title</h4>
                <form id="event-form">
                    <label htmlFor="event-date">Event Date:</label>
                    <input type="date" id="event-date" name="event-date" required />
                    <label htmlFor="event-location">Event Location:</label>
                    <input type="text" id="event-location" name="event-location" required />
                    <div id="map" style={{ height: '400px', width: '100%' }}></div>
                    <button type="submit">Submit</button>
                </form>
            </div>
            <button id='but'>Done</button>
        </>
    );
};

export default Datelocation;