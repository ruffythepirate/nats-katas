const {connect, StringCodec} = require('nats');

const sc = new StringCodec();

connect({servers: 'nats://nats-server:4222'})
  .then((c) => {
    console.log('Connected');
    console.log('requesting...');
    c.request('time').then((msg) => {
      console.log('response received', sc.decode(msg.data));
    });
    console.log('requested');
  }, (err) => {
    console.error('Failed', err);
  });

