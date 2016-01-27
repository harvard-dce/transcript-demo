var d3 = require('d3-selection');
var ease = require('d3-ease');
var timer = require('d3-timer');
var accessor = require('accessor');
var moment = require('moment');
var createSimpleScroll = require('simplescroll');

var segmentKey = accessor('begin');
var getText = accessor('text');
var epochBase = '1970-01-01 ';

function TranscriptRenderer(createOpts) {
  var root;
  if (createOpts) {
    root = createOpts.root;
  }

  var simpleScroll = createSimpleScroll({
    d3: d3,
    easingFn: ease.easeCubicInOut,
    timer: timer.timer,
    root: root.node()
  });  

  function render(segments) {
    var update = root.selectAll('.tsegment').data(segments, segmentKey);
    update.enter().append('div').classed('tsegment', true);
    update.text(getText);
    update.exit().remove();
  }

  function highlightSegmentAtTime(videoTime) {
    var update = root.selectAll('.tsegment');
    update.classed('highlight', currentTimeIsWithinSpan);

    var highlighted = root.select('.highlight');
    if (!highlighted.empty()) {
      simpleScroll.scrollTo(
        highlighted.node().offsetTop - root.node().offsetHeight * 0.4,
        500
      );
    }

    function currentTimeIsWithinSpan(d) {
      return timeIsWithinSpan(videoTime, d.begin, d.end);
    }
  }

  return {
    render: render,
    highlightSegmentAtTime: highlightSegmentAtTime
  };
}

// Lazily abusing moment here.
function timeIsWithinSpan(videoTime, start, end) {
  var timeM = moment(epochBase);
  timeM.add(videoTime, 'seconds');
  var startM = moment(epochBase + start);
  var endM = moment(epochBase + end);
  return timeM.isAfter(startM) && timeM.isBefore(endM);
}

module.exports = TranscriptRenderer;
