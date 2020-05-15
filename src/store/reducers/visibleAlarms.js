import * as c from '../constants';

const visibleAlarmsReducer = (state = false, action) => {
    switch (action.type) {
        case c.TOGGLE_VISIBLE_ALARM:
            return state = !state;
        case c.SET_VISIBLE_ALARM:
            return state = action.payload;
        case c.SET_INVISIBLE_ALARM:
            return state = false;
        default:
            return state;
    }
}

export default visibleAlarmsReducer;