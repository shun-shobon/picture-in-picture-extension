chrome.browserAction.onClicked.addListener(() => {
  chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    console.log(tab);
    if (tab?.id === undefined) return;
    chrome.tabs.sendMessage(tab.id, { type: "search" });
  });
});
