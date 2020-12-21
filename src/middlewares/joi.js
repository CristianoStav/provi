const validateRequestInput = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    const isValid = !error;

    if (isValid) {
      return next();
    }

    const { details } = error;
    const errors = details.map(err => err.message);

    return res.status(400).json({ errors });

  }
}

export default validateRequestInput;