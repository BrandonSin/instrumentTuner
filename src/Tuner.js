import './App.css';
import './index.css';
import * as React from "react";
import ReactSpeedometer from "react-d3-speedometer";
import Wad from 'web-audio-daw';



function Tuner(){
    // let constraintObj = {
    //     audio: true,
    //     video: false,
    // };
    // const audio = document.getElementById('audio');
    // function mic(){
    //     navigator.mediaDevices.getUserMedia(constraintObj)
    //     .then(function(mediaStream))
    
    const [frequencyValue, setFrequencyValue] = React.useState(440);
    const [states, setStates] = React.useState(0);

    function vTuner(){
        var audioContext = new(window.AudioContext || window.webkitAudioContext)();
        var microphone;
        setStates(1);
        var analyser = audioContext.createAnalyser();
        var voice = new Wad({source : 'mic' });
        var tune = new Wad.Poly();


        
    if (navigator.mediaDevices.getUserMedia) {
        console.log('getUserMedia supported.');
        var constraints = { audio: true }
        navigator.mediaDevices.getUserMedia(constraints)
            .then(function(stream) {
                microphone = audioContext.createMediaStreamSource(stream);
                microphone.connect(analyser);
                //analyser.connect(audioContext.destination);
                beginRecording();
            })
            .catch(function(err) {
                console.error('error: ' + err);
            })
    } else {
        console.error('getUserMedia unsupported by browser');
    }

    function beginRecording() {

        
        

        analyser.fftSize = 2048; // power of 2, between 32 and max unsigned integer
        var bufferLength = analyser.fftSize;

        var freqBinDataArray = new Uint8Array(bufferLength);

        var checkAudio = function() {
        analyser.getByteFrequencyData(freqBinDataArray);
        

        var index = getIndexOfMax(freqBinDataArray)
        var frequency =  ((index)*((audioContext.sampleRate/2)/ analyser.fftSize))
        var musicNote = calculateNote(frequency)
        // console.log('current Note: ' + musicNote);

        tune.add(voice);
        tune.updatePitch();
        console.log(tune.pitch);

        var roundFrequency = frequency.toFixed(1);
        setFrequencyValue(roundFrequency);
        // console.log('Freq Bin: ' + frequency);
        //console.log(freqBinDataArray);
        }

        setInterval(checkAudio, 64);
    }

    function getRMS(spectrum) {
        var rms = 0;
        for (var i = 0; i < spectrum.length; i++) {
            rms += spectrum[i] * spectrum[i];
        }
        rms /= spectrum.length;
        rms = Math.sqrt(rms);
        return rms;
    }

    function getIndexOfMax(array) {
        return array.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);
    }

    function calculateNote(frequency){
        var noteStrings = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
        
        var noteNum = 12 * (Math.log( frequency / 440 )/Math.log(2) );
        var note = Math.round( noteNum ) + 69;
        return noteStrings[note%12]
    }
       

    }
    
    

    return(
        <div className = "tuner">
            <p>Violin Tuner</p>
            <div className = "gauge">
            <ReactSpeedometer
                value={frequencyValue}
                maxValue={880}
                minValue={0}
                currentValueText={'Value: ${value}'}
                customSegmentStops={[0, 196, 293, 440, 659, 880]}
                needleTransition ="easeElasticOut"
                needleTransitionDuration={3000}
                needleHeightRatio={0.7}
                
                 />
            </div>
            
            
            <button onClick={vTuner} className = "start" style={{visibility: states == 0 ? 'visible' : 'hidden' }}>Start</button>
        </div>
        
    )
    
}

export default Tuner;