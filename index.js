// Part 1: Introduction
// This lab provides a CodeSandbox, linked above, with a pre-built and pre-styled HTML register/login page that contains two separate forms.
// Currently, these forms have no validation! Your job is to add validation so that the forms adhere to the requirements outlined below. You can choose to implement this validation using any combination of HTML validation attributes and JavaScript event listeners that you want, as long as it meets the requirements.
// Explore the HTML structure that has been provided. You can make changes to the HTML (and CSS), as long as they do not subtract from the original functional intent of the page.
// An HTML element with id errorDisplay has been provided as a convenient method of showing error text to the user. In order to show or hide errorDisplay, you must modify its display style attribute.
// You can place any text or HTML into errorDisplay.

// Part 2: General Requirements
// To reiterate, these requirements can be completed using any combination of HTML validation attributes and JavaScript event listeners that you want. Consider the right tool for each job before you begin working on it.
// General Requirements: Whenever any of these validation requirements fail, an appropriate error should be communicated to the user (in most cases, the actual requirement listed below serves as a good error message), and focus should return to the input element that the error originates from. If any requirements fail, the form should not submit.
// Part 3: Registration Form Validation Requirements
// For the Registration Form section of the page, implement the following validation requirements:
// Registration Form - Username Validation:
// The username cannot be blank.
// The username must be at least four characters long.
// The username must contain at least two unique characters.
// The username cannot contain any special characters or whitespace.

// Registration Form - Email Validation:
// The email must be a valid email address.
// The email must not be from the domain "example.com."

// Registration Form - Password Validation:
// Passwords must be at least 12 characters long.
// Passwords must have at least one uppercase and one lowercase letter.
// Passwords must contain at least one number.
// Passwords must contain at least one special character.
// Passwords cannot contain the word "password" (uppercase, lowercase, or mixed).
// Passwords cannot contain the username.
// Both passwords must match.

// Registration Form - Terms and Conditions:
// The terms and conditions must be accepted.

// Registration Form - Form Submission:
// Usually, we would send this information to an external API for processing. In our case, we are going to process and store the data locally for practice purposes.
// If all validation is successful, store the username, email, and password using localStorage.
// If you are unfamiliar with localStorage, that is okay! Reference the documentation's "Description" and "Examples" sections to learn how to implement it. If you run into issues speak with a peer or one of your instructors.
// Consider how you want to store the user data, keeping in mind that there will be quite a few users registering for the site. Perhaps you want to store it with an array of user objects; or maybe an object whose keys are the usernames themselves.
// Valid usernames should be converted to all lowercase before being stored.
// Valid emails should be converted to all lowercase before being stored.
// Clear all form fields after successful submission and show a success message.

// Registration Form - Username Validation (Part Two):
// Now that we are storing usernames, create an additional validation rule for them...
// Usernames must be unique ("that username is already taken" error). Remember that usernames are being stored all lowercase, so "learner" and "Learner" are not unique.

// Part 4: Login Form Validation Requirements
// For the Login Form section of the page, implement the following validation requirements:
// Login Form - Username Validation:
// The username cannot be blank.
// The username must exist (within localStorage). Remember that usernames are stored in all lowercase, but the username field accepts (and should not invalidate) mixed-case input.

// Login Form - Password Validation:
// The password cannot be blank.
// The password must be correct (validate against localStorage).

// Login Form - Form Submission:
// If all validation is successful, clear all form fields and show a success message.
// If "Keep me logged in" is checked, modify the success message to indicate this (normally, this would be handled by a variety of persistent login tools and technologies).
// Part 5: Completion
// Test your validation thoroughly! Try to break things!
// Remember that each successful registration should be stored; therefore you should be able to login with a variety of account credentials.
// When you are done testing your own code, swap sandboxes with a partner and test theirs!
// When each of you are finished testing, share your results.
// Discuss with your partner the differences and similarities between your two approaches. Remember that there is rarely a strictly "correct" or "incorrect" way to solve a problem in development, but there are (almost always) more efficient approaches!
// --- String to Base64 ---
function encryptB64(str) {
  return btoa(str);
}

// --- Base64 to String ---
function decryptB64(base64Str) {
  return atob(base64Str);
}
// Errors display
const $errorDisplay = document.querySelector("#errorDisplay");
const $successDisplay = document.querySelector("#successDisplay");
const regexOfTwoUniqCharacterInText =
  /^(?:([a-zA-Z0-9_.-])(?!.*\1))*[a-zA-Z0-9_.-]$/;
const regexOfNoSpecialCharacterOrWhiteSpaceInText = /^[a-zA-Z0-9]+$/;
const regexOfValidEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const regexOfCheckPassword =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9])(?!.*[Pp][Aa][Ss][Ss][Ww][Oo][Rr][Dd]).{12,}$/;
// Registration inputs
const $registerForm = document.querySelector("#registration");
const $usernameReg = document.querySelector('#registration [name="username"]');
const $emailReg = document.querySelector('#registration [name="email"]');
const $passwordReg = document.querySelector('#registration [name="password"]');
const $passwordCheckReg = document.querySelector(
  '#registration [name="passwordCheck"]'
);
const $terms = document.querySelector('#registration [name="terms"]');
// Login inputs
const $loginForm = document.querySelector("#login");
const $usernameLog = document.querySelector('#login [name="username"]');
const $passwordLog = document.querySelector('#login [name="password"]');
const $persist = document.querySelector('#login [name="persist"]');
//localstorage
const registeredUsers =
  JSON.parse(localStorage.getItem("registeredUsers")) || [];

