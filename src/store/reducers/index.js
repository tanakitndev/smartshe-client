import tempsReducer from './temps';

import { combineReducers } from 'redux'
import alarmsReducer from './alarms';
import visibleAlarmsReducer from './visibleAlarms';
import sensorDataReducer from './sensorData';
import sensorDataNowReducer from './sensorDataNow';
import markersReducer from './markers';
import userReducer from './user.reducer';

const rootReducer = combineReducers({
    temps: tempsReducer,
    alarms: alarmsReducer,
    visibleAlarms: visibleAlarmsReducer,
    sensorData: sensorDataReducer,
    sensorDataNow: sensorDataNowReducer,
    markers: markersReducer,
    user:userReducer
});

export default rootReducer;