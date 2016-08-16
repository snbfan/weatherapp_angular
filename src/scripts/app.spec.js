import zvrapp from './app';
import { httpServiceMock, mapServiceMock, mapsMock } from './mocks/serviceMocks';

describe('zvrapp', () => {

    let ctrl, filter, utilityService, mapService,
        placeName = 'Amsterdam',
        placesMock = {data:[
        {
            "station_id":1438,
            "place_name":"Amsterdam",
            "latitude":52.3,
            "longitude":4.766667,
            "datetime":"2014-08-08 00:00:00",
            "temperature_max":"24.2",
            "temperature_min":"15.1",
            "precipitation_probability":"90",
            "precipitation_mm":"6.0"
        },
        {
            "station_id":1438,
            "place_name":"Amsterdam",
            "latitude":52.3,
            "longitude":4.766667,
            "datetime":"2014-08-09 00:00:00",
            "temperature_max":"23.0",
            "temperature_min":"16.7",
            "precipitation_probability":"70",
            "precipitation_mm":"3.3"
        },
        {
            "station_id":1438,
            "place_name":"Amsterdam",
            "latitude":52.3,
            "longitude":4.766667,
            "datetime":"2014-08-10 00:00:00",
            "temperature_max":"25.6",
            "temperature_min":"14.8",
            "precipitation_probability":"85",
            "precipitation_mm":"11.8"
        },
        {
            "station_id":1438,
            "place_name":"Amsterdam",
            "latitude":52.3,
            "longitude":4.766667,
            "datetime":"2014-08-11 00:00:00",
            "temperature_max":"21.8",
            "temperature_min":"15.3",
            "precipitation_probability":"75",
            "precipitation_mm":"4.5"
        },
        {
            "station_id":1438,
            "place_name":"Amsterdam",
            "latitude":52.3,
            "longitude":4.766667,
            "datetime":"2014-08-12 00:00:00",
            "temperature_max":"20.9",
            "temperature_min":"14.2",
            "precipitation_probability":"75",
            "precipitation_mm":"6.6"
        }
        ]};

    beforeEach(() => {
        window.google = mapsMock();
        angular.mock.module(zvrapp);
        angular.mock.inject(($filter, $controller, $rootScope, $http, _utilityService_, _mapService_) => {

            utilityService = _utilityService_;
            mapService = _mapService_;
            filter = $filter;

            ctrl = $controller('mainController', {
                '$scope': $rootScope.$new(),
                '$http': httpServiceMock(placesMock),
                'utilityService': utilityService,
                'mapService': mapService
            });
        });
    });

    describe('mainController', () => {

        it('should contain the initial data set', () => {
            expect(ctrl.model).toEqual({
                days: { 1:"Today", 3:"3 Days", 5:"5 Days" },
                placeName: 'Amsterdam',
                activeTab: "1",
                mapSelector: '.googlemap'
            });
        });

        it('should make a call to getWeatherData', () => {
            ctrl.$onInit();
            expect(ctrl.model.places[placeName].length).toEqual(5);
        });

        it('should make calls to utilityService.createPlacesIndex', () => {
            spyOn(utilityService, 'createPlacesIndex');
            ctrl.$onInit();
            expect(utilityService.createPlacesIndex).toHaveBeenCalled();
        });

        it('should call utilityService.groupByPlaceName', () => {
            ctrl.$onInit();
            expect(ctrl.model.placesIndex[0]).toEqual({name: placeName})
        });

        it('should make a call to mapService.initiateMap', () => {
            spyOn(mapService, 'initiateMap');
            ctrl.$onInit();
            expect(mapService.initiateMap).toHaveBeenCalled();
        });

        it('should make a call to showTab function', () => {
            ctrl.$onInit();
            expect(ctrl.model.activeTab).toEqual(1);
            expect(ctrl.model.data[0]).toEqual(placesMock.data[0]);
        });

        it('method showTab should set model values properly', () => {
            ctrl.$onInit();

            ctrl.showTab(3);
            expect(ctrl.model.activeTab).toEqual(3);
            expect(ctrl.model.data.length).toEqual(3);
        })
    });

    describe('utilityService', () => {
        it('method groupByPlaceName should regroup data by place_name', () => {
            let grouped = utilityService.groupByPlaceName(placesMock.data);
            expect(Object.keys(grouped)).toEqual([placeName]);
            expect(grouped[placeName].length).toEqual(5);
        });

        it('method createPlacesIndex should create an array with places names', () => {
            let grouped = utilityService.groupByPlaceName(placesMock.data);
            let index = utilityService.createPlacesIndex(grouped);

            expect(index.length).toEqual(1);
            expect(index[0]).toEqual({'name':placeName});
        });
    });

    describe('mapsService', () => {
        it('method initiateMap should call moveMap', () => {
            mapService = mapServiceMock;
            spyOn(mapService, 'moveMap');
            mapService.initiateMap(placesMock.data[0], '.googlemap');
            expect(mapService.moveMap).toHaveBeenCalled();
        });
    });

    describe('dayExtractor filter', () => {
        it('should return correct values', () => {
            let date = '2014-08-10 00:00:00', tab = 3, index = 2;
            expect(filter('dayExtractor')(date, tab, index)).toEqual('Monday');

            date = '2014-08-09 00:00:00', tab = 3, index = 1;
            expect(filter('dayExtractor')(date, tab, index)).toEqual('Tomorrow');
        });
    });

    describe('classModifier filter', () => {
        it('should return correct values', () => {
            let tab = 3, index = 0;
            expect(filter('classModifier')(tab, index)).toEqual(' col-lg-4 col-md-4 col-sm-4 air');

            tab = 5, index = 0;
            expect(filter('classModifier')(tab, index)).toEqual('col-sm-offset-1 col-lg-2 col-md-2 col-sm-2 air');
        });
    });

    describe('weatherOracul filter', () => {
        it('should return correct values', () => {
            let prob = 91;
            expect(filter('weatherOracul')(prob)).toEqual('rain cold');

            prob = 80;
            expect(filter('weatherOracul')(prob)).toEqual('day-rain ');

            prob = 69;
            expect(filter('weatherOracul')(prob)).toEqual('day-sunny hot');
        });
    });
});