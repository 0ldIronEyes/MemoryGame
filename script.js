const gameContainer = document.getElementById("game");

let selectedColors = [];
let clicking = false;
let winColors = [];

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
// it returns the same array with values shuffled
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
    newDiv.classList.add("card");




    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  if (!clicking)
  {
   if (!winColors.includes(event.target.classList[0]))
   {
    if (!event.target.classList.contains("selected") || !selectedColors.includes(event.target.classList[0]))
    {
        event.target.classList.toggle("selected");
        clicking = true;
        if (selectedColors.length > 0)
        {
            if (selectedColors[0] == event.target.classList[0])
            {
                winColors.push(event.target.classList[0])
                if (winColors.length >= (COLORS.length /2))
                {
                    alert("Congratulations! You win!")
                }          
                clicking = false;
                selectedColors = [];
            }
            else
            {    
                setTimeout(()=> { 
                    event.target.classList.toggle("selected");
                    for(let i = 0; i < gameContainer.childElementCount;i++)
                    {
                      if (!winColors.includes(gameContainer.children[i].classList[0]))
                      {
                        gameContainer.children[i].classList.remove("selected");  
                      }
                        
                    }
                    clicking = false;
                    selectedColors = [];
                 }, 1500)
            }
        } 
        else
        {
          selectedColors.push(event.target.classList[0]);
          clicking = false;
        }
      }
    }
  } 
    
}
 

// when the DOM loads
createDivsForColors(shuffledColors);
