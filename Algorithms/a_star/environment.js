"use strict";

const TILE_WIDTH = 32,
      TILE_HEIGHT = 32;

class Environment {
    constructor(canvasElement, worldWidth, worldHeight) {
        // the world grid: a 2d array of tiles
        this.world = [[]];

        // canvas and its context
        this.canvas = canvasElement;
        this.canvas.width = worldWidth * TILE_WIDTH;
        this.canvas.height = worldHeight * TILE_HEIGHT;
        this.ctx = this.canvas.getContext("2d");

        // an image containing all sprites
        this.spritesheet = new Image();
        this.spritesheet.src = './spritesheet.png';
        this.spritesheet.onload = onload;
    }

    onload() {
        alert("LOADED");
    }
}