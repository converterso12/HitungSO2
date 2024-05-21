document.addEventListener('DOMContentLoaded', function() {
    const database = firebase.database();
    const tableBody = document.querySelector('#results-table tbody');

    // Ambil data dari Firebase
    database.ref('results').on('value', (snapshot) => {
        const results = snapshot.val();
        tableBody.innerHTML = ''; // Kosongkan tabel sebelum menampilkan hasil

        let rowNumber = 1;
        for (const id in results) {
            const result = results[id];
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${rowNumber}</td>
                <td>${result.time}</td>
                <td>${result.v1}</td>
                <td>${result.pt}</td>
                <td>${result.so2}</td>
                <td><input type="checkbox" class="select-result" data-id="${id}"></td>
            `;

            tableBody.appendChild(row);
            rowNumber++;
        }
    });
});

function clearSelectedResults() {
    const database = firebase.database();
    const selectedIds = Array.from(document.querySelectorAll('.select-result:checked')).map(checkbox => checkbox.dataset.id);

    selectedIds.forEach(id => {
        database.ref(`results/${id}`).remove();
    });

    // Perbarui tampilan tabel setelah penghapusan
    location.reload();
}

function clearAllResults() {
    const database = firebase.database();
    database.ref('results').remove();

    // Perbarui tampilan tabel setelah penghapusan
    location.reload();
}