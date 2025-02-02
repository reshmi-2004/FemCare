document.getElementById('periodForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    let start_date = document.getElementById('start_date').value;
    let cycle_length = document.getElementById('cycle_length').value;
    let period_length = document.getElementById('period_length').value;

    const response = await fetch('http://localhost:3000/api/track-period', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            start_date: start_date,
            cycle_length: cycle_length,
            period_length: period_length
        })
    });

    const data = await response.json();
    
    if (data.success) {
        document.getElementById('trackerResults').innerHTML = `
            <h3>Your next period is estimated to start on: ${data.next_period_start}</h3>
            <p>Period length: ${data.period_length} days</p>
            <p>Cycle length: ${data.cycle_length} days</p>
        `;
    } else {
        document.getElementById('trackerResults').innerHTML = `
            <p>Error calculating period. Please try again.</p>
        `;
    }
});