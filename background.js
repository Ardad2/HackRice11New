var Table = {};

chrome.browserAction.setBadgeText({ 'text': '?'});
chrome.browserAction.setBadgeBackgroundColor({ 'color': "#777" });


function Update(t, tabId, url) {
  if (!url) {
    return;
  }

  url = url.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img);

  if (tabId in Table) {
    if (url === Table[tabId][0][1]) {
      return;
    }
  } else {
    Table[tabId] = [];
  }
  Table[tabId].unshift([t, url]);


  chrome.browserAction.setBadgeText({ 'tabId': tabId, 'text': '0:00'});
  chrome.browserAction.setPopup({ 'tabId': tabId, 'popup': "popup.html#tabId=" + tabId});
}

function HandleUpdate(tabId, changeInfo, tab) {
  Update(new Date(), tabId, changeInfo.url);
}

function HandleRemove(tabId, removeInfo) {
  delete Table[tabId];
}

function HandleReplace(addedTabId, removedTabId) {
  var t = new Date();
  delete Table[removedTabId];
  chrome.tabs.get(addedTabId, function(tab) {
    Update(t, addedTabId, tab.url);
  });
}


function UpdateBadge() {
  var now = new Date();
  for (tabId in Table) {


    var description = formatTime(now - Table[tabId][0][0]);
    chrome.browserAction.setBadgeText({ 'tabId': parseInt(tabId), 'text': description});
  }
}

setInterval(UpdateBadge, 1000);

chrome.tabs.onUpdated.addListener(HandleUpdate);
chrome.tabs.onRemoved.addListener(HandleRemove);
chrome.tabs.onReplaced.addListener(HandleReplace);
