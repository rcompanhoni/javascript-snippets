/***** this A-star implementation expects the world array to be square: it must have equal height and width. *****/

class Agent {
    constructor() {
        this.walkableTiles = [GRASS];
        this.fuelLevel = 100;
        this.garbageCapacity = 100;
        this.position = {
            x: 0,
            y: 0
        };

        // TODO - agent needs the complete map (with walls)?
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
            this.move(state);
        }
    }

    move(state) {
        this.position.x++;

        return 
    }
}