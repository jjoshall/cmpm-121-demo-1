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

// Function that makes an automatic counter that will increase the number of diamonds collected every second
let lastTime = 0;
function updateCounter(time: number) {
  if (isCounterActive && time - lastTime >= 1000) {
    numSeconds += growthRate; // Increase the number of diamonds collected by the growth rate
    diamondsCollected.textContent = `${numClicks + numSeconds} 💎`;
    lastTime = time; // Update the last time

    // If the user has collected 10 diamonds or more, enable the auto miner button
    if (numClicks + numSeconds >= 10) {
      autoMinerButton.disabled = false;
    } else {
      autoMinerButton.disabled = true; // Disable the auto miner button if the user has not collected 10 diamonds
    }
  }
  requestAnimationFrame(updateCounter);
}

// Function to set the isCounterActive to true
function activateCounter() {
  isCounterActive = true;
}

const autoMinerButton = document.createElement("button"); // Creating a button for the auto miner
autoMinerButton.textContent = "Activate auto miner!"; // Setting the text of the auto miner button
autoMinerButton.disabled = true; // Disabling the auto miner button by default
app.append(autoMinerButton); // Appending the auto miner button to the app

// Adding an event listener to the auto miner button
autoMinerButton.addEventListener("click", () => {
  numClicks -= 10; // Subtracting 10 diamonds from the user's collection
  diamondsCollected.textContent = `${numClicks + numSeconds} 💎`; // Updating the number of diamonds collected
  growthRate++; // Increasing the growth rate of the diamonds
  activateCounter();
});
requestAnimationFrame(updateCounter); // Start the counter animation

// Adding an event listener to the button
button.addEventListener("click", () => {
  numClicks++;
  diamondsCollected.textContent = `${numClicks + numSeconds} 💎`;

  // If the user has collected 10 diamonds or more, enable the auto miner button
  if (numClicks + numSeconds >= 10) {
    autoMinerButton.disabled = false;
  } else {
    autoMinerButton.disabled = true; // Disable the auto miner button if the user has not collected 10 diamonds
  }
});

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header, button, diamondsCollected);
