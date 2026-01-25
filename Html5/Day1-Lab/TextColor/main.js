let parag = document.getElementById("parag")
let redInput = document.getElementById("red");
let greenInput = document.getElementById("green");
let blueInput = document.getElementById("blue");

function updateColor() {
    const r = redInput.value;
    const g = greenInput.value;
    const b = blueInput.value;
    parag.style.color = `rgb(${r}, ${g}, ${b})`;
}

redInput.addEventListener("input", updateColor);
greenInput.addEventListener("input", updateColor);
blueInput.addEventListener("input", updateColor);