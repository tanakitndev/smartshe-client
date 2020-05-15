import * as c from '../constants';

const tempsReducer = (state = [], action) => {
    switch (action.type) {
        case c.SET_TEMP_DATA:
            return {
                ...state,
                data: action.payload
            }
        default:
            return state
    }
}

export default tempsReducer;