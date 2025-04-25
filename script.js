const aSlider = document.getElementById("param-a");
const bSlider = document.getElementById("param-b");
const cSlider = document.getElementById("param-c");
const aVal = document.getElementById("a-val");
const bVal = document.getElementById("b-val");
const cVal = document.getElementById("c-val");

let a = parseFloat(aSlider.value);
let b = parseFloat(bSlider.value);
let c = parseFloat(cSlider.value);

aSlider.oninput = () => {
    a = parseFloat(aSlider.value);
    aVal.textContent = a.toFixed(2);
};
bSlider.oninput = () => {
    b = parseFloat(bSlider.value);
    bVal.textContent = b.toFixed(2);
};
cSlider.oninput = () => {
    c = parseFloat(cSlider.value);
    cVal.textContent = c.toFixed(1);
};

// Chart.js initialization
const ctx = document.getElementById("chart").getContext("2d");
const chart = new Chart(ctx, {
    type: 'scatter',
    data: {
        datasets: [{
            label: "Poincaré Section",
            data: [],
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            pointRadius: 2
        }]
    },
    options: {
        responsive: true,
        scales: {
            x: { type: 'linear', position: 'bottom' },
            y: { type: 'linear' }
        }
    }
});

// Fetch and update chart only on button click
document.getElementById("generate-button").onclick = () => {
    fetch("https://poincare-map-backend.onrender.com/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ a, b, c })
    })
    .then(res => res.json())
    .then(data => {
      console.log("Received data:", data);
      chart.data.datasets[0].data = data.map(d => ({ x: d.x, y: d.z }));
      chart.update();
    })
    .catch(err => console.error("Error:", err));
};
