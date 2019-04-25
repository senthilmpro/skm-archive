const functions = require('firebase-functions');

const app = require('./express');
exports.greetFromFastify = functions.https.onRequest(app);



// const fastify = require('fastify')({ logger: true });

// const routes = require('./routes/route');
// //console.log(route);

// routes.forEach((route, index) => {
//   fastify.route(route)
// });

// exports.app = functions.https.onRequest(fastify);


/*// Run the server!
const start = async () => {
  try {
    await fastify.listen(3000)
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()*/