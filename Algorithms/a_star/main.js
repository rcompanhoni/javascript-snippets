"use strict";

const SIMULATION_SPEED = 100;
const COVERED_ALL_MAP = "covered all map";

let environment;
let agent;

function runSimulation() {
    const worldCanvas = document.getElementById('world-canvas');
    const worldSize = Number(document.getElementById('world-size').value);
    const garbagePercentage = Number(document.getElementById('garbage-percentage').value);
    const fuelStationQuantity = Number(document.getElementById('fuel-station-quantity').value);

    let spritesheet = new Image();
    spritesheet.src = './spritesheet.png';
    spritesheet.onload = function() {
        environment = new Environment(this, worldCanvas, worldSize, garbagePercentage, fuelStationQuantity);
        agent = new Agent(environment.getMap());
        environment.drawAgent(agent.position);

        // agent acts on initial spot and starts moving
        agentEnvironmentInteraction();
        agent.setMovement(MOVING);

        const refreshId = setInterval(function () {
            const actionResult = agentEnvironmentInteraction();
    
            // if the whole map was covered then the simulation ends
            if (actionResult.isWorldCleared) {
                clearInterval(refreshId);
                alert("FIM DA SIMULAÇÃO.");
            }
        }, SIMULATION_SPEED);
    } 
}

// agent reacts to the environment -- its actions are then applied to the environment
function agentEnvironmentInteraction() {
    const currentState = environment.getCurrentState(agent.position)
    const actionResult = agent.act(currentState);
    environment.applyAgentAction(actionResult);

    return actionResult;
}

