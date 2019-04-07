const ARRIVAL = 'CHEGADA';
const DEPARTURE = 'SAÍDA';

function runSimulation() {
  // parameters
  const serverQuantity = 1;
  const capacity = 4;
  const lambdaMin = 2;
  const lambdaMax = 3;
  const miMin = 3;
  const miMax = 5;

  // stop condition
  let eventCount = 1;
  const eventLimit = 20;

  // queue configuration and initial event
  const queue1 = new Queue(serverQuantity, capacity, lambdaMin, lambdaMax, miMin, miMax);
  const initialEvent = new Event(ARRIVAL, `${ARRIVAL} 1`, null, 2.5000000000000000);
  queue1.scheduleEvent(initialEvent);

  do {
    queue1.runEvent();
    eventCount++;
  } while (eventCount <= eventLimit)

  queue1.generateResults();
}