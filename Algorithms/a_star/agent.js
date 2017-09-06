"use strict";

const MOVEMENT_STOPPED = 'movement stopped';
const MOVEMENT_MOVING = 'movement moving';
const MOVEMENT_FOWARD_ROUTE = 'movement foward route';
const MOVEMENT_BACKWARDS_ROUTE = 'movement backwards route';

const DIRECTION_SOUTH = 'direction south';
const DIRECTION_SOUTHWEST = 'direction southwest';
const DIRECTION_WEST = 'direction west';
const DIRECTION_NORTHWEST = 'direction northwest';
const DIRECTION_NORTH = 'direction north';
const DIRECTION_NORTHEAST = 'direction northeast';
const DIRECTION_EAST = 'direction east';
const DIRECTION_SOUTHEAST = 'direction southeast';

class Agent {
    constructor(worldMap) {
        this.currentSpot = new Spot(0, 0);

        this.fuelLevel = 100;
        this.garbageCapacity = 100;

        this.currentDirection = DIRECTION_SOUTH;
        this.movementStatus = MOVEMENT_STOPPED;

        this.map = worldMap;
        this.worldSize = this.map[0].length;

        this.routeStep = 0;
    }

    act(state) {
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
        else if (this.collisionAhead()) {
            action = this.generateRouteToNextAvailableSpot()
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
        this.moveOneSpot(this.currentDirection);

        // mark current spot as visited on the agent's map
        this.map[this.currentSpot.x][this.currentSpot.y].isVisited = true;

        return new Action(this.currentSpot.x, this.currentSpot.y, STATUS_MOVED);
    }

    routeStepFoward() {
        this.routeStep++;
        let status = MOVEMENT_FOWARD_ROUTE;
        
        if (this.routeStep === this.route.length) {
            status = STATUS_NO_CHANGES;
        } else {
            const nextSpot = this.route[this.routeStep];
            const neighbours = this.getNeighbours(this.currentSpot);
            const nextDirection = Object.keys(neighbours).find(key => neighbours[key].x === nextSpot.x && neighbours[key].y === nextSpot.y);
            this.moveOneSpot(nextDirection);
        }

        return new Action(this.currentSpot.x, this.currentSpot.y, status);
    }

    routeStepBackward() {
        // TODO
    }

    generateRouteToNextAvailableSpot() {
        let destination;
        switch (this.currentDirection) {
            case DIRECTION_NORTH:
                for (let y = this.currentSpot.y - 1; y > 0; y--) {
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

    /********************* HELPERS *********************/

    startMoving() {
        this.movementStatus = MOVEMENT_MOVING;
    }

    moveOneSpot(direction) {
        // TODO - missing other directions

        switch (this.currentDirection) {
            case DIRECTION_SOUTH:
                if (this.currentSpot.y === this.worldSize - 1) {
                    this.currentDirection = DIRECTION_NORTH;
                    this.currentSpot.x++;
                } else {
                    this.currentSpot.y++;
                }
                break;

            case DIRECTION_NORTH:
                if (this.currentSpot.y === 0) {
                    this.currentDirection = DIRECTION_SOUTH;
                    this.currentSpot.x++;
                } else {
                    this.currentSpot.y--;
                }
                break;
        }
    }

    isWholeWorldVisited() {
        let clearedSpots = 0;

        for (let x = 0; x < this.worldSize; x++) {
            for (let y = 0; y < this.worldSize; y++) {
                if (this.map[x][y].isVisited) {
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

    // Returns boolean if next spot is an obstacle (does not consider the edges as obstacles)
    collisionAhead() {
        const neighbours = this.getNeighbours(this.currentSpot);

        switch (this.currentDirection) {
            case DIRECTION_NORTH:
                if (neighbours.north) {
                    return (neighbours.north.content === WALL) || (neighbours.north.content === FUEL_STATION) || (neighbours.north.content === GARBAGE_CAN);
                }
                break;

            case DIRECTION_SOUTH:
                if (neighbours.south) {
                    return (neighbours.south.content === WALL) || (neighbours.south.content === FUEL_STATION) || (neighbours.south.content === GARBAGE_CAN);
                }
                break;
        }

        return false;
    }

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
                current = current.parent;
                totalPath.unshift(current);
            }

            return totalPath;
        }
    }
}