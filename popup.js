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

chrome.storage.sync.get(["jobKey"], function (result) {


const container = document.getElementById("currentWork");

if (result.jobKey != undefined) {

  let titleP = document.createElement("p");
  titleP.textContent = "Titel: " + result.jobKey.title;
  
  let companyP = document.createElement("p");
  companyP.textContent = "Företag: " + result.jobKey.company;
  
  let kindOfJobP = document.createElement("p");
  kindOfJobP.textContent = "Roll: " + result.jobKey.kindOfJob;
  
  let locationP = document.createElement("p");
  locationP.textContent = "Plats: " + result.jobKey.location;
  
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

document.getElementById("blockCompanyInputButton").addEventListener("click", addCompany);
document.getElementById("blockTitleInputButton").addEventListener("click", addTitle);