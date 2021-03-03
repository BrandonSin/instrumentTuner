(this.webpackJsonpaudiovis=this.webpackJsonpaudiovis||[]).push([[0],{22:function(e,n,t){},23:function(e,n,t){},63:function(e,n,t){"use strict";t.r(n);var o=t(5),i=t.n(o),r=t(29),a=t.n(r),c=(t(22),t(0)),s=(t(23),t(30)),u=t.n(s),l=t(21),d=t.n(l),f=t(3);var h=function(){var e=o.useState(440),n=Object(c.a)(e,2),t=n[0],i=n[1],r=o.useState(0),a=Object(c.a)(r,2),s=a[0],l=a[1],h=o.useState("A"),v=Object(c.a)(h,2),g=v[0],w=v[1],p=new(window.AudioContext||window.webkitAudioContext);return Object(f.jsxs)("div",{className:"tuner",children:[Object(f.jsx)("h4",{children:"Violin Tuner"}),Object(f.jsxs)("p",{style:{color:t>=191&&t<=201||t>=288&&t<=298||t>=430&&t<=460||t>=654&&t<=664?"green":"black"},children:["Current Note: ",g]}),Object(f.jsx)(u.a,{value:t,maxValue:880,minValue:0,currentValueText:"Frequency: ${value}",customSegmentStops:[0,196,293,440,659,880],needleTransition:"easeElasticOut",needleTransitionDuration:3e3,needleHeightRatio:.7}),Object(f.jsx)("button",{onClick:function(){p.resume(),l(1);var e=p.createAnalyser(),n=new d.a({source:"mic"}),t=new d.a.Poly;if(navigator.mediaDevices.getUserMedia){console.log("getUserMedia supported.");navigator.mediaDevices.getUserMedia({audio:!0}).then((function(o){p.createMediaStreamSource(o).connect(e),function(){e.fftSize=32768;var o=e.fftSize,r=new Uint8Array(o);setInterval((function(){e.getByteFrequencyData(r);var o=r.reduce((function(e,n,t,o){return n>o[e]?t:e}),0)*(p.sampleRate/2/e.fftSize),a=function(e){var n=["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"],t=Math.log(e/440)/Math.log(2)*12,o=Math.round(t)+69;return n[o%12]}(o);w(void 0===a?"...":a),t.add(n),t.updatePitch();var c=o.toFixed(1);i(c)}),64)}()})).catch((function(e){console.error("error: "+e)}))}else console.error("getUserMedia unsupported by browser")},className:"start",style:{visibility:0===s?"visible":"hidden"},children:"Start"})]})};var v=function(){return Object(f.jsx)("div",{className:"App",children:Object(f.jsx)("header",{className:"App-header",children:Object(f.jsx)(h,{})})})},g=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function w(e,n){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var t=e.installing;null!=t&&(t.onstatechange=function(){"installed"===t.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://cra.link/PWA."),n&&n.onUpdate&&n.onUpdate(e)):(console.log("Content is cached for offline use."),n&&n.onSuccess&&n.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}var p=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,66)).then((function(n){var t=n.getCLS,o=n.getFID,i=n.getFCP,r=n.getLCP,a=n.getTTFB;t(e),o(e),i(e),r(e),a(e)}))};a.a.render(Object(f.jsx)(i.a.StrictMode,{children:Object(f.jsx)(v,{})}),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/instrumentTuner",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var n="".concat("/instrumentTuner","/service-worker.js");g?(!function(e,n){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(t){var o=t.headers.get("content-type");404===t.status||null!=o&&-1===o.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):w(e,n)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(n,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://cra.link/PWA")}))):w(n,e)}))}}(),p()}},[[63,1,2]]]);
//# sourceMappingURL=main.2f158543.chunk.js.map