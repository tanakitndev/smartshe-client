import * as c from '../constants';

const alarmsReducer = (state = [], action) => {
    switch (action.type) {
        case c.SET_ALARM:
            return state = action.payload;
        case c.CLEAR_ALARM:
            return state = [];
        default:
            return state;
    }
}

export default alarmsReducer;