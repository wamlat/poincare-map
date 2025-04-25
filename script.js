const aSlider = document.getElementById('param-a');
const bSlider = document.getElementById('param-b');
const cSlider = document.getElementById('param-c');

const aVal = document.getElementById('a-val');
const bVal = document.getElementById('b-val');
const cVal = document.getElementById('c-val');

[aSlider, bSlider, cSlider].forEach(slider => {
    slider.addEventListener('input', () => {
        aVal.textContent = aSlider.value;
        bVal.textContent = bSlider.value;
        cVal.textContent = cSlider.value;
        updateChart();
    });
});

const ctx = document.getElementById('chart').getContext('2d');
const chart = new Chart(ctx, {
    type: 'scatter',
    data: { datasets: [{ label: 'Poincaré Section', data: [], pointRadius: 2 }] },
    options: {
        scales: {
            x: { title: { display: true, text: 'x' } },
            y: { title: { display: true, text: 'y' } }
        }
    }
});

function updateChart() {
    fetch('https://poincare-map-backend.onrender.com/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            a: aSlider.value,
            b: bSlider.value,
            c: cSlider.value
        })
    })
    .then(res => res.json())
    .then(data => {
        chart.data.datasets[0].data = data;
        chart.update();
    });
}

window.onload = updateChart;
