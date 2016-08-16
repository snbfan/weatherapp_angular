export default function UtilityService() {
    return {
        /**
         * @description
         * Regroups raw places array by place name
         *
         * @param data
         * @returns {Array|Object}
         */
        groupByPlaceName: (data) => {
            let places = {};
            data.forEach((item) => {
                places[item.place_name] = places[item.place_name] || [];
                places[item.place_name].push(item);
            });
            return places;
        },

        /**
         * @description
         * Creates places index [{name:%place_name%}, ...]
         * for autocomplete usage
         *
         * @param places
         * @returns {Array}
         */
        createPlacesIndex: (places) => {
            let keys = Object.keys(places);
            keys.map((item, index) => keys[index] = {name: item});
            return keys;
        }
    }
}