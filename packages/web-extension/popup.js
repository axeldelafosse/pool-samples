let browser_ = null;
if (typeof browser !== 'undefined') {
  browser_ = browser;
  browserSupportsPromises_ = true;
} else if (typeof chrome !== 'undefined') {
  browser_ = chrome;
  browserSupportsPromises_ = false;
}

const domReady = (cb) => {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', cb);
  } else {
    cb();
  }
};

function getCurrentTabUrl(cb) {
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  browser_.tabs.query(queryInfo, function (tabs) {
    var tab = tabs[0];
    var url = tab.url;
    var title = tab.title;
    cb(url, title);
  });
}

function getAllTabsUrl(cb) {
  var queryInfo = {
    currentWindow: true
  };

  browser_.tabs.query(queryInfo, function (tabs) {
    console.log(tabs);
  });
}

function loadExtension(url, title) {
  var frame = document.createElement('iframe');

  frame.setAttribute('width', '480px');
  frame.setAttribute('height', '600px');
  frame.setAttribute('frameborder', '0');
  frame.setAttribute('id', 'pool');
  frame.setAttribute(
    'src',
    `https://poolmessenger.com/share?url=${encodeURIComponent(
      url
    )}&title=${encodeURIComponent(title)}`
  );

  document.body.appendChild(frame);
  setTimeout(() => {
    document.getElementById('activity-indicator').remove();
  }, 1500);
}

domReady(getCurrentTabUrl(loadExtension));
