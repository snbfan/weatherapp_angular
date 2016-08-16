export default function mapService() {

    let mapNode, map, markers = [];

    /**
     * @description
     * Reference to map node
     *
     * @param {String} selector DOM Query selector
     * @returns {Object}
     */
    function getMapNode(selector) {
        if (mapNode === undefined) {
            mapNode = document.querySelectorAll(selector)[0];
        }

        return mapNode;
    }


    /**
     * @description
     * Initiates the map in a given DOM element
     *
     * @param {Object} place Object containing place information
     * @param {String} selector DOM Query selector
     *
     */
    function initiateMap(place, selector) {
        map = new google.maps.Map(getMapNode(selector), {
            center: {lat: place.latitude, lng: place.longitude},
            zoom: 8
        });
        map.setOptions({
            draggable: false,
            zoomControl: false,
            scrollwheel: false,
            disableDoubleClickZoom: true,
            streetViewControl: false,
            mapTypeControl: false
        });
        moveMap(place);
    }

    /**
     * @description
     * Clears previously set markers
     * Moves map to given location
     *
     * @param {Object} place Object containing place information
     */
    function moveMap(place) {
        let coords = {lat: place.latitude, lng: place.longitude};
        clearMarkers();
        createMarker(coords);
        map.setCenter(coords);
    }


    /**
     * @description
     * Sets the map on all markers in the array.
     *
     */
    function clearMarkers() {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
        }
    }


    /**
     * @description
     * Creates markers
     *
     * @param data
     */
    function createMarker(coords) {
        let marker = new google.maps.Marker({
            position: {
                'lat': coords.lat,
                'lng': coords.lng
            },
            map: map
        });

        markers.push(marker);
    }

    return {
        initiateMap: initiateMap,
        moveMap: moveMap
    }
};
