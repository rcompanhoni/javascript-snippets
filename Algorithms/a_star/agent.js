"use strict";

const STOPPED               = 'stopped';
const MOVING                = 'moving';

const DIRECTION_SOUTH       = 'direction south';
const DIRECTION_SOUTHWEST   = 'direction southwest';
const DIRECTION_WEST        = 'direction west';
const DIRECTION_NORTHWEST   = 'direction northwest';
const DIRECTION_NORTH       = 'direction north';
const DIRECTION_NORTHEAST   = 'direction northeast';
const DIRECTION_EAST        = 'direction east';
const DIRECTION_SOUTHEAST   = 'direction southeast';

const VISITED               = 'visited';

const STATUS_SPOT_CLEARED   = 'status spot cleared';
const STATUS_STOPPED        = 'status stopped'; 
const STATUS_MOVED          = 'status moved'; 

class Agent {
    constructor(worldMap) {
        this.fuelLevel = 100;
        this.garbageCapacity = 100;
        this.currentDirection = DIRECTION_SOUTH;
        this.movementStatus = STOPPED;
        this.position = {
            x: 0,
            y: 0
        };
        
        this.walkableTiles = [GRASS];
        this.map = worldMap;
        this.worldSize = this.map[0].length;
    }

    setMovement(movementStatus) {
        this.movementStatus = movementStatus;
    }

    act(state) {
        if (state.nearFuelStation && this.fuelLevel < 100) {
            // TODO: refuel
        } 
        else if (state.nearGarbageCan && this.garbageCapacity < 100) {
            // TODO: unloadGarbage
        }
        else if (state.content === GARBAGE) {
            return this.clean();
        }
        else if (this.collisionAhead(state)) {
            // TODO - find empty place on the map to continue vertical search
            // TODO - use A* to find best path from current spot to destiny
        } 
        else {
            return this.move(state);
        }
    }

    clean() {
        return {
            isWholeWorldVisited: this.isWholeWorldVisited(), 
            positionX: this.position.x,
            positionY: this.position.y,
            status: STATUS_SPOT_CLEARED
        }
    }

    move(state) {
        const isWholeWorldVisited = this.isWholeWorldVisited();
        let status;

        if (isWholeWorldVisited) {
            this.movementStatus = STOPPED;
            status = STATUS_STOPPED;
        } 

        if (this.movementStatus === MOVING) {
            switch(this.currentDirection) {
                case DIRECTION_SOUTH:
                    if (this.position.y === this.worldSize - 1) {
                        this.currentDirection = DIRECTION_NORTH;
                        this.position.x++;
                    } else {
                        this.position.y++;
                    }
                    break;
    
                case DIRECTION_NORTH:
                    if (this.position.y === 0) {
                        this.currentDirection = DIRECTION_SOUTH;
                        this.position.x++;
                    } else {
                        this.position.y--;
                    }
                    break;
            }
        }
        
        // mark current spot as visited on the agent's map
        this.map[this.position.x][this.position.y] = VISITED;

        return {
            isWorldCleared: isWholeWorldVisited, 
            positionX: this.position.x,
            positionY: this.position.y,
            status: this.movementStatus === MOVING ? STATUS_MOVED : STATUS_STOPPED
        }
    }

    /********************* HELPERS *********************/

    isWholeWorldVisited() {
        let clearedSpots = 0;

        for(let x = 0; x < this.worldSize; x++) {
            for(let y = 0; y < this.worldSize; y++) {
                if (this.map[x][y] == VISITED) {
                    clearedSpots++;
                } else {
                    return false;
                }
            }
        }

        return clearedSpots === Math.pow(this.worldSize, 2);
    }

    collisionAhead(state) {
        switch(this.currentDirection) {
            case DIRECTION_NORTH:
                return (state.neighbours.north === WALL) || (state.neighbours.north === FUEL_STATION) || (state.neighbours.north === GARBAGE_CAN);
                break;

            case DIRECTION_SOUTH:
                return (state.neighbours.south === WALL) || (state.neighbours.south === FUEL_STATION) || (state.neighbours.south === GARBAGE_CAN);
                break;    
        }

        return false;
    }
}