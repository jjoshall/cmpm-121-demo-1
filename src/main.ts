import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Dirt to Diamonds";
document.title = gameName;

const button = document.createElement("button"); // Create a button
button.textContent = "💎⛏️"; // Setting the text of the button

let numClicks = 0; // Variable to keep track of the number of clicks
let numSeconds = 0; // Variable to keep track of the number of seconds
let growthRate = 0; // Variable to keep track of the growth rate of the diamonds
let isCounterActive = false; // Variable to keep track of whether the counter is active
const priceIncrement = 1.15; // Variable to keep track of the price increment
let autoMiner10Price = 10; // Variable to keep track of the price of the slow auto miner
let autoMiner100Price = 100; // Variable to keep track of the price of the fast auto miner
let autoMiner1000Price = 1000; // Variable to keep track of the price of the super fast auto miner
const diamondsCollected = document.createElement("div");
const growthRateText = document.createElement("div"); // Create a div for the growth rate text
growthRateText.textContent = `Diamond Rate: ${growthRate} 💎/s`; // Shows user what growth rate is

// Function that makes an automatic counter that will increase the number of diamonds collected every second
let lastTime = 0;
function updateCounter(time: number) {
  if (isCounterActive && time - lastTime >= 1000) {
    numSeconds += growthRate; // Increase the number of diamonds collected by the growth rate
    diamondsCollected.textContent = `${(numClicks + numSeconds).toFixed(2)} 💎`;
    growthRateText.textContent = `Diamond Rate: ${growthRate.toFixed(2)} 💎/s`;
    lastTime = time; // Update the last time

    // If the user has collected 10 diamonds or more, enable the slow auto miner button
    if (numClicks + numSeconds >= autoMiner10Price) {
      autoMiner10.disabled = false;
    } else {
      autoMiner10.disabled = true; // Disable the slow auto miner button if the user has not collected 10 diamonds
    }

    // If the user has collected 100 diamonds or more, enable the fast auto miner button
    if (numClicks + numSeconds >= autoMiner100Price) {
      autoMiner100.disabled = false;
    } else {
      autoMiner100.disabled = true; // Disable the fast auto miner button if the user has not collected 100 diamonds
    }

    // If the user has collected 1000 diamonds or more, enable the super fast auto miner button
    if (numClicks + numSeconds >= autoMiner1000Price) {
      autoMiner1000.disabled = false;
    } else {
      autoMiner1000.disabled = true; // Disable the super fast auto miner button if the user has not collected 1000 diamonds
    }
  }
  requestAnimationFrame(updateCounter);
}

// Function to set the isCounterActive to true
function activateCounter() {
  isCounterActive = true;
}

const autoMiner10 = document.createElement("button"); // Creating a button for the slow auto miner that costs 10 diamonds
autoMiner10.textContent = `Pay ${autoMiner10Price.toFixed(2)} 💎 for a Member of the Neighborly Digging Club`; // Setting the text of the slow auto miner button
autoMiner10.disabled = true; // Disabling the slow auto miner button by default
let autoMiner10Counter = 0; // Variable to keep track of the number of times the slow auto miner has been clicked
app.append(autoMiner10); // Appending the slow auto miner button to the app

const autoMiner100 = document.createElement("button"); // Creating a button for the fast auto miner that costs 100 diamonds
autoMiner100.textContent = `Pay ${autoMiner100Price.toFixed(2)} 💎 for a Rusty Ol' Excavator`; // Setting the text of the fastauto miner button
autoMiner100.disabled = true; // Disabling the fast auto miner button by default
let autoMiner100Counter = 0; // Variable to keep track of the number of times the fast auto miner has been clicked
app.append(autoMiner100); // Appending the faste auto miner button to the app

const autoMiner1000 = document.createElement("button"); // Creating a button for the auto miner that costs 1000 diamonds
autoMiner1000.textContent = `Pay ${autoMiner1000Price.toFixed(2)} 💎 for a Turbo Trowel`; // Setting the text of the super fast auto miner button
autoMiner1000.disabled = true; // Disabling the super fast auto miner button by default
let autoMiner1000Counter = 0; // Variable to keep track of the number of times the super fast auto miner has been clicked
app.append(autoMiner1000); // Appending the super fast auto miner button to the app

