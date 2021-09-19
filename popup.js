var tabId_re = /tabId=([0-9]+)/;
var match = tabId_re.exec(window.location.hash);
if (match) {
  var hisTable = chrome.extension.getBackgroundPage().Table[match[1]];
  var table = document.createElement("table");
  var header = table.createTHead();
  var firstRow = header.insertRow(0);

  firstRow.insertCell(-1).textContent = "S.No";
  firstRow.insertCell(-1).textContent = "Time";
  firstRow.insertCell(-1).textContent = "Duration";
  firstRow.insertCell(-1).textContent = "Website";


  for (var i=0; i < hisTable.length; i++) {
    var row = table.insertRow(-1);

    row.insertCell(-1).textContent = (i+1);
    row.insertCell(-1).textContent = hisTable[i][0].toLocaleTimeString();

    var end_time;
    if (i == 0) {
      end_time = new Date();
    } else {
      end_time = hisTable[i-1][0];
    }
    row.insertCell(-1).textContent = formatTime(end_time - hisTable[i][0]);

    var newWebsite = document.createElement("a");
    newWebsite.textContent = hisTable[i][1];
    newWebsite.setAttribute("href", hisTable[i][1]);
    newWebsite.setAttribute("target", "_blank");
    row.insertCell(-1).appendChild(newWebsite);
  }
  document.body.appendChild(table);
}