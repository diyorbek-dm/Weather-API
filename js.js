// TODO: Get user location and show weather of his place
// TODO: Get user time and show
// TODO: Get API for search time and show

// const url = 'http://worldtimeapi.org/api/timezone/Asia/Tashkent'

// fetch(url)
//   .then(res => res.json())
//   .then(data => console.log(data))

// * Show user's time
const userTime = document.querySelector('.header__title_time')

const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

function userTimeZone() {
  const userDate = new Date()
  const userHour = userDate.getHours()
  const userMinute = userDate.getMinutes()
  const userMonth = month[userDate.getMonth()]
  const userDay = userDate.getDate()
  let userTimeDay
  if (userHour => 0) {
    userTimeDay = 'pm'
  } else {
    userTimeDay = 'am'
  }

  return userTime.innerHTML = `${userMonth} ${userDay}, ${userHour.toString().padStart(2, '0')}:${userMinute.toString().padStart(2, '0')} ${userTimeDay}`
}

userTimeZone()

// * Show user location
const showLocation = navigator.geolocation.getCurrentPosition(position => {
  let lat = position.coords.latitude
  let long = position.coords.longitude
  console.log(`Lat: ${lat} Lon: ${long}`)

  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=21237ed903dcc0ed991c94b44c3edd2f`)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      document.querySelector('.header__title_city').innerHTML = `${data.name}, ${data.sys.country}`
    })
})