import * as c from '../constants';

export const setTempData = (data) => ({
    type: c.SET_TEMP_DATA,
    payload: data
});

// Alarm
export const setAlarmData = (data) => ({
    type: c.SET_ALARM,
    payload: data
});

export const clearAlarmData = () => ({
    type: c.CLEAR_ALARM
});

export const toggleVisibleAlarms = () => ({
    type: c.TOGGLE_VISIBLE_ALARM
});

export const setVisibleAlarms = (visibleData) => ({
    type: c.SET_VISIBLE_ALARM,
    payload: visibleData
});

export const setInVisibleAlarms = () => ({
    type: c.SET_INVISIBLE_ALARM
});

export const setMarkers = (marker) => ({
    type: c.SET_MARKER_DATA,
    payload: marker
});
