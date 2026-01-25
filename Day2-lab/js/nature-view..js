const canvas = document.getElementById("scene");
const ctx = canvas.getContext("2d");

const skyGradient = ctx.createLinearGradient(0, 0, 0, 200);
skyGradient.addColorStop(0, "#3db7e4");
skyGradient.addColorStop(1, "#bfefff");

ctx.fillStyle = skyGradient;
ctx.fillRect(0, 0, 400, 200);

const grassGradient = ctx.createLinearGradient(0, 200, 0, 400);

grassGradient.addColorStop(0, "#6fdc2f");
grassGradient.addColorStop(0.3, "#9ee85c");
grassGradient.addColorStop(0.55, "#c8f7b5");
grassGradient.addColorStop(1, "#ffffff");


ctx.fillStyle = grassGradient;
ctx.fillRect(0, 200, 400, 200);

ctx.strokeStyle = "black";
ctx.lineWidth = 3;

ctx.beginPath();
ctx.moveTo(140, 160);
ctx.lineTo(260, 160);
ctx.lineTo(260, 260);
ctx.moveTo(140, 160);
ctx.lineTo(140, 260);
ctx.stroke();