/**
 * Summary.
 * 2.1. Rotating publisher
 *   Using the pub / sub (broadcast) pattern described in RefZMQ.pdf, develop a publisher.js program that is invoked as
 *   publisher node port numMessages topic1 topic2 ...
 *   where:
 *      • port is the port to which subscribers must connect
 *      • numMessages is the total number of messages to be sent (one message per second), after which end up
 *      • topic1 topic2 ... is a variable number of topics that are covered according to a rotating shift
 *
 *
 *
 * @link   https://github.com/daibeal/entrega-tsr
 * @file   cliente.js
 * @author Dairon Andrés Benites Aldaz
 * @since  2021-12-01
 */

const zmq = require('zmq');
let sub = zmq.socket('sub');
sub.connect('tcp://localhost:' + process.argv[2]);
for(i of process.argv.slice(3)) {
    sub.subscribe(i);
}
sub.on('message', (m) => {
    console.log(m + "");
})
