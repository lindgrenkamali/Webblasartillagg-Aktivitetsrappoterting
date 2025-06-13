
setTimeout(() => {
    chrome.storage.sync.get(["jobKey"], function (result) {
    inputJob(result);
    });

    
  }, "1000");


  function setLocation(result){
  let workLocation = document.getElementById("soktjobb-ort"); 
   workLocation.focus();
   const location = result.jobKey.location;
   const formatted_location = location.slice(1, location.length);
   const location_sliced = formatted_location.slice(0, formatted_location.length-1);
   document.execCommand("insertText", false, location_sliced);

   document.getElementById(`listItem + ${formatted_location}`).click();

   return formatted_location;
  }


  function inputJob(result)
  {
    document.getElementsByName("typ")[0].click();

   let workGiver = document.getElementById("soktjobb-arbetsgivare");
   workGiver.focus();
   document.execCommand("insertText", false, result.jobKey.company);

   let workSearched = document.getElementById("soktjobb-soktTjanst");
   workSearched.focus();

   document.execCommand("insertText", false, result.jobKey.title);

   setLocation(result);


   document.getElementById("soktjobb").addEventListener("submit", removeJobKey);
  }

  function removeJobKey()
  {
    chrome.storage.sync.remove(["jobKey"], function(){});
  }