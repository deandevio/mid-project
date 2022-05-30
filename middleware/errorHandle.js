export const errorHandle = (err) => {
  let errors = { name: "", password: "" };
  if (err.code === 11000) {
    errors.name = "This name already exists in the database";
    errors.password = "";
  }

  if (err.message.includes("Too many transactions")) {
    errors = err.message;
  }

  return errors;
};
