const {connect, StringCodec} = require('nats');

const sc = new StringCodec();
connect({servers: 'nats://nats-server:4222'})
  .then((c) => {
    console.log('Connected');
    console.log('Subscribing...');
    const msub = c.subscribe('time');
    (async (sub) => {
      for await (const m of sub) {
        console.log('request received at', m.subject);
        m.respond(sc.encode(new Date().toLocaleTimeString()));
      }
    })(msub); 

    console.log('Subscribed');
  }, (err) => {
    console.error('Failed', err);
  });

