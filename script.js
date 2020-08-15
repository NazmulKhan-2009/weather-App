
class UI {
  constructor(){
      this.location = document.getElementById('location');
      this.description = document.getElementById('description');
      this.temp = document.getElementById('temp-status');
      this.icon = document.getElementById('icon-status');
      
  }

  paint(weather){
      this.location.textContent = weather.name;
      this.description.textContent = weather.weather[0].description;
      this.temp.textContent = Math.floor(weather.main.temp - 273.15) + ' º C';
      this.icon.src = `http://openweathermap.org/img/w/${weather.weather[0].icon}.png`;

      
  }
  
  notFound(weather){
      this.location.textContent = 'NOT FOUND';
      this.description.textContent = '';
      this.temp.textContent = '';
      this.icon.src = ``;
     
  }

}


class Weather {
  constructor(city){
      this.city = city;
      this.appid = 'bd10046a88c7d5c3a2af42bba2e0df7e';
  }

  
  async getWeather() {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.appid}`);
      const resData = await response.json();
      return resData;
      // console.log(resData);
  }

  
}


const ui = new UI;
// Fetch City fromn IP
async function getCity() {
    let data = await (await fetch('https://ipapi.co/json/')).json();
    return data.city 
}

getCity().then(data => {
    const weather = new Weather(data);
    weather.getWeather()
    .then(data => {
        //console.log(data);
        ui.paint(data);
    })
    .catch(err => ui.notFound(err));
});

document.getElementById('change-location').addEventListener('click', function(){
    const city = document.getElementById('city-name');

    if(city.value === ''){
        alert(`Please Input the City Name`);
    }else{
    const weather = new Weather(city.value);
    weather.getWeather()
    .then(data => {
        ui.paint(data);
    })
    .catch(err => ui.notFound(err));
    }
});