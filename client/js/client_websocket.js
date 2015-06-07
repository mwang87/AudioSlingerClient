var ws = null;

function websocketerror_callback(error){
    console.log('Error detected: ' + error);
}

function websocketclose_callback(){
    console.log('Socket Closed');
}

function websocketmessage_callback(message) {
    console.log("message: " + message.data)
    json_object = JSON.parse(message.data)
    if(json_object["datatype"] == "audiodata"){
        server_data = json_object["audiodata"]

        var channels = 2;
        // Create an empty two second stereo buffer at the
        // sample rate of the AudioContext
        var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        var frameCount = audioCtx.sampleRate * 2.0;
        var myArrayBuffer = audioCtx.createBuffer(2, frameCount, audioCtx.sampleRate);

        for (var channel = 0; channel < channels; channel++) {
           // This gives us the actual array that contains the data
           var nowBuffering = myArrayBuffer.getChannelData(channel);
           for (var i = 0; i < frameCount; i++) {
                // Math.random() is in [0; 1.0]
                // audio needs to be in [-1.0; 1.0]
                //nowBuffering[i] = Math.random() * 2 - 1;
                nowBuffering[i] = server_data[i]
           }
        }
        
        playSound(myArrayBuffer, 0)
    }
}

function init_websocket(){
    console.log('Initializing Websocket');
    ws_uri = "ws://localhost:8000/";
    ws = new WebSocket(ws_uri);
    ws.onmessage = websocketmessage_callback;
    ws.onerror = websocketerror_callback;
    ws.onclose = websocketclose_callback;
    websocket_inited = 1;
}


function test_websocket_echo(){
    ws.send(JSON.stringify({ echo: "Echo Value" }));
}

function test_request_sin_signal(){
    var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    ws.send(JSON.stringify({ command: "getsampleaudio" , rate: audioCtx.sampleRate}));
}