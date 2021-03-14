const main = document.querySelector('main');
const countryListButton = document.querySelector('#button-country-list')
const capricornWomenButton = document.querySelector('#button-capricorn-women')
const expiringCreditCardsButton = document.querySelector('#button-expiring-creditcards')
const mostPeopleButton = document.querySelector('#button-most-people')
const averageAgeButton = document.querySelector('#button-average-age')
const matchMakingButton = document.querySelector('#button-matchmaking')

// DOM functions
const createList = () => {
	main.innerHTML = "";
	const ol = document.createElement('ol');
	main.appendChild(ol);
	return ol;
}

const createElement = (type, innerHTML, classList) => {
	const element = document.createElement(type);
	if (typeof innerHTML != 'undefined') {
		element.innerHTML = innerHTML;
	}
	if (typeof classList != 'undefined') {
		element.classList = classList;
	}
	return element;
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
			// Expiring this year
			return true;
		} else {
			// Already expired
			return false;
		}
	} else if (yearExpiring === currentYear + 1) {
		if (currentMonth > monthExpiring) {
			// Expiring in the coming year
			return true;
		} else {
			// Expiring next year, but not in coming 12 months
			return false;
		}
	} else {
		// Not expiring this or next year
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
	return averageAge;
}

