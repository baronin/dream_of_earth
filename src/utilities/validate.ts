const validate = (data: string, msgErr: string) => {
  let errors;
  if (data) {
    errors = "";
  } else {
    errors = msgErr;
  }
  return errors;
};

export default validate;
