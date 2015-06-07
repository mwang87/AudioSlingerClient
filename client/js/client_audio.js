function playSound(buffer, time) {
	var source = context.createBufferSource();
	source.buffer = buffer;
	source.connect(context.destination);
	source.start(time);
}

function createSampleAudioBuffer(){
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
	    	nowBuffering[i] = Math.random() * 2 - 1;
	   }
	}
	return myArrayBuffer
}