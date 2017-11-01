export const CREATE_ALERT = 'CREATE_ALERT';
export const CLOSE_ALERT = 'CLOSE_ALERT';

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
