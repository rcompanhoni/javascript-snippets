/***** this A-star implementation expects the world array to be square: it must have equal height and width. *****/

const DIRECTION_SOUTH       = 'direction south';
const DIRECTION_SOUTHWEST   = 'direction southwest';
const DIRECTION_WEST        = 'direction west';
const DIRECTION_NORTHWEST   = 'direction northwest';
const DIRECTION_NORTH       = 'direction north';
const DIRECTION_NORTHEAST   = 'direction northeast';
const DIRECTION_EAST        = 'direction east';
const DIRECTION_SOUTHEAST   = 'direction southeast';

class Agent {
    constructor(worldInfo) {
        this.walkableTiles = [GRASS];
        this.fuelLevel = 100;
        this.garbageCapacity = 100;
        this.position = {
            x: 0,
            y: 0
        };
        this.currentDirection = DIRECTION_SOUTH;
        this.worldInfo = worldInfo;
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
        // TODO -- mark in the map each visited position -- if all visited the simulation is over

        switch(this.currentDirection) {
            case DIRECTION_SOUTH:
                if (this.position.y === this.worldInfo.size) {
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

        return { 
            positionX: this.position.x,
            positionY: this.position.y
        }
    }
}