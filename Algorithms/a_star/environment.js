"use strict";

// types of terrain
const GRASS = 0;
const WALL = 1;
const GARBAGE = 2;
const FUEL_STATION = 3;
const AGENT = 4;
const GARBAGE_CAN = 5;

class Environment {
    constructor(spritesheet, canvasElement, agentCanvasElement, worldSize, garbagePercentage, fuelStationQuantity, garbageCanQuantity) {
        // the world grid -- each number stored in this array will represent the index of the spritesheet tile in use at that particular location
        this.world = [[]];
        this.worldSize = worldSize;

        // world canvas
        this.canvas = canvasElement;
        this.canvas.width = this.worldSize * TILE_WIDTH;
        this.canvas.height = this.worldSize * TILE_HEIGHT;
        this.ctx = this.canvas.getContext("2d");

        // agent canvas
        this.agentCanvas = agentCanvasElement;
        this.agentCanvas.width = this.worldSize * TILE_WIDTH;
        this.agentCanvas.height = this.worldSize * TILE_HEIGHT;
        this.agentCtx = this.agentCanvas.getContext("2d");

        this.spritesheet = spritesheet;

        this.createWorld(garbagePercentage, fuelStationQuantity, garbageCanQuantity);
        this.redraw();
    }

    createWorld(garbagePercentage, fuelStationQuantity, garbageCanQuantity) { 
        
        /******** grass ********/

        for (var x = 0; x < this.worldSize; x++) {
            this.world[x] = new Array(this.worldSize).fill(GRASS);
        }

        /******** walls ********/

        const xLimit = Math.ceil(0.125 * this.worldSize);
        const yLimit = Math.ceil(0.125 * this.worldSize);

        // vertical (left and right)
        for (var y = yLimit; y < this.worldSize - yLimit; y++) {
            this.world[xLimit][y] = WALL;
            this.world[this.worldSize - (xLimit + 1)][y] = WALL;
        }

        // horizontal left (top and bottom)
        this.world[xLimit - 1][yLimit] = WALL;
        this.world[xLimit - 1][this.worldSize - yLimit - 1] = WALL;

        // horizontal right (top and bottom)
        this.world[this.worldSize - xLimit][yLimit] = WALL;
        this.world[this.worldSize - xLimit][this.worldSize - yLimit - 1] = WALL;

        /******** garbage ********/

        let targetGarbageAmount = Math.floor((garbagePercentage / 100) * Math.pow(this.worldSize, 2));
        while (targetGarbageAmount > 0) {
            const randomX = Math.floor(Math.random() * this.worldSize);
            const randomY = Math.floor(Math.random() * this.worldSize);

            if (this.world[randomX][randomY] === GRASS) {
                this.world[randomX][randomY] = GARBAGE;
                targetGarbageAmount--;
            }
        }

        /******** fuelStation ********/

        while (fuelStationQuantity > 0) {
            const randomX = Math.floor(Math.random() * this.worldSize);
            const randomY = Math.floor(Math.random() * this.worldSize);

            if (this.world[randomX][randomY] === GRASS) {
                this.world[randomX][randomY] = FUEL_STATION;
                fuelStationQuantity--;
            }
        }

        /******** garbageCan ********/

        while (garbageCanQuantity > 0) {
            const randomX = Math.floor(Math.random() * this.worldSize);
            const randomY = Math.floor(Math.random() * this.worldSize);

            if (this.world[randomX][randomY] === GRASS) {
                this.world[randomX][randomY] = GARBAGE_CAN;
                garbageCanQuantity--;
            }
        }
    }

    redraw() {
        // clear the screen
        this.ctx.fillStyle = '#000000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        for (var x = 0; x < this.worldSize; x++) {
            for (var y = 0; y < this.worldSize; y++) {
                const spriteNum = this.world[x][y];

                // draw it
                this.ctx.drawImage(
                    this.spritesheet,           // img 
                    spriteNum * TILE_WIDTH,     // x (img) clip start
                    0,                          // y (img) clip start
                    TILE_WIDTH,                 // clipped width
                    TILE_HEIGHT,                // clipped height
                    x * TILE_WIDTH,             // canvas x to place image
                    y * TILE_HEIGHT,            // canvas y to place image
                    TILE_WIDTH,                 // image width
                    TILE_HEIGHT);               // image height
            }
        }
    }

    redrawAgent(positionX, positionY) {
        this.agentCtx.clearRect(0, 0, this.agentCanvas.width, this.agentCanvas.height);

        this.agentCtx.drawImage(
            this.spritesheet,           // img 
            AGENT * TILE_WIDTH,         // x (img) clip start
            0,                          // y (img) clip start
            TILE_WIDTH,                 // clipped width
            TILE_HEIGHT,                // clipped height
            positionX * TILE_WIDTH,     // canvas x to place image
            positionY * TILE_HEIGHT,    // canvas y to place image
            TILE_WIDTH,                 // image width
            TILE_HEIGHT);               // image height
    }

    getMap() {
        let worldMap = [];
        worldMap = this.world.map(function(worldRow) {
            return worldRow.slice();
        });

        return worldMap;
    }

    getState(position) {
        const neighbours = this.getNeighbours(position);

        return {
            content: this.world[position.x][position.y],
            hasFuelStation: false,
            hasGarbageCan: false,
            neighbours: neighbours
        };
    }

    getNeighbours(position) {
        let x = position.x;
        let y = position.y;

        return {
            west:       x >= 0                          ? this.world[x][y - 1]      : undefined,
            northWest:  (x - 1) >= 0                    ? this.world[x - 1][y - 1]  : undefined,
            north:      (x - 1) >= 0                    ? this.world[x - 1][y]      : undefined,
            northEast:  (x - 1) >= 0                    ? this.world[x - 1][y + 1]  : undefined,
            east:       x >= 0                          ? this.world[x][y + 1]      : undefined,
            southEast:  (x + 1) < this.worldSize        ? this.world[x + 1][y + 1]  : undefined,
            south:      (x + 1) < this.worldSize        ? this.world[x + 1][y]      : undefined,
            southWest:  (x + 1) < this.worldSize        ? this.world[x + 1][y - 1]  : undefined
        };
    }

    applyAgentAction(action) {
        switch(action.status) {
            case STATUS_SPOT_CLEARED:
                this.world[action.positionX][action.positionY] = GRASS;
                this.redraw();
                break;

            case STATUS_STOPPED:
                // TODO
                break;

            case STATUS_MOVED:
                // TODO
                break;
        }

        this.redrawAgent(action.positionX, action.positionY);
    }
}