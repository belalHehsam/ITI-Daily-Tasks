function calc() {
    const a = Number(document.getElementById("a").value);
    const b = Number(document.getElementById("b").value);

    const c = Math.sqrt(a * a + b * b).toFixed(2);

    document.getElementById("result").textContent =
        `c = ${c}`;
}