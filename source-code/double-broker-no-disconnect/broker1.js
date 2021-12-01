const zmq = require('zmq')
let cli=[], req=[]
let total = 0, w = 0
let sc = zmq.socket('router') // frontend 
let sb = zmq.socket('dealer') // backend 
sc.bind('tcp://*:' + process.argv[2]) 
sb.bind('tcp://*:8002') 
sc.on('message',(c,sep,m)=> {
if (w == 0) {
    cli.push(c); 
    req.push(m);
} else {
    sb.send([c,'',m])
    w-- 
}
})
sb.on('message',(c,sep,r)=> {
    if (cli.length>0) { sb.send([cli.shift(),'',req.shift()])
    } else {
      w++
    }
    if(sep == '') {
     }
})
setInterva(() => { 
    console.log(cli)
}, 3000)