// Sign In Modal 


var headerText=document.querySelector('.text')
var signupButton = document.getElementById('signup_button');
var modalSignUpButton = document.getElementById('modal-signup-button');
var modalBg = document.querySelector('.modal-background');
var modal = document.querySelector('.modal');



signupButton.addEventListener('click', () => {
    console.log("hi")
    modal.style.display="block"
    headerText.setAttribute("style", "display:none")
});
modalBg.addEventListener('click', () => {
    //alert('modalBg is clicked!')
    modal.style.display="none"
    headerText.removeAttribute("style", "display:none")
});

window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }


const modalSignUpButtonHandler = async (event) => {
    event.preventDefault();
    const user_email = document.getElementById('modal-email-signup').value.trim();
    console.log(user_email)
    const user_name=document.getElementById('modal-username-signup').value.trim();
    console.log(user_name)
    const user_password = document.getElementById('modal-password-signup').value.trim();
    console.log(user_password)
    //Send the username and password to the db for validation
    //if valid take the user to their homepage
    if (user_email && user_name && user_password) {
        // Send a POST request to the API endpoint
        const response = await fetch('/api/users/', {
            method: 'POST',
            body: JSON.stringify({ user_email, user_name, user_password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            // If successful, redirect the browser to the user's page
            document.location.replace('/');
        } else {
            //display error if response is not ok
            alert('Failed to sign up.');
        }
    };
}

modalSignUpButton.addEventListener('click', modalSignUpButtonHandler);