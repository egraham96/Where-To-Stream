// Sign In Modal 

var loginheaderText=document.querySelector('.text')
var loginButton = document.getElementById('loginbutton');
var modalSignInButton = document.querySelector('#modal-login-button');
var modalBg = document.querySelector('.modal-background');
var modal = document.querySelector('.modal');



loginButton.addEventListener('click', () => {
    console.log("hi")
    modal.style.display = "block";
    loginheaderText.setAttribute("style", "display:none")
    
});
modalBg.addEventListener('click', () => {
    //alert('modalBg is clicked!')
    modal.setAttribute("style", "display:none");
    loginheaderText.removeAttribute("style", "display:none")
});


window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }


const modalSignInButtonHandler = async (event) => {
    event.preventDefault();
    const email = document.getElementById('modal-email').value.trim();
    const password = document.getElementById('modal-password').value.trim();
    //Send the username and password to the db for validation
    //if valid take the user to their homepage
    if (email && password) {
        // Send a POST request to the API endpoint
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            // If successful, redirect the browser to the user's page
            document.location.replace('/api/mylist');
        } else {
            //display error if response is not ok
            alert('Failed to log in.');
        }
    };
}


modalSignInButton.addEventListener('click', modalSignInButtonHandler);

