console.log(randomPersonData);
const main = document.querySelector('main');

const onlyUnique = (value, index, self) => self.indexOf(value) === index;

const onlyFemale = (self) => self.gender === "female";

const onlyCapricorn = (self) => {
	return self.zodiac === "Capricorn"
}

function zodiac(day, month) {
	var zodiac = ['', 'Capricorn', 'Aquarius', 'Pisces', 'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn'];
	var last_day = ['', 19, 18, 20, 20, 21, 21, 22, 22, 21, 22, 21, 20, 19];
	return (day > last_day[month]) ? zodiac[month * 1 + 1] : zodiac[month];
}

const assignZodiacSigns = () => {
	randomPersonData.forEach(person => {
		const birthdayArray = person.birthday.dmy.split('/');
		const day = birthdayArray[0];
		let month = birthdayArray[1];
		if (month.charAt(0) === "0") {
			month = month.substring(1);
		}
		person.zodiac = zodiac(day, month);
	})
}
assignZodiacSigns();

const olderThan30 = (self) => {
	return self.age > 30;
}

const createList = () => {
	main.innerHTML = "";
	const ol = document.createElement('ol');
	main.appendChild(ol);
	return ol;
}


const sortFirstNames = (a, b) => {
	if (a.name < b.name) {
		return -1;
	}
	if (a.name > b.name) {
		return 1;
	}
	return 0;
}

const getCountryList = () => {
	const regionArray = randomPersonData.map(person => person.region).sort();
	var uniqueRegions = regionArray.filter(onlyUnique);
	const ol = createList();
	uniqueRegions.forEach(item => {
		const li = document.createElement('li');
		li.innerHTML = item;
		ol.appendChild(li)
	})
}

const getCapricornWomen = () => {
	var womenArray = randomPersonData.filter(onlyFemale);
	var womenOlderThan30Array = womenArray.filter(olderThan30);
	var capricornWomenOlderThan30 = womenOlderThan30Array.filter(onlyCapricorn);
	capricornWomenOlderThan30.sort(sortFirstNames);
	const ol = createList();
	capricornWomenOlderThan30.forEach(item => {
		const li = document.createElement('li');
		li.innerHTML = `${item.name} ${item.surname}`;
		const img = document.createElement('img');
		img.src = item.photo;
		li.appendChild(img)
		ol.appendChild(li)
	})

	console.log(capricornWomenOlderThan30)
}

getCountryList();
getCapricornWomen();