const rabbot = require('rabbot');
const wtf = require('wtfnode');

const connectionConfig = {
    name: 'default',
    host: 'localhost', // TODO Change
    user: 'user', // TODO Change
    pass: 'password', // TODO Change
};

const topology =  {
    connection: connectionConfig,
    queues:[
        {
            name: 'acme.queue.system.1',
            messageTtl: Number(process.argv[2]),
        },
    ],
};

rabbot
    .addConnection(connectionConfig)
    .then(() => rabbot.configure(topology))
    .then(() => {
        console.log('Successfully configured Rabbot, shutting down')
        rabbot.shutdown();
    })
    .catch((err) => {
        console.log('Error caught')
        console.log(err);
        console.log()
        setTimeout(() => {
            wtf.dump();
        }, 1000);
        console.log('Shutting down')
        return rabbot
            .shutdown()
            .then(() => {
                // never gets here
                console.log('Shutdown complete')
            });
        ;
    })
;