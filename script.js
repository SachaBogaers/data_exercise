console.log(randomPersonData);
const main = document.querySelector('main');

const onlyUnique = (value, index, self) => self.indexOf(value) === index;

const onlyFemale = (self) => self.gender === "female";

const isAdult = (self) => self.age >= 18;

const creditCardExpiringSoon = (self) => {
	const today = new Date();
	const creditCardExpiring = self.credit_card.expiration.split('/');
	const monthExpiring = creditCardExpiring[0];
	const yearExpiring = parseInt(`20${creditCardExpiring[1]}`);
	const currentMonth = today.getMonth() + 1;
	const currentYear = today.getFullYear();
	console.log(monthExpiring, yearExpiring, currentMonth, currentYear);
	if (currentYear === yearExpiring) {
		if (currentMonth <= monthExpiring) {
			console.log("expiring this year")
			return true;
		} else {
			console.log("already expired!")
			return false;
		}
	} else if (yearExpiring === currentYear + 1) {
		if (currentMonth > monthExpiring) {
			console.log("expiring in the coming year");
			return true;
		} else {
			console.log("expiring next year but not in the coming year")
			return false;
		}

	} else {
		console.log("not expiring in the next year but in ", yearExpiring)
		return false;
	}
}

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

/* Maak een lijst van mensen:

laat per persoon de volgende data zien
voornaam, achternaam
telefoonnummer
creditcardnummer
verloopdatum
De lijst mag alleen volwassenen bevatten.

De verloopdatum moet in de toekomst liggen (van dit jaar).

De verloopdatum moet in het komende jaar liggen.

Sorteer de lijst zodat de snelst verlopende creditcards bovenaan staan. */

const getListOfOldCreditCards = () => {
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
	const ol = createList();
	regionArray.forEach(item => {
		const li = document.createElement('li');
		li.innerHTML = item;
		ol.appendChild(li)
	})
}

getCountryList();
getCapricornWomen();
getListOfOldCreditCards();
getListOfMostPeople();