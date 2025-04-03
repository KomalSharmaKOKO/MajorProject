const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    // Get input values
    let email = document.getElementById('registerEmail').value.trim();
    let password = document.getElementById('registerPassword').value.trim();
    let confirmPassword = document.getElementById('registerConfirmPassword').value.trim();
    const loading = document.getElementById('loading');
    const message = document.getElementById('message');

    // Reset message content
    message.innerHTML = '';

    // Email validation
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        message.innerHTML = `<div class="alert alert-danger">Please enter a valid email address.</div>`;
        return;
    }

    // Password validation
    if (password.length < 6) {
        message.innerHTML = `<div class="alert alert-danger">Password must be at least 6 characters long.</div>`;
        return;
    }

    if (password !== confirmPassword) {
        message.innerHTML = `<div class="alert alert-danger">Passwords do not match.</div>`;
        return;
    }

    // Show loading spinner
    loading.style.display = 'block';

    // User data to send
    const user = {
        email: email,
        password: password,
    };

    try {
        const response = await axios.post('http://localhost:3000/register', user);

        // Hide loading spinner
        loading.style.display = 'none';

        // Display success message
        message.innerHTML = `<div class="alert alert-success">User registered successfully! Redirecting...</div>`;

        // Redirect to login page after a delay
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    } catch (error) {
        // Hide loading spinner
        loading.style.display = 'none';

        // Handle "User already exists" error
        if (error.response?.status === 409) {
            message.innerHTML = `<div class="alert alert-warning">User already exists. Please try logging in.</div>`;
        } else {
            // Display generic error message
            const errorMessage =
                error.response?.data?.error ||
                'An unexpected error occurred. Please try again.';
            message.innerHTML = `<div class="alert alert-danger">Registration failed: ${errorMessage}</div>`;
        }
    }
};

// Attach submit event listener to the form
document
    .getElementById('registerForm')
    .addEventListener('submit', handleSubmit);
