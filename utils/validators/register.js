module.exports = (
  firstname,
  lastname,
  username,
  email,
  password,
  confirm_password,
) => {
  const errors = {};
  if (typeof firstname == "string" && firstname.trim().length > 0) {
    firstname = firstname.trim(); // Trim only if of String type
    if (firstname.match(/[^A-Za-z\s]/))
      // Only alphabets and black spaces are allowed!
      errors.firstname =
        "Only alphabets and white spaces are allowed in first name!";
    else if (firstname.length < 3)
      errors.firstname = "First name must be more than 3 characters!";
    else if (firstname.length > 20)
      errors.firstname = "First name must be less than 20 characters!";
  } else errors.firstname = "First name is required!"; // No firstname passed

  // This field is optional! (No else statement)
  if (typeof lastname == "string" && lastname.trim().length > 0) {
    lastname = lastname.trim(); // Trim only if of String type
    if (lastname.match(/[^A-Za-z\s]/))
      // Only alphabets and black spaces are allowed!
      errors.lastname =
        "Only alphabets and white spaces are allowed in last name!";
    else if (lastname.length < 3)
      errors.lastname = "Last name must be more than 3 characters!";
    else if (lastname.length > 30)
      errors.lastname = "Last name must be less than 30 characters!";
  }

  if (typeof username == "string" && username.trim().length > 0) {
    username = username.trim(); // Trim only if of String type
    if (!isNaN(username[0]))
      // Username cannot start with
      errors.username =
        "Username can only start with an alphabet or underscore!";
    else if (username.match(/[^A-Za-z0-9_]/))
      // Only alphabets (upper/lower case), numbers and underscores are allowed!
      errors.username =
        "Username can only contain alphabets, numbers and underscore!";
    else if (username.length < 3 || username.length > 15)
      errors.username = "Username must be between 3 to 15 characters!";
  } else errors.username = "Username is required!";

  if (typeof email == "string" && email.trim().length > 0) {
    if (
      !email.match(
        /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
      )
    )
      errors.email = "Email address must valid!";
  } else errors.email = "Email is required!";

  if (typeof password == "string" && password.length > 0) {
    if (password.length < 8)
      errors.password = "Password must be at least 8 characters or more!";
    // https://www.thepolyglotdeveloper.com/2015/05/use-regex-to-test-password-strength-in-javascript/
    else if (
      !password.match(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9])/)
    )
      // Forcing user to set a strong password
      errors.password =
        "Password must contain at least one number, one special character, one lower case and one upper case letter!";
  } else errors.password = "Password is required!";

  if (confirm_password !== password)
    errors.confirm_password = "Password must need to be confirmed!";

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
