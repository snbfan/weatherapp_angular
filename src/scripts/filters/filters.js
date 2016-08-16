/**
 * @description
 * Decides on a whole-day weather based on precipitation probability
 *
 * @param {String} prob Precipitation probability, percents
 * @returns {String} wi library class name
 */
export const weatherOracul = () => {
    return (prob) => {
        let icon = 'day-rain', color = '';

        if (prob >= 90) {
            icon = 'rain';
            color = 'cold';
        } else if (prob < 70) {
            icon = 'day-sunny';
            color = 'hot';
        }

        return `${icon} ${color}`;
    }
};

/**
 * @description
 * Filter for transforming raw date value into "Monday|Today|Aug 8th" format
 *
 * @param {String} value Raw date value
 * @returns {Function}
 */
export const dayExtractor = () => {
    return (value, tab, index) => {
        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        let result = '', date = new Date(value),
            monthAndDate = `${months[date.getMonth()]} ${date.getDate()}th`;

        switch (index) {
            case 0:
                result = 'Today';
            break;
            case 1:
                result = (tab === 3) ? 'Tomorrow' : monthAndDate ;
            break;
            default:
                result = (tab === 3) ? (days[date.getDay()] || days[0]) : monthAndDate;
            break;
        }

        return result;
    }
};

/**
 * @description
 * Custom filter which decides on column width
 *
 * @param {Integer} tab Tab number
 * @returns {Function}
 */
export const classModifier = () => {
    return (tab, index) => {
        let width = 4, offset = '';

        // 5-days tab
        if (parseInt(tab) === 5) {
            width = 2;
            offset = (!index) ? 'col-sm-offset-1' : '';
        }

        return `${offset} col-lg-${width} col-md-${width} col-sm-${width} air`;
    }
};




