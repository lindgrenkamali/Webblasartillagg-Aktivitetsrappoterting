function addCompany(){
  chrome.storage.sync.get(["afsettings"]).then((result) => {

    let afsettings = {
      blockedCompanies: [],
      blockedTitles: []
    };

    if(result.afsettings != undefined)
    {
      afsettings.blockedCompanies = result.afsettings.blockedCompanies;
      afsettings.blockedTitles = result.afsettings.blockedTitles;
      
    }

    const input = document.getElementById("blockCompanyInput").value;
    let newBlockedCompanies = [input];

    if(input != "" && !afsettings.blockedCompanies.includes(input)){
      afsettings.blockedCompanies.push(input);
      chrome.storage.sync.set({ "afsettings": afsettings }).then(() => {
        
        addBlockedCompanies(newBlockedCompanies);

      });
    }
  });
}

function addTitle(){
  chrome.storage.sync.get(["afsettings"]).then((result) => {

    let afsettings = {
      blockedCompanies: [],
      blockedTitles: []
    };

    if(result.afsettings != undefined)
    {
      afsettings.blockedCompanies = result.afsettings.blockedCompanies;
      afsettings.blockedTitles = result.afsettings.blockedTitles
    }

    const input = document.getElementById("blockTitleInput").value;
    let newBlockedTitles = [input];

    if(input != "" && !afsettings.blockedTitles.includes(input)){
      afsettings.blockedTitles.push(input);
      chrome.storage.sync.set({ "afsettings": afsettings }).then(() => {
        addBlockedTitles(newBlockedTitles)

      });
    }
  });
}

function addBlockedTitles(titles) {
  let titleUL = document.getElementById("blockedTitles")

  titles.forEach(element => {
    let blockedTitle = document.createElement("li");
      blockedTitle.textContent = element;

      blockedTitle.onclick = deleteBlockedTitle;
      blockedTitle.addEventListener("click", () => {
        blockedTitle.remove();
      })

      
      titleUL.appendChild(blockedTitle);
  })
}

function addBlockedCompanies(companies)
{
  let companyUL = document.getElementById("blockedCompanies");

  companies.forEach(element => {
    let blockedCompany = document.createElement("li");
      blockedCompany.textContent = element;

      blockedCompany.onclick = deleteBlockedCompany;
      blockedCompany.addEventListener("click", () => {
        blockedCompany.remove();
      })

      
      companyUL.appendChild(blockedCompany);
  })
}


function deleteBlockedCompany(e)
{
  chrome.storage.sync.get(["afsettings"]).then((result) => {

    const index = result.afsettings.blockedCompanies.indexOf(this.innerText);
      result.afsettings.blockedCompanies.splice(index, 1);
     
      chrome.storage.sync.set({ "afsettings": result.afsettings }).then(() => {
       
      });
  });
}

function deleteBlockedTitle(e){
  chrome.storage.sync.get(["afsettings"]).then((result) => {

    const index = result.afsettings.blockedTitles.indexOf(this.innerText);
      result.afsettings.blockedTitles.splice(index, 1);
     
      chrome.storage.sync.set({ "afsettings": result.afsettings }).then(() => {
       
      });
  });
}

chrome.storage.sync.get(["jobKeys"], function (result) {


const container = document.getElementById("lastJob");
if (result.jobKeys != undefined) {
  
  const jobKey = result.jobKeys.pop()

  let titleP = document.createElement("p");
  titleP.textContent = "Titel: " + jobKey.title;
  
  let companyP = document.createElement("p");
  companyP.textContent = "Företag: " + jobKey.company;
  
  let kindOfJobP = document.createElement("p");
  kindOfJobP.textContent = "Roll: " + jobKey.kindOfJob;
  
  let locationP = document.createElement("p");
  locationP.textContent = "Plats: " + jobKey.location;
  
  container.appendChild(titleP);
  container.appendChild(companyP);
  container.appendChild(kindOfJobP);
  container.appendChild(locationP);
}


let activityButton = document.createElement("button");
activityButton.innerText = "Aktivitetsrapportera";
activityButton.className = "activityButton";
let activityLink = document.createElement("a");
activityLink.href = "https://arbetsformedlingen.se/for-arbetssokande/mina-sidor/aktivitetsrapportera/lagg-till-aktivitet";
activityLink.target = "_blank";
activityLink.appendChild(activityButton);
container.appendChild(activityLink);



chrome.storage.sync.get(["afsettings"]).then((result) => {
  if(result.afsettings != undefined)
  {
    addBlockedCompanies(result.afsettings.blockedCompanies);
    addBlockedTitles(result.afsettings.blockedTitles)

  }
})

});

function createSearchedJobsElements(){
  let searchedJobsEl = document.getElementById("searchedJobs");

  chrome.storage.sync.get(["jobKeys"], function (result) {
        
        if (result.jobKeys == undefined){
        let emptyEl = document.createElement("p");
        emptyEl.innerText = "Inga jobb hittade";
        searchedJobsEl.appendChild(emptyEl);
        }

        else {


          for (let jobKeyIndex = 0; jobKeyIndex < result.jobKeys.length; jobKeyIndex++) {
            let searchedJobEl = document.createElement("div");
            searchedJobEl.className = "container searchedJob"
            searchedJobEl.id = "searchedJob-" + jobKeyIndex;
            const jobKey = result.jobKeys[jobKeyIndex];

            let titleP = document.createElement("p");
            titleP.textContent = "Titel: " + jobKey.title;
            searchedJobEl.appendChild(titleP);
            
            let companyP = document.createElement("p");
            companyP.textContent = "Företag: " + jobKey.company;
            searchedJobEl.appendChild(companyP);
            
            let kindOfJobP = document.createElement("p");
            kindOfJobP.textContent = "Roll: " + jobKey.kindOfJob;
            searchedJobEl.appendChild(kindOfJobP);

            let locationP = document.createElement("p");
            locationP.textContent = "Plats: " + jobKey.location;
            searchedJobEl.appendChild(locationP);

            let urlA = document.createElement("a");
            urlA.textContent = "Url: " + jobKey.url;
            urlA.href = jobKey.url;
            searchedJobEl.appendChild(urlA);

            let searchedBox = document.createElement("input");
            searchedBox.type = "checkbox";
            searchedBox.checked = jobKey.searched;
            searchedJobEl.appendChild(searchedBox);

            searchedJobsEl.appendChild(searchedJobEl);
          }
          
        }
      });
}

function changeTab(buttonId){
  const tabOptionEls = Array.from(document.getElementsByClassName("tabOption"));

  tabOptionEls.forEach(buttonEl => {
    buttonEl.classList.add("hide");
  });


  if (buttonId == "lastJobButton"){
    const lastJobEl = document.getElementById("lastJob")
    lastJobEl.classList.remove("hide");
  }

  else if (buttonId == "searchedJobsButton"){
    const searchedJobsEl = document.getElementById("searchedJobs")
    searchedJobsEl.classList.remove("hide");
  }

  else if (buttonId == "settingsButton"){
    const settingsEl = document.getElementById("settings")
    settingsEl.classList.remove("hide");
  }

}

document.getElementById("blockCompanyInputButton").addEventListener("click", addCompany);
document.getElementById("blockTitleInputButton").addEventListener("click", addTitle);
[...document.getElementsByClassName("tabButton")].forEach(buttonEl => {
buttonEl.addEventListener("click", () => changeTab(buttonEl.id))
});

createSearchedJobsElements();