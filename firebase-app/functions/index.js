const functions = require('firebase-functions');

const fastify = require('fastify')({ logger: true });
const axios = require('axios');
const path = require('path');

const routes = require('./routes/route');
//console.log(route);

routes.forEach((route, index) => {
  fastify.route(route)
});

// point to public folder.
fastify.register(require('fastify-static'), {
  root: path.join(__dirname, 'archive-checker-v2-1',"dist",'archive-checker-v2')
  //prefix: '/', // optional: default '/'
});

fastify.get('/', function (req, reply) {
  reply.sendFile('index.html') // serving path.join(__dirname, 'public', 'myHtml.html') directly
})

// Run the server!
const start = async () => {
  try {
    await fastify.listen(3000)
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()