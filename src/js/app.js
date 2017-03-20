document.addEventListener('readystatechange', function(event) {

	if (event.target.readyState === 'complete') {

		let boardContainer = document.getElementById('board');
		let alert          = document.querySelector('.alert');
		let timeToGoElement= document.querySelector('.timeToGo');
		let cardsContent   = [

				'A', 'A', 'B', 'B', 'C', 'C', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H',
				'I', 'I', 'J', 'J', 'K', 'K', 'L', 'L', 'M', 'M', 'N', 'N', 'O', 'O',
				'P', 'P', 'Q', 'Q', 'R', 'R', 'S', 'S', 'T', 'T', 'V', 'V', 'W', 'W',
				'X', 'X', 'Y', 'Y', 'D', 'D'];
		let cardsValues        = [];
		let cardsClicked       = [];
		let cardsFlipped       = 0;
		let cardBgColorInitial = '#868686';
		let cardBgColorFlipped = '#fff';
		let flipCardBackDelay  = 750;
		let alertDelay         = 5000;
		let countDown          = alertDelay / 1000;
		let flipCardBackTimeOut;
		let alertCountDownOut;


		let alertCountDown = function() {

			alert.classList.remove('hidden');

			alertCountDownOut = setInterval(function() {

				timeToGoElement.innerHTML = `${countDown - 1} seconds...`;
				countDown--;

				if(countDown < 0) {
					alert.classList.add('hidden');
					clearInterval(alertCountDownOut);
				}

			}, 1000);
		};


		let shuffle = function(array) {

			let i = array.length,
					j,
					temp;

			while(--i > 0) {
				j = Math.floor(Math.random() * (i+1));
				temp = array[j];
				array[j] = array[i];
				array[i] = temp;
			}

			return array;
		};


		let newBoard = function() {
			
			let card = '';
			cardsFlipped = 0;

			for (var i = 0; i < cardsContent.length; i++) {
				card += '<div class="card" data-value="'+ cardsContent[i] +'"></div>';
			}
			boardContainer.innerHTML = '';
			boardContainer.innerHTML = card;

			return boardContainer;
		};


		let flipCardBack = function(firstCard, secondCard) {

			if(firstCard !== undefined && secondCard !== undefined) {

				clearTimeout(flipCardBackTimeOut);

				flipCardBackTimeOut = setTimeout(function() {

					firstCard.classList.add('fliped');
					firstCard.style.background = cardBgColorInitial;
					firstCard.innerHTML = '';

					secondCard.classList.add('fliped');
					secondCard.style.background = cardBgColorInitial;
					secondCard.innerHTML = '';

					cardsValues = [];
					cardsClicked = [];
				}, flipCardBackDelay);
			}
		};


		let flipCard = function(card) {

			let value = card.dataset.value;

			if(card.innerHTML === '' && cardsValues.length < 2) {

				card.style.background = cardBgColorFlipped;
				card.innerHTML        = value;

				// if the card has already fliped class
				// remove it so we can see the animation
				// when the card flip back
				if(card.classList.contains('fliped')) {
					card.classList.remove('fliped');
				}

				if(cardsValues.length === 0 || cardsValues.length === 1) {

					cardsValues.push(value);
					cardsClicked.push(card);

					// if you found match
					if(cardsValues[0] === cardsValues[1]) {

						cardsFlipped += 2;
						
						cardsValues  = [];
						cardsClicked = [];

						if(cardsFlipped === cardsContent.length) {

							alertCountDown();
							newBoard();
						}
					} else {

						flipCardBack(cardsClicked[0], cardsClicked[1]);
					}
				}
			}
		};


		let initApp = function() {

			shuffle(cardsContent);
			newBoard();

			let cards     = document.querySelectorAll('.card');

			cards.forEach( (card) => {

				card.addEventListener('click', function() { 

					flipCard(this);
					
				}, false);
			});	
		};


		initApp();
		
	}

}, false);

