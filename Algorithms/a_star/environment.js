"use strict";

const TILE_WIDTH = 32;
const TILE_HEIGHT = 32;

class Environment {
    constructor(spritesheet, canvasElement, worldSize, garbagePercentage, fuelStationQuantity, agentInitialPosition) {
        // the world grid -- each number stored in this array will represent the index of the spritesheet tile in use at that particular location
        this.world = [[]];
        this.worldSize = worldSize;

        // canvas and its 2D context
        this.canvas = canvasElement;
        this.canvas.width = this.worldSize * TILE_WIDTH;
        this.canvas.height = this.worldSize * TILE_HEIGHT;
        this.ctx = this.canvas.getContext("2d");

        // an image containing all sprites
        this.spritesheet = spritesheet;
        this.previousAgentPosition = { x: 0, y: 0 };

        this.createWorld();
        this.redraw();
    }

    createWorld() {
        // initialize with grass
        for (var x = 0; x < this.worldSize; x++) {
            this.world[x] = [];

            for (var y = 0; y < this.worldSize; y++) {
                this.world[x][y] = GRASS;
            }
        }

        // walls
        /*
        const xLimit = Math.ceil(0.125 * this.worldSize);
        const yLimit = Math.ceil(0.125 * this.worldSize);

        // vertical (left and right)
        for (var y = yLimit; y < this.worldSize - yLimit; y++) {
            this.world[xLimit][y] = WALL;
            this.world[this.worldSize - (xLimit + 1)][y] = WALL;
        }

        // horizontal (left)
        this.world[xLimit - 1][yLimit] = WALL;
        this.world[xLimit - 1][this.worldSize - yLimit - 1] = WALL;

        // horizontal (right)
        this.world[this.worldSize - xLimit][yLimit] = WALL;
        this.world[this.worldSize - xLimit][this.worldSize - yLimit - 1] = WALL;

        */

        this.worldInfo = {
            size: this.worldSize - 1,
            map: this.world
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

    getCurrentState(agentPosition) {
        const neighbours = this.getNeighbours(agentPosition);

        return {
            isDirty: false,
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
        const newAgentPositionX = action.positionX;
        const newAgentPositionY = action.positionY;

        this.world[this.previousAgentPosition.x][this.previousAgentPosition.y] = GRASS;
        this.world[newAgentPositionX][newAgentPositionY] = AGENT;
        this.previousAgentPosition = { x: newAgentPositionX, y: newAgentPositionY };

        this.redraw();
    }
}