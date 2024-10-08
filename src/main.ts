import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "My awesome game";
document.title = gameName;

// Create a button
const button = document.createElement("button");
// Setting the text of the button
button.textContent = "💎";

let numClicks = 0;
let numSeconds = 0;
const diamondsCollected = document.createElement("div");

// Adding an interval to update the diamonds collected every second
setInterval(() => {
  numSeconds++;
  diamondsCollected.textContent = `${numClicks + numSeconds} 💎`;
}, 1000);

// Adding an event listener to the button
button.addEventListener("click", () => {
  numClicks++;
  diamondsCollected.textContent = `${numClicks + numSeconds} 💎`;
});

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header, button, diamondsCollected);
