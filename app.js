const gameContainer = document.getElementById("game");
let timer = document.querySelector('#timer');
let start = document.querySelector('#start');


const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// function sattoloVariationShuffleColors(COLORS) {
//   for (let i = COLORS.length -1; i>0; i--){
//     let j = Math.floor(Math.random() * (i+1));
//     [COLORS[i], COLORS[j]] = [COLORS[j], COLORS[i]];
// }
// return COLORS}// it returns the same array with values shuffled

// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}


let clockCounter = 0
document.getElementById('game').style.pointerEvents = 'none';
start.addEventListener('click', function(){
  document.getElementById('game').style.pointerEvents = 'auto';
  setInterval(function(){
    timer.innerHTML = "Time : " + clockCounter ++ + " seconds";
    return clockCounter
  }, 1000); 
});


// TODO: Implement this function!

let card1 = null;
let card2 = null;
let totalFlipped = 0
let noClick = false
let currentScore = 0

function handleCardClick(event) { 

  if (noClick) return;

  let clickedCard = event.target;
  clickedCard.style.backgroundColor = clickedCard.classList[0]; 


if (!card1 || !card2) {
  if(!clickedCard.classList.contains("flipped")) {
    scorefunc(currentScore+1);
  }
  clickedCard.classList.add("flipped");
  card1 = card1 || clickedCard;
  if (clickedCard === card1) {
      card2 = null;
  } else {
    card2 = clickedCard;
  }
}
  if (card1 && card2) {
    noClick = true

    let card1cn = card1.className;
    let card2cn = card2.className;
  
    if (card1cn === card2cn){
      totalFlipped += 2;
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
      card1 = null;
      card2 = null;
      noClick = false;
    } else {
      setTimeout(
      function() {
        card1.style.backgroundColor = "";
        card2.style.backgroundColor = "";
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        card1 = null;
        card2 = null;
        noClick = false;
      }, 
      200);
    }
  }
  if(totalFlipped == 10){
    alert("Total clicks: " + currentScore + " Total Times: " + clockCounter)
  }

}
function scorefunc(newScore) {
  currentScore = newScore
document.getElementById("score").innerText = "Clicks: " + currentScore
return currentScore
}
// alert("Total clicks: " + currentScore + "Total Times: " + clockCounter)
createDivsForColors(shuffledColors);