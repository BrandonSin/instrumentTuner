import './App.css';
import './index.css';
import * as React from "react";
import ReactSpeedometer from "react-d3-speedometer";


function Tuner(){
    
    const [frequencyValue, setFrequencyValue] = React.useState(440);
    const [states, setStates] = React.useState(0);
    const [currentNote, setNote] = React.useState("A");
    var audioContext = new(window.AudioContext || window.webkitAudioContext)();


    

    function vTuner(){
        audioContext.resume()
        var microphone;
        setStates(1);
        var analyser = audioContext.createAnalyser();
       
  
    if (navigator.mediaDevices.getUserMedia) {
        console.log('getUserMedia supported.');
        var constraints = { audio: true }
        navigator.mediaDevices.getUserMedia(constraints)
            .then(function(stream) {
                microphone = audioContext.createMediaStreamSource(stream);
                microphone.connect(analyser);
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
        var frequency =  ((index)*((audioContext.sampleRate)/ analyser.fftSize))
        var musicNote = findNote(frequency)
        console.log("frequency: " + frequency);
        if (musicNote === undefined){
            setNote("...");
        }
        else{
            setNote(musicNote);
        }
        
        var roundFrequency = frequency.toFixed(1);
        setFrequencyValue(roundFrequency);
        
        }
        setInterval(checkAudio, 64);
    }

    function getIndexOfMax(array) {
        return array.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);
    }

    function findNote(frequency){
        // https://en.wikipedia.org/wiki/Pitch_(music) Formula for Pitches
        var noteStrings = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];  
        var noteNum = 12 * (Math.log( frequency / 440 )/Math.log(2) );
        var note = Math.round( noteNum ) + 69;
        return noteStrings[note%12]
    }

   
       
    }
    
    return(
        <div className = "tuner">
            <h4>Violin Tuner</h4>
            <p style={{color: (frequencyValue >= 191 && frequencyValue <= 201) || (frequencyValue >= 288 && frequencyValue <= 298) ||
              (frequencyValue >= 430 && frequencyValue <= 460) || (frequencyValue >= 654 && frequencyValue <= 664) ? 'green' : 'black'}}>Current Note: {currentNote}</p>
            <ReactSpeedometer
                value={frequencyValue}
                maxValue={880}
                minValue={0}
                currentValueText={'Frequency: ${value}'}
                customSegmentStops={[0, 196, 293, 440, 659, 880]}
                needleTransitionDuration={500}
                needleHeightRatio={0.7}    
                 />    
            <button onClick={vTuner} className = "start" style={{visibility: states === 0 ? 'visible' : 'hidden' }}>Start</button>
        </div>   
    ) 
}
export default Tuner;