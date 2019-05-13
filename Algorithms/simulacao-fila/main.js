const ARRIVAL = 'CHEGADA';
const DEPARTURE = 'SAÍDA';
const TRANSFER = 'TRANSFERENCIA';

function openQueueStats(evt, cityName) {
  var i, tabcontent, tablinks;

  // get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}

function runSimulation() {
  // parameters
  const serverQuantity = 2;
  const capacity = 3;
  const lambdaMin = 2;
  const lambdaMax = 3;
  const miMin = 2;
  const miMax = 5;

  // stop condition
  let eventCount = 1;
  const eventLimit = 30;

  // queue configuration
  const queue1 = new Queue(1, serverQuantity, capacity, lambdaMin, lambdaMax, miMin, miMax);
  const queue2 = new Queue(2, 1, 3, 2, 5, 3, 5);
  const queue3 = new Queue(3, 1, 3, 2, 5, 3, 5);
  const queue4 = new Queue(4, 1, 3, 2, 5, 3, 5);
  const queue5 = new Queue(5, 1, 3, 2, 5, 3, 5);

  // connection config
  queue1.setConnections({ nextQueue: queue2, probability: 1 });
  queue2.setConnections({ previousQueue: queue1, nextQueue: queue3 })
  queue3.setConnections({ previousQueue: queue2, nextQueue: queue4 })
  queue4.setConnections({ previousQueue: queue3, nextQueue: queue5 })
  queue5.setConnections({ previousQueue: queue4, })
  
  // initial event
  const initialEvent = new Event(ARRIVAL, `${ARRIVAL} 1`, null, 2.5000000000000000);
  queue1.scheduleEvent(initialEvent);

  do {
    queue1.runEvent();
    queue2.runEvent();
    queue3.runEvent();
    queue4.runEvent();
    queue5.runEvent();
    eventCount++;
  } while (eventCount <= eventLimit)

  queue1.generateResults();
  queue2.generateResults();
  queue3.generateResults();
  queue4.generateResults();
  queue5.generateResults();
}