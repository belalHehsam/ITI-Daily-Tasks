window.onload = function () {
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');

    // Center coordinates
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // --- 1. Draw the Outer Ring (The main blue body) ---

    const outerRadius = 180;
    const outerGradient = ctx.createLinearGradient(
        centerX - outerRadius, centerY - outerRadius,
        centerX + outerRadius, centerY + outerRadius
    );

    outerGradient.addColorStop(0, "#4a8fe3");
    outerGradient.addColorStop(0.5, "#2d56ce");
    outerGradient.addColorStop(1, "#122a8f");

    ctx.beginPath();
    ctx.arc(centerX, centerY, outerRadius, 0, 2 * Math.PI);
    ctx.fillStyle = outerGradient;
    ctx.fill();
    ctx.closePath();

    // --- 2. Draw the Inner Circle (The face) ---
    const innerRadius = 135;

    const innerGradient = ctx.createRadialGradient(
        centerX, centerY + 60, 10,
        centerX, centerY, innerRadius
    );

    // This creates the white sheen at the bottom fading into blue
    innerGradient.addColorStop(0, "rgba(255, 255, 255, 0.8)");
    innerGradient.addColorStop(0.3, "#4fa0ee");
    innerGradient.addColorStop(0.8, "#2650c9");
    innerGradient.addColorStop(1, "#18369e");

    ctx.beginPath();
    ctx.arc(centerX, centerY, innerRadius, 0, 2 * Math.PI);
    ctx.fillStyle = innerGradient;
    ctx.fill();
    ctx.closePath();

    // --- 3. Draw the Text "N" ---
    ctx.beginPath();
    ctx.fillStyle = "white";
    // Using Arial, large size. 'sans-serif'
    ctx.font = "240px Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";


    // Drawing the text slightly offset vertically to look visually centered
    ctx.fillText("N", centerX, centerY + 10);
    ctx.closePath();
};