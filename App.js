'use strict';
// Selecting Elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const currentEl0 = document.getElementById('current--0');
const currentEl1 = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//Starting conditions
let scores, currentscore, activeplayer, playing;
const init = function () {
  scores = [0, 0];
  currentscore = 0;
  activeplayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  currentEl0.textContent = 0;
  currentEl1.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

const switchPlayer = () => {
  document.getElementById(`current--${activeplayer}`).textContent = 0;
  activeplayer = activeplayer === 0 ? 1 : 0;
  currentscore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Rolling dice functionality
btnRoll.addEventListener('click', function () {
  // genrating random dice roll
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    // displaying the random dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // checked for rolled 1
    if (dice !== 1) {
      // add dice to current score
      currentscore += dice;
      document.getElementById(`current--${activeplayer}`).textContent =
        currentscore;
    } else {
      // switch player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  // 1. Add current score to active player's score
  if (playing) {
    scores[activeplayer] += currentscore;

    document.getElementById(`score--${activeplayer}`).textContent =
      scores[activeplayer];
    // 2. check if player's score is >= 100
    if (scores[activeplayer] >= 100) {
      // Finish game
      playing = false;
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.toggle('player--active');
      document.getElementById(`score--${activeplayer}`).textContent = 'Winner!';

      diceEl.classList.add('hidden');
    }
    // Switch to the next Player
    switchPlayer();
  }
});

btnNew.addEventListener('click', init);

