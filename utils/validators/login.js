module.exports = (username, password) => {
  const errors = {};
  if (typeof username == "string" && username.trim().length > 0) {
    if (!isNaN(username[0]) || !username.match(/^[\w]{3,15}$/))
      errors.username = "Invalid username!";
  } else errors.username = "Username is required";

  if (typeof password == "string" && password.length > 0) {
    if (
      !password.match(
        /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9])(?=.{8,})/,
      )
    )
      errors.password = "Invalid password!";
  } else errors.password = "Password is required";

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
