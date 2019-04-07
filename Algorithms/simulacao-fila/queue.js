class Queue {
  constructor(serverQuantity, capacity, lambdaMin, lambdaMax, miMin, miMax) {
    this.schedule = [];

    // parameters
    this.serverQuantity = serverQuantity;
    this.capacity = capacity;
    this.lambdaMin = lambdaMin;
    this.lambdaMax = lambdaMax;
    this.miMin = miMin;
    this.miMax = miMax;

    // state
    this.currentEvent = null;
    this.previousEvent = null;
    this.eventCount = 0;
    this.occupancy = 0;
    
    this.probabilities = {};
    for (let i = 0; i <= capacity; i++) {
      this.probabilities[i] = 0
    }

    this.generateHeader();

    // example from class 1/3
    this.fakeTimes = [0.1195, 0.3491, 0.9832, 0.7731, 0.8935, 0.2103, 0.0392, 0.1782];
  }

  // execute iteration (generates )
  runEvent() {
    if (this.schedule.length == 0) {
      this.scheduleArrival();
    } else {
      this.previousEvent = this.currentEvent;
      this.currentEvent = this.schedule.shift();
  
      switch(this.currentEvent.type) {
        case ARRIVAL:
          this.evaluateProbabilities();
          if (this.occupancy < this.capacity) {
            this.occupancy++;

            if (this.occupancy <= this.serverQuantity) {
              this.scheduleDeparture();
            }
  
            this.scheduleArrival();
          }
          break;
  
        case DEPARTURE:
          this.evaluateProbabilities();
          this.occupancy--;

          if (this.occupancy >= this.serverQuantity) {
            this.scheduleDeparture();
          }
          break;
      }
      
     
      this.updateStateTable();
    }
  }

  // increment counters and add event to schedule array ordered by descending real time
  scheduleEvent(event) {
    this.eventCount++;

    // schedule
    this.schedule.push(event);
    this.schedule.sort((a, b) => {
      if (a.realTime < b.realTime) {
        return -1;
      }
  
      if (a.realTime > b.realTime) {
        return 1;
      }
  
      return 0;
    });
  }  
  
  // increments info about changes in state along time which will be used in the results table at the end of the simulation
  evaluateProbabilities() {
    this.probabilities[this.occupancy] +=  this.currentEvent.realTime - (this.previousEvent ? this.previousEvent.realTime : 0);
  }

  // helper: uses linear congruential method -- with variables from 'Numerical Recipes' -- adjusted for values between min and max
  conversion(min, max) {
    // const randomNumber = this.fakeTimes.shift();

    let m = Math.pow(2, 32);
    let a = 1664525;
    let c = 1013904223;
    let z = Date.now();
    let randomNumber = (a * z + c) % m;
    randomNumber = randomNumber/m;

    return ((max - min) * randomNumber) + min;
  }

  // helper: assemble a departure event and adds it to the schedule array
  scheduleDeparture() {
    const name = `${DEPARTURE} ${this.eventCount + 1}`;
    const raffledTime =  this.conversion(this.miMin, this.miMax);
    const realTime = this.currentEvent.realTime + raffledTime;
    const departureEvent = new Event(DEPARTURE, name, raffledTime, realTime);
    this.scheduleEvent(departureEvent);
  }

  // helper: assemble an arrival event and adds it to the schedule array
  scheduleArrival() {
    const name = `${ARRIVAL} ${this.eventCount + 1}`;
    const raffledTime =  this.conversion(this.lambdaMin, this.lambdaMax);
    const realTime = this.currentEvent.realTime + raffledTime;
    const arrivalEvent = new Event(ARRIVAL, name, raffledTime, realTime);
    this.scheduleEvent(arrivalEvent);
  }

  /************* RESULTS OUTUPUT RELATED *************/

  // create the result's table header
  generateHeader() {
    const table = document.getElementById('state-table');
    const newRow = table.insertRow(-1);

    this.addCell(newRow, 0, 'evento');
    this.addCell(newRow, 1, 'fila');
    this.addCell(newRow, 2, 'tempo');
    
    for(let i = 0; i < Object.keys(this.probabilities).length; i++) {
      this.addCell(newRow, i + 3, i);
    }
  }

  // update output results table
  updateStateTable() {    
    const table = document.getElementById('state-table');
    const newRow = table.insertRow(-1);
    
    this.addCell(newRow, 0, this.currentEvent.name);
    this.addCell(newRow, 1, this.occupancy);
    this.addCell(newRow, 2, this.currentEvent.realTime);
    
    for(let i = 0; i < Object.keys(this.probabilities).length; i++) {
      this.addCell(newRow, i + 3, this.probabilities[i]);
    }
  }

  // populates the results table with the probabilities
  generateResults() {
    const table = document.getElementById('results-table');
    const headerRow = table.insertRow(-1);

    this.addCell(headerRow, 0, 'Estado da fila');
    this.addCell(headerRow, 1, 'Tempo (s)');
    this.addCell(headerRow, 2, 'Probabilidade');

    for(let i = 0; i < Object.keys(this.probabilities).length; i++) {
      const resultRow = table.insertRow(-1);
      const probabilityPercentage = (this.probabilities[i]/this.currentEvent.realTime) * 100;
      this.addCell(resultRow, 0, i);
      this.addCell(resultRow, 1, this.probabilities[i]);
      this.addCell(resultRow, 2, `${probabilityPercentage}%`);
    }

    const footerRow = table.insertRow(-1);
    this.addCell(footerRow, 0, 'Total');
    this.addCell(footerRow, 1, this.currentEvent.realTime);
    this.addCell(footerRow, 2, '100%');
  }

  // helper: adds a cell in the results table
  addCell(row, position, content) {
    let cell = row.insertCell(position);
    let cellText = document.createTextNode(content);
    cell.appendChild(cellText);
  }
}