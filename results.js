document.addEventListener('DOMContentLoaded', function() {
    const results = JSON.parse(localStorage.getItem('results')) || [];
    const tableBody = document.querySelector('#results-table tbody');

    results.forEach((result, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${result.time}</td>
            <td>${result.v1}</td>
            <td>${result.pt}</td>
            <td>${result.so2}</td>
            <td><input type="checkbox" class="select-result" data-index="${index}"></td>
        `;

        tableBody.appendChild(row);
    });
});

function clearSelectedResults() {
    let results = JSON.parse(localStorage.getItem('results')) || [];
    const selectedIndexes = Array.from(document.querySelectorAll('.select-result:checked')).map(checkbox => parseInt(checkbox.dataset.index));

    results = results.filter((result, index) => !selectedIndexes.includes(index));
    localStorage.setItem('results', JSON.stringify(results));
    location.reload();
}

function clearAllResults() {
    localStorage.removeItem('results');
    location.reload();
}