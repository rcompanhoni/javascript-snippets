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
  const serverQuantity01 = parseInt(document.getElementById('server-quantity-01').value);
  const capacity01 = parseInt(document.getElementById('capacity-01').value);
  const lambdaMin01 = parseInt(document.getElementById('lambda-min-01').value);
  const lambdaMax01 = parseInt(document.getElementById('lambda-max-01').value);
  const miMin01 = parseInt(document.getElementById('mi-min-01').value);
  const miMax01 = parseInt(document.getElementById('mi-max-01').value);

  const serverQuantity02 = parseInt(document.getElementById('server-quantity-01').value);
  const capacity02 = parseInt(document.getElementById('capacity-01').value);
  const lambdaMin02 = parseInt(document.getElementById('lambda-min-01').value);
  const lambdaMax02 = parseInt(document.getElementById('lambda-max-01').value);
  const miMin02 = parseInt(document.getElementById('mi-min-01').value);
  const miMax02 = parseInt(document.getElementById('mi-max-01').value);

  const serverQuantity03 = parseInt(document.getElementById('server-quantity-01').value);
  const capacity03 = parseInt(document.getElementById('capacity-01').value);
  const lambdaMin03 = parseInt(document.getElementById('lambda-min-01').value);
  const lambdaMax03 = parseInt(document.getElementById('lambda-max-01').value);
  const miMin03 = parseInt(document.getElementById('mi-min-01').value);
  const miMax03 = parseInt(document.getElementById('mi-max-01').value);

  const serverQuantity04 = parseInt(document.getElementById('server-quantity-01').value);
  const capacity04 = parseInt(document.getElementById('capacity-01').value);
  const lambdaMin04 = parseInt(document.getElementById('lambda-min-01').value);
  const lambdaMax04 = parseInt(document.getElementById('lambda-max-01').value);
  const miMin04 = parseInt(document.getElementById('mi-min-01').value);
  const miMax04 = parseInt(document.getElementById('mi-max-01').value);

  const serverQuantity05 = parseInt(document.getElementById('server-quantity-01').value);
  const capacity05 = parseInt(document.getElementById('capacity-01').value);
  const lambdaMin05 = parseInt(document.getElementById('lambda-min-01').value);
  const lambdaMax05 = parseInt(document.getElementById('lambda-max-01').value);
  const miMin05 = parseInt(document.getElementById('mi-min-01').value);
  const miMax05 = parseInt(document.getElementById('mi-max-01').value);

  // stop condition
  let eventCount = 1;
  const eventLimit = parseInt(document.getElementById('events-amount').value);

  // queue configuration
  const queue1 = new Queue(1, serverQuantity01, capacity01, lambdaMin01, lambdaMax01, miMin01, miMax01);
  const queue2 = new Queue(2, serverQuantity02, capacity02, lambdaMin02, lambdaMax02, miMin02, miMax02);
  const queue3 = new Queue(3, serverQuantity03, capacity03, lambdaMin03, lambdaMax03, miMin03, miMax03);
  const queue4 = new Queue(4, serverQuantity04, capacity04, lambdaMin04, lambdaMax04, miMin04, miMax04);
  const queue5 = new Queue(5, serverQuantity05, capacity05, lambdaMin05, lambdaMax05, miMin05, miMax05);
  
  // connection config
  queue1.setConnections({ nextQueue: queue2 });
  queue2.setConnections({ previousQueue: queue1, nextQueue: queue3 })
  queue3.setConnections({ previousQueue: queue2, nextQueue: queue4 })
  queue4.setConnections({ previousQueue: queue3, nextQueue: queue5 })
  queue5.setConnections({ previousQueue: queue4, })
  
  // initial event
  const x0 = parseFloat(document.getElementById('x0').value);
  const initialEvent = new Event(ARRIVAL, `${ARRIVAL} 1`, null, x0);
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