let tabId_re = /tabId=([0-9]+)/;
let match = tabId_re.exec(window.location.hash);
if (match) {
  let hist = chrome.extension.getBackgroundPage().History[match[1]];
  let table = document.createElement("table");
  for (let i=0; i < hist.length; i++) {
    let r = table.insertRow(-1);

    let date = "";
    if (i == hist.length - 1 ||
        (hist[i][0].toLocaleDateString() != hist[i+1][0].toLocaleDateString())) {
      date = hist[i][0].toLocaleDateString();
    }
    r.insertCell(-1).textContent = date;

    r.insertCell(-1).textContent = hist[i][0].toLocaleTimeString();

    let end_time;
    if (i == 0) {
      end_time = new Date();
    } else {
      end_time = hist[i-1][0];
    }
    r.insertCell(-1).textContent = formatTime(end_time - hist[i][0]);

    let a = document.createElement("a");
    a.textContent = hist[i][1];
    a.setAttribute("href", hist[i][1]);
    a.setAttribute("target", "_blank");
    r.insertCell(-1).appendChild(a);
  }
  document.body.appendChild(table);
}