const express = require('express');
const redis = require('redis')
 
const app = express();

const client = redis.createClient({
  host: 'redis-server', // the Redis container name -- if we weren't using Docker, this would be the Redis server URL (e.g. https://myredisserver.com)
  port: 6379            // this is actually Redis default port, notice that we don't need to map ports between Docker containers, only the main machine port and Docker
});
client.set('visits', 0);
 
app.get('/', (req, res) => {
  client.get('visits', (err, visits) => {
      res.send('Number of visits is ' + visits);
      client.set('visits', parseInt(visits) + 1);
  })
});
 
app.listen(8081, () => {
  console.log('Listening on port 8081');
});