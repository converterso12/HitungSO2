let results = JSON.parse(localStorage.getItem('results')) || [];

function calculateSO2() {
    const v1 = parseFloat(document.getElementById('v1').value);
    const time = document.getElementById('time').value;
    const c = parseFloat(document.getElementById('c').value);
    const v = parseFloat(document.getElementById('v').value);
    const pt = parseFloat(document.getElementById('pt').value);

    if (!v1 || !time || !c || !v || !pt) {
        alert('Silakan isi semua kolom');
        return;
    }

    const numerator = c * v * 10945;
    const denominator = pt * v1 + (c * v * 10945);
    const so2 = (numerator / denominator) * 100;

    const result = {
        v1,
        pt,
        so2: so2.toFixed(2),
        time
    };

    results.push(result);
    localStorage.setItem('results', JSON.stringify(results));

    document.getElementById('result').innerText = `Hasil Kadar SO2: ${so2.toFixed(2)}%`;
}