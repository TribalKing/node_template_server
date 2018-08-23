const WebSocket = require('ws');

const wss = new WebSocket.Server({
  port: config.websocket.port,
  perMessageDeflate: {
    zlibDeflateOptions: { // See zlib defaults.
      chunkSize: 1024,
      memLevel: 7,
      level: 3,
    },
    zlibInflateOptions: {
      chunkSize: 10 * 1024
    },
    // Other options settable:
    clientNoContextTakeover: true, // Defaults to negotiated value.
    serverNoContextTakeover: true, // Defaults to negotiated value.
    clientMaxWindowBits: 10,       // Defaults to negotiated value.
    serverMaxWindowBits: 10,       // Defaults to negotiated value.
    
    // Below options specified as default values.
    concurrencyLimit: 10,          // Limits zlib concurrency for perf.
    threshold: 1024,               // Size (in bytes) below which messages
                                   // should not be compressed.
                                 }
                               });

ws = new WebSocket('ws://' + config.db.host + ':' + config.websocket.port);

// event emmited when connected
ws.onopen = function () {
  console.log('websocket is connected ...');

  // sending a send event to websocket server
  ws.send('connected');
}

// event emmited when receiving message 
ws.onmessage = function (message) {
  console.log(message);
}
