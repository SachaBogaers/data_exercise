const main = document.querySelector('main');

// DOM functions
const createList = () => {
	main.innerHTML = "";
	const ol = document.createElement('ol');
	main.appendChild(ol);
	return ol;
}


// Assigning Zodiac signs

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


// Filtering functions

const onlyUnique = (value, index, self) => self.indexOf(value) === index;
const onlyFemale = (self) => self.gender === "female";
const isAdult = (self) => self.age >= 18;
const onlyCapricorn = (self) => self.zodiac === "Capricorn";
const olderThan30 = (self) => self.age > 30;

const creditCardExpiringSoon = (self) => {
	const today = new Date();
	const creditCardExpiring = self.credit_card.expiration.split('/');
	const monthExpiring = creditCardExpiring[0];
	const yearExpiring = parseInt(`20${creditCardExpiring[1]}`);
	const currentMonth = today.getMonth() + 1;
	const currentYear = today.getFullYear();
	if (currentYear === yearExpiring) {
		if (currentMonth <= monthExpiring) {
			return true;
		} else {
			return false;
		}
	} else if (yearExpiring === currentYear + 1) {
		if (currentMonth > monthExpiring) {
			;
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	}
}


// Sorting functions

const sortFirstNames = (a, b) => {
	if (a.name < b.name) {
		return -1;
	}
	if (a.name > b.name) {
		return 1;
	}
	return 0;
}

function sortHighToLow(a, b) {
	if (a.count > b.count) {
		return -1;
	}
	if (a.count < b.count) {
		return 1;
	}
	return 0;
}

const sortExpirationDates = (a, b) => {
	const dateA = a.credit_card.expiration.split('/');
	const monthA = dateA[0];
	const yearA = dateA[1];
	const realDateA = new Date(`20${yearA}`, monthA, 0);
	const dateB = b.credit_card.expiration.split('/');
	const monthB = dateB[0];
	const yearB = dateB[1];
	const realDateB = new Date(`20${yearB}`, monthB, 0);
	if (realDateA < realDateB) {
		return -1;
	}
	if (realDateA > realDateB) {
		return 1;
	}
	return 0;
}


// Getting list with count of certain values

const compressArray = (original) => {
	var compressed = [];
	// make a copy of the input array
	var copy = original.slice(0);
	// first loop goes over every element
	for (var i = 0; i < original.length; i++) {
		var myCount = 0;
		// loop over every element in the copy and see if it's the same
		for (var w = 0; w < copy.length; w++) {
			if (original[i] == copy[w]) {
				// increase amount of times duplicate is found
				myCount++;
				// sets item to undefined
				delete copy[w];
			}
		}
		if (myCount > 0) {
			var a = new Object();
			a.value = original[i];
			a.count = myCount;
			compressed.push(a);
		}
	}
	return compressed;
};

// Calculations
const calculateAverageAge = (event, regionsAndAges) => {
	const target = event.target.innerHTML;
	const onlyThisCountry = regionsAndAges.filter(item => item.region === target);
	const agesInThisCountry = onlyThisCountry.map(item => item.age);
	const sumOfAges = agesInThisCountry.reduce((a, b) => a + b, 0);
	const averageAge = Math.round((sumOfAges / agesInThisCountry.length));
	const h2 = document.createElement('h2');
	h2.innerHTML = `The average age in ${target} is ${averageAge}.`
	main.appendChild(h2);
}

const findMatches = (event) => {
	const person = event.target.parentElement.classList
	const personName = person[0];
	const zodiac = person[person.length - 1];
	main.innerHTML = "";
	const personInList = randomPersonData.filter(obj => {
		return obj.surname.includes(personName)
	})
	const matchingZodiac = zodiac => {
		switch (zodiac) {
			case "Aries":
				return "Aquarius";
			case "Aquarius":
				return "Aries";
			case "Virgo":
				return "Cancer";
			case "Cancer":
				return "Virgo";
			case "Taurus":
				return "Capricorn";
			case "Capricorn":
				return "Taurus";
			case "Gemini":
				return "Libra";
			case "Libra":
				return "Gemini";
			case "Scorpio":
				return "Pisces";
			case "Pisces":
				return "Scorpio";
			case "Leo":
				return "Sagittarius";
			case "Sagittarius":
				return "Leo";
		}
	}
	const matches = randomPersonData.filter(obj => {
		return obj.zodiac === matchingZodiac(zodiac);
	}).filter(obj => !obj.surname.includes(personName));
	const h2 = document.createElement('h2');
	h2.innerHTML = `Matching ${personInList[0].name} ${personInList[0].surname}, ${personInList[0].zodiac}`
	main.appendChild(h2);
	const img = document.createElement('img');
	img.src = personInList[0].photo;
	main.appendChild(img)
	const h3 = document.createElement('h3');
	h3.innerHTML = "Matches:";
	main.appendChild(h3);
	const ol = document.createElement('ol');
	main.appendChild(ol);
	matches.forEach(match => {
		const li = document.createElement('li');
		li.innerHTML = `${match.name} ${match.surname}, ${match.age}, ${match.region}`
		ol.appendChild(li);
	})

}


// Main button functions

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
}

