"use strict";

const MOVEMENT_STOPPED = 'movement stopped';
const MOVEMENT_MOVING = 'movement moving';
const MOVEMENT_FOWARD_ROUTE = 'movement foward route';
const MOVEMENT_BACKWARDS_ROUTE = 'movement backwards route';

const SOUTH = 'south';
const SOUTHWEST = 'southWest';
const WEST = 'west';
const NORTHWEST = 'northWest';
const NORTH = 'north';
const NORTHEAST = 'northEast';
const EAST = 'east';
const SOUTHEAST = 'southEast';

class Agent {
    constructor(worldMap) {
        this.currentSpot = new Spot(0, 0);

        this.fuelLevel = 100;
        this.garbageCapacity = 100;

        this.currentDirection = SOUTH;
        this.movementStatus = MOVEMENT_STOPPED;
        this.previousDirection = null;
        this.mustGoBack = false;

        this.map = worldMap;
        this.worldSize = this.map[0].length;

        this.routeStep = 0;
    }

    act(state) {
        // mark current spot as visited on the agent's map
        this.map[this.currentSpot.x][this.currentSpot.y].isVisited = true;

        this.currentSpot.content = state;
        let action = new Action(this.currentSpot.x, this.currentSpot.y, STATUS_NO_CHANGES);

        if (this.currentSpot.nearFuelStation && this.fuelLevel < 100) {
            // TODO: refuel
        }
        else if (this.currentSpot.nearGarbageCan && this.garbageCapacity < 100) {
            // TODO: unloadGarbage
        }
        else if (this.currentSpot.content === GARBAGE) {
            action = this.clean();
        }
        else if (this.movementStatus === MOVEMENT_FOWARD_ROUTE) {
            action = this.routeStepFoward();
        }
        else if (this.movementStatus === MOVEMENT_FOWARD_ROUTE) {
            action = this.routeStepBackward();
        }
        else if (this.endOfMap()) {
            action = this.swtichDirection();
        }
        else if (this.collisionAhead(this.currentDirection)) {
            action = this.generateRouteToNextAvailableSpot();
        }
        else if (this.movementStatus === MOVEMENT_MOVING) {
            action = this.move();
        }       

        if (this.isWholeWorldVisited()) {
            action.status = STATUS_WORLD_CLEARED;
        }

        return action;
    }

    /********************* STATE HANDLERS *********************/

    clean() {
        return new Action(this.currentSpot.x, this.currentSpot.y, STATUS_SPOT_CLEARED);
    }

    move() {
        this.moveOneSpot();
        return new Action(this.currentSpot.x, this.currentSpot.y, STATUS_MOVED);
    }

    routeStepFoward() {
        this.routeStep++;
        let actionStatus = STATUS_FOWARD_ROUTE;

        if (this.routeStep === this.route.length) {
            if (!this.mustGoBack) {
                this.currentDirection = this.previousDirection;
                this.movementStatus = MOVEMENT_MOVING;
            } else {
                this.movementStatus = MOVEMENT_BACKWARDS_ROUTE;
            }

            this.routeStep = 0;
            actionStatus = STATUS_DESTINATION_REACHED;
        } else {
            const nextSpot = this.route[this.routeStep];
            const neighbours = this.getNeighbours(this.currentSpot);
            this.currentDirection = Object.keys(neighbours).find(key => {
                if (neighbours[key]) {
                    return neighbours[key].x === nextSpot.x && neighbours[key].y === nextSpot.y
                }

                return false;
            });
            this.moveOneSpot();
        }

        return new Action(this.currentSpot.x, this.currentSpot.y, actionStatus);
    }

    routeStepBackward() {
        // TODO
    }

    generateRouteToNextAvailableSpot() {
        let destination;
        switch (this.currentDirection) {
            case NORTH:
                for (let y = this.currentSpot.y - 1; y >= -1; y--) {
                    if (this.map[this.currentSpot.x][y].content === GRASS) {
                        destination = this.map[this.currentSpot.x][y];
                        break;
                    }
                }
                break;

            case EAST:
                let rightX = this.currentSpot.x;
                rightX++;

                for (let y = this.currentSpot.y; y >= -1; y--) {
                    if (this.map[rightX][y].content === GRASS) {
                        destination = this.map[rightX][y];
                        break;
                    }
                }
                break;

            case SOUTH:
                for (let y = this.currentSpot.y + 1; y > 0; y++) {
                    if (this.map[this.currentSpot.x][y].content === GRASS) {
                        destination = this.map[this.currentSpot.x][y];
                        break;
                    }
                }
                break;
        }

        // A*
        this.route = this.findPath(this.map[this.currentSpot.x][this.currentSpot.y], destination);
        this.movementStatus = MOVEMENT_FOWARD_ROUTE;
        return new Action(this.currentSpot.x, this.currentSpot.y, STATUS_ROUTE_DEFINED);
    }

    swtichDirection() {
        if (this.currentDirection === SOUTH) {
            this.currentDirection = NORTH;
        } else if (this.currentDirection === NORTH) {    
            this.currentDirection = SOUTH;
        }

        this.currentSpot.x++;
        return new Action(this.currentSpot.x, this.currentSpot.y, STATUS_MOVED);
    }

    /********************* HELPERS *********************/

    endOfMap() {
        if (this.currentDirection === SOUTH && (this.currentSpot.y + 1) == this.worldSize) {
            return true;
        }

        if (this.currentDirection === NORTH && this.currentSpot.y === 0) {
            return true;
        }

        return false;
    }

    startMoving() {
        this.movementStatus = MOVEMENT_MOVING;
    }

