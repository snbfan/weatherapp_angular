export const httpServiceMock = (placesMock) => {
    return (params) => {
        return {
            then: (success, error) => {
                success(placesMock);
            }
        }
    }
};

export const mapServiceMock = {
    initiateMap: function(param1, param2) { this.moveMap(); },
    moveMap: (param1) => { return true; }
};

export const utilityServiceMock = {
    groupByPlaceName: (param1) => { return true; },
    createPlacesIndex: (param1) => { return true; }
};

export const mapsMock = () => {
    return {
        maps: {
            Map: (param1, param2) => {
                return {
                    setOptions: () => {},
                    setCenter: () => {},
                    addListener: () => {}
                };
            },
            Marker: () => {
                return {
                    addListener: () => {}
                }
            }
        }
    }
};
