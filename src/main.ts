import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "My awesome game";
document.title = gameName;

const button = document.createElement("button"); // Create a button
button.textContent = "💎"; // Setting the text of the button

let numClicks = 0; // Variable to keep track of the number of clicks
let numSeconds = 0; // Variable to keep track of the number of seconds
let growthRate = 0; // Variable to keep track of the growth rate of the diamonds
let isCounterActive = false; // Variable to keep track of whether the counter is active
const diamondsCollected = document.createElement("div");
const growthRateText = document.createElement("div");
growthRateText.textContent = `Growth rate: ${growthRate} 💎/s`;

// Function that makes an automatic counter that will increase the number of diamonds collected every second
let lastTime = 0;
function updateCounter(time: number) {
  if (isCounterActive && time - lastTime >= 1000) {
    numSeconds += growthRate; // Increase the number of diamonds collected by the growth rate
    diamondsCollected.textContent = `${numClicks + numSeconds} 💎`;
    growthRateText.textContent = `Growth rate: ${growthRate} 💎/s`;
    lastTime = time; // Update the last time

    // If the user has collected 10 diamonds or more, enable the slow auto miner button
    if (numClicks + numSeconds >= 10) {
      autoMiner10.disabled = false;
    } else {
      autoMiner10.disabled = true; // Disable the slow auto miner button if the user has not collected 10 diamonds
    }

    // If the user has collected 100 diamonds or more, enable the fast auto miner button
    if (numClicks + numSeconds >= 100) {
      autoMiner100.disabled = false;
    } else {
      autoMiner100.disabled = true; // Disable the fast auto miner button if the user has not collected 100 diamonds
    }

    // If the user has collected 1000 diamonds or more, enable the super fast auto miner button
    if (numClicks + numSeconds >= 1000) {
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
autoMiner10.textContent = "Pay 10 💎 for Slow Miner!"; // Setting the text of the slow auto miner button
autoMiner10.disabled = true; // Disabling the slow auto miner button by default
let autoMiner10Counter = 0; // Variable to keep track of the number of times the slow auto miner has been clicked
app.append(autoMiner10); // Appending the slow auto miner button to the app

const autoMiner100 = document.createElement("button"); // Creating a button for the fast auto miner that costs 100 diamonds
autoMiner100.textContent = "Pay 100 💎 for Fast Miner!"; // Setting the text of the fastauto miner button
autoMiner100.disabled = true; // Disabling the fast auto miner button by default
let autoMiner100Counter = 0; // Variable to keep track of the number of times the fast auto miner has been clicked
app.append(autoMiner100); // Appending the faste auto miner button to the app

const autoMiner1000 = document.createElement("button"); // Creating a button for the auto miner that costs 1000 diamonds
autoMiner1000.textContent = "Pay 1000 💎 for Super Fast Miner!"; // Setting the text of the super fast auto miner button
autoMiner1000.disabled = true; // Disabling the super fast auto miner button by default
let autoMiner1000Counter = 0; // Variable to keep track of the number of times the super fast auto miner has been clicked
app.append(autoMiner1000); // Appending the super fast auto miner button to the app

// Adding an event listener to the slow auto miner button that costs 10 diamonds
autoMiner10.addEventListener("click", () => {
  numClicks -= 10; // Subtracting 10 diamonds from the user's collection
  diamondsCollected.textContent = `${numClicks + numSeconds} 💎`; // Updating the number of diamonds collected
  growthRate += 0.1; // Increasing the growth rate by 0.1
  autoMiner10Counter++; // Incrementing the slow auto miner counter to show how many times the button has been clicked
  autoMiner10.textContent = `Pay 10 💎 for Slow Miner! You have ${autoMiner10Counter} Slow Miners`;
  activateCounter();
});
requestAnimationFrame(updateCounter); // Start the counter animation

// Adding an event listener to the fast auto miner button that costs 100 diamonds
autoMiner100.addEventListener("click", () => {
  numClicks -= 100; // Subtracting 100 diamonds from the user's collection
  diamondsCollected.textContent = `${numClicks + numSeconds} 💎`; // Updating the number of diamonds collected
  growthRate += 2; // Increasing the growth rate by 2
  autoMiner100Counter++; // Incrementing the fast auto miner counter to show how many times the button has been clicked
  autoMiner100.textContent = `Pay 100 💎 for Fast Miner! You have ${autoMiner100Counter} Fast Miners`;
  activateCounter();
});
requestAnimationFrame(updateCounter); // Start the counter animation

// Adding an event listener to the super fast auto miner button that costs 1000 diamonds
autoMiner1000.addEventListener("click", () => {
  numClicks -= 1000; // Subtracting 1000 diamonds from the user's collection
  diamondsCollected.textContent = `${numClicks + numSeconds} 💎`; // Updating the number of diamonds collected
  growthRate += 50; // Increasing the growth rate by 50
  autoMiner1000Counter++; // Incrementing the super fast auto miner counter to show how many times the button has been clicked
  autoMiner1000.textContent = `Pay 1000 💎 for Super Fast Miner! You have ${autoMiner1000Counter} Super Fast Miners`;
  activateCounter();
});
requestAnimationFrame(updateCounter); // Start the counter animation

// Adding an event listener to the diamond button
button.addEventListener("click", () => {
  numClicks++;
  diamondsCollected.textContent = `${numClicks + numSeconds} 💎`;
  growthRateText.textContent = `Growth rate: ${growthRate} 💎/s`;

  // If the user has collected 10 diamonds or more, enable the auto miner button
  if (numClicks + numSeconds >= 10) {
    autoMiner10.disabled = false;
  } else {
    autoMiner10.disabled = true; // Disable the auto miner button if the user has not collected 10 diamonds
  }

  // If the user has collected 100 diamonds or more, enable the auto miner button
  if (numClicks + numSeconds >= 100) {
    autoMiner100.disabled = false;
  } else {
    autoMiner100.disabled = true; // Disable the auto miner button if the user has not collected 100 diamonds
  }

  // If the user has collected 1000 diamonds or more, enable the auto miner button
  if (numClicks + numSeconds >= 1000) {
    autoMiner1000.disabled = false;
  } else {
    autoMiner1000.disabled = true; // Disable the auto miner button if the user has not collected 1000 diamonds
  }
});

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header, button, diamondsCollected, growthRateText);
