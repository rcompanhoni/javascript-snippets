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
  const eventLimit = 3;

  const queue2 = new Queue(1, 3, 2, 5, 3, 5);

  // queue configuration and initial event
  const queue1 = new Queue(
    serverQuantity,
    capacity,
    lambdaMin,
    lambdaMax,
    miMin,
    miMax,
    { queue: queue2, probability: 1 }
  );
  const initialEvent = new Event(ARRIVAL, `${ARRIVAL} 1`, null, 2.5000000000000000);
  queue1.scheduleEvent(initialEvent);

  do {
    queue1.runEvent();
    queue2.runEvent();
    eventCount++;
  } while (eventCount <= eventLimit)

  queue1.generateResults();
}