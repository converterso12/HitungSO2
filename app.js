// Konfigurasi Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBgtPpDuHCLppJxrHUeLnyBDbhCOsq6QTA",
    authDomain: "hitung-so2.firebaseapp.com",
    databaseURL: "https://console.firebase.google.com/project/hitung-so2/hosting/sites/hitung-so2",
    projectId: "hitung-so2",
    storageBucket: "hitung-so2.appspot.com",
    messagingSenderId: "945221839072",
    appId: "G-012ZG1NG61"
};

// Inisialisasi Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

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

    const numerator = c * v * 10945;
    const denominator = pt * v1 + (c * v * 10945);
    const so2 = (numerator / denominator) * 100;

    const result = {
        v1,
        pt,
        so2: so2.toFixed(2),
        time
    };

    // Simpan hasil ke Firebase
    database.ref('results').push(result);

    document.getElementById('result').innerText = `Hasil Kadar SO2: ${so2.toFixed(2)}%`;

    // Reset input V1 dan waktu
    document.getElementById('v1').value = '';
    document.getElementById('time').value = '';
}