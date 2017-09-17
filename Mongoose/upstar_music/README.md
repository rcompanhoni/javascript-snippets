# Electron app

From https://github.com/StephenGrider/UpStarMusic.git

An Electron app for display a catalog of artists and albums. THe mongoose queries are in the database/queries folder. Changes required for running on Windows:

* start script: "start electron . && webpack-dev-server"
* changed both ocurrences of 'localhost' for '127.0.0.1' in src/main.js
