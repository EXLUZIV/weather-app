let tempElement = document.querySelector('.temparature')
let cityElement = document.querySelector('.city')
let windElement = document.querySelector('.wind')
let precElement = document.querySelector('.precipitation')
let localDate = document.querySelector('.localTime')
let serwerDate = document.querySelector('.serwerTime')
let searchInp = document.querySelector('.searchCity')
let iconElement = document.querySelector('.imagineContent')

let dateHours = '00';
let dateMinutes = '00';
let dateSeconds = '00';

let city = 'London'

setInterval(() => {
	
	let date = new Date;
	if (date.getHours() <= 9) {
		dateHours = `0${date.getHours()}`
	} else {
		dateHours = date.getHours()
	}

	if (date.getMinutes() <= 9) {
		dateMinutes = `0${date.getMinutes()}`
	} else {
		dateMinutes = date.getMinutes()
	}

	if (date.getSeconds() <= 9) {
		dateSeconds = `0${date.getSeconds()}`
	} else {
		dateSeconds = date.getSeconds()
	}

	localDate.textContent = `Local time: ${dateHours}:${dateMinutes}:${dateSeconds}`

}, 1000)

document.addEventListener('keydown', (e) => {
	if (e.key === 'Enter') {
		let value = searchInp.value;
		if (!value) return false;
		city = value;
		init()
	}
})


function init() {
	fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d8ab6fa7d8e546410b9e56232aa1a750`)
		.then(resp => { return resp.json() })
		.then(data => {

			tempElement.textContent = `${temperature()}°`
			cityElement.textContent = `${data.name}`
			windElement.textContent = `${data.wind.speed} km/h`
			precElement.textContent = `${data.weather[0]['description']}`
			iconElement.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png">`

			function temperature() {

				let getTemp = data.main.temp
				let tempC = Math.round(getTemp) - 273
				return tempC
			}

			serwerDate.textContent = `Serwer time: ${dateHours}:${dateMinutes}:${dateSeconds}`

		})

		.catch(() => {
		
			alert(`This city doesn't exist`)
			city = 'London'
			init()
		
		})
}

init()

setInterval(() => {
	init()

}, 10000)