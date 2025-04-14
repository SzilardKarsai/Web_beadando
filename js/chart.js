const tableBody = document.querySelector("#numberTable tbody");
const rowCount = 5;
const colCount = 5;
let chart;

function generateTable() {
  for (let i = 0; i < rowCount; i++) {
    const row = document.createElement("tr");
    for (let j = 0; j < colCount; j++) {
      const cell = document.createElement("td");
      const value = Math.floor(Math.random() * 90 + 10); // 10–99 közötti szám
      cell.textContent = value;
      row.appendChild(cell);
    }
    row.addEventListener("click", () => drawChartFromRow(row));
    tableBody.appendChild(row);
  }
}

function drawChartFromRow(row) {
  const values = Array.from(row.cells).map(cell => parseInt(cell.textContent));
  const labels = values.map((_, i) => `Oszlop ${i + 1}`);

  const ctx = document.getElementById("myChart").getContext("2d");

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Kiválasztott sor adatai',
        data: values,
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.3,
        fill: false
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false
        }
      }
    }
  });
}

window.onload = generateTable;