// Adding an event listener to the slow auto miner button that costs 10 diamonds
autoMiner10.addEventListener("click", () => {
  numClicks -= autoMiner10Price; // Subtracting 10 diamonds from the user's collection
  diamondsCollected.textContent = `${(numClicks + numSeconds).toFixed(2)} 💎`; // Updating the number of diamonds collected
  growthRate += 0.1; // Increasing the growth rate by 0.1
  autoMiner10Counter++; // Incrementing the slow auto miner counter to show how many times the button has been clicked
  autoMiner10Price *= priceIncrement; // Increasing the price of the slow auto miner by 15%
  autoMiner10.textContent = `Pay ${autoMiner10Price.toFixed(2)} 💎 for Another Member of the Neighborly Digging Club! You have ${autoMiner10Counter} Members from the Club.`;
  activateCounter();
});
requestAnimationFrame(updateCounter); // Start the counter animation

// Adding an event listener to the fast auto miner button that costs 100 diamonds
autoMiner100.addEventListener("click", () => {
  numClicks -= autoMiner100Price; // Subtracting 100 diamonds from the user's collection
  diamondsCollected.textContent = `${(numClicks + numSeconds).toFixed(2)} 💎`; // Updating the number of diamonds collected
  growthRate += 2; // Increasing the growth rate by 2
  autoMiner100Counter++; // Incrementing the fast auto miner counter to show how many times the button has been clicked
  autoMiner100Price *= priceIncrement; // Increasing the price of the fast auto miner by 15%
  autoMiner100.textContent = `Pay ${autoMiner100Price.toFixed(2)} 💎 for Another Rusty Ol' Excavator! You have ${autoMiner100Counter} Excavators.`;
  activateCounter();
});
requestAnimationFrame(updateCounter); // Start the counter animation

// Adding an event listener to the super fast auto miner button that costs 1000 diamonds
autoMiner1000.addEventListener("click", () => {
  numClicks -= autoMiner1000Price; // Subtracting 1000 diamonds from the user's collection
  diamondsCollected.textContent = `${(numClicks + numSeconds).toFixed(2)} 💎`; // Updating the number of diamonds collected
  growthRate += 50; // Increasing the growth rate by 50
  autoMiner1000Counter++; // Incrementing the super fast auto miner counter to show how many times the button has been clicked
  autoMiner1000Price *= priceIncrement; // Increasing the price of the super fast auto miner by 15%
  autoMiner1000.textContent = `Pay ${autoMiner10Price.toFixed(2)} 💎 for Another Turbo Trowels! You have ${autoMiner1000Counter} Turbo Trowels.`;
  activateCounter();
});
requestAnimationFrame(updateCounter); // Start the counter animation

// Adding an event listener to the diamond button
button.addEventListener("click", () => {
  numClicks++;
  diamondsCollected.textContent = `${(numClicks + numSeconds).toFixed(2)} 💎`;
  growthRateText.textContent = `Diamond Rate: ${growthRate.toFixed(2)} 💎/s`;

  // If the user has collected 10 diamonds or more, enable the auto miner button
  if (numClicks + numSeconds >= autoMiner10Price) {
    autoMiner10.disabled = false;
  } else {
    autoMiner10.disabled = true; // Disable the auto miner button if the user has not collected 10 diamonds
  }

  // If the user has collected 100 diamonds or more, enable the auto miner button
  if (numClicks + numSeconds >= autoMiner100Price) {
    autoMiner100.disabled = false;
  } else {
    autoMiner100.disabled = true; // Disable the auto miner button if the user has not collected 100 diamonds
  }

  // If the user has collected 1000 diamonds or more, enable the auto miner button
  if (numClicks + numSeconds >= autoMiner1000Price) {
    autoMiner1000.disabled = false;
  } else {
    autoMiner1000.disabled = true; // Disable the auto miner button if the user has not collected 1000 diamonds
  }
});

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header, button, diamondsCollected, growthRateText);
