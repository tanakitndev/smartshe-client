import * as c from '../constants';

// {
//     id: '',
//     location: '',
//     lat: '',
//     lng: ''
// }
const markersReducer = (state = [], action) => {
    switch (action.type) {
        case c.SET_MARKER_DATA:
            return state = state.concat({
                ...action.payload
            });
        default:
            return state;
    }
}

export default markersReducer;