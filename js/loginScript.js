const handleLogin = async (event) => {
    event.preventDefault();

    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();
    const loading = document.getElementById('loading');
    const message = document.getElementById('message');

    message.innerHTML = '';

    loading.style.display = 'block';

    try {
        const response = await axios.post('http://localhost:3000/login', { email, password });

        loading.style.display = 'none';

        message.innerHTML = `<div class="alert alert-success">Login successful! Redirecting...</div>`;

        // Save user data to localStorage
        const user = response.data.user;  // Now contains only name and highScore
        localStorage.setItem('quizUser', JSON.stringify(user));

        setTimeout(() => {
            window.location.href = 'quiz.html';
        }, 2000);
    } catch (error) {
        loading.style.display = 'none';
        if (error.response?.status === 404) {
            message.innerHTML = `<div class="alert alert-danger">User not found. Please register first.</div>`;
        } else if (error.response?.status === 401) {
            message.innerHTML = `<div class="alert alert-danger">Invalid password. Please try again.</div>`;
        } else {
            message.innerHTML = `<div class="alert alert-danger">Login failed: ${error.response?.data?.error || error.message}</div>`;
        }
    }
};

document.getElementById('loginForm').addEventListener('submit', handleLogin);
