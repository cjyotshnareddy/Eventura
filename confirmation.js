document.addEventListener("DOMContentLoaded", () => {
    const bookingDetails = document.getElementById("bookingDetails");
    const loggedInUser = localStorage.getItem("loggedInUser");

    if (!loggedInUser) {
        bookingDetails.innerHTML = "<p>You need to log in to view your bookings.</p>";
        return;
    }

    const bookings = JSON.parse(localStorage.getItem("bookings")) || {};
    const userBookings = bookings[loggedInUser];

    if (!userBookings || userBookings.length === 0) {
        bookingDetails.innerHTML = "<p>No bookings found.</p>";
        return;
    }

    userBookings.forEach((booking) => {
        bookingDetails.innerHTML += `
            <div class="booking">
                <h3>Service: ${booking.service}</h3>
                <ul>
                    ${Object.entries(booking.breakdown).map(([key, value]) => `<li>${key}: ₹${value}</li>`).join("")}
                </ul>
                <h4>Total: ₹${booking.total}</h4>
            </div>
        `;
    });
});
