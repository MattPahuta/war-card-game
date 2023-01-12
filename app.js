// WAR - async JS code
let deckId;
const cardsContainer = document.getElementById('cards');
const newDeckBtn = document.getElementById('new-deck');
const drawCardsBtn = document.getElementById('draw-cards');
const message = document.getElementById('message');
const cardsRemaining = document.getElementById('cards-remaining');
const cpuScoreDisplay = document.getElementById('cpu-score');
const humanScoreDisplay = document.getElementById('human-score');
let cpuScore = 0;
let humanScore = 0;

async function handleClick() {
  const res = await fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
  const data = await res.json()
    deckId = data.deck_id;
    console.log(deckId)
    cardsRemaining.textContent = data.remaining;
}

// draw two cards (after getting a deck)
async function drawCards() {
  const res = await fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
  const data = await res.json()
    cardsRemaining.textContent = data.remaining;
    // console.log(data.cards)
    // display images of 2 cards returned 
    cardsContainer.children[0].innerHTML = `
      <img src=${data.cards[0].image} alt="card" class="card" />
      `
    cardsContainer.children[1].innerHTML = `
      <img src=${data.cards[1].image} alt="card" class="card" />
      `
    console.log(data.cards[0])
    console.log(data.cards[1])
    message.textContent = scoreHand(data.cards[0], data.cards[1]);
  
    // disabled draw button when there's no more cards in the deck
    if (data.remaining === 0) {
      drawCardsBtn.disabled = true;
      determineGameWinner()
    }

}

function determineGameWinner() {
  if (cpuScore > humanScore) {
    message.textContent = 'The Computer Wins the Game!'
  } else if (humanScore > cpuScore) {
    message.textContent = 'You Won the Game!'
  } else {
    message.textContent = 'The Game Ended Tied!'
  }
}

// determine which card wins
function scoreHand(card1, card2) {
  // assign score based on array index
  const cardValues = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "JACK", "QUEEN", "KING", "ACE"];
  const card1Val = cardValues.indexOf(card1.value);
  const card2Val = cardValues.indexOf(card2.value);
  console.log('Computer card value: ', card1Val)
  console.log(typeof card1Val)
  console.log(typeof card2Val)
  console.log('Human card value: ', card2Val)

  if (card1Val === card2Val) {
    return 'War!'
  } else if (card1Val > card2Val) {
    cpuScore += 1;
    cpuScoreDisplay.textContent = cpuScore;
    return 'Computer Wins!'
  } else {
    humanScore += 1;
    humanScoreDisplay.textContent = humanScore;
    return 'You Win!'
  }

}


// *** event listeners
newDeckBtn.addEventListener('click', handleClick);
drawCardsBtn.addEventListener('click', drawCards);