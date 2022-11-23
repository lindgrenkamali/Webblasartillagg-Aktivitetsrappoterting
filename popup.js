chrome.storage.sync.get(["jobKey"], function (result) {
  console.log("Value currently is " + result.jobKey.title);

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

});

