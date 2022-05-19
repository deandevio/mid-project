export const errorHandle = (err) => {
  let errors = { username: "", password: "" };
  if (err.code === 11000) {
    errors.username = "This username is already exists";
    errors.password = "";
    return errors;
  }
};
