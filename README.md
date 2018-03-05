# Instructions

Ensure a RabbitMQ server is running.

First run `npm install` to get the required dependencies.

Configure `index.js` to set correct connection arguments for the runing RabbitMQ server.

Run the test case with `node index.js 100` where `100` is a queue `messageTtl`.

This will create a new exchange and queue in RabbitMQ then immediately shutdown.

Run the test case again with `node index.js 1000` providing a different queue `messageTtl`.

As expected, this will cause the `configure` call to fail with a `PRECONDITION_FAILED` message and an attempt to shutdown the Rabbot connection will be made. This is unsuccesful as it never returns and the node process wil stall.

The test case uses [`wtfnode`](https://www.npmjs.com/package/wtfnode) to provide a list of open handles that are keeping Node from shutting down. From the output there are several timers, an interval and a Socket connection keeping the process from shutting down.

```
[WTF Node?] open handles:
- File descriptors: (note: stdio always exists)
  - fd 1 (tty) (stdio)
  - fd 2 (tty) (stdio)
- Sockets:
  - 169.254.254.254:55696 -> 169.254.254.254:5672
- Timers:
  - (1 ~ 1 undefined) bound  @ /Users/timoram/code/broken-project-test-cases/timers-after-failed-configuration/node_modules/rabbot/src/amqp/iomonad.js:283
- Intervals:
  - (15000 ~ 15 s) bound  @ /Users/timoram/code/broken-project-test-cases/timers-after-failed-configuration/node_modules/amqplib/lib/heartbeat.js:65
  - (30000 ~ 30 s) bound  @ /Users/timoram/code/broken-project-test-cases/timers-after-failed-configuration/node_modules/amqplib/lib/heartbeat.js:74
  - (500 ~ 500 ms) (anonymous) @ /Users/timoram/code/broken-project-test-cases/timers-after-failed-configuration/node_modules/rabbot/src/index.js:500
```