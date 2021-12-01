const zmq = require('zmq')
let workers = [], answeredReq={}
let total = 0
let sw = zmq.socket('router') // broker1 
let sb = zmq.socket('dealer') // backend 
sw.bind('tcp://*:' + process.argv[2]) 
sb.connect('tcp://localhost:8002') 
sw.on('message',(w,sep1,c,sep2,r)=> {
if (sep2=='addWorker') { 
    workers.push(w) 
    answeredReq[w] = 0; 
    sb.send(['',sep2,'']) 
    console.log(workers)
    return
}
sb.send([c,'',r]) 
answeredReq[w]++ 
total++ 
workers.push(w)
})
sb.on('message',(c,sep1,m)=> { 
    sw.send([workers.shift(),'',c,'',m])
})
setInterval(() => {
console.log("Total peticiones atendidas: " + total) 
for (let i in answeredReq) {
} }, 5000)