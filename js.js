// Vars
const userCityName = document.querySelector('.header__title_city'),
  userTime = document.querySelector('.header__title_time'),
  mainHero = document.querySelector('.main__hero'),
  mainInfo = document.querySelector('.main__info'),
  mainInfos = document.querySelector('.main__info-infos'),
  mainHours = document.querySelector('.main__hour'),
  cityHour = document.querySelector('.main__hour-city'),
  searchTool = document.querySelector('.header__serach--tool'),
  searchBtn = document.querySelector('.header__search_btn'),
  searchDel = document.querySelector('.search__del'),
  toolItems = document.querySelector('.header__tool_items'),
  toolItem = document.querySelector('.header__tool-item'),
  tool = document.querySelector('.header__serach--tool'),
  toolItemCity = document.querySelector('.tool__item_city'),
  toolItemTemperature = document.querySelector('.tool__item_temperature'),
  toolItemIcon = document.querySelector('.tool__item_icon'),
  error = document.querySelector('.error')

// let geoKey = '0db0834f1061c0ef68f6a012e9009bff' // ? New key 4d82a65b5664adb9613d285e27703dbe
let geoKey = '4d82a65b5664adb9613d285e27703dbe' // ? New key 4d82a65b5664adb9613d285e27703dbe

// Get user location
async function getLocation() {
  try {
    const res = await fetch(`https://api.ipstack.com/check?access_key=${geoKey}`)
    const data = await res.json()
    showHeaderCity(data)
  } catch (error) {
    console.error(error)
  }
}
getLocation()


// User City Name
function showHeaderCity(data) {
  console.log(data)
  userCityName.innerHTML = `${data.city}, ${data.country_code} ${data.location.country_flag_emoji}`

  mainWeather(data)
}


// Get Main Temperature
async function mainWeather(city) {
  try {
    const res = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=53b086512bce414fa0852110231203&q=${city}`)
    const data = await res.json()
    mainWetaherInfos(data)
  } catch (error) {
    console.error(error)
  }
}


// Main Temperature and Weather
function mainWetaherInfos(data) {
  mainHero.innerHTML = `
      <div class="main__hero-title">
        <h1 class="main__hero_temperature">${Math.floor(data.current.temp_c)}°</h1>
        <h2 class="main__hero_weather">${data.current.condition.text}</h2>

        <div class="main__hero-min-max">
          <span class="main__hero_min"><span class="main__hero-min-max--opacity">↑</span> ${Math.floor(data.forecast.forecastday[0].day.maxtemp_c)}° </span>
          <span class="main__hero_max"><span class="main__hero-min-max--opacity">↓</span> ${Math.floor(data.forecast.forecastday[0].day.mintemp_c)}°</span>
        </div>
      </div>

    <div class="main__hero-weather">
      <img src="./img/Mostly Sunny.svg" alt="" class="main__hero-weather_icon">
    </div>
  `

  mainWeatherDetails(data)
}


// Main Weather Info - Sunrise / Sunset / UV / Humidity / Wind
function mainWeatherDetails(data) {
  let uvIndex

  if (data.current.uv >= 0 || data.current.uv <= 11) {
    uvIndex = 'Low'
  } else {
    uvIndex = 'Hight'
  }

  mainInfo.innerHTML = `
      <div class="main__info-sunrise-sunset">
        <div class="main__info-sunrise sunrise-sunset">
          <img src="./img/sunrise-icon.svg" alt="" class="main__infp_sun-img">
        <div class="main__info-title">
          <span>Sunrise</span>
          <h2 class="main__info_sunrise-time">${data.forecast.forecastday[0].astro.sunrise}</h2>
        </div>
      </div>

      <div class="main__info-sunset sunrise-sunset">
        <img src="./img/sunset-icon.svg" alt="" class="main__infp_sun-img">
        <div class="main__info-title">
          <span>Sunset</span>
          <h2 class="main__info_sunset-time">${data.forecast.forecastday[0].astro.sunset}</h2>
        </div>
      </div>
    </div>

    <div class="main__info-infos">
      <div class="main__info-item">
        <img src="./img/uv-index.svg" alt="">
        <h2 class="main__info_uv-index">${uvIndex}</h2>
        <span>UV</span>
      </div>

      <div class="main__info-item">
        <img src="./img/humidity-icon.svg" alt="">
        <h2 class="main__info_humidity">${data.current.humidity}%</h2>
        <span>Humidity</span>
      </div>

      <div class="main__info-item">
        <img src="./img/wind-icon.svg" alt="">
        <h2 class="main__info_wind">${Math.floor(data.current.wind_kph)} km/h</h2>
        <span>Wind</span>
      </div>
    </div>
  `

  maintemperatureHours(data)
}


// Main Temperature Hours
function maintemperatureHours(data) {
  let amount = 0 - 1

  for (let i = 0; i < 24; i++) {
    ++amount

    let item = document.createElement('div')
    item.className = 'main__hour-item'

    item.innerHTML = `
      <div class="main__hour-item">
        <span class="main__hour-item_time">${amount.toString().padStart(2, '0')}:00</span>
        <img src="./img/Mostly Cloudy.svg" alt="" class="main__hour-item_weather">
        <h3 class="main__hour-item_temperature">${Math.floor(data.forecast.forecastday[0].hour[i].temp_c)}°</h3>

        <div class="main__hour-huminity">
          <img src="./img/humidity-icon.svg" alt="" class="main__hour-huminity_icon">
          <h5 class="main__hour-item_humidity">${Math.floor(data.forecast.forecastday[0].hour[i].humidity)}%</h5>
        </div>
    </div>
    `

    mainHours.append(item)
  }
}

const city = document.querySelector('.search-city')

searchBtn.addEventListener('click', () => {
  searchTool.classList.add('active')

  searchDel.classList.add('active')
  searchBtn.classList.add('none')

  toolItem.classList.remove('active')
  document.querySelector('.item-hr ').classList.remove('active')

  city.value = ''
})


searchDel.addEventListener('click', () => {

  if (city.value == '') {
    error.classList.add('active')
  } else {
    searchCity(city.value)
    error.classList.remove('active')
  }
})


// Search City
async function searchCity(city) {
  try {
    const res = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=53b086512bce414fa0852110231203&q=${city}`)
    const data = await res.json()
    await showSearchCity(data)
    toolItem.addEventListener('click', () => {
      showSearchCityWeather(data)
      userCityName.innerHTML = `${data.location.name}`
    })
  } catch (error) {
    console.error(error)
  }
}