const getListOfExpiringCreditCards = () => {
	const adults = randomPersonData.filter(isAdult);
	const ol = createList();
	const peopleWithExpiringCreditcards = adults.filter(creditCardExpiringSoon);
	peopleWithExpiringCreditcards.sort(sortExpirationDates);
	console.log(peopleWithExpiringCreditcards);
	console.log(peopleWithExpiringCreditcards[0].credit_card.expiration.split('/'))
	peopleWithExpiringCreditcards.forEach(item => {
		const li = document.createElement('li');
		li.innerHTML = `Name: ${item.name} ${item.surname}, Phone number: ${item.phone}, credit card number: ${item.credit_card.number}, expiring: ${item.credit_card.expiration}`;
		ol.appendChild(li)
	})
}

const getListOfMostPeople = () => {
	const regionArray = randomPersonData.map(person => person.region).sort();
	const compressedArray = compressArray(regionArray);
	const sortedArray = compressedArray.sort(sortHighToLow)
	const ol = createList();
	compressedArray.forEach(item => {
		const li = document.createElement('li');
		li.innerHTML = `${item.value}: ${item.count} people`;
		ol.appendChild(li)
	})
}

const averageAge = () => {
	const regionsAndAges = randomPersonData.map(person => (
		{
			region: person.region,
			age: person.age
		}
	));
	const regionArray = regionsAndAges.map(person => person.region).sort();
	var uniqueRegions = regionArray.filter(onlyUnique);
	main.innerHTML = "";
	uniqueRegions.forEach(item => {
		const button = document.createElement('button');
		button.innerHTML = item;
		main.appendChild(button)
		button.addEventListener('click', function () { calculateAverageAge(event, regionsAndAges); })
	})
}




const matchMaking = () => {
	const sortedList = randomPersonData.sort(sortFirstNames);
	const ol = createList();
	sortedList.forEach(item => {
		const li = document.createElement('li');
		li.innerHTML = `${item.name} ${item.surname}, ${item.age}, ${item.region}, ${item.zodiac}`;
		li.classList = `${item.surname} ${item.zodiac}`;
		const img = document.createElement('img');
		img.src = item.photo;
		li.appendChild(img)
		ol.appendChild(li);
		const button = document.createElement('button');
		button.innerHTML = "Find matches";
		li.appendChild(button);
		button.classList = item.zodiac.toLowerCase();
		button.addEventListener("click", function () { findMatches(event) })
	})
}

document.querySelector('#button-country-list').addEventListener("click", getCountryList);
document.querySelector('#button-capricorn-women').addEventListener("click", getCapricornWomen);
document.querySelector('#button-expiring-creditcards').addEventListener("click", getListOfExpiringCreditCards);
document.querySelector('#button-most-people').addEventListener("click", getListOfMostPeople);
document.querySelector('#button-average-age').addEventListener("click", averageAge);
document.querySelector('#button-matchmaking').addEventListener("click", matchMaking);