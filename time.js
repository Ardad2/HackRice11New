let count = 0;

function formatTime(d) {
  count++;
  if (d < 0) {
    return "?";
  }
  if (d > 10000 && d < 11000)
  {
    alert("Warning! You've spent too much time on this page! Time to take a break!")
  }
  let divisor = d < 3600000 ? [60000, 1000] : [3600000, 60000];
  function pad(x) {
    return x < 10 ? "0" + x : x;
  }
  return Math.floor(d / divisor[0]) + ":" + pad(Math.floor((d % divisor[0]) / divisor[1]));
}

exports.formatTime = formatTime;