"use strict";

function runSimulation() {  
    // environment
    const worldCanvas = document.getElementById('world-canvas');
    const worldSize = Number(document.getElementById('world-size').value);
    const garbagePercentage = Number(document.getElementById('garbage-percentage').value);
    const fuelStationQuantity = Number(document.getElementById('fuel-station-quantity').value);
    const environment = new Environment(worldCanvas, worldSize, garbagePercentage, fuelStationQuantity);

    // agent
    const agent = new Agent();

    // simulation loop -- ends when agent covers all the map
    const refreshId = setInterval(function () {
        const coveredAllMap = agent.act(environment.getCurrentState());
        if (coveredAllMap) {
            clearInterval(refreshId);
        }
    }, 500);
}