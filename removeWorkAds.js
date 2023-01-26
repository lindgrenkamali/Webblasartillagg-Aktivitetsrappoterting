setTimeout(() => {
    removeWorkAds();
    
  }, "5 00");

function removeWorkAds(){
    let workAds = document.getElementsByTagName("pb-feature-search-result-card");
    let workAdsObjects = [];
    let workAdsElement = document.getElementsByClassName("result-container")[0];
    for (let i = 0; i < workAds.length; i++) {
        workAdsObjects.push({"workad": workAds[i], "workgiver": workAds[i].getElementsByClassName("pb-company-name")[0].innerText})
    }
    chrome.storage.sync.get(["afsettings"]).then((result) => {
        result.afsettings.blockedWorkGivers.forEach(x => {
            workAdsObjects.forEach(y => {
                
                if(y.workgiver.includes(x))
                {
                    workAdsElement.removeChild(y.workad);
                }
            });
        });
    })

   
}