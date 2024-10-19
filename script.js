document.addEventListener('DOMContentLoaded', function() {
    let powerGenerated = 100;
    let carbonReduction = powerGenerated * 0.01;
    let treeCount = carbonReduction * 150;

    function updateStats() {
        powerGenerated += 1;
        carbonReduction = powerGenerated * 0.01;
        treeCount = carbonReduction * 150;

        document.getElementById('powerGenerated').textContent = powerGenerated + ' kWh';
        document.getElementById('carbonReduction').textContent = carbonReduction.toFixed(2) + ' トン CO2';
        document.getElementById('treeCount').textContent = treeCount.toFixed(0) + ' 本';
    }

    setInterval(updateStats, 1000);

    function updateClock() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds}`;
    }

    setInterval(updateClock, 1000);

    // グラフ描画用の関数
    function drawChart(canvasId, data, label, color) {
        const ctx = document.getElementById(canvasId).getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: Array.from({length: data.length}, (_, i) => i + 1),
                datasets: [{
                    label: label,
                    data: data,
                    backgroundColor: color,
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        title: { display: true, text: 'Time (seconds)', color: 'white' }, // X軸ラベルを白に
                        ticks: { color: 'white' } // X軸メモリの色を白に
                    },
                    y: {
                        title: { display: true, text: label, color: 'white' }, // Y軸ラベルを白に
                        ticks: { color: 'white' } // Y軸メモリの色を白に
                    }
                },
                plugins: {
                    legend: { display: false }
                }
            }
        });
    }

    // グラフを常に表示
    const powerData = Array.from({length: 10}, (_, i) => powerGenerated + i);
    drawChart('powerChart', powerData, 'Power Generated (kWh)', 'green');

    const carbonData = Array.from({length: 10}, (_, i) => (powerGenerated + i) * 0.01);
    drawChart('carbonChart', carbonData, 'Carbon Reduction (Ton)', 'green');

    const treeData = Array.from({length: 10}, (_, i) => ((powerGenerated + i) * 0.01) * 150);
    drawChart('treeChart', treeData, 'Number of Cedar Trees', 'green');
});
