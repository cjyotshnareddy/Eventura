document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");
    const logoutBtn = document.getElementById("logoutButton");
    const userName = document.getElementById("userName");
    const userEmail = document.getElementById("userEmail");
    const loginLink = document.getElementById("loginLink");
    const signupLink = document.getElementById("signupLink");
    const userLogo = document.getElementById("userLogo");
    const userDetails = document.getElementById("userDetails");

    // Function to update UI based on login state
    function updateUI() {
        const loggedInUser = localStorage.getItem("loggedInUser");
        if (loggedInUser) {
            const user = JSON.parse(localStorage.getItem(loggedInUser));
            userName.textContent = user.name;
            userEmail.textContent = loggedInUser;
            userLogo.style.display = "none"; // Hide logo when logged in
            loginLink.style.display = "none"; // Hide login link
            signupLink.style.display = "none"; // Hide signup link
            logoutBtn.style.display = "inline"; // Show logout button
            userDetails.style.display = "block"; // Show user details
        } else {
            userDetails.style.display = "none"; // Hide user details
            userLogo.style.display = "block"; // Show logo when not logged in
            loginLink.style.display = "inline"; // Show login link
            signupLink.style.display = "inline"; // Show signup link
            logoutBtn.style.display = "none"; // Hide logout button
        }
    }

    // Signup Functionality
    if (signupForm) {
        signupForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("signupName").value;
            const age = document.getElementById("signupAge").value;
            const email = document.getElementById("signupEmail").value;
            const password = document.getElementById("signupPassword").value;

            // Check if user already exists
            if (localStorage.getItem(email)) {
                document.getElementById("signupError").textContent = "User already exists!";
            } else {
                localStorage.setItem(email, JSON.stringify({ name, age, password })); // Save user with additional details
                alert("Signup successful! Redirecting to login page.");
                window.location.href = "login.html";
            }
        });
    }

    // Login Functionality
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const email = document.getElementById("loginEmail").value;
            const password = document.getElementById("loginPassword").value;

            // Validate credentials
            const user = JSON.parse(localStorage.getItem(email));
            if (user && user.password === password) {
                alert("Login successful!");
                localStorage.setItem("loggedInUser", email);
                updateUI(); // Update UI after login
                // Optionally redirect to a specific page
                window.location.href = "index.html"; 
               

            } else {
                document.getElementById("loginError").textContent = "Invalid credentials!";
            }
        });
    }
    
    

    // Logout Functionality
    // if (logoutBtn) {
    //     logoutBtn.addEventListener("click", () => {
    //         localStorage.removeItem("loggedInUser"); // Clear logged-in session
    //         alert("You have been logged out.");
    //         updateUI(); // Update UI after logout
    //         // Optionally redirect to a specific page
    //         // window.location.href = "login.html"; 
    //         // or simply reload the page to reflect changes
    //         location.reload();
    //     });
    // }

    // Initial UI update
    updateUI(); // Call this function on page load
});

document.addEventListener("DOMContentLoaded", () => {
    const loginLink = document.querySelector("a[href='login.html']");
    const signupLink = document.querySelector("a[href='signup.html']");
    const logoutButton = document.getElementById("logoutButton");

    // Function to update navbar based on login state
    function updateNavbar() {
        const isLoggedIn = localStorage.getItem("loggedInUser");

        if (isLoggedIn) {
            loginLink.style.display = "none";
            signupLink.style.display = "none";
            logoutButton.style.display = "block";
        } else {
            loginLink.style.display = "block";
            signupLink.style.display = "block";
            logoutButton.style.display = "none";
        }
    }

    // Add logout functionality
    logoutButton.addEventListener("click", () => {
        localStorage.removeItem("loggedInUser");
        updateNavbar();
        alert("You have been logged out.");
    });

    // Initial update of the navbar
    updateNavbar();
});
function loginUser(email, password) {
    // Assume user validation logic here
    const isValidUser = true; // Replace with actual validation
    if (isValidUser) {
        localStorage.setItem("loggedInUser", email); // Store user info
        alert("Login successful!");
        window.location.href = "index.html"; // Redirect to the homepage
    } else {
        alert("Invalid email or password.");
    }
}
