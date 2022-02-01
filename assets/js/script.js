document.querySelector(".input-container").addEventListener('keypress', () =>{
    let text = document.getElementById("filter-jobs").value;
    getJobs().then(jobs => {
        let filteredJobs = filterJobs(jobs, text);
        showJobs(filteredJobs);
        
        let number_of_jobs = `Showing ${filteredJobs.length} jobs`;
        document.getElementById("no-of-jobs").innerHTML = number_of_jobs;
    })
})



document.querySelector(".button-container").addEventListener("click", ()=> {
    let text = document.getElementById("filter-jobs").value;
    getJobs().then(jobs => {
        let filteredJobs = filterJobs(jobs, text);
        showJobs(filteredJobs);
        let number_of_jobs = `Showing ${filteredJobs.length} jobs`;
        document.getElementById("no-of-jobs").innerHTML = number_of_jobs;
    });
});

function getJobs(){
    return fetch("./assets/data/data.json")
    .then((response) => response.json())
    .then(data => {
        return data;
    });
}

function filterJobs(jobs, searchText){
    if(searchText){
        let filteredJobs = jobs.filter(job => {
            if(job.roleName.toLowerCase().includes(searchText) || job.type.toLowerCase().includes(searchText) || job.company.toLowerCase().includes(searchText) || job.requirements.content.toLowerCase().includes(searchText)){
                return true;
            } else  {
                return false;
            }
        })
        return filteredJobs;
    }
    else{
        return jobs;
    }
}

function showJobs(jobs){
    // console.log(jobs);
    let jobsContainer = document.querySelector(".jobs-container");
    let jobsHTML ="";
    jobs.forEach(job => {

        jobsHTML += `
        <div class="job-tile">
                <div class="top">
                    <img src="${job.logo}" alt="">
                    <span class="material-icons more_horiz">more_horiz</span>
                </div>
                <div class="rolename">
                    <span>${job.roleName}</span>
                </div>
                <div class="description">
                    <span>${job.requirements.content}</span>
                </div>
                <div class="buttons">
                    <div class="button apply-now">
                        Apply Now
                    </div>
                    <div class="button message-me">
                        Message
                    </div>
                </div>
            </div>
        `
    })
    // console.log(jobsHTML)
   jobsContainer.innerHTML = jobsHTML;
}

//when application is loaded
getJobs().then(data => {
    showJobs(data);
});