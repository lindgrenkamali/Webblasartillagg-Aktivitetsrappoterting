
chrome.webNavigation.onHistoryStateUpdated.addListener(RunScript);

async function RunScript() {

  const tab = await GetTab();
    
    if (tab !== undefined && tab.url.includes("https://arbetsformedlingen.se/platsbanken/annonser"))
    {
      
      const subDir = tab.url.split("annonser");

      if (subDir[1][0] == "?"){
        chrome.scripting.executeScript({
        target: {tabId: tab.id, allFrames: true},
        files: ["removeWorkAds.js"]
      })
      }
      else{

    chrome.scripting.executeScript({
      target: {tabId: tab.id, allFrames: true},
      files: ["script.js"]
      })

    }

  }
}

async function GetTab(){
  let queryOptions = { active: true, lastFocusedWindow: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}