import './App.css';
import './index.css';
import * as React from "react";
import ReactSpeedometer from "react-d3-speedometer";
import Wad from 'web-audio-daw';


function Tuner(){
    
    const [frequencyValue, setFrequencyValue] = React.useState(440);
    const [states, setStates] = React.useState(0);
    const [currentNote, setNote] = React.useState("A");
    var AudioContext = window.AudioContext || window.webkitAudioContext;
    var audioContext = new AudioContext();  

    function vTuner(){
        audioContext.resume()
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
                beginRecording();
            })
            .catch(function(err) {
                console.error('error: ' + err);
            })
    } else {
        console.error('getUserMedia unsupported by browser');
    }

    function beginRecording() {
        analyser.fftSize = 32768; // power of 2, between 32 and max unsigned integer
        var bufferLength = analyser.fftSize;

        var freqBinDataArray = new Uint8Array(bufferLength);

        var checkAudio = function() {
        analyser.getByteFrequencyData(freqBinDataArray);
        

        var index = getIndexOfMax(freqBinDataArray)
        var frequency =  ((index)*((audioContext.sampleRate/2)/ analyser.fftSize))

        var musicNote = calculateNote(frequency)
        if (musicNote === undefined){
            setNote("...");
        }
        else{
            setNote(musicNote);
        }
        tune.add(voice);
        tune.updatePitch();
        
        var roundFrequency = frequency.toFixed(1);
        setFrequencyValue(roundFrequency);
        
        }
        setInterval(checkAudio, 64);
    }

    function getIndexOfMax(array) {
        return array.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);
    }

    function calculateNote(frequency){
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
                needleTransition ="easeElasticOut"
                needleTransitionDuration={3000}
                needleHeightRatio={0.7}    
                 />    
            <button onClick={vTuner} className = "start" style={{visibility: states === 0 ? 'visible' : 'hidden' }}>Start</button>
        </div>   
    ) 
}
export default Tuner;