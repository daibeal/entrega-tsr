/**
 * Summary.
 * Assuming the broker pattern implemented with router / router sockets described in RefZMQ.pdf, modify the code to accept the following command line parameters:
 *   • node broker.js portFrontend portBackend
 *  • n node invocations worker.js urlBackend nickWorker txtResponse • m node invocations client.js urlFrontend nickClient txt Request
 *   The values ​​of the arguments must be consistent with each other. For instance:
 *       • node broker.js 8000 8001
 *       • worker node.js tcp: // localhost: 8001 W1 Resp1 
 *       • worker node.js tcp: // localhost: 8001 W2 Resp2 
 *       • client node.js tcp: // localhost: 8000 C1 Hello 
 *       • client node.js tcp: / / localhost: 8000 C2 Hello 
 *       • node client.js tcp: // localhost: 8000 C3 Hello2
 *   When a client launches a request (eg “txtPetition” message) it should receive as a response “txtReply n”, where n is the numerical value that indicates the number of responses that have been generated so far among all workers.
 *   If you want to do a test with several clients and / or workers, it is convenient to take into account the following:
 *   • Instead of opening a terminal for each order, multiple instances can be launched with a single order:
 *       - client.js node and client.js node and ...
 *       - or through a shell-script (to which the number of instances is passed as an argument)
 *   • In that case, it is not so easy to finish the execution of each one (we do not have a dedicated terminal where to press ctrl-C)
 *       - One option is to use the command kill pid1 pid2 ..., where pidX is the process number that is observed when launching orders in the background
 *       - Another solution is to limit the duration of each client / worker by introducing in the program the statement setTimeout (() => {process.exit (0)}, ms), where ms indicates the lifetime of the program in milliseconds
 *
 *
 *
 * @link   https://github.com/daibeal/entrega-tsr
 * @file   worker.js
 * @author Dairon Andrés Benites Aldaz
 * @since  2021-12-01
 */

 const zmq = require('zeromq');
 let req = zmq.socket('req');
 
 const backendURL = process.argv[2];
 const idWorker = process.argv[3];
 const txtRespuesta = process.argv[4];
 
 req.identity = idWorker;
 req.connect(backendURL);
 
 req.on('message', (c, sep, msg) => {
     setTimeout(() => {
         req.send([c, '', txtRespuesta]);
     }, 1000);
 });
 
 req.send(['', '', '']);