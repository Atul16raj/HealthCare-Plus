document.getElementById('appointmentForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const appointment = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        doctor: document.getElementById('doctor').value,
        symptoms: document.getElementById('symptoms').value
    };

    let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    appointments.push(appointment);
    localStorage.setItem('appointments', JSON.stringify(appointments));

    this.reset();
    displayAppointments();

    alert('Appointment booked successfully!');
});

function displayAppointments() {
    const appointmentList = document.getElementById('appointmentList');
    appointmentList.innerHTML = "";

    let appointments = JSON.parse(localStorage.getItem('appointments')) || [];

    appointments.forEach((appt, index) => {
        const apptCard = document.createElement('div');
        apptCard.className = 'appointment-card';
        apptCard.innerHTML = `
            <strong>Name:</strong> ${appt.name}<br>
            <strong>Email:</strong> ${appt.email}<br>
            <strong>Phone:</strong> ${appt.phone}<br>
            <strong>Date:</strong> ${appt.date}<br>
            <strong>Time:</strong> ${appt.time}<br>
            <strong>Doctor:</strong> ${appt.doctor}<br>
            <strong>Symptoms:</strong> ${appt.symptoms}
        `;
        appointmentList.appendChild(apptCard);
    });
}

window.onload = displayAppointments;
