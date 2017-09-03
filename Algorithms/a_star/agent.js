/***** this A-star implementation expects the world array to be square: it must have equal height and width. *****/

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

const SPOT_CLEARED          = -1;

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
        if (state.hasFuelStation && this.fuelLevel < 100) {
            // TODO: refuel
        } 
        else if (state.hasGarbageCan && this.garbageCapacity < 100) {
            // TODO: unloadGarbage
        }
        else if (state.isDirty) {
            // TODO: clean
        } 
        else {
            return this.move(state);
        }
    }

    move(state) {
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
        
        // mark current spot as cleared and check if the whole map is cleared
        this.map[this.position.x][this.position.y] = SPOT_CLEARED;
        const isWorldCleared = this.isWorldCleared();

        if (isWorldCleared) {
            this.movementStatus = STOPPED;
        } 
        
        return {
            isWorldCleared: isWorldCleared, 
            positionX: this.position.x,
            positionY: this.position.y
        }
    }

    isWorldCleared() {
        let clearedSpots = 0;
        for(let x = 0; x < this.worldSize; x++) {
            for(let y = 0; y < this.worldSize; y++) {
                if (this.map[x][y] == SPOT_CLEARED) {
                    clearedSpots++;
                } else {
                    return false;
                }
            }
        }

        return clearedSpots === Math.pow(this.worldSize, 2);
    }
}