export const CREATE_ALERT = 'CREATE_ALERT';
export const CLOSE_ALERT = 'CLOSE_ALERT';
export const SET_OVERLAY = 'SET_OVERLAY';

export function createAlert(alert) {
  return {
    type: CREATE_ALERT,
    payload: alert,
  };
}

export function closeAlert(alertId) {
  return {
    type: CLOSE_ALERT,
    payload: alertId,
  };
}

export function setOverlay(display) {
  return {
    type: SET_OVERLAY,
    payload: display,
  };
}
