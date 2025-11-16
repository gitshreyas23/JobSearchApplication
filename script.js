document.getElementById('job-form').addEventListener('submit',function(event){
    event.preventDefault();
    let quer = document.getElementById('query').value;
    let country = document.getElementById('country').value;
    fetchJob(quer,country)
});

const fetchJob = async(query,country) => {

    let loadingPara = document.getElementById('loading');
    loadingPara.style.display = 'block';

    let queryParam = query.trim()==='' ? 'developer jobs in pune' : query;
    queryParam = queryParam.replace(/\s+/g,'%20');

    let countryParam = country.trim()==='' ? 'in' : country;
    countryParam = countryParam.replace(/\s+/g,'%20');

    const url = `https://jsearch.p.rapidapi.com/search?query=${queryParam}&page=1&num_pages=1&country=${countryParam}&date_posted=all`;

    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '9594119d90mshdabee4bb93f4a14p1985c4jsnf32cb6d72ee6',
            'x-rapidapi-host': 'jsearch.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        const resultArray = result.data;

        let output = `<h2>Job Results:</h2>`;
        resultArray.map((job) => {
            output += `<div class="job-card">
                <h3>${job.job_title}</h3>
                <p><strong>Company:</strong> ${job.employer_name}</p>
                <p><strong>Location:</strong> ${job.job_city}, ${job.job_country}</p>
                <p><strong>Posted:</strong> ${job.job_posted_at_datetime_utc}</p>
                <a href="${job.job_apply_link}" target="_blank">Apply Here</a>
            </div>`;
            loadingPara.style.display = 'none';
        document.getElementById('job-results').innerHTML = output;
        })

        

    } catch (error) {
        console.error(error);
    }
    

};
