// TODO: Get user location and show weather of his place
// TODO: Get user time and show
// TODO: Get API for search time and show

// const url = 'http://worldtimeapi.org/api/timezone/Asia/Tashkent'

// fetch(url)
//   .then(res => res.json())
//   .then(data => console.log(data))

// Vars
const userTime = document.querySelector('.header__title_time'),
  mainTemp = document.querySelector('.main__hero_temperature'),
  mainWeath = document.querySelector('.main__hero_weather'),
  mainIcon = document.querySelector('.main__hero-weather'),
  mainMinMax = document.querySelector('.main__hero-min-max'),
  sunrise = document.querySelector('.main__info_sunrise-time'),
  sunset = document.querySelector('.main__info_sunset-time'),
  uv = document.querySelector('.main__info_uv-index'),
  humidity = document.querySelector('.main__info_humidity'),
  wind = document.querySelector('.main__info_wind')

// * Show user's time
function userTimeZone() {
  const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  setInterval(() => {
    const userDate = new Date()
    const userHour = userDate.getHours()
    const userMinute = userDate.getMinutes()
    const userMonth = month[userDate.getMonth()]
    const userDay = userDate.getDate()
    let userTimeDay
    if (userHour => 6 || userHour == 12) {
      userTimeDay = 'am'
    } else {
      userTimeDay = 'pm'
    }

    return userTime.innerHTML = `${userMonth} ${userDay}, ${userHour.toString().padStart(2, '0')}:${userMinute.toString().padStart(2, '0')} ${userTimeDay}`
  }, 1000);
}
userTimeZone()


// * Get user location
async function getLocation() {
  await fetch('http://api.ipstack.com/check?access_key=0db0834f1061c0ef68f6a012e9009bff')
    .then(res => res.json())
    .then(data => {
      console.log(data)
      document.querySelector('.header__title_city').innerHTML = `${data.city}, ${data.country_code} ${data.location.country_flag_emoji}`
      mainWeather(data.city)
    })
}
getLocation()


// * Get Main Temperature
async function mainWeather(city) {
  await fetch(`http://api.weatherapi.com/v1/forecast.json?key=53b086512bce414fa0852110231203&q=${city}`)
    .then(res => res.json())
    .then(data => mainWetaherInfos(data))
}

function mainWetaherInfos(data) {
  console.log(data)
  mainTemp.innerHTML = `${data.current.temp_c}°`
  mainWeath.innerHTML = `${data.current.condition.text}`
  mainIcon.innerHTML = `<img src="./img/Mostly Sunny.svg" alt="" class="main__hero-weather_icon">`
  mainMinMax.innerHTML = `
  <span class="main__hero_min"><span class="main__hero-min-max--opacity">↑</span> ${Math.floor(data.forecast.forecastday[0].day.maxtemp_c)}°</span>
  <span class="main__hero_max"><span class="main__hero-min-max--opacity">↓</span> ${Math.floor(data.forecast.forecastday[0].day.mintemp_c)}°</span>`

  // Show Sunrise Sunset
  sunrise.innerHTML = data.forecast.forecastday[0].astro.sunrise
  sunset.innerHTML = data.forecast.forecastday[0].astro.sunset

  // UV
  if (data.current.uv >= 0 || data.current.uv <= 11) {
    uv.innerHTML = 'Low'
  } else {
    uv.innerHTML = 'Hight'
  }

  // Humidity / Wind
  humidity.innerHTML = `${data.current.humidity}%`
  wind.innerHTML = `${Math.floor(data.current.wind_kph)} k/h`
}

// 'https://api.tomorrow.io/v4/timelines?location=40.75872069597532,-73.98529171943665&fields=temperature&timesteps=1h&units=metric&apikey=msEA5A4IAYM0RNirDKrjdwxQSmCA9X3A'
// fetch('https://api.stormglass.io/v2/')
//   .then(res => res.json())
//   .then(data => console.log(data))
