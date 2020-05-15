import * as c from '../constants';

const sensorDataReducer = (state = [], action) => {
    switch (action.type) {
        case c.SET_SENSOR_DATA:
            return state = action.payload;
        default:
            return state;
    }
}

export default sensorDataReducer;