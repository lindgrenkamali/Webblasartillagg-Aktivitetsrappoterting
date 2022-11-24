
setTimeout(() => {
    chrome.storage.sync.get(["jobKey"], function (result) {
    inputJob(result);
    });

    
  }, "1000");

  function inputJob(result)
  {
    document.getElementsByName("typ")[0].click();

   let workGiver = document.getElementById("soktjobb-arbetsgivare");
   workGiver.focus();
   document.execCommand("insertText", false, result.jobKey.company);

   let workSearched = document.getElementById("soktjobb-soktTjanst");
   workSearched.focus();

   document.execCommand("insertText", false, result.jobKey.title);

   let workLocation = document.getElementById("soktjobb-ort"); 
   workLocation.focus();

   document.execCommand("insertText", false, result.jobKey.location);

   let workSearchDate = document.getElementById("soktjobb-aktivitetsdatum");
   workSearchDate.focus();

   const today = new Date();

   const todayDate = today.getFullYear() + "-" + today.getMonth() + "-" + today.getDate();

   document.execCommand("insertText", false, todayDate);

   document.getElementById("soktjobb").addEventListener("submit", removeJobKey);
  }

  function removeJobKey()
  {
    chrome.storage.sync.remove(["jobKey"], function(){});
  }