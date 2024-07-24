import React, { useEffect } from 'react';

const Datelocation = () => {
    let map;
    let geocoder;

    useEffect(() => {
        // Load Google Maps script
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap`;
        script.async = true;
        document.head.appendChild(script);

        // Define the initMap function in the window scope
        window.initMap = () => {
            map = new google.maps.Map(document.getElementById("map"), {
                center: { lat: -34.397, lng: 150.644 },
                zoom: 8,
            });
            geocoder = new google.maps.Geocoder();

            document.getElementById("event-location").addEventListener("input", function () {
                let address = this.value;
                geocodeAddress(address);
            });
        };

        // Cleanup script and event listener on component unmount
        return () => {
            document.head.removeChild(script);
            document.getElementById("event-location").removeEventListener("input", geocodeAddress);
        };
    }, []);

    const geocodeAddress = (address) => {
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
    };

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
        </>
    );
}

export default Datelocation;
