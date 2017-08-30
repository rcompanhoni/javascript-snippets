"use strict";

const TILE_WIDTH = 32;
const TILE_HEIGHT = 32;

class Environment {
    constructor(canvasElement, worldSize, garbagePercentage, fuelStationQuantity) {
        // the world grid -- each number stored in this array will represent the index of the spritesheet tile in use at that particular location
        this.world = [[]];
        this.worldSize = worldSize;

        // canvas and its 2D context
        this.canvas = canvasElement;
        this.canvas.width = this.worldSize * TILE_WIDTH;
        this.canvas.height = this.worldSize * TILE_HEIGHT;
        this.ctx = this.canvas.getContext("2d");

        // an image containing all sprites
        this.spritesheet = new Image();
        this.spritesheet.src = './spritesheet.png';
        this.spritesheet.onload = this.createWorld.bind(this);
    }

    createWorld() {
        // initialize with grass
        for (var x = 0; x < this.worldSize; x++) {
            this.world[x] = [];

            for (var y = 0; y < this.worldSize; y++) {
                this.world[x][y] = 0;
            }
        }

        // walls
        const xLimit = Math.ceil(0.125 * this.worldSize);
        const yLimit = Math.ceil(0.125 * this.worldSize);

        // vertical (left and right)
        for (var y = yLimit; y < this.worldSize - yLimit; y++) {
            this.world[xLimit][y] = 1;
            this.world[this.worldSize - (xLimit + 1)][y] = 1;
        }

        // horizontal (left)
        this.world[xLimit - 1][yLimit] = 1;
        this.world[xLimit - 1][this.worldSize - yLimit - 1] = 1;

        // horizontal (right)
        this.world[this.worldSize - xLimit][yLimit] = 1;
        this.world[this.worldSize - xLimit][this.worldSize - yLimit - 1] = 1;

        this.redraw();
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
        return {
            // TODO - state needed for agent to decide next action
        }
    }
}