// Get current date and time
function getCurrentTime() {
    const now = new Date();
    return now.toLocaleString(); // e.g. "10/20/2024, 10:34:00 AM"
}

// Load existing visitors from localStorage
let visitorsList = JSON.parse(localStorage.getItem('visitorsList')) || [];

// Handle form submission
document.getElementById('visitor-details').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const visitor = {
        name: document.getElementById('visitor-name').value.trim(),
        contact: document.getElementById('visitor-contact').value.trim(),
        relation: document.getElementById('visitor-relation').value.trim(),
        roomNumber: document.getElementById('room-number').value.trim(),
        reason: document.getElementById('visit-reason').value.trim(),
        time: getCurrentTime()
    };

    // Validate the form (ensure all fields are filled)
    if (!visitor.name || !visitor.contact || !visitor.relation || !visitor.roomNumber || !visitor.reason) {
        alert('Please fill in all fields.');
        return;
    }

    // Add the visitor to the visitors list and update localStorage
    visitorsList.push(visitor);
    localStorage.setItem('visitorsList', JSON.stringify(visitorsList));

    // Update the admin dashboard with the new visitor data
    updateAdminDashboard();
    
    // Alert and reset the form
    alert('Visitor recorded successfully!');
    document.getElementById('visitor-details').reset();
});

// Update the admin dashboard with visitor data
function updateAdminDashboard() {
    const visitorsLog = document.querySelector('#visitors-log tbody');
    visitorsLog.innerHTML = ''; 

    let totalVisitors = 0;
    let newVisitors = 0;
    let regularVisitors = 0;

    visitorsList.forEach(visitor => {
        totalVisitors++;

        // Logic to identify new vs regular visitors based on relation
        if (['friend', 'relative', 'family'].includes(visitor.relation.toLowerCase())) {
            regularVisitors++;
        } else {
            newVisitors++;
        }

        // Create a row for the visitor
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${visitor.name}</td>
            <td>${visitor.contact}</td>
            <td>${visitor.relation}</td>
            <td>${visitor.roomNumber}</td>
            <td>${visitor.reason}</td>
            <td>${visitor.time}</td>
        `;
        visitorsLog.appendChild(row);
    });

    // Update visitor stats in the admin section
    document.getElementById('total-visitors').innerText = totalVisitors;
    document.getElementById('new-visitors').innerText = newVisitors;
    document.getElementById('regular-visitors').innerText = regularVisitors;
}

// Show Admin Section when admin button is clicked
document.getElementById('admin-btn').addEventListener('click', function() {
    document.getElementById('admin-section').style.display = 'block';
    document.getElementById('visitor-form').style.display = 'none';
    updateAdminDashboard(); // Ensure dashboard updates on click
});

// Show Visitor Form and hide Admin Section when Back button is clicked
document.getElementById('back-btn').addEventListener('click', function() {
    document.getElementById('admin-section').style.display = 'none';
    document.getElementById('visitor-form').style.display = 'block';
});
