// Getter
function get(name, def) {
  var val = localStorage[name];
  if (typeof val != 'undefined') {
    return JSON.parse(val);
  };
  if (typeof def != 'undefined') {
    set(name, def);
    return def;
  };
  return null;
};

// Setter.
function set(name, val) {
  localStorage[name] = JSON.stringify(val);
  return val;
};

// Updates.
function update(tabId) {
  chrome.tabs.get(tabId, function(Tab) {
    var enabled = isReaderEnabled(Tab.url);
    
    if (enabled) {
      var icon = 'icon-enabled.png';
      chrome.tabs.sendRequest(Tab.id, "reader-enable"); 
    } else {
      var icon = 'icon-disabled.png';
      chrome.tabs.sendRequest(Tab.id, "reader-disable"); 
    };
    
    chrome.pageAction.setIcon({
      'tabId': Tab.id,
      'path': icon
    });

    chrome.pageAction.show(Tab.id);

  });
};

// Reader status.
function isReaderEnabled(url) {
  return get('reader@'+url);
};

function enableReader(url) {
  return set('reader@'+url, true);
};

function disableReader(url) {
  return set('reader@'+url, false);
};

function toggleReader(url) {
  // Toggle
  if (isReaderEnabled(url) == true) {
    disableReader(url);
  } else {
    enableReader(url);
  };
};

// Fired when the address-bar icon is clicked.
chrome.pageAction.onClicked.addListener(function(Tab) {
  toggleReader(Tab.url);
  update(Tab.id);
});

chrome.tabs.onSelectionChanged.addListener(update);

chrome.tabs.onUpdated.addListener(update);

chrome.tabs.getSelected(null, update);

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
  //console.log(response);
});
