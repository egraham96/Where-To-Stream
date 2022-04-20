const signupFormHandler = async(event) => {
    event.preventDefault()

    const user_name = document.getElementById("username-signup").value.trim();
    console.log(user_name)
    const user_email = document.getElementById("email-signup").value.trim();
    console.log(user_email)
    const user_password = document.getElementById("password-signup").value.trim();

    if (user_name && user_email && user_password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ user_name, user_email, user_password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to sign up.');
        }
    }
};






document.
getElementById("signupsubmit").
addEventListener('click', signupFormHandler);

