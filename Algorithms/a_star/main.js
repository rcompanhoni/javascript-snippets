"use strict";

const COVERED_ALL_MAP = "covered all map";

// types of terrain
const GRASS = 0;
const WALL = 1;
const AGENT = 4;
      
function runSimulation() {
    // environment
    const worldCanvas = document.getElementById('world-canvas');
    const worldSize = Number(document.getElementById('world-size').value);
    const garbagePercentage = Number(document.getElementById('garbage-percentage').value);
    const fuelStationQuantity = Number(document.getElementById('fuel-station-quantity').value);
    const environment = new Environment(worldCanvas, worldSize, garbagePercentage, fuelStationQuantity);

    // agent
    const agent = new Agent();

    const refreshId = setInterval(function () {
        // agent reacts to the environment
        const currentState = environment.getCurrentState(agent.position)
        const actionResult = agent.act(currentState);

        // actions are applied to the environment
        environment.updateAgentPosition(agent.position);
        environment.applyAgentAction(actionResult);

        // if the whole map was covered then the simulation ends
        if (actionResult === COVERED_ALL_MAP) {
            clearInterval(refreshId);
        }
    }, 2000);
}