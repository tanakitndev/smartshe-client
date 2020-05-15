import * as c from '../constants';

const sensorDataNowReducer = (state = [], action) => {
    switch (action.type) {
        case c.SET_SENSOR_DATA_NOW:
            return state = action.payload;
        default:
            return state;
    }
}

export default sensorDataNowReducer;