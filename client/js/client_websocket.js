var ws = null;

function websocketerror_callback(error){
    console.log('Error detected: ' + error);
}

function websocketclose_callback(){
    console.log('Socket Closed');
}

function websocketmessage_callback(message) {
    console.log("message")
}

function init_websocket(){
    console.log('Initializing Websocket');
    ws_uri = "ws://" + "localhost" + "/";
    ws = new WebSocket(uri);
    ws.onmessage = websocketmessage_callback;
    ws.onerror = websocketerror_callback;
    ws.onclose = websocketclose_callback;
    websocket_inited = 1;
}


function test_websocket_echo(){
    ws.send(JSON.stringify({ echo: "Echo Value" }));
}