// Show Search City
async function showSearchCity(data) {
  console.log(data)

  if (data) {
    toolItem.classList.add('active')
    document.querySelector('.item-hr ').classList.add('active')

    toolItemCity.innerHTML = `${data.location.name}, ${data.location.country}`
    toolItemTemperature.innerHTML = `${Math.floor(data.current.temp_c)}°`
  } else {
    toolItem.classList.remove('active')
    document.querySelector('.item-hr ').classList.remove('active')
  }
}


// City Hero Weather
function showSearchCityWeather(data) {
  console.log('main')

  // userCityName.innerHTML = `${}`

  searchTool.classList.remove('active')
  searchDel.classList.remove('active')
  searchBtn.classList.remove('none')

  mainHero.innerHTML = `
      <div class="main__hero-title">
        <h1 class="main__hero_temperature">${Math.floor(data.current.temp_c)}°</h1>
        <h2 class="main__hero_weather">${data.current.condition.text}</h2>

        <div class="main__hero-min-max">
          <span class="main__hero_min"><span class="main__hero-min-max--opacity">↑</span> ${Math.floor(data.forecast.forecastday[0].day.maxtemp_c)}° </span>
          <span class="main__hero_max"><span class="main__hero-min-max--opacity">↓</span> ${Math.floor(data.forecast.forecastday[0].day.mintemp_c)}°</span>
        </div>
      </div>

    <div class="main__hero-weather">
      <img src="./img/Mostly Sunny.svg" alt="" class="main__hero-weather_icon">
    </div>
  `

  cityWeatherDetails(data)
}


// City Weather Info - Sunrise / Sunset / UV / Humidity / Wind
function cityWeatherDetails(data) {
  let uvIndex

  if (data.current.uv >= 0 || data.current.uv <= 11) {
    uvIndex = 'Low'
  } else {
    uvIndex = 'Hight'
  }

  mainInfo.innerHTML = `
      <div class="main__info-sunrise-sunset">
        <div class="main__info-sunrise sunrise-sunset">
          <img src="./img/sunrise-icon.svg" alt="" class="main__infp_sun-img">
        <div class="main__info-title">
          <span>Sunrise</span>
          <h2 class="main__info_sunrise-time">${data.forecast.forecastday[0].astro.sunrise}</h2>
        </div>
      </div>

      <div class="main__info-sunset sunrise-sunset">
        <img src="./img/sunset-icon.svg" alt="" class="main__infp_sun-img">
        <div class="main__info-title">
          <span>Sunset</span>
          <h2 class="main__info_sunset-time">${data.forecast.forecastday[0].astro.sunset}</h2>
        </div>
      </div>
    </div>

    <div class="main__info-infos">
      <div class="main__info-item">
        <img src="./img/uv-index.svg" alt="">
        <h2 class="main__info_uv-index">${uvIndex}</h2>
        <span>UV</span>
      </div>

      <div class="main__info-item">
        <img src="./img/humidity-icon.svg" alt="">
        <h2 class="main__info_humidity">${data.current.humidity}%</h2>
        <span>Humidity</span>
      </div>

      <div class="main__info-item">
        <img src="./img/wind-icon.svg" alt="">
        <h2 class="main__info_wind">${Math.floor(data.current.wind_kph)} km/h</h2>
        <span>Wind</span>
      </div>
    </div>
  `

  cityHours(data)
}


// City Temperature Hours
function cityHours(data) {
  console.log('hour')

  mainHours.classList.add('none')
  cityHour.classList.add('active')

  for (let i = 0; i < 24; i++) {
    let item = document.createElement('div')
    item.className = 'main__hour-item-city'
    item.innerHTML = `
      <div class="main__hour-item-city">
        <span class="main__hour-item_time-city">${i.toString().padStart(2, '0')}:00</span>
        <img src="./img/Mostly Cloudy.svg" alt="" class="main__hour-item_weather-city">
        <h3 class="main__hour-item_temperature-city">${Math.floor(data.forecast.forecastday[0].hour[i].temp_c)}°</h3>

        <div class="main__hour-huminity-city">
          <img src="./img/humidity-icon.svg" alt="" class="main__hour-huminity_icon-city">
          <h5 class="main__hour-item_humidity-city">${Math.floor(data.forecast.forecastday[0].hour[i].humidity)}%</h5>
        </div>
    </div>
    `
    cityHour.append(item)
  }
}
