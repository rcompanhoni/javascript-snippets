"use strict";

const SIMULATION_SPEED = 50;

const TILE_WIDTH = 32;
const TILE_HEIGHT = 32;

let statusDisplay;
let environment;
let agent;
let simulationId;

function runSimulation() {
    clearInterval(simulationId);
    if (statusDisplay)
        statusDisplay.clear();

    const worldCanvas = document.getElementById('world-canvas');
    const agentCanvas = document.getElementById('agent-canvas');
    const worldSize = Number(document.getElementById('world-size').value);
    const garbagePercentage = Number(document.getElementById('garbage-percentage').value);
    const fuelStationQuantity = Number(document.getElementById('fuel-station-quantity').value);
    const garbageCanQuantity = Number(document.getElementById('garbage-can-quantity').value);

    // display status textarea
    statusDisplay = new StatusDisplay(worldSize);

    // when spritesheet is loaded then create environment, agent and start simulation
    let spritesheet = new Image();
    spritesheet.src = './spritesheet.png';
    spritesheet.onload = function() {
        environment = new Environment(this, worldCanvas, agentCanvas, worldSize, garbagePercentage, fuelStationQuantity, garbageCanQuantity);
        agent = new Agent(environment.getMap());

        statusDisplay.print("SIMULAÇÃO INICIADA\n");
        
        // agent acts on initial spot and starts moving
        let actionResult = agentEnvironmentInteraction();
        statusDisplay.printStatus(actionResult.status)
        agent.setMovement(MOVING);

        // simulation loop
        simulationId = setInterval(function () {
            actionResult = agentEnvironmentInteraction();
            statusDisplay.printStatus(actionResult.status)

            if (actionResult.isWorldCleared) {
                clearInterval(simulationId);
                statusDisplay.print("\nSIMULAÇÃO TERMINADA.")
            }
        }, SIMULATION_SPEED);
    } 
}

// agent reacts to the environment -- its actions are then applied to the environment
function agentEnvironmentInteraction() {
    const currentState = environment.getState(agent.position)
    const actionResult = agent.act(currentState);
    environment.applyAgentAction(actionResult);
    return actionResult;
}

