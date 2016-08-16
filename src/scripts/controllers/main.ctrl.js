export default function MainController($scope, $http, utilityService, mapService) {

    /**
     * Initial data object
     */
    const model = {
        days: { 1:"Today", 3:"3 Days", 5:"5 Days" },
        placeName: 'Amsterdam',
        activeTab: "1",
        mapSelector: '.googlemap'
    };

    /**
     * @description
     * Makes a call to weather data "endpoint"
     */
    function getWeatherData() {
        $http({ method: 'GET', url: '/weather' }).then(
            (response) => processResponse(response),
            (error) => {}
        );
    }

    /**
     * @description
     * Processes response from the endpoint
     *
     * @param {Object} response Response from /weather "endpoint"
     */
    function processResponse(response) {
        model.places = utilityService.groupByPlaceName(response.data);
        model.placesIndex = utilityService.createPlacesIndex(model.places);
        try {
            mapService.initiateMap(model.places[model.placeName][0], model.mapSelector);
        } catch(e) {}

        showTab();
    }

    /**
     * @description
     * Toggles the active tab, prepares the data to be rendered
     *
     * @param {Integer} days The number of tab to be shown
     */
    function showTab(days = 1) {
        model.activeTab = parseInt(days);
        model.data = model.places[model.placeName].slice(0, days);
    }

    // listens for selected place change
    $scope.$watch('$ctrl.model.placeName', (newVal) => {
        if (newVal && newVal.originalObject) {
            model.placeName = newVal.originalObject.name;
            mapService.moveMap(model.places[model.placeName][0]);
            showTab();
        }
    });

    return {
        model,
        showTab,
        $onInit: getWeatherData
    }
}
