// WAR - async JS code
let deckId;

function handleClick() {
  fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then(res => res.json())
    .then(data => {
      console.log(data)
      deckId = data.deck_id;
    })
}

// draw two cards (after getting a deck)
function drawCards() {
  fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    .then(res => res.json())
    .then(data => console.log(data))
}

// event listeners
document.getElementById('new-deck').addEventListener('click', handleClick);
document.getElementById('draw-two').addEventListener('click', drawCards);