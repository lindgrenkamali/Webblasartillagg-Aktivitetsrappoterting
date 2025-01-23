
chrome.webNavigation.onHistoryStateUpdated.addListener(RunScript);

function RunScript() {
  GetTabId().then(function(value) {
    
    if (value !== undefined)
    {
    if(value.url.includes("https://arbetsformedlingen.se/platsbanken/annonser?"))
    {
      chrome.scripting.executeScript({
        target: {tabId: value.id, allFrames: true},
        files: ["removeWorkAds.js"]
      })
    }

    chrome.scripting.executeScript({
      target: {tabId: value.id, allFrames: true},
      files: ["script.js"]
  })
}
  } );

}

async function GetTabId(){
  let queryOptions = { active: true, lastFocusedWindow: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}