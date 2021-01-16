let browser_ = null;
if (typeof browser !== 'undefined') {
  browser_ = browser;
  browserSupportsPromises_ = true;
} else if (typeof chrome !== 'undefined') {
  browser_ = chrome;
  browserSupportsPromises_ = false;
}

function getCurrentTabUrl(cb) {
  const queryInfo = {
    active: true,
    currentWindow: true
  };

  browser_.tabs.query(queryInfo, function (tabs) {
    const tab = tabs[0];
    const url = tab.url;
    cb(url);
  });
}

function saveToPool({ linkUrl, selectionText, menuItemId }, tab) {
  if (menuItemId === 'open-pool') {
    return openPool();
  }

  if (linkUrl) {
    browser_.tabs.create({
      url: `https://poolmessenger.com/share?url=${encodeURIComponent(
        linkUrl
      )}&title=${encodeURIComponent(selectionText)}`
    });
  } else {
    getCurrentTabUrl((url) => {
      browser_.tabs.create({
        url: `https://poolmessenger.com/share?url=${encodeURIComponent(
          linkUrl
        )}&title=${encodeURIComponent(selectionText)}`
      });
    });
  }
}

function openPool() {
  browser_.tabs.create({
    url: 'https://poolmessenger.com'
  });
}

browser_.runtime.onInstalled.addListener(() => {
  browser_.contextMenus.create({
    id: 'pool',
    title: 'Save to Pool',
    contexts: ['selection', 'page', 'link']
  });

  browser_.contextMenus.create({
    id: 'open-pool',
    title: 'Open Pool',
    contexts: ['all']
  });

  browser_.contextMenus.onClicked.addListener(saveToPool);
});
