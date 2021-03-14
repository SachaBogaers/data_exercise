// Main button functions

const getCountryList = () => {
	const regionArray = randomPersonData.map(person => person.region).sort();
	var uniqueRegions = regionArray.filter(onlyUnique);
	const ol = createList();
	uniqueRegions.forEach(item => {
		const li = createElement('li', item)
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
		const li = createElement('li', `${item.name} ${item.surname}`)
		const img = createElement('img');
		img.src = item.photo;
		li.appendChild(img)
		ol.appendChild(li)
	})
}

const getListOfExpiringCreditCards = () => {
	const adults = randomPersonData.filter(isAdult);
	const peopleWithExpiringCreditcards = adults.filter(creditCardExpiringSoon);
	peopleWithExpiringCreditcards.sort(sortExpirationDates);
	const ol = createList();
	peopleWithExpiringCreditcards.forEach(item => {
		const li = createElement('li', `Name: ${item.name} ${item.surname}, 
		Phone number: ${item.phone}, credit card number: ${item.credit_card.number}, expiring: ${item.credit_card.expiration}`);
		ol.appendChild(li)
	})
}

const getListOfMostPeople = () => {
	const regionArray = randomPersonData.map(person => person.region).sort();
	const compressedArray = compressArray(regionArray);
	const sortedArray = compressedArray.sort(sortHighToLow)
	const ol = createList();
	compressedArray.forEach(item => {
		const li = createElement('li', `${item.value}: ${item.count} people`)
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
		const button = createElement('button', item);
		main.appendChild(button)
		button.addEventListener('click', function () {
			const averageAge = calculateAverageAge(event, regionsAndAges);
			const h2 = createElement('h2', `The average age in ${event.target.innerHTML} is ${averageAge}.`)
			main.appendChild(h2);
		})
	})
}





const matchMaking = () => {
	const sortedList = randomPersonData.sort(sortFirstNames);
	const ol = createList();
	sortedList.forEach(item => {
		const li = createElement('li', `${item.name} ${item.surname}, ${item.age}, ${item.region}, ${item.zodiac}`, `${item.surname} ${item.zodiac}`)
		const img = createElement('img');
		img.src = item.photo;
		li.appendChild(img)
		ol.appendChild(li);
		const button = createElement('button', "Find matches", item.zodiac.toLowerCase())
		li.appendChild(button);
		button.addEventListener("click", function () { findMatches(event) })
	})
};

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
	const h2 = createElement('h2', `Matching ${personInList[0].name} ${personInList[0].surname}, ${personInList[0].zodiac}`);
	main.appendChild(h2);
	const img = createElement('img');
	img.src = personInList[0].photo;
	main.appendChild(img)
	const h3 = createElement('h3', "Matches:")
	main.appendChild(h3);
	const ol = createElement('ol');
	main.appendChild(ol);
	matches.forEach(match => {
		const li = createElement('li', `${match.name} ${match.surname}, ${match.age}, ${match.region}`)
		ol.appendChild(li);
	})
}

countryListButton.addEventListener("click", getCountryList);
capricornWomenButton.addEventListener("click", getCapricornWomen);
expiringCreditCardsButton.addEventListener("click", getListOfExpiringCreditCards);
mostPeopleButton.addEventListener("click", getListOfMostPeople);
averageAgeButton.addEventListener("click", averageAge);
matchMakingButton.addEventListener("click", matchMaking);