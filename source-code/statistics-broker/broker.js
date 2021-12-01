const zmq = require("zeromq");
let cli = [],
  req = [],
  workers = [],
  answeredReq = {};
let total = 0;
let sc = zmq.socket("router"); // frontend
let sw = zmq.socket("router"); // backend
sc.bind("tcp://*:" + process.argv[2]);
sw.bind("tcp://*:" + process.argv[3]);
sc.on("message", (c, sep, m) => {
  if (workers.length == 0) {
    cli.push(c);
    req.push(m);
  } else {
    sw.send([workers.shift(), "", c, "", m]);
  }
});
sw.on('message',(w,sep1,c,sep2,r)=> {
    if (c=='') {
        workers.push(w); 
        answeredReq[w] = 0;
         return
        }
        if (cli.length>0) {
        sw.send([w,'', cli.shift(),'',req.shift()])
        } else {
        workers.push(w)
        } 
        answeredReq[w]++ 
        sc.send([c,'',r]) 
        total++
})
setInterval(() => {
    console.log("Total peticiones atendidas: " + total) 
    for (let i in answeredReq) {
    console.log('Peticiones atendidas por ' + i +': ' + answeredReq[i])
    }
}, 5000)