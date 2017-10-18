export default function({ dispatch }) {
    return next => action => {
        // is it an action with a Promise payload?
        if (!action.payload || !action.payload.then) {
            return next(action);    
        }

        // make sure the action's promise resolves
        action.payload
            .then(response => {
                // creates a new action but replacing the promise with the resolved data
                const newAction = { ...action, payload: response }
                dispatch(newAction);
            });
    }
}