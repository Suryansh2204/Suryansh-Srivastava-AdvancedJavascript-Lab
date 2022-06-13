const api = {
  key: "ee086407e7b30857498581fe8849228c",
  base: "https://api.openweathermap.org/data/2.5/",
};

let search = document.querySelector(".search");

getResults("Delhi");

function setQuery(e) {
  if (e.keyCode == 13) {
    getResults(search.value);
  }
}

function getResults(query) {
  const url = `${api.base}weather?q=${query}&appid=${api.key}&units=metric`;

  fetch(url)
  .then(response=>{
      return response.json();
  }).then(weatherResponse=>{
      console.log(weatherResponse);
      if(weatherResponse.cod==200){
        displayResults(weatherResponse);
      }else{
          alert(weatherResponse.message);
      }
  })
  .catch(err=>{
      console.log(err);
  })
}

function displayResults(weatherResponse){
    let city=document.querySelector(".city");
    let date=document.querySelector(".date");
    let temp=document.querySelector(".temp");
    let weather=document.querySelector(".weather");
    let hi_low=document.querySelector(".hi-low");

    city.innerText=`${weatherResponse.name},${weatherResponse.sys.country}`;
    temp.innerText=`${weatherResponse.main.temp}°C`;
    hi_low.innerText=`${weatherResponse.main.temp_min}°C / ${weatherResponse.main.temp_max}°C`;
    weather.innerText=`${weatherResponse.weather[0].main}`;

    let curr_date=new Date();
    date.innerText=dateBuilder(curr_date);
}

function dateBuilder(dt){
    const DATE_FORMAT_OPTIONS={
        month:'long',
        day:'numeric',
        year:'numeric',
        weekday:'long'
    };
    return dt.toLocaleDateString("en-US",DATE_FORMAT_OPTIONS);
}

search.addEventListener("keypress", setQuery);
