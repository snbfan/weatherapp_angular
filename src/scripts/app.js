const MODULE_NAME = 'zvrapp';

// styles
import '../static/style/custom.css';
import '../static/style/angucomplete.css';
import '../static/style/weather-icons.min.css';
import '../static/style/bootstrap.min.css';


// angular
import angular from 'angular';
// mocking module to fake the backend response
import ngMockE2E from 'angular-mocks/angular-mocks';
// the mock
import weatherDataMock from './mocks/data.js';

// controller
import mainController from './controllers/main.ctrl.js';

// utilities service
import utilityService from './services/utility.srv.js';
// google maps service
import mapService from './services/googlemaps.srv.js';

// custom filters
import { weatherOracul, dayExtractor, classModifier } from './filters/filters.js';

// the autocomplete
import angucomplete from './modules/angucomplete.js';


angular.module(MODULE_NAME, [ 'ngMockE2E', 'angucomplete' ])
    .controller('mainController', mainController)

    .service('utilityService', utilityService)
    .service('mapService', mapService)

    .filter('dayExtractor', dayExtractor)
    .filter('classModifier', classModifier)
    .filter('weatherOracul', weatherOracul)

    .run(($httpBackend) => {
        // configure reponse mocking
        $httpBackend.whenGET(/weather$/).respond(weatherDataMock);
        $httpBackend.whenGET(/.*/).passThrough();
    });

export default MODULE_NAME;
