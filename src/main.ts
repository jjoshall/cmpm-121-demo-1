import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Dirt to Diamonds";
document.title = gameName;

// Creating an interface for the upgrades
interface Item {
  name: string;
  diamondPrice: number;
  growthRate: number;
  description: string;
}

// Creating an array of upgrades
const availableItems: Item[] = [
  {
    name: "Member of the Neighborly Digging Club",
    diamondPrice: 10,
    growthRate: 0.1,
    description:
      "Recruit neighbors to help you dig by promising BBQ dinners and neighborhood fame. +0.1 💎/s",
  },
  {
    name: "Pet Rock Drill Instructor 🗿",
    diamondPrice: 50,
    growthRate: 2,
    description:
      "Undermine complacency with enthusiastic pep talks from this motivational pet rock. You will not believe how uplifting geology can be! +2 💎/s",
  },
  {
    name: "Rusty Ol' Excavator",
    diamondPrice: 100,
    growthRate: 5,
    description:
      "Pick up this ancient excavator from that bizarre carnival auction. It squeaks like it's singing the blues, but it knows how to sniff out those sparkly veins like a bloodhound on a hot trail! +5 💎/s",
  },
  {
    name: "High-Flyer Wrestling Extravaganza",
    diamondPrice: 250,
    growthRate: 20,
    description:
      "Invite high-flying wrestlers for a ringside brawl in the mines. Not only do they boost diamonds with their showmanship, but their seismic body slams cause tremors that unearth hidden gems! +20 💎/s",
  },
  {
    name: "Turbo Jet Trowel",
    diamondPrice: 1000,
    growthRate: 50,
    description:
      "Purchase a trowel fitted with repurposed jet engine parts from that sketchy cousin Skeeter who smells a little funky. +50 💎/s",
  },
];

const button = document.createElement("button"); // Create a button
button.textContent = "💎⛏️"; // Setting the text of the button
button.style.border = "none"; // Remove the border
button.style.background = "none"; // Remove the background
button.style.fontSize = "2rem"; // Increase the font size for better visibility
button.style.cursor = "pointer"; // Change the cursor to pointer to indicate it's clickable
button.style.transition = "transform 0.1s"; // Add transition for smooth effect

// Add event listener for click effect
button.addEventListener("mousedown", () => {
  button.style.transform = "scale(1.2)"; // Scale up the button
});

button.addEventListener("mouseup", () => {
  button.style.transform = "scale(1)"; // Scale back to original size
});

let numClicks = 0; // Variable to keep track of the number of clicks
let numSeconds = 0; // Variable to keep track of the number of seconds
let growthRate = 0; // Variable to keep track of the growth rate of the diamonds
let isCounterActive = false; // Variable to keep track of whether the counter is active
const priceIncrement = 1.15; // Variable to keep track of the price increment
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

    // Update item buttons based on the number of diamonds collected
    updateItemButtonStates();
  }
  requestAnimationFrame(updateCounter);
}

// Function to update the item buttons based on the number of diamonds collected
function updateItemButtonStates() {
  const itemButtons = document.querySelectorAll(".item-button");
  for (let i = 0; i < availableItems.length; i++) {
    const itemButton = itemButtons[i] as HTMLButtonElement; // Get the button for the item
    const item = availableItems[i]; // Get the item at the current index
    if (numClicks + numSeconds >= item.diamondPrice) {
      itemButton.disabled = false;
    } else {
      itemButton.disabled = true;
    }
  }
}

// Function to set the isCounterActive to true
function activateCounter() {
  isCounterActive = true;
}

// Use a loop to iterate through the available items and create a button for each item with the name and price
for (let i = 0; i < availableItems.length; i++) {
  const item = availableItems[i]; // Get the item at the current index
  const itemButton = document.createElement("button"); // Create a button for the item
  itemButton.classList.add("item-button"); // Add a class to the button
  itemButton.textContent = `${item.name} - ${item.diamondPrice} 💎`; // Set the text of the button
  itemButton.title = item.description; // Add a tooltip with the description of the item
  itemButton.style.margin = "5px"; // Add margin to the button
  itemButton.style.cursor = "pointer"; // Change the cursor to pointer to indicate it's clickable
  itemButton.disabled = true; // Disable the button
  let itemCounter = 0; // Variable to count how many items of each type the user has

  itemButton.addEventListener("click", () => {
    if (numClicks + numSeconds >= item.diamondPrice) {
      numClicks -= item.diamondPrice; // Subtract the price of the item from the number of clicks
      diamondsCollected.textContent = `${(numClicks + numSeconds).toFixed(2)} 💎`; // Update the text of the diamonds collected
      growthRate += item.growthRate; // Increase the growth rate by the growth rate of the item
      itemCounter++; // Increase the item counter
      item.diamondPrice *= priceIncrement; // Increase the price of the item
      itemButton.textContent = `${item.name} - ${item.diamondPrice.toFixed(2)} 💎 (${itemCounter})`; // Update the text of the button to show the new price of the item and the number of items the user has
      activateCounter(); // Call the activateCounter function
    }
  });
  app.append(itemButton); // Append the button to the app
}

// Adding an event listener to the diamond button
button.addEventListener("click", () => {
  numClicks++;
  diamondsCollected.textContent = `${(numClicks + numSeconds).toFixed(2)} 💎`;
  growthRateText.textContent = `Diamond Rate: ${growthRate.toFixed(2)} 💎/s`;

  // Update item buttons based on the number of diamonds collected
  updateItemButtonStates();
});

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header, button, diamondsCollected, growthRateText);

// Start the counter
requestAnimationFrame(updateCounter);
