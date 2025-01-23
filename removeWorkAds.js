setTimeout(() => {
    removeWorkAds();
    
  }, "500");

function removeWorkAds(){
    let workAds = document.getElementsByTagName("pb-feature-search-result-card");
    let workAdObjects = [];
    let workAdElements = document.getElementsByClassName("result-container")[0];
    for (let i = 0; i < workAds.length; i++) {
        workAdObjects.push({"id": i, "workAd": workAds[i], "title":  workAds[i].getElementsByTagName("a")[0].innerText,
             "company": workAds[i].getElementsByClassName("pb-company-name")[0].innerText})
    }
    chrome.storage.sync.get(["afsettings"]).then((result) => {
        const workAdsToRemove = new Map();
        result.afsettings.blockedCompanies.forEach(x => {
            workAdObjects.forEach(y => {
                
                if(y.company.includes(x))
                {
                    workAdsToRemove.set(y.id, y.workAd)
                    
                }
            });

            
        });
        result.afsettings.blockedTitles.forEach(x => {
            workAdObjects.forEach(y => {
                if(y.title.includes(x))
                {
                    workAdsToRemove.set(y.id, y.workAd)
                }
            });

        });

        for (let [key, value] of workAdsToRemove){
            workAdElements.removeChild(value);
        }
        
    })

}
