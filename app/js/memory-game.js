/*!
 * memory game
 * Simple Game for memory training
 * 
 * 
 * @author Nour-Eddine ECH-CHEBABY
 * @version 1.0.0
 * @version https://github.com/chebaby/memory-game
 * 
 * 
 * Copyright 2017. ISC licensed.
 * 
 */
'use strict';

document.addEventListener('readystatechange', function (event) {

	if (event.target.readyState === 'complete') {
		(function () {

			var boardContainer = document.getElementById('board');
			var alert = document.querySelector('.alert');
			var timeToGoElement = document.querySelector('.timeToGo');
			var cardsContent = ['A', 'A', 'B', 'B', 'C', 'C', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H', 'I', 'I', 'J', 'J', 'K', 'K', 'L', 'L', 'M', 'M', 'N', 'N', 'O', 'O', 'P', 'P', 'Q', 'Q', 'R', 'R', 'S', 'S', 'T', 'T', 'V', 'V', 'W', 'W', 'X', 'X', 'Y', 'Y', 'D', 'D'];
			var cardsValues = [];
			var cardsClicked = [];
			var cardsFlipped = 0;
			var cardBgColorInitial = '#868686';
			var cardBgColorFlipped = '#fff';
			var flipCardBackDelay = 750;
			var alertDelay = 5000;
			var countDown = alertDelay / 1000;
			var flipCardBackTimeOut = void 0;
			var alertCountDownOut = void 0;

			var alertCountDown = function alertCountDown() {

				alert.classList.remove('hidden');

				alertCountDownOut = setInterval(function () {

					timeToGoElement.innerHTML = countDown - 1 + ' seconds...';
					countDown--;

					if (countDown < 0) {
						alert.classList.add('hidden');
						clearInterval(alertCountDownOut);
					}
				}, 1000);
			};

			var shuffle = function shuffle(array) {

				var i = array.length,
				    j = void 0,
				    temp = void 0;

				while (--i > 0) {
					j = Math.floor(Math.random() * (i + 1));
					temp = array[j];
					array[j] = array[i];
					array[i] = temp;
				}

				return array;
			};

			var newBoard = function newBoard() {

				var card = '';
				cardsFlipped = 0;

				for (var i = 0; i < cardsContent.length; i++) {
					card += '<div class="card" data-value="' + cardsContent[i] + '"></div>';
				}
				boardContainer.innerHTML = '';
				boardContainer.innerHTML = card;

				return boardContainer;
			};

			var flipCardBack = function flipCardBack(firstCard, secondCard) {

				if (firstCard !== undefined && secondCard !== undefined) {

					clearTimeout(flipCardBackTimeOut);

					flipCardBackTimeOut = setTimeout(function () {

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

			var flipCard = function flipCard(card) {

				var value = card.dataset.value;

				if (card.innerHTML === '' && cardsValues.length < 2) {

					card.style.background = cardBgColorFlipped;
					card.innerHTML = value;

					// if the card has already fliped class
					// remove it so we can see the animation
					// when the card flip back
					if (card.classList.contains('fliped')) {
						card.classList.remove('fliped');
					}

					if (cardsValues.length === 0 || cardsValues.length === 1) {

						cardsValues.push(value);
						cardsClicked.push(card);

						// if you found match
						if (cardsValues[0] === cardsValues[1]) {

							cardsFlipped += 2;

							cardsValues = [];
							cardsClicked = [];

							if (cardsFlipped === cardsContent.length) {

								alertCountDown();
								newBoard();
							}
						} else {

							flipCardBack(cardsClicked[0], cardsClicked[1]);
						}
					}
				}
			};

			var initApp = function initApp() {

				shuffle(cardsContent);
				newBoard();

				var cards = document.querySelectorAll('.card');

				cards.forEach(function (card) {

					card.addEventListener('click', function () {

						flipCard(this);
					}, false);
				});
			};

			initApp();
		})();
	}
}, false);