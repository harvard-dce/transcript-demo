var d3 = require('d3-selection');
var segments = require('./transcript.json');
var TranscriptRenderer = require('./transcript-renderer');

var transcriptRenderer = TranscriptRenderer({
  root: d3.select('.transcript-container')
});

transcriptRenderer.render(segments);

// function startPlaying() {
//   var mainVideo = d3.select('#main-video').node();
//   debugger;
// }

// startPlaying();

var pcontainer = d3.select('.player-container');
var tcontainer = d3.select('.transcript-container');

d3.select('.transcript-button').on('click', toggleTranscript);
var mainVideo = d3.select('.main-video');
mainVideo.on('timeupdate', highlight);

// setTimeout(highlight, 500);

function highlight() {  
  transcriptRenderer.highlightSegmentAtTime(mainVideo.node().currentTime);
}

function toggleTranscript() {
  var compactPlayer = false;
  var compactTranscript = true;

  if (tcontainer.classed('compacted')) {
    compactPlayer = true;
    compactTranscript = false;
  }

  pcontainer.classed('compacted', compactPlayer);
  tcontainer.classed('compacted', compactTranscript);
}