const saveInLocalStorage = (newUser) => {
  const i = registeredUsers.findIndex(
    (user) => user.username === newUser.username
  );
  if (i === -1) {
    registeredUsers.push(newUser);
    localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));
    return true;
  }
  return false;
};

const removeFromLocalStorage = (username) => {
  const i = registeredUsers.findIndex((user) => user.username === username);
  if (i !== -1) {
    registeredUsers.splice(i, 1);
    localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));
    return true;
  }
  return false;
};
const createErrorsElements = (errors) => {
  $errorDisplay.innerHTML = "";
  $successDisplay.innerHTML = "";
  $successDisplay.style.display = "none";
  const $ul = document.createElement("ul");
  const $errorTitle = document.createElement("label");
  $errorTitle.textContent = errors.length > 1 ? "Errors:" : "Error:";
  errorDisplay.appendChild($errorTitle);
  for (let error of errors) {
    const $li = document.createElement("li");
    $li.textContent = error;
    $ul.appendChild($li);
  }
  $errorDisplay.appendChild($ul);
  $errorDisplay.style.display = "block";
};
const createSuccessElements = (isSaved, message) => {
  $successDisplay.innerHTML = "";
  $errorDisplay.innerHTML = "";
  $errorDisplay.style.display = "none";
  if (isSaved) {
    const success = document.createElement("h3");
    success.textContent = message;
    successDisplay.appendChild(success);
    $successDisplay.style.display = "block";
  } else {
    $successDisplay.innerHTML = "";
    $successDisplay.style.display = "none";
  }
};
const registrationValidations = () => {
  let errorMessage = "";
  let isError = false;
  const errors = [];

  try {
    if ($usernameReg.value.length === 0) {
      isError = true;
      errorMessage = `The username cannot be blank.`;
      errors.push(errorMessage);
    }
    if ($usernameReg.value.length < 4) {
      isError = true;
      errorMessage = `The username must be at least four characters long.`;
      errors.push(errorMessage);
    }
    if (!regexOfTwoUniqCharacterInText.test($usernameReg.value)) {
      isError = true;
      errorMessage = `The username must contain at least two unique characters.`;
      errors.push(errorMessage);
    }
    if (!regexOfNoSpecialCharacterOrWhiteSpaceInText.test($usernameReg.value)) {
      isError = true;
      errorMessage = `The username cannot contain any special characters or whitespace.`;
      errors.push(errorMessage);
    }
    if (!regexOfValidEmail.test($emailReg.value)) {
      isError = true;
      errorMessage = `The email must be a valid email address.`;
      errors.push(errorMessage);
    }
    if ($emailReg.value.includes("example.com")) {
      isError = true;
      errorMessage = `The email must not be from the domain "example.com.`;
      errors.push(errorMessage);
    }
    if (!regexOfCheckPassword.test($passwordReg.value)) {
      isError = true;
      errorMessage = `Passwords must be at least 12 characters long.`;
      errors.push(errorMessage);
      errorMessage = `Passwords must have at least one uppercase and one lowercase letter.`;
      errors.push(errorMessage);
      errorMessage = `Passwords must contain at least one number.`;
      errors.push(errorMessage);
      errorMessage = `Passwords must contain at least one special character.`;
      errors.push(errorMessage);
      errorMessage = `Passwords cannot contain the word "password" (uppercase, lowercase, or mixed).`;
      errors.push(errorMessage);
    }
    if ($passwordReg.value.includes($usernameReg.value)) {
      isError = true;
      errorMessage = `Passwords cannot contain the username.`;
      errors.push(errorMessage);
    }
    if ($passwordReg.value !== $passwordCheckReg.value) {
      isError = true;
      errorMessage = `Both passwords must match.`;
      errors.push(errorMessage);
    }
    if ($terms.checked !== true) {
      isError = true;
      errorMessage = `The terms and conditions must be accepted.`;
      errors.push(errorMessage);
    }
    if (errors.length > 0) {
      createErrorsElements(errors);
    } else {
      $errorDisplay.style.display = "none";
    }
  } catch (error) {
    console.error(error);
  }
  return isError;
};

$registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const isError = registrationValidations();
  if (isError) return;
  const newUser = {
    username: $usernameReg.value.toLowerCase(),
    email: $emailReg.value.toLowerCase(),
    password: encryptB64($passwordCheckReg.value),
  };
  const isSaved = saveInLocalStorage(newUser);
  if (!isSaved) {
    const errors = ["That username is already taken"];
    createErrorsElements(errors);
    return;
  }
  $registerForm.reset();
  createSuccessElements(isSaved, "Successfully registered!");
});

$loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const user = registeredUsers.find(
    (user) => user.username.toLowerCase() === $usernameLog.value.toLowerCase()
  );
  if (user === undefined) {
    const errors = ["You are not yet register!"];
    createErrorsElements(errors);
  }
  if (decryptB64(user.password) === $passwordLog.value) {
    if ($persist.checked) {
      createSuccessElements(
        true,
        "Successfully Logged In! Normally, this would be handled by a variety of persistent login tools and technologies"
      );
    } else {
      createSuccessElements(true, "Successfully Logged In!");
    }
  } else {
    const errors = ["Invalid Credentials"];
    createErrorsElements(errors);
  }
});
