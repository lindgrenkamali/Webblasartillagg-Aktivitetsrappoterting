function addWorkGiver(){
  
  chrome.storage.sync.get(["afsettings"]).then((result) => {
    let bwg = [];

    let afsettings = {
      blockedWorkGivers: bwg
    };

    if(result.afsettings != undefined)
    {
      afsettings.blockedWorkGivers = result.afsettings.blockedWorkGivers;
    }

    const input = document.getElementById("blockInput").value;
    let newBlockedWorkGiverList = [input];

    if(input != "" && !afsettings.blockedWorkGivers.includes(input)){
      afsettings.blockedWorkGivers.push(input);
      chrome.storage.sync.set({ "afsettings": afsettings }).then(() => {
        
        addBlockedWorkGivers(newBlockedWorkGiverList);

      });
    }
  });
}

function addBlockedWorkGivers(workgivers)
{
  let workGiverUL = document.getElementById("blockedWorkGivers");

  workgivers.forEach(element => {
    let blockedWorkGiver = document.createElement("li");
      blockedWorkGiver.textContent = element;

      blockedWorkGiver.onclick = deleteBlockedWorkGiver;
      blockedWorkGiver.addEventListener("click", () => {
        blockedWorkGiver.remove();
      })

      
      workGiverUL.appendChild(blockedWorkGiver);
  })
}

function deleteBlockedWorkGiver(e)
{
  chrome.storage.sync.get(["afsettings"]).then((result) => {

    const index = result.afsettings.blockedWorkGivers.indexOf(this.innerText);
      result.afsettings.blockedWorkGivers.splice(index, 1);
     
      chrome.storage.sync.set({ "afsettings": result.afsettings }).then(() => {
       
      });
  });
}

chrome.storage.sync.get(["jobKey"], function (result) {

const container = document.getElementById("currentWork");

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
    addBlockedWorkGivers(result.afsettings.blockedWorkGivers);

  }
})

});

document.getElementById("blockInputButton").addEventListener("click", addWorkGiver);