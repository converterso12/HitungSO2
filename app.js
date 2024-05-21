let results = JSON.parse(localStorage.getItem('results')) || [];

// Muat konstanta dari localStorage
window.onload = function() {
    const c = localStorage.getItem('c') || 0.10282;
    const v = localStorage.getItem('v') || 10;
    const pt = localStorage.getItem('pt') || 0.855;

    document.getElementById('c').value = c;
    document.getElementById('v').value = v;
    document.getElementById('pt').value = pt;
};

function saveConstants() {
    const c = document.getElementById('c').value;
    const v = document.getElementById('v').value;
    const pt = document.getElementById('pt').value;

    localStorage.setItem('c', c);
    localStorage.setItem('v', v);
    localStorage.setItem('pt', pt);

    alert('Konstanta berhasil disimpan!');
}

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

    const numerator = c * v * 10.945;
    const denominator = pt * v1 + (c * v * 10.945);
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
