
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
        url: window.location.href,
        title: title,
        company: company,
        kindOfJob: kindOfJob,
        location: location,
        searched: false
      };
      
      chrome.storage.sync.get(["jobKeys"], function (result) {
        const jobs = [job]
        if (result.jobKeys == undefined){
        chrome.storage.sync.set({ "jobKeys": jobs });
        }

        else {
          let jobs = result.jobKeys;
          jobs.push(job);
          chrome.storage.sync.set({ "jobKeys": jobs });
        }
      });

      
      }
      
    }, "1000");
  }
