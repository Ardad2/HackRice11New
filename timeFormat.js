function formatTime(time) {
  if (time < 0) {
    return "?";
  }
  if (time > 60000 && time < 61000)
  {
    if (confirm("Warning! You've spent too much time on this page! Time to take a break! Quit this page?"))
      {
    chrome.tabs.query({active:true,currentWindow:true},function(tabs){
      chrome.tabs.remove(tabs[0].id);
  });
}
  var newBlackList = {};

  chrome.storage.local.get(['key'], function(result) {
    newBlackList = result;
  });

  newBlackList.push(url);


 chrome.storage.local.set({key:newBlackList }, function() {
});

  

    var BlackListed = chrome.extension.getBackgroundPage().BlackListed;
    console.log(BlackListed);
    BlackListed.add(url.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img));
    
  }
  let divisor = time < 3600000 ? [60000, 1000] : [3600000, 60000];
  function pad(x) {
    return x < 10 ? "0" + x : x;
  }
  return Math.floor(time / divisor[0]) + ":" + pad(Math.floor((time % divisor[0]) / divisor[1]));
}

exports.formatTime = formatTime;