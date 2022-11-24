
  if(!isNaN(window.location.href.slice(-1)))
  {
    setTimeout(() => {
      
      let tagInfo = document.getElementsByTagName("pb-section-job-quick-info");
      if(tagInfo[0] !== undefined)
      {
        const jobInfo = tagInfo[0].children;
    
      const title = jobInfo[0].innerHTML;
      const company = jobInfo[1].innerHTML;
      const kindOfJob = jobInfo[2].children[0].innerHTML;
      let location = jobInfo[2].children[1].innerHTML;
    
      location = location.substring(location.lastIndexOf(" "));
    
      const job = {
        title: title,
        company: company,
        kindOfJob: kindOfJob,
        location: location,
      };
    
      chrome.storage.sync.set({ "jobKey": job }, function () {
        console.log("saved");
      });
      }
      
    }, "1000");
  }
