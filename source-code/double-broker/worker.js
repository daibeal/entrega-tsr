const zmq = require('zeromq')
let dela = zmq.socket('dealer') 
dela.identity=process.argv[3] 
dela.connect(process.argv[2]) 
dela.on('message', (c,sep,msg)=> {
    setTimeout(()=> { dela.send([c,'',process.argv[4]])
}, 1000) })
dela.send(['','addWorker',''])
process.on('SIGINT', () => { 
    dela.send(['','removeWorker','']) 
    setTimeout(() => {
        process.exit(0) 
    },100)
})