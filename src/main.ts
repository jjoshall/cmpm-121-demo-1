import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "My awesome game";
document.title = gameName;

// Create a button
const button = document.createElement("button");
// Setting the text of the button
button.textContent = "💎";

// Adding an event listener to the button
let numClicks = 0;
const diamondsCollected = document.createElement("div");
button.addEventListener("click", () => {
  numClicks++;
  diamondsCollected.textContent = `${numClicks} 💎`;
});

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header, button, diamondsCollected);
