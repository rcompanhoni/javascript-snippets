"use strict";

const STOPPED               = 'stopped';
const MOVING                = 'moving';
const ON_ROUTE              = 'on route';

const DIRECTION_SOUTH       = 'direction south';
const DIRECTION_SOUTHWEST   = 'direction southwest';
const DIRECTION_WEST        = 'direction west';
const DIRECTION_NORTHWEST   = 'direction northwest';
const DIRECTION_NORTH       = 'direction north';
const DIRECTION_NORTHEAST   = 'direction northeast';
const DIRECTION_EAST        = 'direction east';
const DIRECTION_SOUTHEAST   = 'direction southeast';

const VISITED               = 'visited';
const CURRENT_POSITION      = 'current position';

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
            const destination = this.findNextAvailableSpot();
            this.route = this.findPath2(this.map[this.position.x][this.position.y], destination);
            this.movementStatus = ON_ROUTE;
        } 
        else {
            return this.move(state);
        }
    }

    /********************* STATE HANDLERS *********************/

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
        this.map[this.position.x][this.position.y].isVisited = true;

        return {
            isWorldCleared: isWholeWorldVisited, 
            positionX: this.position.x,
            positionY: this.position.y,
            status: this.movementStatus === MOVING ? STATUS_MOVED : STATUS_STOPPED
        }
    }

    /********************* HELPERS *********************/

    setMovement(movementStatus) {
        this.movementStatus = movementStatus;
    }

    isWholeWorldVisited() {
        let clearedSpots = 0;

        for(let x = 0; x < this.worldSize; x++) {
            for(let y = 0; y < this.worldSize; y++) {
                if (this.map[x][y].isVisited) {
                    clearedSpots++;
                } else {
                    return false;
                }
            }
        }

        return clearedSpots === Math.pow(this.worldSize, 2);
    }

    getNeighbours(position) {
        let x = position.x;
        let y = position.y;

        // if neighbour is outside the map then returns undefined
        return {
            west:       this.map[x-1]     != undefined    ? this.map[x-1][y]        : undefined,
            northWest:  this.map[x - 1]   != undefined    ? this.map[x - 1][y - 1]  : undefined,
            north:      this.map[x]       != undefined    ? this.map[x][y - 1]      : undefined,
            northEast:  this.map[x + 1]   != undefined    ? this.map[x + 1][y - 1]  : undefined,
            east:       this.map[x + 1]   != undefined    ? this.map[x + 1][y]      : undefined,
            southEast:  this.map[x + 1]   != undefined    ? this.map[x + 1][y + 1]  : undefined,
            south:      this.map[x]       != undefined    ? this.map[x][y + 1]      : undefined,
            southWest:  this.map[x - 1]   != undefined    ? this.map[x - 1][y + 1]  : undefined
        };
    }

    // Returns boolean if next spot is an obstacle (does not consider the edges as obstacles)
    collisionAhead(state) {
        const neighbours = this.getNeighbours(state);

        switch(this.currentDirection) {
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

    findNextAvailableSpot() {
        switch(this.currentDirection) {
            case DIRECTION_NORTH:
                for(let y = this.position.y - 1; y > 0; y--) {
                    if (this.map[this.position.x][y].content === GRASS) {
                        return this.map[this.position.x][y];
                    }
                }
                break;
        }
    }

    findPath(initialPosition, finalPosition) {
        /*
            Initialize open and closed lists // open can be implemented as a priority queue (node with lowest f value)
            Make the start vertex current
            Calculate heuristic distance of start vertex to destination (h)
            Calculate f value for start vertex (f = g + h, where g = 0)

            WHILE current vertex is not the destination
                // updates wach adjacent node with new f values
                FOR each vertex adjacent to current
                    IF vertex not in closed list and not in open list THEN
                        Add vertex to open list
                    END IF
                    
                    Calculate distance from start (g)
                    Calculate heuristic distance to destination (h)
                    Calculate f value (f = g + h)
                    
                    IF new f value < existing f value or there is no existing f value THEN
                        Update f value
                        Set parent to be the current vertex
                    END IF
                NEXT adjacent vertex
                
                Add current vertex to closed list
                Remove vertex with lowest f value from open list and make it current // if there's a tie then choose randomly between the lowest vertex
            END WHILE
        */
        let openList = [];
        let closedList = [];

        let current = initialPosition;
        current.h = distance(initialPosition, finalPosition);
        current.g = 0;
        current.f = current.g + current.h;

        // WHILE current vertex is not the destination
        do {
            const neighbours = this.getNeighbours(current);
            let neighboursList = Object.keys(neighbours).map(direction => neighbours[direction]);
          
            // FOR each vertex adjacent to current
            neighboursList.forEach(neighbour => {
                const openNeighbour = openList.find(openPosition => {
                    return openPosition.x === neighbour.x && openPosition.y === neighbour.x;
                });

                const closedNeighbour = closedList.find(closedPosition => {
                    return closedPosition.x === neighbour.x && closedPosition.y === neighbour.x;
                });

                // IF vertex not in closed list and not in open list THEN
                if (!openNeighbour && !closedNeighbour) {
                    openList.push(neighbour);
                }

                // Calculate distance from start (g)
                neighbour.g = current.g + distance(neighbour, initialPosition);

                // Calculate heuristic distance to destination (h)
                neighbour.h = distance(neighbour, finalPosition);

                // Calculate f value (f = g + h)
                let f = neighbour.g + neighbour.h;

                // IF new f value < existing f value or there is no existing f value THEN
                //     Update f value
                //     Set parent to be the current vertex
                // END IF
                if (f < neighbour.f || neighbour.f === undefined) {
                    neighbour.f = f;
                }
            });

            // Add current vertex to closed list
            closedList.push(current);

            // Remove vertex with lowest f value from open list and make it current -- if there's a tie then choose randomly between the lowest vertex
            current = openList.reduce((best, candidate) => {
                return candidate.f < best.f ? candidate : best;
            });
        } while((current.x !== finalPosition.x) && (current.y !== finalPosition.y))

        // Euclidean, since diagonal movement is allowed
        function distance(initial, final) {
            return Math.max(Math.abs(initial.x - final.x), Math.abs(initial.y - final.y));
        }
    }

    findPath2(initialPosition, finalPosition) {
        let openList = [];
        let closedList = [];

        initialPosition.h = distance(initialPosition, finalPosition);
        initialPosition.g = 0;
        initialPosition.f = initialPosition.g + initialPosition.h;

        openList.push(initialPosition);
        
        while(openList.length > 0) {
            let current = openList.reduce((best, candidate) => {
                return candidate.f < best.f ? candidate : best;
            });

            if (current.x === finalPosition.x && current.y === finalPosition.y) {
                return reconstructPath(); // TODO - reconstruct path
            }

            const currentOpenIndex = openList.findIndex(spot => spot.x === current.x && spot.y === current.y);
            openList.splice(currentOpenIndex, 1);
            closedList.push(current);

            // list of neighbours (add parent to each spot)
            // WRONG -- prevent adding undefined in the neighbourList -- also, prevent adding obstacles
            const neighbours = this.getNeighbours(current);
            let neighboursList = Object.keys(neighbours).map(direction => { 
                let neighbour = neighbours[direction];
                if (neighbour) {
                        neighbour.parent = current;
                        return neighbour;
                }
            });

            neighboursList.forEach(neighbour => {
                const isClosed = closedList.find(closedPosition => {
                    return (closedPosition.x === neighbour.x) && (closedPosition.y === neighbour.y);
                });

                if (isClosed){
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

        function distance(initial, final) {
            return Math.max(Math.abs(initial.x - final.x), Math.abs(initial.y - final.y));
        }

        function reconstructPath(current) {
            let totalPath = [current];

            while(current.parent) {
                current = current.parent;
                totalPath.push(current);
            }

            return totalPath;
        }
    }
}