    moveOneSpot() {
        switch (this.currentDirection) {
            case WEST:
                this.currentSpot.x--;
                break;

            case NORTHWEST:
                this.currentSpot.x--;
                this.currentSpot.y--;
                break;

            case NORTH:
                this.currentSpot.y--;
                break;

            case NORTHEAST:
                this.currentSpot.x++;
                this.currentSpot.y--;
                break;

            case EAST:
                this.currentSpot.x++;
                break;

            case SOUTHEAST:
                this.currentSpot.x++;
                this.currentSpot.y++;
                break;

            case SOUTH:
                this.currentSpot.y++;
                break;

            case SOUTHWEST:
                this.currentSpot.x--;
                this.currentSpot.y++;
                break;
        }
    }

    isWholeWorldVisited() {
        let clearedSpots = 0;

        for (let x = 0; x < this.worldSize; x++) {
            for (let y = 0; y < this.worldSize; y++) {
                if (this.map[x][y].isVisited || this.map[x][y].content === WALL || this.map[x][y].content === FUEL_STATION || this.map[x][y].content === GARBAGE_CAN) {
                    clearedSpots++;
                } else {
                    return false;
                }
            }
        }

        return clearedSpots === Math.pow(this.worldSize, 2);
    }

    // returns an object where each key is a direction and each value a Spot object
    getNeighbours(spot) {
        let x = spot.x;
        let y = spot.y;

        // if neighbour is outside the map then returns undefined
        return {
            west: this.map[x - 1] !== undefined ? this.map[x - 1][y] : undefined,
            northWest: this.map[x - 1] !== undefined ? this.map[x - 1][y - 1] : undefined,
            north: this.map[x] !== undefined ? this.map[x][y - 1] : undefined,
            northEast: this.map[x + 1] !== undefined ? this.map[x + 1][y - 1] : undefined,
            east: this.map[x + 1] !== undefined ? this.map[x + 1][y] : undefined,
            southEast: this.map[x + 1] !== undefined ? this.map[x + 1][y + 1] : undefined,
            south: this.map[x] !== undefined ? this.map[x][y + 1] : undefined,
            southWest: this.map[x - 1] !== undefined ? this.map[x - 1][y + 1] : undefined
        };
    }

    // Returns boolean if next spot is an obstacle 
    collisionAhead(direction) {
        this.previousDirection = this.currentDirection;
        this.mustGoBack = false;

        const neighbours = this.getNeighbours(this.currentSpot);

        switch (direction) {
            case NORTH:
                if (!neighbours.north) {
                    return true;
                }

                if (neighbours.north) {
                    return (neighbours.north.content === WALL || neighbours.north.content === FUEL_STATION || neighbours.north.content === GARBAGE_CAN);
                }
                break;

            case SOUTH:
                // map limit
                if (!neighbours.south) {
                    this.currentDirection = EAST;
                    return true;
                }

                if (neighbours.south) {
                    return (neighbours.south.content === WALL || neighbours.south.content === FUEL_STATION || neighbours.south.content === GARBAGE_CAN);
                }
                break;
        }

        return false;
    }

    // A*
    findPath(initialPosition, finalPosition) {
        let openList = [];
        let closedList = [];

        initialPosition.h = distance(initialPosition, finalPosition);
        initialPosition.g = 0;
        initialPosition.f = initialPosition.g + initialPosition.h;

        openList.push(initialPosition);

        while (openList.length > 0) {
            let current = openList.reduce((best, candidate) => {
                return candidate.f < best.f ? candidate : best;
            });

            if (current.x === finalPosition.x && current.y === finalPosition.y) {
                openList.forEach(spot => {
                    delete spot.f;
                    delete spot.g;
                    delete spot.h;
                    
                    if (spot.parent) {
                        delete spot.parent.f;
                        delete spot.parent.g;
                        delete spot.parent.h;
                    }
                });
                
                closedList.forEach(spot => {
                    delete spot.f;
                    delete spot.g;
                    delete spot.h;

                    if (spot.parent) {
                        delete spot.parent.f;
                        delete spot.parent.g;
                        delete spot.parent.h;
                    }
                });

                return reconstructPath(current);
            }

            const currentOpenIndex = openList.findIndex(spot => spot.x === current.x && spot.y === current.y);
            openList.splice(currentOpenIndex, 1);
            closedList.push(current);

            // map Neighbour to a list
            const neighbours = this.getNeighbours(current);
            let neighboursList = Object.keys(neighbours).reduce((neighbourList, direction) => {
                let neighbour = neighbours[direction];
                if (neighbour && neighbour.content === GRASS) {
                    neighbourList.push(neighbour);
                }
                return neighbourList;
            }, []);

            neighboursList.forEach(neighbour => {
                const isClosed = closedList.find(closedPosition => {
                    return (closedPosition.x === neighbour.x) && (closedPosition.y === neighbour.y);
                });

                if (isClosed) {
                    return;
                }

                const isOpen = openList.find(openPosition => {
                    return (openPosition.x === neighbour.x) && (openPosition.y === neighbour.y);
                });

                if (!isOpen) {
                    openList.push(neighbour);
                }

                let g = current.g + distance(current, neighbour);
                let h = distance(neighbour, finalPosition);
                let f = g + h;
                if (f >= neighbour.f) {
                    return;
                }

                if (f < neighbour.f || neighbour.f === undefined) {
                    neighbour.parent = current;
                    neighbour.g = g;
                    neighbour.f = f;
                }
            });
        }

        return [];

        // euclidean
        function distance(initial, final) {
            return Math.max(Math.abs(initial.x - final.x), Math.abs(initial.y - final.y));
        }

        function reconstructPath(current) {
            let totalPath = [current];

            while (current.parent) {
                const parent = current.parent;
                delete current.parent; 
                current = parent;
                totalPath.unshift(current);
            }

            return totalPath;
        }
    }
}