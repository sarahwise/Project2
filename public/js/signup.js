$(document).ready(function() {
  // Getting references to our form and input
  var signUpForm = $("form.signup");
  var firstNameInput = $("input#firstname_input");
  var lastNameInput = $("input#lastname_input");
  
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");

  var highestEducationInput = $("input#highesteducation-input");
  var nationalityInput = $("input#nationality-input");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      firstName: firstNameInput.val().trim(),
      lastName:  lastNameInput.val().trim(),
      email:     emailInput.val().trim(),
      password:  passwordInput.val().trim(),
      highestEducation:  highestEducationInput.val().trim(),
      nationality: nationalityInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.firstName,userData.lastName, userData.email, userData.password, userData.highestEducation, userData.nationality);
    emailInput.val("");
    passwordInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(firstName, lastName, email, password, highestEducation, nationality) {
    $.post("/api/signup", {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      highestEducation: highestEducation,
      nationality: nationality
    })
      .then(function(data) {
        window.location.replace("/members");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
