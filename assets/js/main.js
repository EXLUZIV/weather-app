// d8ab6fa7d8e546410b9e56232aa1a750- api keys

// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

let tempElement = document.querySelector('.temparature')
let cityElement = document.querySelector('.city')
let imgElement = document.querySelector('.image-temperature')
let windElement = document.querySelector('.wind')
let precElement = document.querySelector('.precipitation')
let local_date = document.querySelector('.local-time')
let serwer_date = document.querySelector('.serwer-time')
let searchInp = document.querySelector('.search-city')
let iconElement = document.querySelector('.imagineContent')


let city = 'Kyiv'

setInterval(() => {
	let date = new Date;
	local_date.textContent = `Local time: ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
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
			console.log(iconElement)


			function temperature() {
				let getTemp = data.main.temp
				let tempC = Math.round(getTemp) - 273
				return tempC
			}

			let date = new Date;
			serwer_date.textContent = `Serwer time: ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`

			console.log('Restart')
		})
		.catch(() => {
			alert(`This city doesn't exist`)
			city = 'Kyiv'
			init()
		})
}

init()

setInterval(() => {
	init()
}, 10000)