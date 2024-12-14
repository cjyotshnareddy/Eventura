document.addEventListener("DOMContentLoaded", () => {
    const serviceDetails = document.getElementById("serviceDetails");
    const totalCost = document.getElementById("totalCost");
    const bookEventButton = document.getElementById("bookEvent");
    const checkoutError = document.getElementById("checkoutError");
    const eventDateInput = document.getElementById("eventDate"); 

    // Define service data for breakdowns
    const serviceData = {
        'Wedding': { venue: 10000, catering: 20000, photography: 20000,invitation: 20000,entertainment: 30000 },
        'Baby Shower': { venue: 5000, catering: 10000, photography: 5000,invitation: 20000,entertainment: 30000  },
        'Retirement Party': { venue: 20000, catering: 30000, photography: 30000,invitation: 20000,entertainment: 30000  },
        'Birthday': { venue: 7000, catering: 12000, photography: 6000,invitation: 20000,entertainment: 30000  },
        'Anniversary': { venue: 15000, catering: 20000, photography: 25000,invitation: 20000,entertainment: 30000  },
    };

    // Get selected event name from localStorage
    const selectedEvent = localStorage.getItem('selectedEvent');
    if (!selectedEvent || !serviceData[selectedEvent]) {
        serviceDetails.innerHTML = "<p>No event selected.</p>";
        totalCost.textContent = "₹0";
        return;
    }

    // Calculate total cost
    const breakdown = serviceData[selectedEvent];
    const total = Object.values(breakdown).reduce((acc, cost) => acc + cost, 0);

    // Display service details
    serviceDetails.innerHTML = `<h3>Service: ${selectedEvent}</h3>
                                <ul>${Object.entries(breakdown).map(([key, value]) => `<li>${key}: ₹${value}</li>`).join("")}</ul>`;
    totalCost.textContent = `₹${total}`;

    // Handle booking event
    bookEventButton.addEventListener("click", () => {
        const loggedInUser = localStorage.getItem("loggedInUser");
        if (!loggedInUser) {
            checkoutError.textContent = "You must be logged in to book an event!";
            return;
        }

        const eventDate = eventDateInput.value; // Get the selected date
        if (!eventDate) {
            checkoutError.textContent = "Please select a date for the event.";
            return;
        }

        // Save booking details in local storage
        const bookings = JSON.parse(localStorage.getItem("bookings")) || {};
        bookings[loggedInUser] = bookings[loggedInUser] || [];

        // Check for duplicate bookings
        const existingBooking = bookings[loggedInUser].find(event => event.service === selectedEvent);
        if (!existingBooking) {
            bookings[loggedInUser].push({
                service: selectedEvent,
                breakdown: breakdown,
                total: total,
                date: eventDate, // Save the date
                status: "Upcoming" // Default status
            });
            localStorage.setItem("bookings", JSON.stringify(bookings));

            // Pass booking details to confirmation page
            localStorage.setItem("lastBooking", JSON.stringify({
                service: selectedEvent,
                total: total,
                date: eventDate
            }));

            checkoutError.textContent = "Event booked successfully!"; // Display success message
            setTimeout(() => {
                window.location.href = "confirmation.html"; // Redirect to confirmation page
            }, 2000); // Redirect after 2 seconds
        } else {
            checkoutError.textContent = "This event is already booked."; // Prevent duplicate bookings
        }
    });
});
