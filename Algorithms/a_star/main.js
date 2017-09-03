"use strict";

const COVERED_ALL_MAP = "covered all map";

// types of terrain
const GRASS = 0;
const WALL = 1;
const AGENT = 4;
      
function runSimulation() {
    
    const worldCanvas = document.getElementById('world-canvas');
    const worldSize = Number(document.getElementById('world-size').value);
    const garbagePercentage = Number(document.getElementById('garbage-percentage').value);
    const fuelStationQuantity = Number(document.getElementById('fuel-station-quantity').value);

    let spritesheet = new Image();
    spritesheet.src = './spritesheet.png';
    spritesheet.onload = function() {
        const environment = new Environment(this, worldCanvas, worldSize, garbagePercentage, fuelStationQuantity);
        const agent = new Agent(environment.worldInfo);
    
        const refreshId = setInterval(function () {
            // agent reacts to the environment
            const currentState = environment.getCurrentState(agent.position)
            const actionResult = agent.act(currentState);
    
            // actions are applied to the environment
            environment.applyAgentAction(actionResult);
    
            // if the whole map was covered then the simulation ends
            if (actionResult === COVERED_ALL_MAP) {
                clearInterval(refreshId);
            }
        }, 50);
    } 
}